
(() => {

  const $ = id => document.getElementById(id);
  const modules = APP_CONTENT.modules;

  function read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  let completed = read("magicSnowCompletedModules", []);

  if (!Array.isArray(completed)) completed = [];

  completed = [...new Set(
    completed.filter(id => modules.some(m => m.id === id))
  )];

  let checks = read("magicSnowChecklistState", {}) || {};
  let current = "home";

  try {
    current = localStorage.getItem("magicSnowCurrentView") || "home";
  } catch {}

  function save() {
    try {
      localStorage.setItem(
        "magicSnowCurrentView",
        current
      );

      localStorage.setItem(
        "magicSnowCompletedModules",
        JSON.stringify(completed)
      );

      localStorage.setItem(
        "magicSnowChecklistState",
        JSON.stringify(checks)
      );
    } catch {}
  }

  const esc = s => String(s ?? "").replace(
    /[&<>"']/g,
    c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c])
  );

  const num = n => String(n).padStart(2, "0");

  function btn(label, view, cls = "secondary-btn") {
    return `
      <button
        type="button"
        class="${cls}"
        data-view="${view}"
      >
        ${label}
      </button>
    `;
  }

  function sidebar() {

    const progress = Math.round(
      completed.length / modules.length * 100
    );

    $("progressPercent").textContent = progress + "%";
    $("progressBarFill").style.width = progress + "%";
    $("completedCount").textContent = completed.length;

    $("sidebarNav").innerHTML = modules.map(m => `
      <button
        type="button"
        class="nav-item
          ${current === String(m.id) ? "active" : ""}
          ${completed.includes(m.id) ? "completed" : ""}"
        data-view="${m.id}"
      >

        <div class="nav-index">
          ${completed.includes(m.id) ? "✓" : num(m.id)}
        </div>

        <div class="nav-label">

          <span class="nav-title">
            ${esc(m.title)}
          </span>

          <span class="nav-status">
            ${completed.includes(m.id)
              ? "Completado"
              : "Pendiente"}
          </span>

        </div>

      </button>
    `).join("");
  }

  function go(view) {

    current = String(view);

    save();
    render();

    $("sidebar").classList.remove("open");

    $("menuToggle").setAttribute(
      "aria-expanded",
      "false"
    );

    window.scrollTo(0, 0);
  }

  function simulator(id) {

    if (id !== 3 && id !== 5) return "";

    const payment = id === 3;

    return `
      <section class="panel simulator-panel">

        <div class="sim-header">
          <span>MAGIC SNOW · FORMACIÓN REVO</span>
          <h4>
            ${payment
              ? "SIMULADOR DE COBRO"
              : "SIMULADOR DE CIERRE DE CAJA"}
          </h4>
        </div>

        <p>
          Practica con este ejercicio interactivo.
          No realiza operaciones reales.
        </p>

        ${!payment ? `
          <div class="fund-card">
            <span>FONDO INICIAL DE CAJA</span>
            <strong>150,00 €</strong>
          </div>
        ` : ""}

        <div class="sim-fields">

          <label>
            ${payment
              ? "Importe de venta (€)"
              : "Ventas en efectivo (€)"}

            <input
              id="simA"
              class="support-input"
              type="number"
              min="0"
              step="0.01"
              value="${payment ? "19.99" : "150"}"
            >
          </label>

          <label>
            ${payment
              ? "Efectivo recibido (€)"
              : "Efectivo contado (€)"}

            <input
              id="simB"
              class="support-input"
              type="number"
              min="0"
              step="0.01"
              value="${payment ? "30" : "300"}"
            >
          </label>

        </div>

        ${payment ? `
          <div class="cash-options">
            ${[20, 30, 50, 100].map(n => `
              <button
                type="button"
                class="secondary-btn"
                data-cash="${n}"
              >
                ${n} €
              </button>
            `).join("")}
          </div>
        ` : ""}

        <div
          class="sim-result"
          id="simResult"
          aria-live="polite"
        ></div>

        <button
          type="button"
          class="secondary-btn"
          id="simReset"
        >
          Reiniciar simulación
        </button>

        <p class="sim-disclaimer">
          ${payment
            ? "Ejercicio formativo. El importe de ejemplo no establece el PVP oficial."
            : "Ejercicio simplificado sin devoluciones ni entradas o salidas adicionales de efectivo."}
        </p>

      </section>
    `;
  }

  function setupSim(id) {

    if (!$("simA")) return;

    const format = n => n.toLocaleString(
      "es-ES",
      {
        style: "currency",
        currency: "EUR"
      }
    );

    function update() {

      const a = $("simA").valueAsNumber;
      const b = $("simB").valueAsNumber;

      if (
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        a < 0 ||
        b < 0
      ) {

        $("simResult").textContent =
          "Introduce importes válidos.";

        return;
      }

      const expected = Math.round(
        (a + (id === 5 ? 150 : 0)) * 100
      ) / 100;

      const diff = Math.round(
        (b - expected) * 100
      ) / 100;

      if (id === 3) {

        $("simResult").innerHTML = `
          <span>
            ${diff >= 0
              ? "CAMBIO A DEVOLVER"
              : "IMPORTE PENDIENTE"}
          </span>

          <strong>
            ${format(Math.abs(diff))}
          </strong>
        `;

      } else {

        $("simResult").innerHTML = `
          <span>EFECTIVO ESPERADO</span>

          <strong>${format(expected)}</strong>

          <p>
            ${diff === 0
              ? "✓ CAJA CUADRADA"
              : diff > 0
                ? "SOBRANTE: " + format(diff)
                : "FALTANTE: " + format(-diff)}
          </p>
        `;
      }
    }

    $("simA").oninput = update;
    $("simB").oninput = update;

    $("simReset").onclick = () => {

      $("simA").value = id === 3 ? "19.99" : "150";
      $("simB").value = id === 3 ? "30" : "300";

      update();
    };

    document.querySelectorAll("[data-cash]")
      .forEach(button => {

        button.onclick = () => {

          $("simB").value = button.dataset.cash;
          update();
        };
      });

    update();
  }

  function finalScreen() {

    return `
      <section class="final-card">

        <div class="finish-icon">✓</div>

        <p class="card-kicker">
          MAGIC SNOW · CENTRO DE FORMACIÓN
        </p>

        <h3>¡FORMACIÓN COMPLETADA!</h3>

        <p>
          Ya conoces los principales procedimientos
          de REVO para la campaña Magic Snow.
        </p>

        <p>
          <strong>
            ¡Gracias por formar parte del equipo!
          </strong>
        </p>

        <div class="final-progress">
          6 / 6 MÓDULOS COMPLETADOS
        </div>

        ${btn("Volver al inicio", "home", "primary-btn")}

      </section>
    `;
  }

  function renderWelcome() {

    const nextModule =
      modules.find(m => !completed.includes(m.id))?.id || 1;

    $("contentArea").innerHTML = `

      <section class="welcome-card">

        <div class="welcome-hero">

          <div class="welcome-content">

            <p class="card-kicker">
              LA CASA DE LAS CARCASAS · CENTRO DE FORMACIÓN
            </p>

            <h3>¡BIENVENIDO A MAGIC SNOW!</h3>

            <p>
              <strong>
                Aprende a utilizar REVO paso a paso.
              </strong>
            </p>

            <p>
              Hemos preparado esta guía para ayudarte
              a gestionar correctamente la operativa
              de caja y el datáfono durante la campaña
              Magic Snow.
            </p>

            <p>
              A través de nuestros vídeos tutoriales
              aprenderás a iniciar el sistema, abrir
              la caja, realizar cobros, gestionar
              devoluciones y completar el cierre de turno.
            </p>

            <div class="welcome-actions">

              ${btn(
                completed.length
                  ? "CONTINUAR FORMACIÓN"
                  : "COMENZAR FORMACIÓN",
                nextModule,
                "primary-btn"
              )}

              ${btn("DUDAS Y SOPORTE", 6)}

            </div>

          </div>

          <div class="welcome-visual">

            <div class="device-card">

              <span class="snow-deco snow-1">❄</span>
              <span class="snow-deco snow-2">✦</span>
              <span class="snow-deco snow-3">❄</span>

              <div class="device-illustration">

                <img
                  src="assets/datafono.png"
                  alt="Datáfono Magic Snow"
                  id="devicePhoto"
                >

                <span id="deviceFallback" hidden>
                  💳
                </span>

              </div>

            </div>

            <div class="info-card">

              <h4>Tu formación</h4>

              <div class="training-stats">

                <div class="stat-card">
                  <strong>6</strong>
                  <span>MÓDULOS</span>
                </div>

                <div class="stat-card">
                  <strong>5</strong>
                  <span>VÍDEOS</span>
                </div>

                <div class="stat-card">
                  <strong>1</strong>
                  <span>SOPORTE</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section class="module-overview">

        <h3>Explora los módulos de formación</h3>

        <div class="overview-grid">

          ${modules.map(m => `

            <button
              type="button"
              class="overview-card"
              data-view="${m.id}"
            >

              <span class="overview-number">
                ${completed.includes(m.id)
                  ? "✓"
                  : num(m.id)}
              </span>

              <strong>${esc(m.title)}</strong>

              <p>${esc(m.description)}</p>

              <span class="overview-link">
                ${completed.includes(m.id)
                  ? "Volver a consultar"
                  : "Acceder al módulo"} →
              </span>

            </button>

          `).join("")}

        </div>

      </section>

      ${completed.length === 6 ? finalScreen() : ""}

    `;

    const photo = $("devicePhoto");

    function fallback() {

      photo.hidden = true;
      $("deviceFallback").hidden = false;
    }

    photo.onerror = fallback;

    if (photo.complete && !photo.naturalWidth) {
      fallback();
    }
  }

  function renderVideoModule(m) {

    return `

      <section class="panel video-panel">

        <div class="video-heading">
          <h4>VÍDEO TUTORIAL</h4>
          <span class="tag">Módulo ${num(m.id)}</span>
        </div>

        <div class="video-frame-wrap">

          <iframe
            id="tutorial"
            src="https://www.youtube.com/embed/${m.videoId}"
            title="${esc(m.title)}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

        </div>

        <p class="video-external">
          <a
            href="https://youtu.be/${m.videoId}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir vídeo en YouTube ↗
          </a>
        </p>

      </section>

      <section class="panel">

        <h4>INSTRUCCIONES PASO A PASO</h4>

        <div class="step-list">

          ${m.steps.map((step, i) => `

            <article class="step">

              <span class="step-number">
                ${num(i + 1)}
              </span>

              <div>

                <h5>${esc(step[1])}</h5>

                <p>${esc(step[2])}</p>

                <button
                  type="button"
                  class="timestamp"
                  data-time="${step[0]}"
                >
                  ▶ ${step[0]}
                </button>

              </div>

            </article>

          `).join("")}

        </div>

      </section>

      ${m.id === 2 ? `

        <section class="fund-highlight">
          <span>FONDO INICIAL DE CAJA</span>
          <strong>150,00 €</strong>
          <p>Antes de comenzar las ventas.</p>
        </section>

      ` : ""}

      ${m.id === 3 || m.id === 4 ? `

        <div class="payment-grid">

          <section class="payment-card cash-card">

            <span class="payment-icon">€</span>

            <h4>EFECTIVO</h4>

            <p>
              ${m.id === 3
                ? "Introduce el efectivo recibido y comprueba el cambio antes de finalizar el cobro."
                : "Si la compra se realizó en efectivo, la devolución se realizará en efectivo."}
            </p>

          </section>

          <section class="payment-card card-card">

            <span class="payment-icon">▤</span>

            <h4>TARJETA</h4>

            <p>
              ${m.id === 3
                ? "Selecciona el pago con tarjeta y utiliza el lector del datáfono."
                : "Si la compra se realizó con tarjeta, REVO gestiona la devolución con tarjeta."}
            </p>

          </section>

        </div>

      ` : ""}

      <section class="panel important-box">

        <h4>⚠ INFORMACIÓN IMPORTANTE</h4>

        <ul>
          ${m.important.map(text => `
            <li>${esc(text)}</li>
          `).join("")}
        </ul>

      </section>

      ${simulator(m.id)}

      <section class="panel">

        <div class="checklist-heading">

          <h4>CHECKLIST DE COMPROBACIÓN</h4>

          <span id="checkCount"></span>

        </div>

        <div class="check-progress">
          <div id="checkProgressFill"></div>
        </div>

        <div class="checklist">

          ${m.checklist.map((text, i) => `

            <label class="checklist-item">

              <input
                type="checkbox"
                data-check="${i}"
                ${checks[m.id]?.[i] ? "checked" : ""}
              >

              <span>${esc(text)}</span>

            </label>

          `).join("")}

        </div>

      </section>

    `;
  }

  function renderSupport(m) {

    const support = APP_CONTENT.support;

    const link =
      /^(https:\/\/|mailto:)/i.test(support.buttonLink)
        ? support.buttonLink
        : "";

    return `

      <section class="panel">

        <h4>PREGUNTAS FRECUENTES</h4>

        <div class="faq-list">

          ${m.faq.map(faq => `

            <details class="faq-item">

              <summary class="faq-question">
                ${esc(faq[0])}
              </summary>

              <p class="faq-text">
                ${esc(faq[1])}
              </p>

            </details>

          `).join("")}

        </div>

      </section>

      <section class="support-card">

        <div class="support-icon">?</div>

        <h4>¿NECESITAS AYUDA?</h4>

        <p>
          ¿Tienes alguna incidencia o necesitas ayuda?
          Contacta con el equipo de soporte interno
          de La Casa de las Carcasas.
        </p>

        ${support.email ? `
          <p>
            <strong>Correo:</strong>
            ${esc(support.email)}
          </p>
        ` : ""}

        ${support.channel ? `
          <p>
            <strong>Canal de soporte:</strong>
            ${esc(support.channel)}
          </p>
        ` : ""}

        ${link ? `

          <a
            class="contact-btn"
            href="${esc(link)}"
          >
            Contactar soporte
          </a>

        ` : `

          <p class="support-pending">
            Canal y datos de contacto pendientes
            de confirmar.
          </p>

        `}

      </section>

    `;
  }

  function render() {

    sidebar();

    const area = $("contentArea");

    if (current === "done" && completed.length === 6) {
      area.innerHTML = finalScreen();
      return;
    }

    const m = modules.find(
      module => String(module.id) === current
    );

    if (!m) {
      renderWelcome();
      return;
    }

    const body = m.videoId
      ? renderVideoModule(m)
      : renderSupport(m);

    area.innerHTML = `

      <section class="module-layout">

        <div class="module-header">

          <div class="module-title-wrap">

            <p class="module-number">
              MÓDULO ${num(m.id)} DE 06
            </p>

            <h3>${esc(m.title)}</h3>

            <p class="module-description">
              ${esc(m.description)}
            </p>

          </div>

          <span class="tag">
            ${completed.includes(m.id)
              ? "✓ Completado"
              : "Pendiente"}
          </span>

        </div>

        ${body}

        <section class="panel complete-panel">

          <div>

            <h4>¿HAS TERMINADO ESTE MÓDULO?</h4>

            <p>
              Marca este apartado como completado
              para guardar tu progreso.
            </p>

          </div>

          <button
            type="button"
            class="complete-btn"
            id="completeModuleBtn"
          >
            ${completed.includes(m.id)
              ? "✓ Completado · Desmarcar"
              : "Marcar como completado"}
          </button>

        </section>

        <div class="nav-buttons">

          ${btn("Volver al inicio", "home")}

          ${m.id > 1
            ? btn("← Anterior", m.id - 1)
            : ""}

          ${m.id < 6
            ? btn("Siguiente →", m.id + 1, "primary-btn")
            : ""}

          ${completed.length === 6
            ? btn("Ver finalización", "done", "primary-btn")
            : ""}

        </div>

      </section>

    `;

    $("completeModuleBtn").onclick = () => {

      completed = completed.includes(m.id)
        ? completed.filter(id => id !== m.id)
        : [...completed, m.id];

      save();

      if (completed.length === 6) {

        go("done");

      } else {

        sidebar();

        $("completeModuleBtn").textContent =
          completed.includes(m.id)
            ? "✓ Completado · Desmarcar"
            : "Marcar como completado";

        area.querySelector(".module-header .tag")
          .textContent = completed.includes(m.id)
            ? "✓ Completado"
            : "Pendiente";
      }
    };

    function updateCount() {

      if (!$("checkCount") || !m.checklist) return;

      const total = m.checklist.length;

      const count = m.checklist.filter(
        (_, i) => checks[m.id]?.[i]
      ).length;

      $("checkCount").textContent =
        `${count} / ${total}`;

      $("checkProgressFill").style.width =
        `${total ? count / total * 100 : 0}%`;
    }

    area.querySelectorAll("[data-check]")
      .forEach(input => {

        input.onchange = () => {

          checks[m.id] ??= {};

          checks[m.id][input.dataset.check] =
            input.checked;

          save();
          updateCount();
        };
      });

    updateCount();
    setupSim(m.id);

    area.querySelectorAll("[data-time]")
      .forEach(button => {

        button.onclick = () => {

          const [min, sec] =
            button.dataset.time.split(":").map(Number);

          const seconds = min * 60 + sec;

          $("tutorial").src =
            `https://www.youtube.com/embed/${m.videoId}?start=${seconds}&autoplay=1`;

          $("tutorial").scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        };
      });
  }

  document.addEventListener("click", event => {

    const button = event.target.closest("[data-view]");

    if (button) {
      go(button.dataset.view);
    }
  });

  $("sidebarHomeBtn").onclick = () => {
    go("home");
  };

  $("menuToggle").onclick = () => {

    const open = $("sidebar").classList.toggle("open");

    $("menuToggle").setAttribute(
      "aria-expanded",
      String(open)
    );
  };

  document.addEventListener("click", event => {

    if (
      !$("sidebar").contains(event.target) &&
      !$("menuToggle").contains(event.target)
    ) {

      $("sidebar").classList.remove("open");

      $("menuToggle").setAttribute(
        "aria-expanded",
        "false"
      );
    }
  });

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      $("sidebar").classList.remove("open");

      $("menuToggle").setAttribute(
        "aria-expanded",
        "false"
      );
    }
  });

  render();

})();

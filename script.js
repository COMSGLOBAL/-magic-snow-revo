
(() => {

  "use strict";

  const $ = id => document.getElementById(id);

  const modules = APP_CONTENT.modules;

  const STORAGE_COMPLETED = "magicSnowCompletedModules";
  const STORAGE_CHECKS = "magicSnowChecklistV3";

  const esc = value => String(value ?? "").replace(
    /[&<>"']/g,
    char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char])
  );

  const number = n => String(n).padStart(2, "0");

  const euro = n => n.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR"
  });

  // GUARDADO DEL PROGRESO

  function read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  let completed = read(STORAGE_COMPLETED, []);

  if (!Array.isArray(completed)) completed = [];

  completed = [...new Set(
    completed.filter(id =>
      modules.some(m => m.id === id)
    )
  )];

  let checks = read(STORAGE_CHECKS, {});

  if (
    !checks ||
    typeof checks !== "object" ||
    Array.isArray(checks)
  ) {
    checks = {};
  }

  // Siempre comenzar en la bienvenida

  let current = "home";

  function save() {
    try {

      localStorage.setItem(
        STORAGE_COMPLETED,
        JSON.stringify(completed)
      );

      localStorage.setItem(
        STORAGE_CHECKS,
        JSON.stringify(checks)
      );

    } catch {

      console.warn("No se ha podido guardar el progreso.");

    }
  }

  // COMPONENTES

  function button(text, view, primary = false) {

    return `
      <button
        type="button"
        class="btn ${primary ? "primary" : "secondary"}"
        data-view="${esc(view)}"
      >
        ${esc(text)}
      </button>
    `;

  }

  function snow() {

    return `
      <div class="snow-decoration" aria-hidden="true">
        <span>❄</span>
        <span>✧</span>
        <span>❄</span>
        <span>✦</span>
        <span>❄</span>
        <span>✧</span>
      </div>
    `;

  }

  // NAVEGACIÓN LATERAL

  function renderNavigation() {

    const progress = Math.round(
      completed.length / modules.length * 100
    );

    $("progressPercent").textContent =
      progress + "%";

    $("progressFill").style.width =
      progress + "%";

    $("progressCount").textContent =
      `${completed.length} de 6 módulos completados`;

    $("navigation").innerHTML = modules.map(m => `

      <button
        type="button"
        class="nav-item
          ${current === String(m.id) ? "active" : ""}
          ${completed.includes(m.id) ? "completed" : ""}"
        data-view="${m.id}"
        ${current === String(m.id)
          ? 'aria-current="page"'
          : ""}
      >

        <span class="nav-number">
          ${completed.includes(m.id)
            ? "✓"
            : number(m.id)}
        </span>

        <span class="nav-info">

          <strong>${esc(m.title)}</strong>

          <small>
            ${completed.includes(m.id)
              ? "Completado"
              : "Pendiente"}
          </small>

        </span>

      </button>

    `).join("");

    const home = document.querySelector(".home-button");

    home.classList.toggle(
      "active",
      current === "home"
    );

  }

  // MENÚ MÓVIL

  function closeMenu() {

    $("sidebar").classList.remove("open");
    $("overlay").classList.remove("visible");

    $("menuToggle").setAttribute(
      "aria-expanded",
      "false"
    );

  }

  $("menuToggle").addEventListener("click", () => {

    const open = $("sidebar").classList.toggle("open");

    $("overlay").classList.toggle("visible", open);

    $("menuToggle").setAttribute(
      "aria-expanded",
      String(open)
    );

  });

  $("overlay").addEventListener("click", closeMenu);

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") closeMenu();

  });

  function go(view) {

    current = String(view);

    closeMenu();
    render();

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    $("content").focus({
      preventScroll: true
    });

  }

  // PANTALLA DE BIENVENIDA

  function renderWelcome() {

    const welcome = APP_CONTENT.welcome;

    const next = modules.find(
      m => !completed.includes(m.id)
    );

    $("content").innerHTML = `

      <section class="welcome-banner">

        ${snow()}

        <div class="welcome-brand">
          LA CASA DE LAS CARCASAS
        </div>

        <div class="welcome-snowflake">❄</div>

        <h1>MAGIC SNOW</h1>

        <p>
          MANUAL DE USO DEL DATÁFONO · REVO
        </p>

        <span class="welcome-edition">
          CENTRO DE FORMACIÓN · NAVIDAD 2026
        </span>

      </section>

      <section class="welcome-card">

        <div class="welcome-copy">

          <span class="eyebrow">
            TU CENTRO DE FORMACIÓN
          </span>

          <h2>${esc(welcome.title)}</h2>

          <h3>${esc(welcome.subtitle)}</h3>

          <p>${esc(welcome.description)}</p>

          <p>
            Aprende a tu ritmo y consulta los
            procedimientos siempre que lo necesites.
            Tu progreso se guardará automáticamente.
          </p>

          <div class="button-row">

            ${next
              ? button(
                  completed.length
                    ? "CONTINUAR FORMACIÓN →"
                    : "COMENZAR FORMACIÓN →",
                  next.id,
                  true
                )
              : button(
                  "VER FORMACIÓN COMPLETADA",
                  "done",
                  true
                )
            }

            ${button("DUDAS Y SOPORTE", 6)}

          </div>

        </div>

        <div class="device-visual">

          ${snow()}

          <img
            src="${esc(welcome.image)}"
            alt="Datáfono Magic Snow"
            id="devicePhoto"
          >

          <div id="deviceFallback" hidden>

            <div class="device-drawing">

              <div class="device-top">
                REVO
              </div>

              <div class="device-screen">
                <span>❄</span>
                <strong>MAGIC SNOW</strong>
                <small>Venta rápida</small>
                <div>✓</div>
              </div>

              <div class="device-keys">
                ${Array.from(
                  {length: 12},
                  () => "<i></i>"
                ).join("")}
              </div>

            </div>

          </div>

        </div>

      </section>

      <section class="stats-grid">

        <article class="stat-card">
          <span class="stat-icon">▤</span>
          <strong>6</strong>
          <span>MÓDULOS DE FORMACIÓN</span>
        </article>

        <article class="stat-card">
          <span class="stat-icon">▷</span>
          <strong>5</strong>
          <span>VÍDEOS TUTORIALES</span>
        </article>

        <article class="stat-card">
          <span class="stat-icon">?</span>
          <strong>1</strong>
          <span>CENTRO DE AYUDA</span>
        </article>

      </section>

      <div class="section-heading">
        <span class="eyebrow">APRENDE PASO A PASO</span>
        <h2>Explora los módulos</h2>
        <p>Accede directamente al contenido que necesites.</p>
      </div>

      <section class="module-grid">

        ${modules.map(m => `

          <button
            class="module-card"
            type="button"
            data-view="${m.id}"
          >

            <div class="module-card-top">

              <span class="module-card-icon">
                ${esc(m.icon)}
              </span>

              <span class="module-card-number">
                MÓDULO ${number(m.id)}
              </span>

            </div>

            <h3>${esc(m.title)}</h3>

            <p>${esc(m.description)}</p>

            <div class="module-card-bottom">

              <span>
                ${m.video ? "▷ Vídeo tutorial" : "Centro de ayuda"}
              </span>

              <strong>
                ${completed.includes(m.id)
                  ? "✓ Completado"
                  : "Acceder →"}
              </strong>

            </div>

          </button>

        `).join("")}

      </section>

      ${completed.length === 6
        ? `
          <section class="success-notice">
            ✓ Has completado toda la formación.
            ${button("Ver finalización", "done")}
          </section>
        `
        : ""}

    `;

    const photo = $("devicePhoto");

    function fallback() {
      photo.hidden = true;
      $("deviceFallback").hidden = false;
    }

    photo.addEventListener("error", fallback);

    if (photo.complete && !photo.naturalWidth) {
      fallback();
    }

  }

  // REPRODUCTOR DE VÍDEO

  function renderVideo(m) {

    return `

      <section class="panel video-panel">

        <div class="panel-heading">

          <h3>VÍDEO TUTORIAL</h3>

          <span class="tag">
            MÓDULO ${number(m.id)}
          </span>

        </div>

        <div class="video-wrapper">

          <iframe
            id="tutorial"
            src="https://www.youtube.com/embed/${m.video}"
            title="${esc(m.title)}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>

        </div>

        <a
          class="video-link"
          href="https://youtu.be/${m.video}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir vídeo en YouTube ↗
        </a>

      </section>

    `;

  }

  // INSTRUCCIONES DE LAS TRANSCRIPCIONES

  function renderSteps(m) {

    return `

      <section class="panel">

        <div class="panel-heading">
          <h3>INSTRUCCIONES PASO A PASO</h3>
        </div>

        <p class="muted">
          Pulsa sobre el minuto de cada paso para
          consultar ese momento del tutorial.
        </p>

        <div class="steps">

          ${m.steps.map((step, i) => `

            <article class="step">

              <span class="step-number">
                ${number(i + 1)}
              </span>

              <div class="step-copy">

                <h4>${esc(step.title)}</h4>

                <p>${esc(step.text)}</p>

                <button
                  type="button"
                  class="timestamp"
                  data-time="${esc(step.time)}"
                >
                  ▶ ${esc(step.time)}
                </button>

              </div>

            </article>

          `).join("")}

        </div>

      </section>

    `;

  }

  // BLOQUES ESPECIALES

  function renderExtra(m) {

    if (m.id === 2) {

      return `

        <section class="fund-card">

          <span>FONDO INICIAL DE CAJA</span>

          <strong>150,00 €</strong>

          <p>
            Recuerda realizar la apertura
            antes de comenzar las ventas.
          </p>

        </section>

      `;

    }

    if (m.id === 3 || m.id === 4) {

      const payment = m.id === 3;

      return `

        <section class="payment-grid">

          <article class="payment-card cash">

            <span class="payment-icon">€</span>

            <h3>EFECTIVO</h3>

            <p>
              ${payment
                ? "Introduce el importe recibido, comprueba el cambio y confirma el cobro mediante el icono del billete."
                : "Si la compra se realizó en efectivo, devuelve el importe en efectivo."}
            </p>

          </article>

          <article class="payment-card card-payment">

            <span class="payment-icon">▤</span>

            <h3>TARJETA</h3>

            <p>
              ${payment
                ? "Selecciona el pago con tarjeta y utiliza el lector del datáfono."
                : "Si la compra se realizó con tarjeta, la devolución se gestiona mediante tarjeta."}
            </p>

          </article>

        </section>

      `;

    }

    return "";

  }

  // INFORMACIÓN IMPORTANTE

  function renderImportant(m) {

    return `

      <section class="panel important">

        <h3>! &nbsp; INFORMACIÓN IMPORTANTE</h3>

        <ul>

          ${m.important.map(text => `
            <li>${esc(text)}</li>
          `).join("")}

        </ul>

      </section>

    `;

  }

  // CHECKLISTS

  function renderChecklist(m) {

    return `

      <section class="panel">

        <div class="panel-heading">

          <h3>CHECKLIST DE COMPROBACIÓN</h3>

          <strong id="checkCount"></strong>

        </div>

        <div class="check-track">
          <div id="checkFill"></div>
        </div>

        <div class="checklist">

          ${m.checklist.map((text, i) => `

            <label class="check-item">

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

  function updateChecklist(m) {

    if (!$("checkCount") || !m.checklist) return;

    const count = m.checklist.filter(
      (_, i) => checks[m.id]?.[i]
    ).length;

    $("checkCount").textContent =
      `${count} / ${m.checklist.length}`;

    $("checkFill").style.width =
      `${count / m.checklist.length * 100}%`;

  }

  // SIMULADORES

  function renderSimulator(m) {

    if (m.id !== 3 && m.id !== 5) return "";

    const payment = m.id === 3;

    return `

      <section class="panel simulator">

        <div class="sim-heading">

          <span>MAGIC SNOW · PRÁCTICA INTERACTIVA</span>

          <h3>
            ${payment
              ? "SIMULADOR DE COBRO"
              : "SIMULADOR DE CIERRE DE CAJA"}
          </h3>

        </div>

        <p>
          Practica con los importes de ejemplo.
          No se realizan operaciones reales.
        </p>

        ${!payment
          ? `
            <div class="sim-fund">
              Fondo inicial de caja
              <strong>150,00 €</strong>
            </div>
          `
          : ""}

        <div class="sim-fields">

          <label>

            ${payment
              ? "Importe de la venta (€)"
              : "Ventas en efectivo (€)"}

            <input
              type="number"
              min="0"
              step="0.01"
              id="simA"
              value="${payment ? "19.99" : "150"}"
            >

          </label>

          <label>

            ${payment
              ? "Efectivo recibido (€)"
              : "Efectivo contado (€)"}

            <input
              type="number"
              min="0"
              step="0.01"
              id="simB"
              value="${payment ? "30" : "300"}"
            >

          </label>

        </div>

        ${payment
          ? `
            <div class="cash-buttons">

              ${[20, 30, 50, 100].map(n => `
                <button
                  type="button"
                  class="btn secondary"
                  data-cash="${n}"
                >
                  ${n} €
                </button>
              `).join("")}

            </div>
          `
          : ""}

        <div
          class="sim-result"
          id="simResult"
          aria-live="polite"
        ></div>

        <button
          type="button"
          class="btn secondary"
          id="simReset"
        >
          Reiniciar simulación
        </button>

        <small class="sim-note">

          ${payment
            ? "Ejemplo formativo. El importe utilizado no establece el PVP oficial."
            : "Ejercicio simplificado sin devoluciones ni entradas o salidas adicionales de efectivo."}

        </small>

      </section>

    `;

  }

  function setupSimulator(m) {

    if (!$("simA")) return;

    const payment = m.id === 3;

    function calculate() {

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

      const aCents = Math.round(a * 100);
      const bCents = Math.round(b * 100);

      const expected =
        aCents + (payment ? 0 : 15000);

      const difference = bCents - expected;

      if (payment) {

        $("simResult").innerHTML = `

          <span>
            ${difference >= 0
              ? "CAMBIO A DEVOLVER"
              : "IMPORTE PENDIENTE"}
          </span>

          <strong>
            ${euro(Math.abs(difference) / 100)}
          </strong>

        `;

      } else {

        $("simResult").innerHTML = `

          <span>EFECTIVO ESPERADO</span>

          <strong>${euro(expected / 100)}</strong>

          <p>
            ${difference === 0
              ? "✓ CAJA CUADRADA"
              : difference > 0
                ? "SOBRANTE: " + euro(difference / 100)
                : "FALTANTE: " + euro(-difference / 100)}
          </p>

        `;

      }

    }

    $("simA").addEventListener("input", calculate);
    $("simB").addEventListener("input", calculate);

    $("simReset").onclick = () => {

      $("simA").value = payment ? "19.99" : "150";
      $("simB").value = payment ? "30" : "300";

      calculate();

    };

    document.querySelectorAll("[data-cash]")
      .forEach(button => {

        button.onclick = () => {

          $("simB").value = button.dataset.cash;

          calculate();

        };

      });

    calculate();

  }

  // CENTRO DE AYUDA

  function renderSupport(m) {

    const support = APP_CONTENT.support;

    const link =
      /^(https:\/\/|mailto:)/i.test(support.link)
        ? support.link
        : support.email
          ? "mailto:" + support.email
          : "";

    return `

      <section class="panel">

        <h3>PREGUNTAS FRECUENTES</h3>

        <p class="muted">
          Selecciona una pregunta para consultar
          la respuesta.
        </p>

        <div class="faq-list">

          ${m.faq.map(faq => `

            <details class="faq">

              <summary>
                ${esc(faq.question)}
              </summary>

              <p>${esc(faq.answer)}</p>

            </details>

          `).join("")}

        </div>

      </section>

      <section class="support-card">

        <div class="support-icon">?</div>

        <div>

          <h3>¿NECESITAS AYUDA?</h3>

          <p>
            ¿Tienes alguna incidencia o necesitas ayuda?
          </p>

          <p>
            Contacta directamente con nuestro equipo
            de soporte interno de La Casa de las Carcasas.
          </p>

          ${support.email
            ? `<p><strong>Correo:</strong> ${esc(support.email)}</p>`
            : ""}

          ${support.channel
            ? `<p><strong>Canal:</strong> ${esc(support.channel)}</p>`
            : ""}

          ${link
            ? `
              <a
                href="${esc(link)}"
                class="btn primary"
              >
                Contactar con soporte
              </a>
            `
            : `
              <p class="muted">
                Datos de contacto pendientes de incorporar.
              </p>
            `}

        </div>

      </section>

    `;

  }

  // PANTALLA DE MÓDULO

  function renderModule(m) {

    const done = completed.includes(m.id);

    $("content").innerHTML = `

      <section class="module-header">

        <div>

          <span class="eyebrow">
            MÓDULO ${number(m.id)} DE 06
          </span>

          <h1>${esc(m.title)}</h1>

          <p>${esc(m.description)}</p>

        </div>

        <span
          class="status ${done ? "done" : ""}"
          id="moduleStatus"
        >
          ${done ? "✓ Completado" : "Pendiente"}
        </span>

      </section>

      ${m.video
        ? `
          ${renderVideo(m)}
          ${renderSteps(m)}
          ${renderExtra(m)}
          ${renderImportant(m)}
          ${renderSimulator(m)}
          ${renderChecklist(m)}
        `
        : renderSupport(m)
      }

      <section class="panel completion-panel">

        <div>

          <h3>¿HAS TERMINADO ESTE MÓDULO?</h3>

          <p>
            Marca este apartado como completado
            para guardar tu progreso.
          </p>

        </div>

        <button
          type="button"
          id="completeButton"
          class="btn primary"
        >
          ${done
            ? "✓ Completado · Desmarcar"
            : "Marcar como completado"}
        </button>

      </section>

      <div class="module-navigation">

        ${button("⌂ Volver al inicio", "home")}

        ${m.id > 1
          ? button("← Anterior", m.id - 1)
          : ""}

        ${m.id < 6
          ? button("Siguiente módulo →", m.id + 1, true)
          : ""}

        ${completed.length === 6
          ? button("Ver finalización", "done", true)
          : ""}

      </div>

    `;

    $("completeButton").onclick = () => {

      if (completed.includes(m.id)) {

        completed = completed.filter(
          id => id !== m.id
        );

      } else {

        completed.push(m.id);

      }

      save();

      if (completed.length === 6) {

        go("done");

      } else {

        renderNavigation();

        const done = completed.includes(m.id);

        $("completeButton").textContent =
          done
            ? "✓ Completado · Desmarcar"
            : "Marcar como completado";

        $("moduleStatus").textContent =
          done ? "✓ Completado" : "Pendiente";

        $("moduleStatus").classList.toggle(
          "done",
          done
        );

      }

    };

    document.querySelectorAll("[data-check]")
      .forEach(input => {

        input.onchange = () => {

          if (!checks[m.id]) checks[m.id] = {};

          checks[m.id][input.dataset.check] =
            input.checked;

          save();
          updateChecklist(m);

        };

      });

    document.querySelectorAll("[data-time]")
      .forEach(button => {

        button.onclick = () => {

          const [minutes, seconds] =
            button.dataset.time.split(":").map(Number);

          const start = minutes * 60 + seconds;

          $("tutorial").src =
            `https://www.youtube.com/embed/${m.video}?start=${start}&autoplay=1`;

          $("tutorial").scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        };

      });

    updateChecklist(m);
    setupSimulator(m);

  }

  // FORMACIÓN COMPLETADA

  function renderFinal() {

    $("content").innerHTML = `

      <section class="final-screen">

        ${snow()}

        <span class="final-icon">✓</span>

        <span class="eyebrow">
          MAGIC SNOW · CENTRO DE FORMACIÓN
        </span>

        <h1>¡FORMACIÓN COMPLETADA!</h1>

        <p>
          Ya conoces los principales procedimientos
          de REVO para la campaña Magic Snow.
        </p>

        <div class="final-stat">

          <strong>100%</strong>

          <span>
            6 DE 6 MÓDULOS COMPLETADOS
          </span>

        </div>

        <h3>
          ¡Gracias por formar parte del equipo!
        </h3>

        ${button("VOLVER AL MANUAL", "home", true)}

      </section>

    `;

  }

  // CONTROL GENERAL

  function render() {

    renderNavigation();

    if (
      current === "done" &&
      completed.length === 6
    ) {

      renderFinal();
      return;

    }

    const m = modules.find(
      item => String(item.id) === current
    );

    if (m) {

      renderModule(m);

    } else {

      current = "home";
      renderWelcome();

    }

  }

  document.addEventListener("click", event => {

    const button = event.target.closest("[data-view]");

    if (button) {

      go(button.dataset.view);

    }

  });

  render();

})();

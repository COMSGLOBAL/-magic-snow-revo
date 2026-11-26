const STORAGE_KEYS = {
  currentView: "magicSnowCurrentView",
  completed: "magicSnowCompletedModules",
  notes: "magicSnowModuleNotes",
  checklists: "magicSnowChecklistState",
  faqAnswers: "magicSnowFaqAnswers",
  support: "magicSnowSupportInfo"
};

const state = {
  currentView: localStorage.getItem(STORAGE_KEYS.currentView) || "home",
  completed: JSON.parse(localStorage.getItem(STORAGE_KEYS.completed) || "[]"),
  notes: JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || "{}"),
  checklists: JSON.parse(localStorage.getItem(STORAGE_KEYS.checklists) || "{}"),
  faqAnswers: JSON.parse(localStorage.getItem(STORAGE_KEYS.faqAnswers) || "{}"),
  support: JSON.parse(localStorage.getItem(STORAGE_KEYS.support) || JSON.stringify({
    email: "",
    channel: "",
    buttonLabel: "Contactar soporte",
    buttonLink: ""
  }))
};

const sidebarNav = document.getElementById("sidebarNav");
const contentArea = document.getElementById("contentArea");
const progressBarFill = document.getElementById("progressBarFill");
const progressPercent = document.getElementById("progressPercent");
const completedCount = document.getElementById("completedCount");
const sidebarHomeBtn = document.getElementById("sidebarHomeBtn");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

function saveState() {
  localStorage.setItem(STORAGE_KEYS.currentView, state.currentView);
  localStorage.setItem(STORAGE_KEYS.completed, JSON.stringify(state.completed));
  localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(state.notes));
  localStorage.setItem(STORAGE_KEYS.checklists, JSON.stringify(state.checklists));
  localStorage.setItem(STORAGE_KEYS.faqAnswers, JSON.stringify(state.faqAnswers));
  localStorage.setItem(STORAGE_KEYS.support, JSON.stringify(state.support));
}

function getProgress() {
  return Math.round((state.completed.length / APP_CONTENT.modules.length) * 100);
}

function isCompleted(moduleId) {
  return state.completed.includes(moduleId);
}

function toggleCompleted(moduleId) {
  if (isCompleted(moduleId)) {
    state.completed = state.completed.filter(id => id !== moduleId);
  } else {
    state.completed.push(moduleId);
  }

  saveState();
  renderSidebar();
  renderCurrentView();
}

function goToHome() {
  state.currentView = "home";
  saveState();
  renderSidebar();
  renderCurrentView();
  closeSidebarOnMobile();
}

function goToModule(moduleId) {
  state.currentView = String(moduleId);
  saveState();
  renderSidebar();
  renderCurrentView();
  closeSidebarOnMobile();
}

function renderSidebar() {
  const progress = getProgress();
  progressBarFill.style.width = `${progress}%`;
  progressPercent.textContent = `${progress}%`;
  completedCount.textContent = state.completed.length;

  const moduleItems = APP_CONTENT.modules.map(module => {
    const active = state.currentView === String(module.id);
    const completed = isCompleted(module.id);

    return `
      <button
        type="button"
        class="nav-item ${active ? "active" : ""} ${completed ? "completed" : ""}"
        data-module-id="${module.id}"
      >
        <div class="nav-index">${completed ? "✓" : module.number}</div>
        <div class="nav-label">
          <span class="nav-title">${module.title}</span>
          <span class="nav-status">${completed ? "Completado" : "Pendiente"}</span>
        </div>
      </button>
    `;
  }).join("");

  sidebarNav.innerHTML = moduleItems;

  document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", () => {
      goToModule(button.dataset.moduleId);
    });
  });
}

function renderCurrentView() {
  const allDone = state.completed.length === APP_CONTENT.modules.length;

  if (state.currentView === "home") {
    renderWelcome(allDone);
    return;
  }

  const module = APP_CONTENT.modules.find(item => String(item.id) === state.currentView);
  if (!module) {
    goToHome();
    return;
  }

  if (module.id === 6) {
    renderSupportModule(module, allDone);
    return;
  }

  renderModule(module, allDone);
}

function renderWelcome(allDone) {
  const welcome = APP_CONTENT.welcome;

  contentArea.innerHTML = `
    <section class="welcome-card">
      <div class="welcome-hero">
        <div class="welcome-content">
          <p class="card-kicker">Plataforma de formación interna</p>
          <h3>${welcome.title}</h3>
          <p><strong>${welcome.subtitle}</strong></p>
          ${welcome.description.map(text => `<p>${text}</p>`).join("")}

          <div class="welcome-actions">
            <button class="primary-btn" id="startTrainingBtn" type="button">COMENZAR FORMACIÓN</button>
            <button class="secondary-btn" id="goSupportBtn" type="button">IR A DUDAS Y SOPORTE</button>
          </div>
        </div>

        <div class="welcome-visual">
          <div class="device-card">
            <span class="snow-deco snow-1">✦</span>
            <span class="snow-deco snow-2">❄</span>
            <span class="snow-deco snow-3">✦</span>
            <div class="device-illustration">💳</div>
          </div>

          <div class="info-card">
            <h4>Resumen de la formación</h4>
            <div class="info-list">
              ${welcome.stats.map(item => `<div class="info-pill">${item}</div>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </section>

    ${allDone ? `
      <section class="final-card" style="margin-top:20px;">
        <p class="card-kicker">Formación finalizada</p>
        <h3>¡FORMACIÓN COMPLETADA!</h3>
        <p>Ya conoces los principales procedimientos de REVO para la campaña Magic Snow.</p>
        <p><strong>¡Gracias por formar parte del equipo!</strong></p>
      </section>
    ` : ""}
  `;

  document.getElementById("startTrainingBtn").addEventListener("click", () => goToModule(1));
  document.getElementById("goSupportBtn").addEventListener("click", () => goToModule(6));
}

function renderModule(module, allDone) {
  const noteValue = state.notes[module.id] || "";
  const checklistBlock = module.checklistTitle ? renderChecklist(module) : "";
  const prevId = module.id > 1 ? module.id - 1 : null;
  const nextId = module.id < 6 ? module.id + 1 : null;
  const completed = isCompleted(module.id);

  contentArea.innerHTML = `
    <section class="module-layout">
      <div class="module-header">
        <div class="module-title-wrap">
          <p class="module-number">MÓDULO ${module.number}</p>
          <h3>${module.title}</h3>
          <p class="module-description">${module.description}</p>
        </div>

        <div class="tag-row">
          <span class="tag">${completed ? "✓ Completado" : "Pendiente"}</span>
          ${module.videoId ? `<span class="tag">Vídeo tutorial integrado</span>` : ""}
        </div>
      </div>

      ${module.videoId ? `
        <section class="panel">
          <h4>Vídeo tutorial</h4>
          <div class="video-frame-wrap">
            <iframe
              src="https://www.youtube.com/embed/${module.videoId}"
              title="${module.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </section>
      ` : ""}

      <section class="panel">
        <h4>${module.editableTitle}</h4>
        <textarea
          class="editable-textarea"
          id="moduleNote"
          placeholder="${module.editablePlaceholder}"
        >${escapeHtml(noteValue)}</textarea>
      </section>

      <section class="panel important-box">
        <h4>${module.importantTitle}</h4>
        <p>${module.importantText}</p>
      </section>

      ${checklistBlock}

      <section class="panel">
        <div class="actions-row">
          <button type="button" class="complete-btn ${completed ? "completed" : ""}" id="completeModuleBtn">
            ${completed ? "Módulo completado ✓" : "Marcar como completado"}
          </button>
        </div>
      </section>

      <section class="panel">
        <div class="nav-buttons">
          <button type="button" class="secondary-btn" id="backHomeBtn">Volver al inicio</button>
          ${prevId ? `<button type="button" class="secondary-btn" id="prevModuleBtn">Módulo anterior</button>` : ""}
          ${nextId ? `<button type="button" class="primary-btn" id="nextModuleBtn">Siguiente módulo</button>` : ""}
        </div>
      </section>

      ${allDone ? `
        <section class="final-card">
          <p class="card-kicker">Formación finalizada</p>
          <h3>¡FORMACIÓN COMPLETADA!</h3>
          <p>Ya conoces los principales procedimientos de REVO para la campaña Magic Snow.</p>
          <p><strong>¡Gracias por formar parte del equipo!</strong></p>
        </section>
      ` : ""}
    </section>
  `;

  document.getElementById("moduleNote").addEventListener("input", (event) => {
    state.notes[module.id] = event.target.value;
    saveState();
  });

  const completeBtn = document.getElementById("completeModuleBtn");
  completeBtn.addEventListener("click", () => toggleCompleted(module.id));

  document.getElementById("backHomeBtn").addEventListener("click", goToHome);

  if (prevId) {
    document.getElementById("prevModuleBtn").addEventListener("click", () => goToModule(prevId));
  }

  if (nextId) {
    document.getElementById("nextModuleBtn").addEventListener("click", () => goToModule(nextId));
  }

  attachChecklistEvents(module);
}

function renderChecklist(module) {
  const stateForModule = state.checklists[module.id] || {};

  return `
    <section class="panel">
      <h4>${module.checklistTitle}</h4>
      <div class="checklist">
        ${module.checklistItems.map((item, index) => `
          <label class="checklist-item">
            <input
              type="checkbox"
              data-check-module="${module.id}"
              data-check-index="${index}"
              ${stateForModule[index] ? "checked" : ""}
            />
            <span>${item}</span>
          </label>
        `).join("")}
      </div>
    </section>
  `;
}

function attachChecklistEvents(module) {
  document.querySelectorAll(`[data-check-module="${module.id}"]`).forEach(input => {
    input.addEventListener("change", (event) => {
      const index = event.target.dataset.checkIndex;

      if (!state.checklists[module.id]) {
        state.checklists[module.id] = {};
      }

      state.checklists[module.id][index] = event.target.checked;
      saveState();
    });
  });
}

function renderSupportModule(module, allDone) {
  const prevId = 5;
  const completed = isCompleted(module.id);

  contentArea.innerHTML = `
    <section class="module-layout">
      <div class="module-header">
        <div class="module-title-wrap">
          <p class="module-number">MÓDULO ${module.number}</p>
          <h3>${module.title}</h3>
          <p class="module-description">${module.description}</p>
        </div>

        <div class="tag-row">
          <span class="tag">${completed ? "✓ Completado" : "Pendiente"}</span>
          <span class="tag">Centro de ayuda</span>
        </div>
      </div>

      <section class="panel">
        <h4>PREGUNTAS FRECUENTES</h4>
        <div class="faq-list">
          ${module.faq.map((question, index) => `
            <div class="faq-item">
              <button type="button" class="faq-question" data-faq-button="${index}">
                <span>${question}</span>
                <span>+</span>
              </button>
              <div class="faq-answer" id="faq-answer-${index}">
                <textarea
                  class="editable-textarea"
                  data-faq-answer="${index}"
                  placeholder="Escribe aquí la respuesta o indicación correspondiente."
                >${escapeHtml(state.faqAnswers[index] || "")}</textarea>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="support-grid">
        <div class="support-card">
          <div class="support-icon">?</div>
          <h4>¿NECESITAS AYUDA?</h4>
          <p>¿Tienes alguna incidencia o necesitas ayuda?</p>

          <label>
            <strong>Correo electrónico de soporte</strong>
            <input
              type="text"
              class="support-input"
              id="supportEmail"
              placeholder="Añade aquí el correo de soporte"
              value="${escapeAttribute(state.support.email || "")}"
            />
          </label>

          <br /><br />

          <label>
            <strong>Contacto o canal interno de incidencias</strong>
            <textarea
              class="support-textarea"
              id="supportChannel"
              placeholder="Añade aquí el canal interno o la referencia de contacto"
            >${escapeHtml(state.support.channel || "")}</textarea>
          </label>
        </div>

        <div class="support-card">
          <h4>Botón de contacto configurable</h4>

          <label>
            <strong>Texto del botón</strong>
            <input
              type="text"
              class="support-input"
              id="supportButtonLabel"
              placeholder="Ej. Contactar soporte"
              value="${escapeAttribute(state.support.buttonLabel || "")}"
            />
          </label>

          <br /><br />

          <label>
            <strong>Enlace o correo del botón</strong>
            <input
              type="text"
              class="support-input"
              id="supportButtonLink"
              placeholder="Ej. mailto:soporte@dominio.com"
              value="${escapeAttribute(state.support.buttonLink || "")}"
            />
          </label>

          <br /><br />

          <a
            href="${state.support.buttonLink ? escapeAttribute(state.support.buttonLink) : "#"}"
            class="contact-btn"
            id="dynamicContactBtn"
            ${state.support.buttonLink ? "" : 'onclick="return false;"'}
            style="display:inline-block; text-decoration:none;"
          >
            ${state.support.buttonLabel || "Contactar soporte"}
          </a>
        </div>
      </section>

      <section class="panel">
        <div class="actions-row">
          <button type="button" class="complete-btn ${completed ? "completed" : ""}" id="completeSupportBtn">
            ${completed ? "Módulo completado ✓" : "Marcar como completado"}
          </button>
        </div>
      </section>

      <section class="panel">
        <div class="nav-buttons">
          <button type="button" class="secondary-btn" id="backHomeBtn">Volver al inicio</button>
          <button type="button" class="secondary-btn" id="prevModuleBtn">Módulo anterior</button>
        </div>
      </section>

      ${allDone ? `
        <section class="final-card">
          <p class="card-kicker">Formación finalizada</p>
          <h3>¡FORMACIÓN COMPLETADA!</h3>
          <p>Ya conoces los principales procedimientos de REVO para la campaña Magic Snow.</p>
          <p><strong>¡Gracias por formar parte del equipo!</strong></p>
        </section>
      ` : ""}
    </section>
  `;

  document.getElementById("backHomeBtn").addEventListener("click", goToHome);
  document.getElementById("prevModuleBtn").addEventListener("click", () => goToModule(prevId));
  document.getElementById("completeSupportBtn").addEventListener("click", () => toggleCompleted(module.id));

  document.querySelectorAll("[data-faq-button]").forEach(button => {
    button.addEventListener("click", () => {
      const index = button.dataset.faqButton;
      const answer = document.getElementById(`faq-answer-${index}`);
      answer.classList.toggle("open");
    });
  });

  document.querySelectorAll("[data-faq-answer]").forEach(area => {
    area.addEventListener("input", (event) => {
      const index = event.target.dataset.faqAnswer;
      state.faqAnswers[index] = event.target.value;
      saveState();
    });
  });

  document.getElementById("supportEmail").addEventListener("input", (event) => {
    state.support.email = event.target.value;
    saveState();
  });

  document.getElementById("supportChannel").addEventListener("input", (event) => {
    state.support.channel = event.target.value;
    saveState();
  });

  document.getElementById("supportButtonLabel").addEventListener("input", (event) => {
    state.support.buttonLabel = event.target.value;
    saveState();
    renderCurrentView();
  });

  document.getElementById("supportButtonLink").addEventListener("input", (event) => {
    state.support.buttonLink = event.target.value;
    saveState();
    renderCurrentView();
  });
}

function closeSidebarOnMobile() {
  if (window.innerWidth <= 1100) {
    sidebar.classList.remove("open");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

sidebarHomeBtn.addEventListener("click", goToHome);

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

renderSidebar();
renderCurrentView();

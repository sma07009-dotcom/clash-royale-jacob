(function () {
  const lessonKey = "cr-guide-completed-lessons";
  const rules = { "decks.html": 2, "synergies.html": 4, "progress.html": 6, "coaching.html": 8 };

  function getCompleted() {
    try {
      const value = JSON.parse(localStorage.getItem(lessonKey) || "[]");
      return Array.isArray(value) ? value.filter((item) => Number.isInteger(item)) : [];
    } catch {
      return [];
    }
  }

  function update() {
    const completed = getCompleted();
    const page = location.pathname.split("/").pop();
    const requiredForPage = rules[page];

    if (requiredForPage && completed.length < requiredForPage) {
      document.body.innerHTML = `<main class="site-main"><div class="locked-page"><div class="lock-icon">🔒</div><p class="eyebrow">Keep learning</p><h2>Unlock this feature</h2><p>Complete ${requiredForPage} lessons on the learning road to open this page.</p><a class="lesson-button" href="./index.html">View the learning road</a><div class="lock-progress"><span style="width:${Math.min(100, (completed.length / requiredForPage) * 100)}%"></span></div><small>${completed.length} of ${requiredForPage} lessons complete</small></div></main>`;
      return;
    }

    if (page === "decks.html") {
      document.getElementById("locked-decks")?.setAttribute("hidden", "true");
      document.getElementById("deck-content")?.removeAttribute("hidden");
    }

    document.querySelectorAll(".site-nav a").forEach((link) => {
      const file = (link.getAttribute("href") || "").split("/").pop();
      const required = Number(link.dataset.required || rules[file] || 0);
      const oldLock = link.querySelector(".nav-lock");
      if (!oldLock && link.textContent?.includes("🔒")) {
        link.textContent = link.textContent.replace(/\s*🔒\s*$/, "");
      }

      if (required && completed.length < required) {
        link.classList.add("is-locked");
        link.setAttribute("aria-disabled", "true");
        if (!link.querySelector(".nav-lock")) {
          const lock = document.createElement("span");
          lock.className = "nav-lock";
          lock.setAttribute("aria-hidden", "true");
          lock.textContent = "🔒";
          link.appendChild(lock);
        }
      } else {
        link.classList.remove("is-locked");
        link.removeAttribute("aria-disabled");
        link.querySelector(".nav-lock")?.remove();
      }
    });

    const count = document.getElementById("lesson-count");
    if (count) count.innerHTML = `${completed.length}/10 <span>lessons</span>`;
    const fill = document.getElementById("road-fill");
    if (fill) fill.style.height = `${(completed.length / 10) * 100}%`;

    document.querySelectorAll("[data-lesson]").forEach((lesson) => {
      const number = Number(lesson.dataset.lesson);
      const complete = completed.includes(number);
      const available = number === 1 || completed.includes(number - 1);
      lesson.classList.toggle("done", complete);
      lesson.classList.toggle("available", available);
      lesson.classList.toggle("locked", !available);
      const dot = lesson.querySelector(".node-dot");
      if (dot) dot.textContent = complete ? "✓" : available ? String(number) : "🔒";
    });
  }

  window.addEventListener("storage", update);
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.id === "complete-1") {
      const completed = getCompleted();
      if (!completed.includes(1)) completed.push(1);
      localStorage.setItem(lessonKey, JSON.stringify(completed.sort((a, b) => a - b)));
      update();
      return;
    }

    const link = target.closest(".site-nav a.is-locked");
    if (!link) return;
    event.preventDefault();
    const file = (link.getAttribute("href") || "").split("/").pop();
    const required = Number(link.dataset.required || rules[file] || 0);
    window.alert(`Complete ${required} lessons on the learning road to unlock this feature.`);
  });

  update();
})();

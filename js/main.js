/* ============================================================
   Dra. Julianne Alves — interações da página
   ============================================================ */
(function () {
  "use strict";

  /* ---- Ano atual no rodapé ---- */
  var anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // fecha o menu ao clicar em um link
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Formulário de contato (Web3Forms via fetch) ---- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }
      setStatus("", "");

      var data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json.success) {
            setStatus("Mensagem enviada com sucesso! Em breve entrarei em contato.", "ok");
            form.reset();
          } else {
            setStatus("Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.", "err");
          }
        })
        .catch(function () {
          setStatus("Erro de conexão. Tente novamente ou fale pelo WhatsApp.", "err");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  }

  function setStatus(msg, type) {
    if (!status) return;
    status.textContent = msg;
    status.className = "form-status" + (type ? " " + type : "");
  }

  /* ---- Carrossel (imagem + texto) ---- */
  var carousel = document.querySelector("[data-carousel]");
  if (carousel) initCarousel(carousel);

  function initCarousel(root) {
    var track = root.querySelector("[data-track]");
    var slides = Array.prototype.slice.call(track.children);
    var prevBtn = root.querySelector("[data-prev]");
    var nextBtn = root.querySelector("[data-next]");
    var dotsWrap = root.querySelector("[data-dots]");
    var total = slides.length;
    var index = 0;
    var timer = null;
    if (total <= 1) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ativa o JS: torna todos os slides visíveis (sem JS, só o 1º aparece)
    slides.forEach(function (s) { s.removeAttribute("hidden"); });

    // Cria os indicadores (dots)
    var dots = slides.map(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Ir para o slide " + (i + 1));
      b.addEventListener("click", function () { go(i, true); });
      dotsWrap.appendChild(b);
      return b;
    });

    function update() {
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      slides.forEach(function (s, i) { s.setAttribute("aria-hidden", String(i !== index)); });
      dots.forEach(function (d, i) { d.setAttribute("aria-selected", String(i === index)); });
    }
    function go(i, fromUser) {
      index = (i + total) % total;
      update();
      if (fromUser) restart();
    }

    nextBtn.addEventListener("click", function () { go(index + 1, true); });
    prevBtn.addEventListener("click", function () { go(index - 1, true); });

    // Navegação por teclado (setas) quando o carrossel está em foco
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1, true); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1, true); }
    });

    // Swipe em telas de toque
    var x0 = null;
    track.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1), true); }
      x0 = null;
    }, { passive: true });

    // Autoplay (pausa em hover/foco/aba oculta; desligado se reduzir movimento)
    function start() { if (!reduceMotion && !timer) timer = window.setInterval(function () { go(index + 1); }, 6000); }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });

    update();
    start();
  }

  /* ============================================================
     Premium — header dinâmico, progresso, revelação e scrollspy
     ============================================================ */
  var prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header condensado + barra de progresso de leitura ---- */
  var header = document.querySelector(".site-header");
  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset || 0;
      if (header) header.classList.toggle("scrolled", y > 12);
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ---- Revelação no scroll (respeita prefers-reduced-motion) ---- */
  if (!prefersReduce && "IntersectionObserver" in window) {
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(
      ".section-head, .card, .feature, .areas li, .col-media, .col-text, .col-form," +
      " .pull-quote, .mission-inner, .faq details, .carousel"
    ));
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      if (el.matches(".card, .feature, .areas li, .faq details")) {
        var i = 0, n = el;
        while ((n = n.previousElementSibling)) i++;
        el.style.transitionDelay = ((i % 6) * 0.08).toFixed(2) + "s";
      }
    });
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    // Segurança: revela de imediato o que já está visível (deep-links, acima da dobra),
    // para nunca prender conteúdo em opacity:0 caso o observer demore a disparar.
    function revealVisible() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      revealEls.forEach(function (el) {
        if (el.classList.contains("reveal-in")) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) {
          el.style.transitionDelay = "0s";
          el.classList.add("reveal-in");
          revealIO.unobserve(el);
        }
      });
    }
    revealEls.forEach(function (el) { revealIO.observe(el); });
    revealVisible();
    window.addEventListener("load", revealVisible);
  }

  /* ---- Scrollspy — destaca o link da seção visível ---- */
  if ("IntersectionObserver" in window) {
    var navById = {};
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-menu a[href^="#"]'));
    navLinks.forEach(function (a) { navById[a.getAttribute("href").slice(1)] = a; });
    var spied = navLinks
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);
    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove("active"); });
        var link = navById[entry.target.id];
        if (link) link.classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    spied.forEach(function (s) { spyIO.observe(s); });
  }
})();

// Frase digitada e apagada no topo (inspirada em centerformodernrelationships.com)
(function () {
  const el = document.querySelector('.typed__text');
  if (!el) return;

  const phrases = [
    'como sua mente funciona.',
    'a ansiedade que não desliga.',
    'sua atenção e sua memória.',
    'por que você age como age.',
    'o que você pensa e sente.'
  ];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const TYPE = 70, ERASE = 35, HOLD = 2200, GAP = 400;
  let p = 0, i = phrases[0].length, erasing = true;

  function tick() {
    const phrase = phrases[p];
    if (erasing) {
      i--;
      el.textContent = phrase.slice(0, i);
      if (i === 0) {
        erasing = false;
        p = (p + 1) % phrases.length;
        return setTimeout(tick, GAP);
      }
      return setTimeout(tick, ERASE);
    }
    i++;
    el.textContent = phrases[p].slice(0, i);
    if (i === phrases[p].length) {
      erasing = true;
      return setTimeout(tick, HOLD);
    }
    setTimeout(tick, TYPE + Math.random() * 50);
  }

  setTimeout(tick, HOLD);
})();

// "Como eu trabalho": destaca o passo que está no meio da tela
(function () {
  const steps = [...document.querySelectorAll(".step")];
  if (!steps.length) return;

  const frames = [...document.querySelectorAll(".process__frame")];

  function activate(i) {
    steps.forEach((s, k) => s.classList.toggle("is-active", k === i));
    frames.forEach((f) => f.classList.toggle("is-active", +f.dataset.step === i));
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) activate(steps.indexOf(e.target));
    });
  }, { rootMargin: "-45% 0px -45% 0px" });

  steps.forEach((s) => io.observe(s));
  activate(0);
})();

// Menu do celular
(function () {
  const header = document.querySelector('.site-header');
  const btn = document.querySelector('.menu-toggle');
  if (!header || !btn) return;
  const close = () => { header.classList.remove('menu-open'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Abrir menu'); };
  btn.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  header.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', close));
})();

(() => {
  const root = document.querySelector('.experience');
  const scenes = [...document.querySelectorAll('.scene')];
  const dots = [...document.querySelectorAll('.dot')];
  const back = document.querySelector('.back');
  const next = document.querySelector('.next');
  const enter = document.querySelector('.enter');
  const envelope = document.querySelector('.envelope-trigger');
  const envelopeBurst = document.querySelector('.envelope-opening-fx');
  const petalsHost = document.querySelector('.petals');
  let current = 0;
  let busy = false;
  let envelopeOpening = false;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function go(index, start = true) {
    index = Math.max(0, Math.min(scenes.length - 1, index));
    if (busy || envelopeOpening || index === current) return;
    busy = true;
    if (start) root.classList.add('started');
    scenes[current].classList.remove('scene--active');
    current = index;
    scenes[current].classList.add('scene--active');
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-current', i === current);
      if (i === current) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    back.disabled = current === 0;
    next.disabled = current === scenes.length - 1;
    next.setAttribute('aria-label', current === scenes.length - 1 ? 'Experience complete' : 'Continue');
    window.setTimeout(() => { busy = false; }, reducedMotion ? 30 : 1050);
  }

  function createEnvelopeBurst() {
    envelopeBurst.replaceChildren();
    const core = document.createElement('span');
    core.className = 'envelope-burst-core';
    envelopeBurst.append(core);

    const flowers = ['rose','rose','rose','rose','blossom','blossom','blossom','blossom','white','white','white','white','petal','petal','petal','petal'];
    const flowerCount = reducedMotion ? 12 : 32;
    const shortSide = Math.min(window.innerWidth, window.innerHeight);
    const flowerBase = Math.max(13, Math.min(35, shortSide * .044));
    for (let i = 0; i < flowerCount; i++) {
      const type = flowers[i % flowers.length];
      const angle = (i / flowerCount) * Math.PI * 2 + (Math.random() - .5) * .19;
      const distance = shortSide * (reducedMotion ? .12 + Math.random() * .13 : .16 + Math.random() * .32);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const particle = document.createElement('span');
      particle.className = `burst-particle burst-flower burst-flower--${type}`;
      const flowerSize = Math.min(44, flowerBase * (.72 + Math.random() * .56));
      particle.style.setProperty('--size', `${flowerSize}px`);
      if (type === 'petal') particle.style.setProperty('--width', `${flowerSize * .72}px`);
      particle.style.setProperty('--bloom', `${.82 + Math.random() * .38}`);
      particle.style.setProperty('--scale', `${.78 + Math.random() * .42}`);
      particle.style.setProperty('--end-scale', `${.34 + Math.random() * .3}`);
      particle.style.setProperty('--x1', `${dx * .3}px`);
      particle.style.setProperty('--y1', `${dy * .3}px`);
      particle.style.setProperty('--x2', `${dx * .76}px`);
      particle.style.setProperty('--y2', `${dy * .76}px`);
      particle.style.setProperty('--x3', `${dx * (1.05 + Math.random() * .12)}px`);
      particle.style.setProperty('--y3', `${dy * (1.05 + Math.random() * .12)}px`);
      particle.style.setProperty('--turn1', `${Math.round(Math.random() * 100 - 50)}deg`);
      particle.style.setProperty('--turn2', `${Math.round(Math.random() * 260 - 130)}deg`);
      particle.style.setProperty('--turn3', `${Math.round(Math.random() * 440 - 220)}deg`);
      particle.style.setProperty('--delay', `${reducedMotion ? i * 1.5 : Math.round(Math.random() * 145 + i * 2)}ms`);
      particle.style.setProperty('--duration', `${reducedMotion ? 280 + Math.round(Math.random() * 70) : 1080 + Math.round(Math.random() * 430)}ms`);

      if (type === 'rose') {
        particle.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><g stroke="#ffd7e4" stroke-width=".7"><ellipse cx="20" cy="10.5" rx="6.7" ry="9" fill="#e879a6"/><ellipse cx="20" cy="10.5" rx="6.7" ry="9" fill="#f29abc" transform="rotate(60 20 20)"/><ellipse cx="20" cy="10.5" rx="6.7" ry="9" fill="#df6f9b" transform="rotate(120 20 20)"/><ellipse cx="20" cy="10.5" rx="6.7" ry="9" fill="#f29abc" transform="rotate(180 20 20)"/><ellipse cx="20" cy="10.5" rx="6.7" ry="9" fill="#e879a6" transform="rotate(240 20 20)"/><ellipse cx="20" cy="10.5" rx="6.7" ry="9" fill="#f29abc" transform="rotate(300 20 20)"/></g><circle cx="20" cy="20" r="5.1" fill="#ffe5a1"/><circle cx="20" cy="20" r="2.5" fill="#d87993"/></svg>';
      } else if (type === 'blossom') {
        particle.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><g fill="#ffb8d0" stroke="#ffe3ed" stroke-width=".65"><path d="M20 20C12 17 12 8 20 3c8 5 8 14 0 17Z"/><path d="M20 20C12 17 12 8 20 3c8 5 8 14 0 17Z" transform="rotate(72 20 20)"/><path d="M20 20C12 17 12 8 20 3c8 5 8 14 0 17Z" transform="rotate(144 20 20)"/><path d="M20 20C12 17 12 8 20 3c8 5 8 14 0 17Z" transform="rotate(216 20 20)"/><path d="M20 20C12 17 12 8 20 3c8 5 8 14 0 17Z" transform="rotate(288 20 20)"/></g><circle cx="20" cy="20" r="4" fill="#ffe7a7"/><circle cx="20" cy="20" r="1.4" fill="#dc9b75"/></svg>';
      } else if (type === 'white') {
        particle.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><g fill="#fff7ea" stroke="#f4d7dc" stroke-width=".7"><ellipse cx="20" cy="10" rx="4.3" ry="8"/><ellipse cx="20" cy="10" rx="4.3" ry="8" transform="rotate(60 20 20)"/><ellipse cx="20" cy="10" rx="4.3" ry="8" transform="rotate(120 20 20)"/><ellipse cx="20" cy="10" rx="4.3" ry="8" transform="rotate(180 20 20)"/><ellipse cx="20" cy="10" rx="4.3" ry="8" transform="rotate(240 20 20)"/><ellipse cx="20" cy="10" rx="4.3" ry="8" transform="rotate(300 20 20)"/></g><circle cx="20" cy="20" r="4.3" fill="#f6d47f"/></svg>';
      } else {
        particle.innerHTML = '<svg viewBox="0 0 24 36" aria-hidden="true"><path d="M12 34C8 27 1 17 4 8 6 2 12 1 12 1s6 1 8 7c3 9-4 19-8 26Z" fill="#f5a9c3" stroke="#ffdfeb" stroke-width="1"/><path d="M12 31 12 8" fill="none" stroke="#ffe6ed" stroke-width="1" opacity=".8"/></svg>';
      }
      envelopeBurst.append(particle);
    }

    const sparkCount = reducedMotion ? 4 : 10;
    for (let i = 0; i < sparkCount; i++) {
      const angle = (i / sparkCount) * Math.PI * 2 + .17;
      const distance = shortSide * (.12 + Math.random() * .34);
      const particle = document.createElement('span');
      particle.className = 'burst-particle burst-spark';
      particle.style.setProperty('--size', `${6 + Math.random() * 8}px`);
      particle.style.setProperty('--bloom', '1');
      particle.style.setProperty('--scale', '.75');
      particle.style.setProperty('--end-scale', '.2');
      particle.style.setProperty('--x1', `${Math.cos(angle) * distance * .4}px`);
      particle.style.setProperty('--y1', `${Math.sin(angle) * distance * .4}px`);
      particle.style.setProperty('--x2', `${Math.cos(angle) * distance * .85}px`);
      particle.style.setProperty('--y2', `${Math.sin(angle) * distance * .85}px`);
      particle.style.setProperty('--x3', `${Math.cos(angle) * distance * 1.08}px`);
      particle.style.setProperty('--y3', `${Math.sin(angle) * distance * 1.08}px`);
      particle.style.setProperty('--turn1', '45deg');
      particle.style.setProperty('--turn2', `${Math.round(Math.random() * 140 - 70)}deg`);
      particle.style.setProperty('--turn3', `${Math.round(Math.random() * 240 - 120)}deg`);
      particle.style.setProperty('--delay', `${reducedMotion ? i * 2 : Math.round(45 + Math.random() * 180)}ms`);
      particle.style.setProperty('--duration', `${reducedMotion ? 260 : 720 + Math.round(Math.random() * 620)}ms`);
      particle.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0 12.1 7.9 20 10l-7.9 2.1L10 20l-2.1-7.9L0 10l7.9-2.1Z" fill="#ffe9a8"/></svg>';
      envelopeBurst.append(particle);
    }
  }

  enter.addEventListener('click', () => go(1));
  envelope.addEventListener('click', () => {
    if (current !== 4 || busy || envelopeOpening) return;
    envelopeOpening = true;
    envelope.disabled = true;
    createEnvelopeBurst();
    envelope.classList.add('is-opening');
    window.setTimeout(() => {
      envelopeOpening = false;
      go(5);
      window.setTimeout(() => {
        envelope.classList.remove('is-opening');
        envelope.disabled = false;
        envelopeBurst.replaceChildren();
      }, reducedMotion ? 50 : 1100);
    }, reducedMotion ? 190 : 860);
  });
  next.addEventListener('click', () => go(current + 1));
  back.addEventListener('click', () => go(current - 1));
  dots.forEach(dot => dot.addEventListener('click', () => go(Number(dot.dataset.go))));
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') go(current + 1);
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') go(current - 1);
  });

  if (!reducedMotion) {
    for (let i = 0; i < 13; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.style.setProperty('--x', `${Math.random() * 100}%`);
      petal.style.setProperty('--size', `${7 + Math.random() * 7}px`);
      petal.style.setProperty('--duration', `${11 + Math.random() * 13}s`);
      petal.style.setProperty('--delay', `${-Math.random() * 22}s`);
      petal.style.setProperty('--sway', `${Math.round(Math.random() * 130 - 65)}px`);
      petalsHost.append(petal);
    }
  }
})();

(() => {
  const scene = document.querySelector('.scene[data-scene="1"]');
  const experience = document.querySelector('.experience');
  const card = document.querySelector('.garden-quote');
  const flowerMark = card.querySelector('.garden-quote__flower');
  const quoteCopy = card.querySelector('.garden-quote__copy');
  const flowers = [...scene.querySelectorAll('.garden-flower')];
  const controls = document.querySelector('.controls');
  const quotes = {
    rose: {
      mark: '🌹',
      lines: [
        'You have a way of making the world softer,',
        'without even knowing how much it needs you.'
      ]
    },
    lily: {
      mark: '🤍',
      lines: [
        "There's a quiet elegance in the way you are,",
        'a little magic in everything you do.'
      ]
    },
    tulip: {
      mark: '🌷',
      lines: [
        "Even on days when you don't feel strong,",
        'there\'s a beautiful strength in the way you keep going.'
      ]
    }
  };
  let selectedFlower = null;
  let placeFrame = 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), Math.max(min, max));
  }

  function positionCard(flower) {
    const artboard = scene.querySelector('.garden-artboard').getBoundingClientRect();
    const flowerRect = flower.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mobile = matchMedia('(max-width:700px)').matches;
    const cardWidth = cardRect.width;
    let top;

    if (mobile) {
      const controlsTop = controls.getBoundingClientRect().top;
      const below = artboard.bottom + 12;
      const above = artboard.top - cardRect.height - 12;
      if (below + cardRect.height <= controlsTop - 10) top = below;
      else if (above >= 10) top = above;
      else top = clamp(flowerRect.top - cardRect.height - 14, 10, height - cardRect.height - 10);
    } else {
      top = flowerRect.top - cardRect.height - 16;
      if (top < 12) top = flowerRect.bottom + 14;
      top = clamp(top, 12, height - cardRect.height - 12);
    }

    const center = flowerRect.left + flowerRect.width / 2;
    let left;
    if (mobile) left = clamp(center - cardWidth / 2, 12, width - cardWidth - 12);
    else {
      const leftEdge = 12;
      const rightEdge = width - cardWidth - 12;
      left = Math.abs(center - (leftEdge + cardWidth / 2)) <= Math.abs(center - (rightEdge + cardWidth / 2)) ? leftEdge : rightEdge;
    }
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
  }

  function dismissQuote() {
    if (!selectedFlower) return;
    selectedFlower.classList.remove('is-selected');
    selectedFlower.setAttribute('aria-pressed', 'false');
    selectedFlower = null;
    card.classList.remove('is-visible');
    window.setTimeout(() => {
      if (!selectedFlower) card.hidden = true;
    }, 460);
  }

  function showQuote(flower) {
    if (selectedFlower === flower) {
      dismissQuote();
      return;
    }

    selectedFlower?.classList.remove('is-selected');
    selectedFlower?.setAttribute('aria-pressed', 'false');
    selectedFlower = flower;
    flower.classList.add('is-selected');
    flower.setAttribute('aria-pressed', 'true');

    const quote = quotes[flower.dataset.flower];
    flowerMark.textContent = quote.mark;
    quoteCopy.replaceChildren(...quote.lines.map(line => {
      const span = document.createElement('span');
      span.textContent = line;
      return span;
    }));
    card.hidden = false;
    card.classList.remove('is-visible');
    positionCard(flower);
    void card.offsetWidth;
    card.classList.add('is-visible');
  }

  flowers.forEach(flower => flower.addEventListener('click', () => showQuote(flower)));

  document.addEventListener('click', event => {
    if (!selectedFlower || card.contains(event.target) || event.target.closest('.garden-flower')) return;
    dismissQuote();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') dismissQuote();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'PageUp' || event.key === 'PageDown') dismissQuote();
  });

  window.addEventListener('resize', () => {
    if (!selectedFlower) return;
    cancelAnimationFrame(placeFrame);
    placeFrame = requestAnimationFrame(() => positionCard(selectedFlower));
  });
})();

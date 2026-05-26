/**
 * Raptor Dev Portfolio Runtime
 * Production-minded JavaScript: one animation loop, passive listeners,
 * lazy observers, reduced-motion support, and isolated feature modules.
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initLoader();
  initNavbar();
  initMobileMenu();
  initClipboardUtility();
  initDiscordInteractions();

  if (!prefersReducedMotion) {
    initCursorDepthSystem();
    initAntigravityPhysicsEngine();
    initMagneticButtons();
  }

  initTypingTerminal();
  initCountersAndRadialGraph();
  initScrollReveal(prefersReducedMotion);
});

/* ==========================================================================
   Premium startup loading experience
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  const percent = document.getElementById('loaderPercent');
  const bar = document.getElementById('loaderBar');
  if (!loader || !percent || !bar) return;

  let value = 0;
  const timer = window.setInterval(() => {
    value += Math.max(1, Math.round((100 - value) * 0.12));
    value = Math.min(value, 100);
    percent.textContent = `${value}%`;
    bar.style.width = `${value}%`;

    if (value >= 100) {
      window.clearInterval(timer);
      window.setTimeout(() => loader.classList.add('is-hidden'), 280);
      window.setTimeout(() => loader.remove(), 1200);
    }
  }, 34);
}

/* ==========================================================================
   Navbar branding system
   Navbar scroll behavior system
   Responsive navigation logic
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('siteHeader');
  const links = [...document.querySelectorAll('.primary-menu a[href^="#"]')];
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 16);

    const active = sections
      .filter(section => section.getBoundingClientRect().top < window.innerHeight * 0.36)
      .at(-1);

    links.forEach(link => {
      link.classList.toggle('is-active', active && link.getAttribute('href') === `#${active.id}`);
    });
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   Mobile navigation menu
   ========================================================================== */
function initMobileMenu() {
  const button = document.getElementById('menuButton');
  const menu = document.getElementById('primaryMenu');
  if (!button || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
  };

  button.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });

  menu.addEventListener('click', event => {
    if (event.target.matches('a')) closeMenu();
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

/* ==========================================================================
   Hero interaction animations
   Cursor depth system
   ========================================================================== */
function initCursorDepthSystem() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor = document.getElementById('cursorGlow');
  if (!cursor) return;

  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const smooth = { x: pointer.x, y: pointer.y };

  window.addEventListener('pointermove', event => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });

  const tick = () => {
    smooth.x += (pointer.x - smooth.x) * 0.16;
    smooth.y += (pointer.y - smooth.y) * 0.16;
    cursor.style.transform = `translate3d(${smooth.x}px, ${smooth.y}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };

  tick();
}

/* ==========================================================================
   Antigravity motion engine
   Antigravity physics engine
   Background motion controller
   Lightweight canvas nodes, labels, geometry, code fragments, and cursor forces.
   ========================================================================== */
function initAntigravityPhysicsEngine() {
  const canvas = document.getElementById('antigravityCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const palette = ['#4285f4', '#ea4335', '#fbbc04', '#34a853'];
  const labels = ['API', 'SQL', 'JVM', 'AI', 'EVENT', 'LEDGER', 'SYNC', 'CACHE', 'NODE', 'MODEL'];
  const snippets = ['await deploy()', 'Plugin.of()', 'vector.sync()', 'ledger.guard()', 'model.train()', 'event.pipe()', 'cache.warm()'];
  const symbols = ['<>', '{}', 'fn', '01', 'rx', 'dx'];
  const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, vx: 0, vy: 0, speed: 0, active: false };
  let width = 0;
  let height = 0;
  let entities = [];
  let lastFrame = performance.now();

  // Canvas rendering optimization
  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = Math.min(92, Math.max(38, Math.floor((width * height) / 22000)));
    entities = Array.from({ length: targetCount }, () => createEntity(width, height, palette, labels, snippets, symbols));
  };

  window.addEventListener('resize', resize, { passive: true });

  // Mouse velocity tracking
  window.addEventListener('pointermove', event => {
    mouse.active = true;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }, { passive: true });
  window.addEventListener('pointerleave', () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }, { passive: true });

  resize();

  const render = now => {
    // Frame performance safeguards
    const delta = Math.min(32, now - lastFrame) / 16.67;
    lastFrame = now;

    ctx.clearRect(0, 0, width, height);
    updateMouseVelocity(mouse);

    // Particle repulsion system
    for (const entity of entities) {
      updateEntity(entity, mouse, width, height, delta);
    }

    drawConnections(ctx, entities, mouse);
    for (const entity of entities) drawEntity(ctx, entity, mouse);
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

function createEntity(width, height, palette, labels, snippets, symbols) {
  const kindRoll = Math.random();
  const kind = kindRoll < .46 ? 'node' : kindRoll < .64 ? 'label' : kindRoll < .8 ? 'snippet' : kindRoll < .92 ? 'geometry' : 'symbol';
  const depth = .25 + Math.random() * 1.25;

  return {
    kind,
    x: Math.random() * width,
    y: Math.random() * height,
    originX: Math.random() * width,
    originY: Math.random() * height,
    vx: (Math.random() - .5) * .16,
    vy: (Math.random() - .5) * .16,
    baseVx: (Math.random() - .5) * .12,
    baseVy: (Math.random() - .5) * .12,
    size: kind === 'node' ? 1.8 + Math.random() * 3.4 : 8 + Math.random() * 18,
    depth,
    color: palette[Math.floor(Math.random() * palette.length)],
    text: kind === 'snippet'
      ? snippets[Math.floor(Math.random() * snippets.length)]
      : kind === 'symbol'
        ? symbols[Math.floor(Math.random() * symbols.length)]
        : labels[Math.floor(Math.random() * labels.length)],
    angle: Math.random() * Math.PI,
    spin: (Math.random() - .5) * .0035,
    orbit: Math.random() * Math.PI * 2,
    orbitSpeed: .003 + Math.random() * .006,
    orbitRadius: 10 + Math.random() * 42
  };
}

// Mouse velocity tracking
function updateMouseVelocity(mouse) {
  if (mouse.active && mouse.px !== -9999) {
    mouse.vx = mouse.x - mouse.px;
    mouse.vy = mouse.y - mouse.py;
    mouse.speed += (Math.hypot(mouse.vx, mouse.vy) - mouse.speed) * .18;
  } else {
    mouse.vx *= .88;
    mouse.vy *= .88;
    mouse.speed *= .9;
  }

  mouse.px = mouse.x;
  mouse.py = mouse.y;
}

function updateEntity(entity, mouse, width, height, delta) {
  entity.orbit += entity.orbitSpeed * delta;

  // Depth interpolation engine
  const parallaxX = mouse.active ? (mouse.x - width / 2) * .0028 * entity.depth : 0;
  const parallaxY = mouse.active ? (mouse.y - height / 2) * .0028 * entity.depth : 0;
  const orbitalX = Math.cos(entity.orbit) * entity.orbitRadius * .006;
  const orbitalY = Math.sin(entity.orbit * 1.17) * entity.orbitRadius * .006;

  if (mouse.active) {
    const dx = entity.x - mouse.x;
    const dy = entity.y - mouse.y;
    const distance = Math.hypot(dx, dy) || 1;
    const radius = 170 + entity.depth * 130;

    if (distance < radius) {
      const force = (1 - distance / radius) * entity.depth;
      const velocityBoost = Math.min(2.8, mouse.speed * .04);
      entity.vx += (dx / distance) * force * (.16 + velocityBoost) * delta;
      entity.vy += (dy / distance) * force * (.16 + velocityBoost) * delta;
      entity.vx += mouse.vx * .003 * entity.depth;
      entity.vy += mouse.vy * .003 * entity.depth;
      entity.angle += force * .025;
    }
  }

  entity.vx += (entity.baseVx + parallaxX + orbitalX - entity.vx) * .012 * delta;
  entity.vy += (entity.baseVy + parallaxY + orbitalY - entity.vy) * .012 * delta;
  entity.vx *= Math.pow(.987, delta);
  entity.vy *= Math.pow(.987, delta);
  entity.x += entity.vx * delta;
  entity.y += entity.vy * delta;
  entity.angle += entity.spin;

  if (entity.x < -90) entity.x = width + 70;
  if (entity.x > width + 90) entity.x = -70;
  if (entity.y < -90) entity.y = height + 70;
  if (entity.y > height + 90) entity.y = -70;
}

function drawEntity(ctx, entity, mouse) {
  ctx.save();
  const mouseLift = mouse.active ? Math.min(.08, mouse.speed * .002) : 0;
  ctx.globalAlpha = entity.kind === 'node' ? .2 + mouseLift : .085 + mouseLift * .7;
  ctx.translate(entity.x, entity.y);
  ctx.rotate(entity.angle);

  if (entity.kind === 'node') {
    ctx.fillStyle = entity.color;
    ctx.shadowColor = entity.color;
    ctx.shadowBlur = 10 * entity.depth;
    ctx.beginPath();
    ctx.arc(0, 0, entity.size, 0, Math.PI * 2);
    ctx.fill();
  }

  if (entity.kind === 'label') {
    ctx.font = '700 10px JetBrains Mono, monospace';
    ctx.fillStyle = entity.color;
    ctx.fillText(entity.text, 0, 0);
  }

  if (entity.kind === 'snippet') {
    ctx.font = '500 10px JetBrains Mono, monospace';
    ctx.fillStyle = '#101114';
    ctx.fillText(entity.text, 0, 0);
  }

  if (entity.kind === 'geometry') {
    ctx.strokeStyle = entity.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(-entity.size / 2, -entity.size / 2, entity.size, entity.size);
    ctx.stroke();
  }

  if (entity.kind === 'symbol') {
    ctx.font = '700 11px JetBrains Mono, monospace';
    ctx.fillStyle = entity.color;
    ctx.fillText(entity.text, 0, 0);
  }

  ctx.restore();
}

function drawConnections(ctx, entities, mouse) {
  const nodes = entities.filter(entity => entity.kind === 'node');

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distance = Math.hypot(dx, dy);

      if (distance < 140) {
        ctx.save();
        const velocityAlpha = mouse.active ? Math.min(.045, mouse.speed * .0012) : 0;
        ctx.globalAlpha = (1 - distance / 140) * (.075 + velocityAlpha);
        ctx.strokeStyle = '#101114';
        ctx.lineWidth = .8;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        // Line distortion responds subtly to pointer velocity.
        const bendX = mouse.active ? mouse.vx * .08 : 0;
        const bendY = mouse.active ? mouse.vy * .08 : 0;
        ctx.quadraticCurveTo(
          (nodes[i].x + nodes[j].x) / 2 + bendX,
          (nodes[i].y + nodes[j].y) / 2 + bendY,
          nodes[j].x,
          nodes[j].y
        );
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

/* ==========================================================================
   Magnetic button interactions
   ========================================================================== */
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.magnetic');

  magnets.forEach(element => {
    element.addEventListener('pointermove', event => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate3d(${x * .12}px, ${y * .18}px, 0)`;
    }, { passive: true });

    element.addEventListener('pointerleave', () => {
      element.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

/* ==========================================================================
   IDE animated typing effect
   ========================================================================== */
function initTypingTerminal() {
  const target = document.getElementById('typingCode');
  if (!target) return;

  const code = `systems:
  trimMasterX:
    engine: event-driven
    cache: warm
    permissions: scoped
    deploy: BharatMC

  coinflipMaster:
    ledger: guarded
    rollback: enabled
    antiExploit: strict
    settlement: atomic

raptor:
  reliabilityFocus: 99.9
  executionScore: 4.6
  mode: antigravity`;

  let index = 0;
  const type = () => {
    target.textContent = code.slice(0, index);
    index = index >= code.length ? 0 : index + 1;
    window.setTimeout(type, index === 0 ? 1300 : 22 + Math.random() * 18);
  };

  type();
}

/* ==========================================================================
   Performance analytics renderer
   Performance metrics animation engine
   Rating progress visualization
   ========================================================================== */
function initCountersAndRadialGraph() {
  const counters = document.querySelectorAll('[data-count]');
  const radial = document.querySelector('.progress[data-progress]');

  const animateNumber = element => {
    const end = Number(element.dataset.count);
    const decimals = String(element.dataset.count).includes('.') ? 1 : 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = now => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = (end * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      if (entry.target.matches('[data-count]')) {
        animateNumber(entry.target);
      }

      if (entry.target === radial) {
        const circumference = 2 * Math.PI * 88;
        const progress = Number(radial.dataset.progress) / 100;
        radial.style.strokeDasharray = `${circumference}`;
        radial.style.strokeDashoffset = `${circumference * (1 - progress)}`;
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: .45 });

  counters.forEach(counter => observer.observe(counter));
  if (radial) observer.observe(radial);
}

/* ==========================================================================
   Scroll reveal controller
   Accessibility fallback logic
   ========================================================================== */
function initScrollReveal(prefersReducedMotion) {
  const revealItems = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !window.gsap) {
    revealItems.forEach(item => {
      item.style.opacity = '1';
      item.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  revealItems.forEach(item => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 86%',
        once: true
      }
    });
  });
}

/* ==========================================================================
   Discord interaction system
   Discord modal positioning engine
   Outside click detection
   Accessibility keyboard handlers
   ========================================================================== */
function initDiscordInteractions() {
  const discordButton = document.getElementById('discordButton');
  const popover = document.getElementById('discordProfile');
  const footerButton = document.getElementById('footerDiscord');
  if (!discordButton || !popover) return;

  let pinned = false;
  let hoverIntent = false;
  let closeTimer = 0;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const positionPopover = () => {
    const buttonRect = discordButton.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const spacing = 13;
    const margin = 14;
    const width = popoverRect.width || 320;
    const height = popoverRect.height || 92;
    const centerX = buttonRect.left + buttonRect.width / 2;
    const preferredTop = buttonRect.bottom + spacing;
    const shouldPlaceAbove = preferredTop + height + margin > window.innerHeight && buttonRect.top > height + spacing;
    const left = clamp(centerX - width / 2, margin, window.innerWidth - width - margin);
    const top = shouldPlaceAbove
      ? clamp(buttonRect.top - height - spacing, margin, window.innerHeight - height - margin)
      : clamp(preferredTop, margin, window.innerHeight - height - margin);
    const arrowX = clamp(centerX - left, 24, width - 24);

    popover.style.setProperty('--discord-x', `${left}px`);
    popover.style.setProperty('--discord-y', `${top}px`);
    popover.style.setProperty('--discord-arrow-x', `${arrowX}px`);
    popover.style.setProperty('--discord-origin', `${arrowX}px ${shouldPlaceAbove ? '100%' : '0%'}`);
    popover.dataset.placement = shouldPlaceAbove ? 'top' : 'bottom';
  };

  const openPopover = ({ persist = false } = {}) => {
    window.clearTimeout(closeTimer);
    pinned = persist || pinned;
    positionPopover();
    popover.classList.add('is-visible');
    popover.setAttribute('aria-hidden', 'false');
    discordButton.setAttribute('aria-expanded', 'true');
  };

  const closePopover = ({ force = false } = {}) => {
    if (pinned && !force) return;
    pinned = false;
    hoverIntent = false;
    popover.classList.remove('is-visible');
    popover.setAttribute('aria-hidden', 'true');
    discordButton.setAttribute('aria-expanded', 'false');
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      if (!hoverIntent && !popover.matches(':hover')) closePopover();
    }, 180);
  };

  discordButton.addEventListener('pointerenter', () => {
    hoverIntent = true;
    openPopover();
  }, { passive: true });

  discordButton.addEventListener('pointerleave', () => {
    hoverIntent = false;
    scheduleClose();
  }, { passive: true });

  popover.addEventListener('pointerenter', () => {
    hoverIntent = true;
    window.clearTimeout(closeTimer);
  }, { passive: true });

  popover.addEventListener('pointerleave', () => {
    hoverIntent = false;
    scheduleClose();
  }, { passive: true });

  discordButton.addEventListener('click', event => {
    event.stopPropagation();
    if (pinned && popover.classList.contains('is-visible')) {
      closePopover({ force: true });
    } else {
      pinned = true;
      openPopover({ persist: true });
    }
  });

  footerButton?.addEventListener('click', () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => {
      pinned = true;
      openPopover({ persist: true });
    }, 460);
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.discord-wrap') && !event.target.closest('#discordProfile')) {
      closePopover({ force: true });
    }
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePopover({ force: true });
  });

  window.addEventListener('resize', () => {
    if (popover.classList.contains('is-visible')) positionPopover();
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (popover.classList.contains('is-visible')) positionPopover();
  }, { passive: true });
}

/* ==========================================================================
   Clipboard copy utility
   ========================================================================== */
function initClipboardUtility() {
  const button = document.getElementById('emailCopy');
  if (!button) return;

  button.addEventListener('click', async () => {
    const email = button.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement('textarea');
      field.value = email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }

    button.classList.add('is-copied');
    window.setTimeout(() => button.classList.remove('is-copied'), 1800);
  });
}

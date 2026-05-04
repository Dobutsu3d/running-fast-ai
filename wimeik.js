/* =========================================================
   WIMEIK — interactions
   ========================================================= */

(() => {
  const root = document.documentElement;
  const body = document.body;

  // ---------- Tweaks state ----------
  const defaults = window.TWEAKS || { retroIntensity: 1, grain: true, scanlines: true, customCursor: true, palette: 'default' };
  let state = { ...defaults };

  const applyTweaks = () => {
    root.style.setProperty('--retro', state.retroIntensity);
    body.dataset.grain = state.grain ? 'on' : 'off';
    body.dataset.scan = state.scanlines ? 'on' : 'off';
    root.classList.toggle('cursor-on', !!state.customCursor && window.matchMedia('(hover:hover)').matches);
    body.dataset.palette = state.palette;
    document.querySelectorAll('.sw').forEach(b => b.classList.toggle('active', b.dataset.pal === state.palette));
  };
  applyTweaks();

  // ---------- Custom cursor ----------
  const cursor = document.getElementById('cursor');
  let cx = innerWidth/2, cy = innerHeight/2, tx = cx, ty = cy, cursorMoved = false;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; cursorMoved = true; }, { passive: true });
  const raf = () => {
    if (cursorMoved || Math.abs(tx - cx) > 0.2 || Math.abs(ty - cy) > 0.2) {
      cx += (tx - cx) * 0.55;
      cy += (ty - cy) * 0.55;
      if (cursor) cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      cursorMoved = false;
    }
    requestAnimationFrame(raf);
  };
  raf();

  const hoverables = 'a, button, .project, .powers-list li, .sw, input, .nav-link, .nav-cta, .join-button, .see-more';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverables)) cursor.classList.add('hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverables)) cursor.classList.remove('hover');
  });

  // ---------- Avatar tilt ----------
  const tiltEls = document.querySelectorAll('[data-tilt]');
  tiltEls.forEach(el => {
    let rect = el.getBoundingClientRect();
    const refreshRect = () => { rect = el.getBoundingClientRect(); };
    addEventListener('scroll', refreshRect, { passive: true });
    addEventListener('resize', refreshRect, { passive: true });
    addEventListener('mousemove', e => {
      const mx = (e.clientX - rect.left - rect.width/2) / rect.width;
      const my = (e.clientY - rect.top - rect.height/2) / rect.height;
      if (Math.abs(mx) > 1.6 || Math.abs(my) > 1.6) return;
      el.style.transform = `perspective(700px) rotateY(${mx * 14}deg) rotateX(${-my * 14}deg)`;
    }, { passive: true });
  });

  // ---------- Hero 3D tile grid (UNVEIL-style) ----------
  const heroBg = document.getElementById('hero-bg-3d');
  if (heroBg && typeof THREE !== 'undefined') {

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(1);
    renderer.setSize(heroBg.clientWidth, heroBg.clientHeight);
    heroBg.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, heroBg.clientWidth / heroBg.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);
    scene.add(new THREE.AmbientLight(0xffffff, 1));

    const COLS = 4, ROWS = 3;
    const TW = 2.15, TH = 2.85, GAP = 0.22;
    const startX = -(COLS * TW + (COLS - 1) * GAP) / 2 + TW / 2;
    const startY =  (ROWS * TH + (ROWS - 1) * GAP) / 2 - TH / 2;

    const imgUrls = [
      'https://framerusercontent.com/images/Gp2rQ9STCUopKh9B7LBeyIPiuY.png?width=320&fm=jpg&q=65',
      'Vault/Vault/Products/Nike/output/NK1.webp',
      'Vault/Vault/Products/TRoc/TR1.webp',
      'https://framerusercontent.com/images/bJzCsWIB23SXj2dGLMqEeJy03o.png?width=320&fm=jpg&q=65',
      'https://framerusercontent.com/images/YiH262XH9Iu3geNmnypjncM0lPk.png?width=320&fm=jpg&q=65',
      'https://framerusercontent.com/images/jAsQPetNuDZewCJPrEbPBsbGfmM.png?width=320&fm=jpg&q=65',
      'https://framerusercontent.com/images/w7mMz51T0QjJpJrLn3hrxVRBUiU.png?width=320&fm=jpg&q=65',
      'https://framerusercontent.com/images/yJAH7ak1w7jUd9p3fxRraKu16Qo.png?width=320&fm=jpg&q=65',
      'https://framerusercontent.com/images/DXJMUHxVwVRBJQYW6CRkFIafl3A.png?width=320&fm=jpg&q=65',
      'https://framerusercontent.com/images/8vTe2q7rwSK7Yw9OKhihu8b6rw.png?width=320&fm=jpg&q=65',
      'https://framerusercontent.com/images/QdOITwZPzmi2WwAi4j7hUdZzHs.png?width=320&fm=jpg&q=65',
      'https://framerusercontent.com/images/OFnL8PnaTZCzFypgR4IecGiNQ.png?width=320&fm=jpg&q=65',
      'https://framerusercontent.com/images/uu2Aalb8toiQuO2hKobdYpymvo.png?width=320&fm=jpg&q=65',
    ];

    const group = new THREE.Group();
    scene.add(group);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';

    const tiles = [];

    imgUrls.forEach((url, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const bx = startX + col * (TW + GAP);
      const by = startY - row * (TH + GAP);
      const bz = (Math.random() - 0.5) * 1.2;

      const geo = new THREE.PlaneGeometry(TW, TH);
      const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(bx, by, bz);
      mesh.rotation.z = (Math.random() - 0.5) * 0.05;
      mesh.userData = {
        baseY: by,
        floatAmp: 0.04 + Math.random() * 0.04,
        floatSpeed: 0.28 + Math.random() * 0.18,
        floatOffset: Math.random() * Math.PI * 2,
      };

      group.add(mesh);
      tiles.push(mesh);

      loader.load(url, (tex) => {
        mat.map = tex;
        mat.needsUpdate = true;
        gsap.to(mat, { opacity: 1, duration: 1.4, delay: 0.05 + i * 0.07, ease: 'power2.out' });
      });
    });

    // Mouse-driven tilt
    let tgtX = 0, tgtY = 0, curX = 0, curY = 0;
    addEventListener('mousemove', (e) => {
      tgtY =  ((e.clientX / innerWidth)  - 0.5) * 0.22;
      tgtX = -((e.clientY / innerHeight) - 0.5) * 0.14;
    }, { passive: true });

    // Pause 3D when hero scrolled out of view or tab hidden
    let heroVisible = true;
    const heroObs = new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    heroObs.observe(heroBg);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) lastFrame3d = 0;
    });

    const clock3d = new THREE.Clock();
    let lastFrame3d = 0;
    (function loop(ts) {
      requestAnimationFrame(loop);
      if (document.hidden || !heroVisible) return;
      if (ts - lastFrame3d < 33) return; // ~30fps cap
      lastFrame3d = ts;
      const t = clock3d.getElapsedTime();

      curX += (tgtX - curX) * 0.04;
      curY += (tgtY - curY) * 0.04;
      group.rotation.x = curX;
      group.rotation.y = curY;

      tiles.forEach((tile) => {
        const d = tile.userData;
        tile.position.y = d.baseY + Math.sin(t * d.floatSpeed + d.floatOffset) * d.floatAmp;
      });

      renderer.render(scene, camera);
    })();

    addEventListener('resize', () => {
      camera.aspect = heroBg.clientWidth / heroBg.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(heroBg.clientWidth, heroBg.clientHeight);
    });
  }

  // ---------- Mega-line parallax ----------
  const megaLines = document.querySelectorAll('.mega-line');

  // ---------- Active nav + smooth scroll ----------
  const sections = [
    { id:'top', el: document.getElementById('top') },
    { id:'work', el: document.getElementById('work') },
    { id:'visual-work', el: document.getElementById('visual-work') },
    { id:'about', el: document.getElementById('about') },
  ].filter(s => s.el);
  const navLinks = document.querySelectorAll('.nav-link');
  const setActive = (id) => {
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
  };

  // Cache section document-top offsets — avoids getBoundingClientRect on every scroll tick
  const cacheSectionTops = () => {
    sections.forEach(s => { s.top = s.el.getBoundingClientRect().top + scrollY; });
  };
  cacheSectionTops();
  addEventListener('resize', cacheSectionTops, { passive: true });

  // Single RAF-throttled scroll handler
  let scrollTicking = false;
  addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      megaLines.forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        el.style.transform = `translateX(${dir * (y * 0.08) % 400 - 200}px)`;
      });
      let cur = 'top';
      const thresh = innerHeight * 0.35;
      for (const s of sections) {
        if (s.top - y <= thresh) cur = s.id;
      }
      setActive(cur);
      mobileLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
      scrollTicking = false;
    });
  }, { passive:true });

  // ---------- 3D nav transition ----------
  let pgBusy = false;
  const mainEl = document.querySelector('main');
  const navLinksList = [...document.querySelectorAll('.nav-link')];

  // Page-enter zoom-in when arriving from another page via nav transition
  if (mainEl && sessionStorage.getItem('navTransition')) {
    sessionStorage.removeItem('navTransition');
    const hash = location.hash.replace('#', '');
    if (hash && !hash.startsWith('project/')) setActive(hash);
    mainEl.classList.add('pg-zoom-in');
    mainEl.addEventListener('animationend', () => mainEl.classList.remove('pg-zoom-in'), { once: true });
  }

  // Cross-page nav links (e.g. TRAINING → training.html)
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href.startsWith('#')) return; // handled below
    a.addEventListener('click', e => {
      e.preventDefault();
      if (pgBusy) return;
      pgBusy = true;
      const curActive = document.querySelector('.nav-link.active');
      const curIdx = curActive ? navLinksList.indexOf(curActive) : 0;
      const tgtIdx = navLinksList.indexOf(a);
      const goFwd = tgtIdx > curIdx;
      if (curActive) curActive.classList.add(goFwd ? 'nav-item-out-fwd' : 'nav-item-out-back');
      mainEl.classList.add('pg-zoom-out');
      sessionStorage.setItem('navTransition', '1');
      setTimeout(() => { window.location.href = href; }, 380);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      if (a.classList.contains('nav-link') && mainEl && !pgBusy) {
        pgBusy = true;

        // Pre-calculate scroll target NOW — before the transform is applied
        // (getBoundingClientRect on a transformed element returns wrong values)
        const scrollTarget = target.getBoundingClientRect().top + window.scrollY;

        // Figure out carousel direction
        const curActive = document.querySelector('.nav-link.active');
        const curIdx = curActive ? navLinksList.indexOf(curActive) : 0;
        const tgtIdx = navLinksList.indexOf(a);
        const goFwd  = tgtIdx > curIdx;

        // Phase 1 — nav letter OUT + page zoom out
        if (curActive) curActive.classList.add(goFwd ? 'nav-item-out-fwd' : 'nav-item-out-back');
        mainEl.classList.add('pg-zoom-out');

        setTimeout(() => {
          // Clean old link
          if (curActive) curActive.classList.remove('nav-item-out-fwd', 'nav-item-out-back');

          // Instant page jump (invisible — opacity is 0)
          root.style.scrollBehavior = 'auto';
          window.scrollTo(0, scrollTarget);

          // Phase 2 — update active state + nav letter IN + page zoom in
          setActive(id);
          const newActive = document.querySelector('.nav-link.active');
          if (newActive) newActive.classList.add(goFwd ? 'nav-item-in-fwd' : 'nav-item-in-back');

          mainEl.classList.remove('pg-zoom-out');
          void mainEl.offsetWidth;
          mainEl.classList.add('pg-zoom-in');

          requestAnimationFrame(() => { root.style.scrollBehavior = ''; });

          setTimeout(() => {
            if (newActive) newActive.classList.remove('nav-item-in-fwd', 'nav-item-in-back');
            mainEl.classList.remove('pg-zoom-in');
            pgBusy = false;
          }, 400);
        }, 380);

      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Tweaks panel ----------
  const panel = document.getElementById('tweaks');
  const closeBtn = document.getElementById('tweaks-close');
  const show = () => { panel.hidden = false; };
  const hide = () => { panel.hidden = true; };

  addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') show();
    if (d.type === '__deactivate_edit_mode') hide();
  });
  try { parent.postMessage({ type:'__edit_mode_available' }, '*'); } catch {}

  closeBtn?.addEventListener('click', hide);

  const $intensity = document.getElementById('tw-intensity');
  const $grain = document.getElementById('tw-grain');
  const $scan  = document.getElementById('tw-scan');
  const $cur   = document.getElementById('tw-cursor');

  if ($intensity) $intensity.value = state.retroIntensity;
  if ($grain) $grain.checked = state.grain;
  if ($scan) $scan.checked = state.scanlines;
  if ($cur) $cur.checked = state.customCursor;

  const persist = (edits) => {
    state = { ...state, ...edits };
    applyTweaks();
    try { parent.postMessage({ type:'__edit_mode_set_keys', edits }, '*'); } catch {}
  };

  $intensity?.addEventListener('input', e => persist({ retroIntensity: parseFloat(e.target.value) }));
  $grain?.addEventListener('change', e => persist({ grain: e.target.checked }));
  $scan?.addEventListener('change', e => persist({ scanlines: e.target.checked }));
  $cur?.addEventListener('change', e => persist({ customCursor: e.target.checked }));

  document.querySelectorAll('.sw').forEach(b => {
    b.addEventListener('click', () => persist({ palette: b.dataset.pal }));
  });

  // ==========================================================
  // PROJECT REGISTRY + MODAL
  // ==========================================================
  const IMG = (id, w, h) => `https://framerusercontent.com/images/${id}.png?width=${w}&height=${h}`;

  // Each project: slug, title, cover, type (discipline), year, description, images[]
  const PROJECTS = {
    'byredo': {
      title: 'Byredo',
      subtitle: 'Chaotique Rouge',
      type: 'AI Visual Imagery Production',
      year: '2026',
      cover: 'Vault/Vault/Products/Byredo/BYR1.webp',
      video: 'Vault/Vault/Spots/RogueChaotique.mp4',
      description: `A fictional fragrance world built around Byredo Chaotique Rouge — a scent conceived as a collision between raw heat and cold precision. The visual campaign translates the tension of the formula into image: molten reds, iridescent surfaces, and sculptural still-lifes that feel both brutal and refined.

Each frame is constructed to feel like a fragment of a larger ritual — heat rising from glass, the geometry of a bottle as a totem of desire.

The result is a cinematic fragrance campaign that blurs the line between editorial and art direction, positioning Chaotique Rouge as a scent for those who move at full intensity.`,
      images: [
        'Vault/Vault/Products/Byredo/BYR1.webp',
        'Vault/Vault/Products/Byredo/BYR2.webp',
        'Vault/Vault/Products/Byredo/BYR3.webp',
      ],
    },
    'mugler-alien': {
      title: 'Mugler Alien',
      subtitle: 'Chromatic Power Study',
      type: 'AI Visual Imagery Production',
      year: '2025',
      cover: IMG('Gp2rQ9STCUopKh9B7LBeyIPiuY', 3190, 4253),
      description: `A hyperreal exploration of Mugler's Alien perfume as a sculptural object of light, glass, and power. The visual series examines the perfume's chromatic tension — electric purples, radiant golds, and iridescent reflections — reimagining the bottle as a totem of sensual energy.

Each shot contrasts precision geometry with organic sensuality: claw-like hands emerge from shadow, crystalline stones mirror the facets of the bottle, and violet light fractures into luminous gradients.

The result is a cinematic still-life campaign that merges luxury product photography with fashion surrealism, amplifying Mugler's signature duality between alien beauty and human desire.`,
      images: [
        IMG('s2w2A7Yj1S22aglzEMzhMjD6QpA', 5504, 3072),
        IMG('RflMsmhDoEp51PCRR5k4fRebd0', 2752, 1536),
        IMG('xCSmJg4RwISBjGp60OVilPY6JQ', 5504, 3072),
      ],
    },
    'metcon-10': {
      title: 'Free Metcon',
      subtitle: 'Nike Shooting',
      type: 'AI Visuals & Creative Direction R&D',
      year: '2025',
      cover: 'Vault/Vault/Products/Nike/output/NK1.webp',
      video: 'Vault/Vault/Products/Nike/output/FreeMetcon.mp4',
      description: `Free Metcon — Nike shooting. Crossfit shoes built to last. An AI visual exploration for Nike's Metcon franchise, combining sculptural product stills with atmospheric lighting to convey durability, power and athletic precision.`,
      images: [
        'Vault/Vault/Products/Nike/output/NK1.webp',
        'Vault/Vault/Products/Nike/output/NK2.webp',
        'Vault/Vault/Products/Nike/output/NK3.webp',
        'Vault/Vault/Products/Nike/output/NK4.webp',
      ],
    },
    'salomon-xt6': {
      title: 'Salomon XT-6',
      subtitle: 'Velocity in Stillness',
      type: 'AI Visual Imagery · Creative Direction',
      year: '2025',
      cover: IMG('bJzCsWIB23SXj2dGLMqEeJy03o', 3477, 4636),
      description: `A study of Salomon's XT-6 silhouette as an object of tension — velocity captured in stillness. The series isolates the shoe against textured, earth-toned backdrops, letting its technical geometry speak for itself.`,
      images: [ IMG('bJzCsWIB23SXj2dGLMqEeJy03o', 3477, 4636) ],
    },
    'cupra-tavascan': {
      title: 'Cupra Tavascan',
      subtitle: 'Neon Hero Macro Series',
      type: 'Automotive · AI Visuals',
      year: '2025',
      cover: IMG('YiH262XH9Iu3geNmnypjncM0lPk', 1728, 2304),
      description: `A neon-lit macro study of the Cupra Tavascan — dissecting its aggressive surface language through saturated color, sharp reflections, and cinematic framing.`,
      images: [ IMG('YiH262XH9Iu3geNmnypjncM0lPk', 1728, 2304) ],
    },
    'bmw-m5': {
      title: 'BMW M5',
      subtitle: 'Competition',
      type: 'Automotive Campaign',
      year: '2024',
      cover: IMG('jAsQPetNuDZewCJPrEbPBsbGfmM', 1728, 2304),
      description: `A performance-driven visual series for the BMW M5 Competition. Deep shadows, carbon textures and controlled highlights emphasize the brutalist engineering of Munich's flagship super-saloon.`,
      images: [ IMG('jAsQPetNuDZewCJPrEbPBsbGfmM', 1728, 2304) ],
    },
    'lamborghini-temerario': {
      title: 'Lamborghini Temerario',
      subtitle: 'CGI Study',
      type: 'Automotive · CGI',
      year: '2025',
      cover: IMG('w7mMz51T0QjJpJrLn3hrxVRBUiU', 1728, 2304),
      description: `A CGI exploration of Lamborghini's Temerario. Sharp silhouettes, anodized finishes and studio HDRIs converge in a series that feels equal parts industrial design document and fashion editorial.`,
      images: [ IMG('w7mMz51T0QjJpJrLn3hrxVRBUiU', 1728, 2304) ],
    },
    'prada-ring': {
      title: 'Prada Ring',
      subtitle: 'Fictional Hero Shot',
      type: 'Jewelry · AI Visuals',
      year: '2025',
      cover: IMG('yJAH7ak1w7jUd9p3fxRraKu16Qo', 3812, 5083),
      description: `A fictional Prada jewelry piece brought to life through AI-driven hero shots. The ring is isolated against rich, saturated planes of color — a meditation on restraint and luxury.`,
      images: [ IMG('yJAH7ak1w7jUd9p3fxRraKu16Qo', 3812, 5083) ],
    },
    'jacquemus-autumn': {
      title: 'Jacquemus Autumn',
      subtitle: 'Mood Study',
      type: 'Fashion · Creative Direction',
      year: '2024',
      cover: IMG('DXJMUHxVwVRBJQYW6CRkFIafl3A', 1728, 2368),
      description: `An autumnal mood study inspired by the Jacquemus universe — warm earth tones, soft natural light, and a Mediterranean sensibility translated into still imagery.`,
      images: [ IMG('DXJMUHxVwVRBJQYW6CRkFIafl3A', 1728, 2368) ],
    },
    'rolex-daytona': {
      title: 'Rolex Daytona',
      subtitle: 'Watch Study',
      type: 'Watches · Product',
      year: '2024',
      cover: IMG('8vTe2q7rwSK7Yw9OKhihu8b6rw', 1728, 2304),
      description: `A precision study of the Rolex Daytona. Every reflection, every sub-dial, captured with watchmaker-level attention to material and light.`,
      images: [ IMG('8vTe2q7rwSK7Yw9OKhihu8b6rw', 1728, 2304) ],
    },
    'fugazzi-perfumes': {
      title: 'Fugazzi Perfumes',
      subtitle: 'Fictional Shooting',
      type: 'Fragrance · Concept',
      year: '2024',
      cover: IMG('QdOITwZPzmi2WwAi4j7hUdZzHs', 2304, 3072),
      description: `A fictional fragrance brand imagined from scratch — Fugazzi. Sculpted bottles, warm grain and a retro luxe palette define the visual identity of this speculative house.`,
      images: [ IMG('QdOITwZPzmi2WwAi4j7hUdZzHs', 2304, 3072) ],
    },
    'marzocco-mini': {
      title: 'Marzocco Mini',
      subtitle: 'Shooting',
      type: 'Product Photography',
      year: '2024',
      cover: IMG('OFnL8PnaTZCzFypgR4IecGiNQ', 2678, 3572),
      description: `A product session for La Marzocco's Mini — the iconic espresso machine shot as a piece of industrial sculpture, celebrating its enameled curves and chrome details.`,
      images: [ IMG('OFnL8PnaTZCzFypgR4IecGiNQ', 2678, 3572) ],
    },
    'vw-troc': {
      title: 'Volkswagen T-Roc',
      subtitle: 'T-Roc 26',
      type: 'Automotive · AI Visuals & Film',
      year: '2026',
      cover: 'Vault/Vault/Products/TRoc/TR1.webp',
      video: 'Vault/Vault/Spots/VWTroc26.mp4',
      description: `A cinematic AI visual campaign for the Volkswagen T-Roc 2026. Bold geometry, dynamic lighting and atmospheric staging define a new chapter for Volkswagen's most expressive compact SUV.`,
      images: [
        'Vault/Vault/Products/TRoc/TR1.webp',
        'Vault/Vault/Products/TRoc/TR2.webp',
        'Vault/Vault/Products/TRoc/TR3.webp',
        'Vault/Vault/Products/TRoc/TR4.webp',
      ],
    },
    'balenciaga-hourglass': {
      title: 'Balenciaga Hourglass',
      subtitle: 'Sculptural Luxury',
      type: 'Fashion · Accessories',
      year: '2025',
      cover: IMG('uu2Aalb8toiQuO2hKobdYpymvo', 1080, 1440),
      description: `The Balenciaga Hourglass bag treated as a sculptural object — single lighting setups, heavy shadows, and architectural framing emphasize the silhouette's graphic authority.`,
      images: [ IMG('uu2Aalb8toiQuO2hKobdYpymvo', 1080, 1440) ],
    },
  };

  // ---------- Inject data-slug on project cards in DOM order ----------
  const slugOrder = [
    'byredo','metcon-10','vw-troc','salomon-xt6','cupra-tavascan','bmw-m5',
    'lamborghini-temerario','prada-ring','jacquemus-autumn','rolex-daytona',
    'fugazzi-perfumes','marzocco-mini','balenciaga-hourglass'
  ];
  const cards = document.querySelectorAll('.projects-grid .project');
  cards.forEach((card, i) => {
    const slug = slugOrder[i];
    if (!slug) return;
    card.dataset.slug = slug;
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open project: ${PROJECTS[slug].title}`);
  });

  // ---------- Build modal DOM ----------
  const modal = document.createElement('div');
  modal.className = 'pmodal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="pmodal-backdrop" data-close></div>
    <div class="pmodal-shell" role="dialog" aria-modal="true" aria-labelledby="pmodal-title">
      <button class="pmodal-close" data-close aria-label="Close">✕</button>
      <div class="pmodal-scroll">
        <header class="pmodal-head">
          <div class="pmodal-label"><span class="dot"></span><span class="pmodal-type"></span><span class="dot"></span></div>
          <h2 id="pmodal-title" class="pmodal-title"></h2>
          <p class="pmodal-subtitle"></p>
          <div class="pmodal-meta">
            <span class="pmodal-year"></span>
            <span class="pmodal-sep">✦</span>
            <span class="pmodal-counter"></span>
          </div>
        </header>
        <section class="pmodal-desc"></section>
        <section class="pmodal-gallery"></section>
        <nav class="pmodal-nav">
          <button class="pmodal-prev" data-prev>
            <span class="pmodal-nav-arrow">↵</span>
            <span class="pmodal-nav-labels">
              <span class="pmodal-nav-kicker">PREVIOUS</span>
              <span class="pmodal-nav-title"></span>
            </span>
          </button>
          <button class="pmodal-next" data-next>
            <span class="pmodal-nav-labels pmodal-nav-right">
              <span class="pmodal-nav-kicker">NEXT</span>
              <span class="pmodal-nav-title"></span>
            </span>
            <span class="pmodal-nav-arrow">↳</span>
          </button>
        </nav>
        <footer class="pmodal-foot">
          <span>© 2025 RNF · CRISTIAN MARTÍNEZ</span>
          <a href="mailto:runningfastai@gmail.com">runningfastai@gmail.com</a>
        </footer>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalEls = {
    modal,
    type: modal.querySelector('.pmodal-type'),
    title: modal.querySelector('.pmodal-title'),
    subtitle: modal.querySelector('.pmodal-subtitle'),
    year: modal.querySelector('.pmodal-year'),
    counter: modal.querySelector('.pmodal-counter'),
    desc: modal.querySelector('.pmodal-desc'),
    gallery: modal.querySelector('.pmodal-gallery'),
    scroll: modal.querySelector('.pmodal-scroll'),
    prev: modal.querySelector('.pmodal-prev'),
    next: modal.querySelector('.pmodal-next'),
    prevTitle: modal.querySelector('.pmodal-prev .pmodal-nav-title'),
    nextTitle: modal.querySelector('.pmodal-next .pmodal-nav-title'),
  };

  let currentIndex = -1;

  const renderProject = (slug) => {
    const idx = slugOrder.indexOf(slug);
    if (idx < 0) return;
    currentIndex = idx;
    const p = PROJECTS[slug];

    modalEls.type.textContent = p.type.toUpperCase();
    modalEls.title.textContent = p.title;
    modalEls.subtitle.textContent = p.subtitle || '';
    modalEls.year.textContent = p.year;
    modalEls.counter.textContent = `${String(idx+1).padStart(2,'0')} / ${String(slugOrder.length).padStart(2,'0')}`;
    modalEls.desc.innerHTML = p.description.split('\n\n').map(par => `<p>${par}</p>`).join('');

    const videoFigure = p.video ? `
      <figure class="pmodal-figure pmodal-figure-video" style="--delay:0ms">
        <div class="pmodal-figure-inner">
          <video src="${p.video}" autoplay muted loop playsinline controls></video>
        </div>
        <figcaption><span>01</span>/ ${p.title.toUpperCase()} — VIDEO</figcaption>
      </figure>
    ` : '';
    const imgOffset = p.video ? 1 : 0;
    const imageFigures = p.images.map((src, i) => `
      <figure class="pmodal-figure" style="--delay:${(i + imgOffset) * 60}ms">
        <div class="pmodal-figure-inner">
          <img src="${src}" alt="${p.title} — image ${i+1}" loading="lazy">
        </div>
        <figcaption><span>${String(i + 1 + imgOffset).padStart(2,'0')}</span>/ ${p.title.toUpperCase()}</figcaption>
      </figure>
    `).join('');
    modalEls.gallery.innerHTML = videoFigure + imageFigures;

    const prevSlug = slugOrder[(idx - 1 + slugOrder.length) % slugOrder.length];
    const nextSlug = slugOrder[(idx + 1) % slugOrder.length];
    modalEls.prevTitle.textContent = PROJECTS[prevSlug].title;
    modalEls.nextTitle.textContent = PROJECTS[nextSlug].title;

    modalEls.scroll.scrollTop = 0;
  };

  const cardVideos = () => document.querySelectorAll('.project-card-video');

  const openProject = (slug) => {
    renderProject(slug);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    cardVideos().forEach(v => v.pause());
    history.replaceState(null, '', `#project/${slug}`);
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
    cardVideos().forEach(v => v.play().catch(() => {}));
    if (location.hash.startsWith('#project/')) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  };

  // Card clicks
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // don't open if clicking an <a> (shouldn't exist but just in case)
      if (e.target.closest('a')) return;
      const slug = card.dataset.slug;
      if (slug) openProject(slug);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const slug = card.dataset.slug;
        if (slug) openProject(slug);
      }
    });
  });

  // Close buttons / backdrop
  modal.addEventListener('click', (e) => {
    if (e.target.matches('[data-close]')) closeModal();
    if (e.target.matches('[data-prev]') || e.target.closest('[data-prev]')) {
      const prevSlug = slugOrder[(currentIndex - 1 + slugOrder.length) % slugOrder.length];
      renderProject(prevSlug);
    }
    if (e.target.matches('[data-next]') || e.target.closest('[data-next]')) {
      const nextSlug = slugOrder[(currentIndex + 1) % slugOrder.length];
      renderProject(nextSlug);
    }
  });

  addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') {
      const prevSlug = slugOrder[(currentIndex - 1 + slugOrder.length) % slugOrder.length];
      renderProject(prevSlug);
    }
    if (e.key === 'ArrowRight') {
      const nextSlug = slugOrder[(currentIndex + 1) % slugOrder.length];
      renderProject(nextSlug);
    }
  });

  // Deep-link on load
  if (location.hash.startsWith('#project/')) {
    const slug = location.hash.slice('#project/'.length);
    if (PROJECTS[slug]) openProject(slug);
  }

  // ---------- Mobile nav ----------
  const burger = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('mobile-nav');
  const toggleMenu = (open) => {
    root.classList.toggle('menu-open', open);
    burger?.setAttribute('aria-expanded', String(open));
    body.style.overflow = open ? 'hidden' : '';
  };
  burger?.addEventListener('click', () => toggleMenu(!root.classList.contains('menu-open')));
  document.querySelectorAll('[data-mobile-link]').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

  // mobileLinks used by the merged scroll handler above
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');

})();


// script.js
(function () {
    // Cursor (desktop only)
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    if (window.matchMedia('(pointer:fine)').matches && cur && ring) {
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        (function loop() {
            cur.style.left = mx + 'px';
            cur.style.top = my + 'px';
            rx += (mx - rx) * .12;
            ry += (my - ry) * .12;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
            requestAnimationFrame(loop);
        })();
    }

    // Nav scroll effect
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });
    }

    // Hamburger menu
    const ham = document.getElementById('hamburger');
    const nl = document.getElementById('nav-links');
    const ov = document.getElementById('nav-overlay');
    function closeMenu() {
        if (nl) nl.classList.remove('open');
        if (ham) ham.classList.remove('open');
        if (ov) ov.classList.remove('open');
        document.body.style.overflow = '';
    }
    if (ham && nl && ov) {
        ham.addEventListener('click', () => {
            const o = nl.classList.toggle('open');
            ham.classList.toggle('open', o);
            ov.classList.toggle('open', o);
            document.body.style.overflow = o ? 'hidden' : '';
        });
        ov.addEventListener('click', closeMenu);
        nl.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    }

    // Scroll reveal
    const ro = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    }), { threshold: .07 });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = {
        technical: document.getElementById('tab-technical'),
        creative: document.getElementById('tab-creative')
    };
    if (tabBtns.length && panels.technical && panels.creative) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tabKey = btn.dataset.tab;
                Object.values(panels).forEach(p => p.classList.remove('active'));
                if (panels[tabKey]) panels[tabKey].classList.add('active');
                if (window.innerWidth <= 768) {
                    const activePanel = panels[tabKey];
                    const scrollContainer = activePanel?.querySelector('.projects-grid, .creative-grid');
                    if (scrollContainer) scrollContainer.scrollLeft = 0;
                }
            });
        });
    }

    // Typed hero title effect
    const roles = ['Full Stack Developer', 'Computer Science Student', 'Creative Designer'];
    let ri = 0, ci = 0, del = false;
    const tel = document.querySelector('.hero-title');
    if (tel) {
        function typeLoop() {
            const w = '// ' + roles[ri];
            if (!del) {
                tel.textContent = w.slice(0, ++ci);
                if (ci === w.length) { del = true; setTimeout(typeLoop, 2200); return; }
            } else {
                tel.textContent = w.slice(0, --ci);
                if (ci === 4) { del = false; ri = (ri + 1) % roles.length; setTimeout(typeLoop, 350); return; }
            }
            setTimeout(typeLoop, del ? 38 : 72);
        }
        setTimeout(typeLoop, 1600);
    }

    // Back to Top button
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        window.addEventListener('scroll', () => backBtn.classList.toggle('visible', window.scrollY > 400), { passive: true });
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Lazy loading fallback for older browsers
    if (!('loading' in HTMLImageElement.prototype)) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const lazyLoadObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    lazyLoadObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => lazyLoadObserver.observe(img));
    }
})();
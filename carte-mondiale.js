/* =========================================================
   Page Carte mondiale — atlas : carte monde + zoom Europe/Moyen-Orient,
   symboles proportionnels, filtres des fiches.
   Données : <script type="application/json" id="cm-data"> (généré avec la page).
   Fond : world-map.svg, projection équirectangulaire 1024 × 427,
   de 90°N à 60°S.
   ========================================================= */
(function () {
    'use strict';

    const dataEl = document.getElementById('cm-data');
    if (!dataEl) return;
    const DATA = JSON.parse(dataEl.textContent);
    const NS = 'http://www.w3.org/2000/svg';

    /* --- Projection --- */
    const X = lon => (lon + 180) / 360 * 1024;
    const Y = lat => (90 - lat) / 150 * 427;

    /* Rayon (unités du fond) par niveau d'envergure : surface ~ ×2 par niveau,
       les deux mastodontes nettement au-dessus. */
    const R = { 5: 23, 4: 9.5, 3: 7, 2: 5, 1: 3.8 };

    const VIEWS = {
        world: { vb: [0, 17, 1024, 384], k: 1, labels: 'lw' },
        zoom: { vb: [X(-14), Y(67), X(62) - X(-14), Y(10) - Y(67)], k: .5, labels: 'li' }
    };
    const ZOOM_BOX = VIEWS.zoom.vb;

    const pinsById = {};   // id -> [pins]
    const symsById = {};   // id -> [circles]

    const el = (tag, attrs, parent) => {
        const n = document.createElementNS(NS, tag);
        for (const k in attrs) n.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(n);
        return n;
    };
    const escapeHtml = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    /* ---------- Construction d'une vue ---------- */
    function buildView(holder, srcSvg, viewName) {
        const view = VIEWS[viewName];
        const [vx, vy, vw, vh] = view.vb;
        const svg = srcSvg.cloneNode(true);
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('viewBox', view.vb.join(' '));
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.setAttribute('aria-hidden', 'true');
        svg.removeAttribute('role');
        svg.classList.add('cm-svg');
        holder.style.setProperty('--ar', vw / vh);
        holder.style.setProperty('--vw', vw);

        const land = svg.querySelector('g');
        land.removeAttribute('fill');
        land.removeAttribute('stroke');
        land.setAttribute('class', 'cm-land');

        /* Hachures pour les deux mastodontes */
        const defs = el('defs', {}, null);
        svg.insertBefore(defs, svg.firstChild);
        const pat = el('pattern', { id: 'cm-hatch-' + viewName, patternUnits: 'userSpaceOnUse', width: 3.2, height: 3.2, patternTransform: 'rotate(45)' }, defs);
        el('rect', { width: 3.2, height: 3.2, class: 'cm-hatch-bg' }, pat);
        el('line', { x1: 0, y1: 0, x2: 0, y2: 3.2, class: 'cm-hatch-line' }, pat);

        /* Graticule tous les 30° (sous les terres) */
        const grat = el('g', { class: 'cm-grat' }, null);
        svg.insertBefore(grat, land);
        for (let lon = -150; lon <= 150; lon += 30) el('line', { x1: X(lon), x2: X(lon), y1: 0, y2: 427 }, grat);
        for (let lat = -60; lat <= 90; lat += 30) el('line', { x1: 0, x2: 1024, y1: Y(lat), y2: Y(lat), class: lat === 0 ? 'eq' : '' }, grat);

        /* Teinte des pays actifs */
        DATA.countries.forEach(c => {
            const p = c.iso3 && land.querySelector('#' + c.iso3);
            if (p) p.setAttribute('class', 'is-active s-' + c.strat);
        });
        DATA.giants.forEach(g => {
            const p = land.querySelector('#' + g.iso3);
            if (p) { p.setAttribute('class', 'is-giant'); p.setAttribute('fill', 'url(#cm-hatch-' + viewName + ')'); }
        });
        /* Les ids des pays doivent rester uniques dans le document */
        land.querySelectorAll('[id]').forEach(n => { n.dataset.iso = n.id; n.removeAttribute('id'); });

        /* Cadre du zoom sur la carte monde */
        if (viewName === 'world') {
            el('rect', { x: ZOOM_BOX[0], y: ZOOM_BOX[1], width: ZOOM_BOX[2], height: ZOOM_BOX[3], rx: 3, class: 'cm-zoom-frame' }, svg);
        }

        /* Symboles : du plus gros au plus petit, pour que les petits restent visibles */
        const syms = el('g', { class: 'cm-syms' }, svg);
        const all = DATA.giants.map(g => Object.assign({ tier: 5, strat: 'giant', st: 'dispo', giant: true }, g))
            .concat(DATA.countries)
            .sort((a, b) => b.tier - a.tier);

        const overlay = document.createElement('div');
        overlay.className = 'cm-pins';

        all.forEach(c => {
            const cx = X(c.lon), cy = Y(c.lat);
            if (cx < vx - 10 || cx > vx + vw + 10 || cy < vy - 10 || cy > vy + vh + 10) return;
            const r = R[c.tier] * (c.giant ? (viewName === 'zoom' ? .5 : 1) : view.k);
            const circ = el('circle', { cx, cy, r, class: 'cm-sym s-' + c.strat + ' st-' + c.st + ' t' + c.tier }, syms);
            (symsById[c.id] = symsById[c.id] || []).push(circ);

            /* Point d'interaction + libellé (HTML, accessible au clavier) */
            const inZoomBox = cx >= ZOOM_BOX[0] && cx <= ZOOM_BOX[0] + ZOOM_BOX[2] && cy >= ZOOM_BOX[1] && cy <= ZOOM_BOX[1] + ZOOM_BOX[3];
            let pos = c.giant ? 'none' : c[view.labels];
            if (viewName === 'world' && inZoomBox && !c.giant) pos = 'none';

            const a = document.createElement('a');
            a.className = 'cm-pin t' + c.tier + ' s-' + c.strat + ' lbl-' + pos;
            a.href = '#' + c.id;
            a.style.left = ((cx - vx) / vw * 100) + '%';
            a.style.top = ((cy - vy) / vh * 100) + '%';
            a.style.setProperty('--r', (r / vw * 100));
            a.dataset.id = c.id;
            a.dataset.strat = c.strat;
            a.setAttribute('aria-label', c.name + ' — ' + DATA.tiers[c.tier] + (c.actors ? ' — ' + c.actors.join(', ') : ''));
            let lbl = '';
            if (pos !== 'none') {
                lbl = '<span class="cm-pin-lbl"><b>' + escapeHtml(c.short || c.name) + '</b>' +
                    (c.tier >= 2 && c.actors ? '<small>' + escapeHtml(c.actors[0]) + '</small>' : '') + '</span>';
            }
            a.innerHTML = '<span class="cm-pin-hit"></span>' + lbl;
            overlay.appendChild(a);
            (pinsById[c.id] = pinsById[c.id] || []).push(a);
            bindPin(a, c);
        });

        /* Les deux mastodontes : encadrés avec logos, reliés par un filet */
        if (viewName === 'world') {
            const CALL = {
                'c-usa': { lon: -177, lat: 13, w: 21, side: 'tl', to: [-127, 13] },
                'c-chine': { lon: 76, lat: 83, w: 22, side: 'tl', to: [104, 57] }
            };
            DATA.giants.forEach(g => {
                const cfg = CALL[g.id];
                if (!cfg) return;
                const gx = X(g.lon), gy = Y(g.lat);
                const tx = X(cfg.to[0]), ty = Y(cfg.to[1]);
                const ang = Math.atan2(ty - gy, tx - gx);
                el('path', {
                    d: 'M' + (gx + Math.cos(ang) * (R[5] + 1.5)) + ' ' + (gy + Math.sin(ang) * (R[5] + 1.5)) + ' L' + tx + ' ' + ty,
                    class: 'cm-leader'
                }, svg);
                el('circle', { cx: tx, cy: ty, r: 1.6, class: 'cm-leader-dot' }, svg);
                const box = document.createElement('a');
                box.className = 'cm-callout';
                box.href = '#' + g.id;
                box.style.left = ((X(cfg.lon) - vx) / vw * 100) + '%';
                box.style.top = ((Y(cfg.lat) - vy) / vh * 100) + '%';
                box.style.width = cfg.w + '%';
                box.innerHTML = '<span class="cm-callout-head"><span class="fi fi-' + g.iso2 + '"></span><b>' + escapeHtml(g.name) +
                    '</b><small>' + escapeHtml(DATA.tiers[5]) + '</small></span><span class="cm-callout-logos">' +
                    g.logos.map(l => '<img src="' + PRE + 'images/carte/logos/' + l[1] + '.webp" alt="' + escapeHtml(l[0]) + '" title="' + escapeHtml(l[0]) + '" width="64" height="64">').join('') +
                    '</span>';
                overlay.appendChild(box);
            });
        }

        holder.appendChild(svg);
        holder.appendChild(overlay);
    }

    /* ---------- Infobulle ---------- */
    const fig = document.getElementById('cm-map');
    const PRE = fig ? fig.dataset.pre || '' : '';
    const tip = document.getElementById('cm-tip');
    const byId = {};
    DATA.countries.forEach(c => { byId[c.id] = c; });

    function hot(id, on) {
        (symsById[id] || []).forEach(s => s.classList.toggle('is-hot', on));
        (pinsById[id] || []).forEach(p => p.classList.toggle('is-hot', on));
    }

    function showTip(a, c) {
        if (!tip || c.giant) return;
        const stLabel = c.st === 'endev' ? DATA.st.endev : DATA.st.dispo;
        tip.innerHTML =
            '<span class="cm-tip-head"><span class="fi fi-' + c.iso2 + '"></span><b>' + escapeHtml(c.name) + '</b></span>' +
            '<span class="cm-tip-row"><span class="cm-pips">' + [1, 2, 3, 4, 5].map(i => '<i class="' + (i <= c.tier ? 'on' : '') + '"></i>').join('') + '</span>' + escapeHtml(DATA.tiers[c.tier]) + '</span>' +
            '<span class="cm-tip-actors">' + c.actors.map(escapeHtml).join(' · ') + '</span>' +
            '<span class="cm-tip-row"><span class="cm-tip-sw s-' + c.strat + '"></span>' + escapeHtml(DATA.strats[c.strat]) +
            ' <span class="cm-tip-sep">·</span> ' + escapeHtml(c.badge || stLabel) + '</span>' +
            '<span class="cm-tip-hint">' + escapeHtml(DATA.hint) + ' →</span>';
        tip.hidden = false;
        const fr = fig.getBoundingClientRect();
        const ar = a.getBoundingClientRect();
        const tw = tip.offsetWidth, th = tip.offsetHeight;
        let left = ar.left + ar.width / 2 - fr.left - tw / 2;
        left = Math.max(8, Math.min(left, fr.width - tw - 8));
        let top = ar.top - fr.top - th - 10;
        if (top < 8) top = ar.bottom - fr.top + 10;
        tip.style.left = left + 'px';
        tip.style.top = top + 'px';
    }

    function hideTip() { if (tip) tip.hidden = true; }

    function bindPin(a, c) {
        a.addEventListener('pointerenter', () => { hot(c.id, true); showTip(a, c); });
        a.addEventListener('pointerleave', () => { hot(c.id, false); hideTip(); });
        a.addEventListener('focus', () => { hot(c.id, true); showTip(a, c); });
        a.addEventListener('blur', () => { hot(c.id, false); hideTip(); });
    }

    /* ---------- Aller à une fiche ---------- */
    function goTo(id, e) {
        const target = document.getElementById(id);
        if (!target) return;
        if (e) e.preventDefault();
        if (target.classList.contains('cm-card') && target.hidden) resetFilters();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.remove('cm-flash');
        void target.offsetWidth;
        target.classList.add('cm-flash');
        history.replaceState(null, '', '#' + id);
    }

    document.addEventListener('click', e => {
        const a = e.target.closest('.cm-pin, .cm-callout, .cm-lchip, .cm-mini');
        if (!a) return;
        goTo(a.getAttribute('href').slice(1), e);
    });

    /* ---------- Mise en avant d'une stratégie sur la carte ---------- */
    const hlBtns = document.querySelectorAll('.cm-map-head .cm-chip');
    hlBtns.forEach(b => b.addEventListener('click', () => {
        const on = b.getAttribute('aria-pressed') !== 'true';
        hlBtns.forEach(o => o.setAttribute('aria-pressed', 'false'));
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        document.querySelectorAll('.cm-map-section').forEach(s => {
            if (on) s.dataset.hl = b.dataset.strat; else delete s.dataset.hl;
        });
    }));

    /* ---------- Filtres des fiches ---------- */
    const state = { region: 'all', strat: 'all' };
    const regionBtns = document.querySelectorAll('.cm-filters [data-region]');
    const stratBtns = document.querySelectorAll('.cm-filters [data-fstrat]');
    const empty = document.querySelector('.cm-empty');

    function applyFilters() {
        let total = 0;
        document.querySelectorAll('.cm-region').forEach(sec => {
            let n = 0;
            sec.querySelectorAll('.cm-card').forEach(card => {
                const ok = (state.region === 'all' || card.dataset.region === state.region) &&
                    (state.strat === 'all' || card.dataset.strat === state.strat);
                card.hidden = !ok;
                if (ok) n++;
            });
            sec.hidden = n === 0;
            total += n;
        });
        if (empty) empty.hidden = total > 0;
        regionBtns.forEach(b => { const on = b.dataset.region === state.region; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
        stratBtns.forEach(b => { const on = b.dataset.fstrat === state.strat; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    }

    function resetFilters() { state.region = 'all'; state.strat = 'all'; applyFilters(); }

    regionBtns.forEach(b => b.addEventListener('click', () => { state.region = b.dataset.region; applyFilters(); }));
    stratBtns.forEach(b => b.addEventListener('click', () => { state.strat = b.dataset.fstrat; applyFilters(); }));

    /* ---------- Chargement du fond de carte ---------- */
    const world = document.getElementById('cm-world');
    const zoom = document.getElementById('cm-zoom');
    if (fig && world) {
        fetch(fig.dataset.src)
            .then(r => r.text())
            .then(txt => {
                const doc = new DOMParser().parseFromString(txt, 'image/svg+xml');
                const src = doc.documentElement;
                buildView(world, src, 'world');
                if (zoom) buildView(zoom, src, 'zoom');
                fig.classList.add('is-ready');
            })
            .catch(() => { fig.classList.add('is-error'); });
    }
})();

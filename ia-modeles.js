/* Page IA et modèles : schéma modèles → interfaces (interactif) + filtre de l'annuaire.
   Données : synthèse structurelle « Modèles, interfaces, données », nov. 2026. */
(function () {
    'use strict';

    const EN = document.documentElement.lang === 'en';
    const S = (fr, en) => (EN ? en : fr);
    const PRE = EN ? '../' : '';
    const L = (k) => PRE + 'images/' + k;

    /* ---------- Données du schéma ---------- */
    const MODEL_GROUPS = [
        { title: S('POIDS FERMÉS', 'CLOSED WEIGHTS'), open: false, ids: ['gpt', 'claude', 'gemini', 'grok', 'qwmax', 'muse', 'yandex'] },
        { title: S('POIDS OUVERTS', 'OPEN WEIGHTS'), open: true, ids: ['mistral', 'glm', 'deepseek', 'kimi', 'qwen', 'llama', 'nova', 'sonar', 'gemma'] }
    ];
    const MODELS = {
        gpt: { name: 'GPT-5.6 / GPT-6', sub: 'OpenAI', logo: 'carte/logos/openai.webp' },
        claude: { name: 'Claude 5', sub: 'Anthropic', logo: 'carte/logos/anthropic.webp' },
        gemini: { name: 'Gemini 3.x', sub: 'Google', logo: 'modeles/gemini.webp' },
        grok: { name: 'Grok 4.x', sub: 'xAI', logo: 'modeles/grok.webp' },
        qwmax: { name: 'Qwen3-Max', sub: S('Alibaba · phare', 'Alibaba · flagship'), logo: 'modeles/qwen.webp' },
        muse: { name: 'Muse Spark', sub: S('Meta · frontière', 'Meta · frontier'), logo: 'carte/logos/meta.webp' },
        yandex: { name: 'YandexGPT', sub: 'Yandex', logo: 'carte/logos/yandex.webp' },
        mistral: { name: 'Mistral L / S / M', sub: 'Mistral AI · Apache 2.0', logo: 'carte/logos/mistral.webp' },
        glm: { name: 'GLM', sub: 'Z.ai', logo: 'carte/logos/zai.webp' },
        deepseek: { name: 'DeepSeek V4', sub: 'DeepSeek · MIT', logo: 'carte/logos/deepseek.webp' },
        kimi: { name: 'Kimi K3', sub: S('Moonshot · 2 800 Md param.', 'Moonshot · 2.8T params'), logo: 'modeles/kimi.webp' },
        qwen: { name: S('Qwen (série)', 'Qwen (series)'), sub: 'Alibaba', logo: 'modeles/qwen.webp' },
        llama: { name: 'Llama', sub: 'Meta', logo: 'carte/logos/meta.webp' },
        nova: { name: 'Nova', sub: 'Amazon', logo: 'carte/logos/amazon.webp' },
        sonar: { name: 'Sonar', sub: S('Perplexity · dérivé de Llama', 'Perplexity · Llama derivative'), logo: 'modeles/perplexity.webp' },
        gemma: { name: 'Gemma', sub: S('Google · diffusion en aval', 'Google · downstream'), logo: 'carte/logos/google.webp' }
    };

    const IFACE_GROUPS = [
        { title: S('VERTICALES', 'VERTICAL'), ids: ['chatgpt', 'claude_ai', 'gemini_ai', 'grok_x', 'vibe', 'deepseek_app', 'kimi_app', 'qwen_chat'] },
        { title: S('ÉCOSYSTÈMES', 'ECOSYSTEMS'), ids: ['meta_ai', 'copilot', 'alexa', 'alice'] },
        { title: S('AGRÉGATEURS', 'AGGREGATORS'), ids: ['perplexity', 'venice'] },
        { title: S('LOCALES', 'LOCAL'), ids: ['ollama', 'opera'] }
    ];
    const IFACES = {
        chatgpt: { name: 'ChatGPT', sub: 'OpenAI', logo: 'carte/logos/openai.webp', zone: 'US' },
        claude_ai: { name: 'Claude.ai', sub: 'Anthropic', logo: 'carte/logos/anthropic.webp', zone: 'US' },
        gemini_ai: { name: 'Gemini', sub: 'Google', logo: 'modeles/gemini.webp', zone: 'US' },
        grok_x: { name: 'Grok', sub: S('xAI · sur X', 'xAI · on X'), logo: 'modeles/grok.webp', zone: 'US' },
        vibe: { name: 'Le Chat / Vibe', sub: 'Mistral AI', logo: 'carte/logos/mistral.webp', zone: S('UE', 'EU') },
        deepseek_app: { name: 'DeepSeek', sub: S('appli', 'app'), logo: 'carte/logos/deepseek.webp', zone: 'CN' },
        kimi_app: { name: 'Kimi', sub: 'Moonshot', logo: 'modeles/kimi.webp', zone: 'CN' },
        qwen_chat: { name: 'Qwen Chat', sub: 'Alibaba', logo: 'modeles/qwen.webp', zone: 'CN' },
        meta_ai: { name: 'Meta AI', sub: 'WhatsApp · Instagram', logo: 'carte/logos/meta.webp', zone: 'US' },
        copilot: { name: 'Copilot', sub: 'Windows · Office', logo: 'modeles/copilot.webp', zone: 'US' },
        alexa: { name: 'Alexa+', sub: 'Amazon', logo: 'modeles/alexa.webp', zone: 'US' },
        alice: { name: 'Alice', sub: 'Yandex', logo: 'modeles/alice.webp', zone: 'RU' },
        perplexity: { name: 'Perplexity', sub: S('recherche augmentée', 'augmented search'), logo: 'modeles/perplexity.webp', zone: 'US' },
        venice: { name: 'Venice', sub: S('zéro rétention', 'zero retention'), logo: 'modeles/venice.webp', zone: S('GPU', 'GPU') },
        ollama: { name: 'Ollama', sub: S('150+ modèles locaux', '150+ local models'), logo: 'modeles/ollama.webp', zone: S('LOCAL', 'LOCAL') },
        opera: { name: 'Opera', sub: S('navigateur', 'browser'), logo: 'carte/logos/opera.webp', zone: S('LOCAL', 'LOCAL') }
    };

    /* solid = moteur maison ; dashed = modèle tiers invité */
    const EDGES = [
        ['gpt', 'chatgpt', 'solid'], ['claude', 'claude_ai', 'solid'], ['gemini', 'gemini_ai', 'solid'],
        ['grok', 'grok_x', 'solid'], ['mistral', 'vibe', 'solid'], ['deepseek', 'deepseek_app', 'solid'],
        ['kimi', 'kimi_app', 'solid'], ['qwen', 'qwen_chat', 'solid'], ['qwmax', 'qwen_chat', 'solid'],
        ['muse', 'meta_ai', 'solid'], ['llama', 'meta_ai', 'solid'], ['nova', 'alexa', 'solid'],
        ['sonar', 'perplexity', 'solid'], ['yandex', 'alice', 'solid'],
        ['glm', 'vibe', 'dashed'], ['gpt', 'copilot', 'dashed'], ['claude', 'copilot', 'dashed'],
        ['grok', 'copilot', 'dashed'], ['claude', 'alexa', 'dashed'], ['mistral', 'alexa', 'dashed'],
        ['gpt', 'perplexity', 'dashed'], ['claude', 'perplexity', 'dashed'], ['gemini', 'perplexity', 'dashed'],
        ['grok', 'perplexity', 'dashed'], ['kimi', 'perplexity', 'dashed']
    ];
    /* Poids ouverts téléchargés : du bloc « ouverts » vers ces interfaces */
    const OPEN_FLOWS = ['venice', 'ollama', 'opera'];

    /* ---------- Géométrie ---------- */
    const W = 960, CW = 258, CH = 38, STEP = 45, GAP = 30, HEAD = 26;
    const LX = 0, RX = W - CW, BRX = CW + 14;

    function layout(groups) {
        const pos = {}, heads = [];
        let y = 0;
        groups.forEach((g, gi) => {
            if (gi) y += GAP;
            heads.push({ g, y: y + 14, top: y + HEAD, bottom: y + HEAD + g.ids.length * STEP - (STEP - CH) });
            y += HEAD;
            g.ids.forEach(id => { pos[id] = y; y += STEP; });
        });
        return { pos, heads, h: y };
    }

    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    function chip(kind, id, x, y, d, extra) {
        return `<g class="dg-node dg-${kind}${extra.cls || ''}" data-id="${id}" tabindex="0" role="button" aria-label="${esc(d.name)}">
  <rect class="dg-box" x="${x}" y="${y}" width="${CW}" height="${CH}" rx="6"/>
  ${extra.stripe ? `<rect class="dg-stripe" x="${x}" y="${y}" width="4" height="${CH}" rx="2"/>` : ''}
  <image href="${L(d.logo)}" x="${x + 12}" y="${y + 7}" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
  <text class="dg-name" x="${x + 46}" y="${y + 17}">${esc(d.name)}</text>
  <text class="dg-sub" x="${x + 46}" y="${y + 31}">${esc(d.sub)}</text>
  ${extra.zone ? `<text class="dg-zone" x="${x + CW - 10}" y="${y + 23}" text-anchor="end">${esc(extra.zone)}</text>` : ''}
</g>`;
    }

    function buildDiagram() {
        const svg = document.getElementById('ia-diagram');
        if (!svg) return;
        const LM = layout(MODEL_GROUPS), LI = layout(IFACE_GROUPS);
        const H = Math.max(LM.h, LI.h) + 4;
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

        const inCount = {}, outCount = {}, inIdx = {}, outIdx = {};
        EDGES.forEach(([f, t]) => { inCount[t] = (inCount[t] || 0) + 1; outCount[f] = (outCount[f] || 0) + 1; });
        OPEN_FLOWS.forEach(t => { inCount[t] = (inCount[t] || 0) + 1; });

        const portY = (base, idx, n) => base + CH / 2 + (n > 1 ? (idx - (n - 1) / 2) * Math.min(6, 26 / (n - 1)) : 0);

        let edges = '';
        EDGES.forEach(([f, t, kind]) => {
            const oi = outIdx[f] = (outIdx[f] || 0) + 1;
            const ii = inIdx[t] = (inIdx[t] || 0) + 1;
            const y1 = portY(LM.pos[f], oi - 1, outCount[f]);
            const y2 = portY(LI.pos[t], ii - 1, inCount[t]);
            const x1 = LX + CW, x2 = RX;
            const mx = (x1 + x2) / 2;
            edges += `<path class="dg-e dg-e-${kind}" data-from="${f}" data-to="${t}" d="M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2 - 3} ${y2}"/>`;
        });

        /* Accolade du bloc ouvert et flux de poids téléchargés */
        const oh = LM.heads[1];
        const by = (oh.top + oh.bottom) / 2;
        let flows = `<path class="dg-brace" d="M ${CW + 6} ${oh.top} h 8 V ${oh.bottom} h -8 M ${BRX} ${by} h 8"/>`;
        OPEN_FLOWS.forEach(t => {
            const ii = inIdx[t] = (inIdx[t] || 0) + 1;
            const y2 = portY(LI.pos[t], ii - 1, inCount[t]);
            const x1 = BRX + 8, x2 = RX;
            const mx = (x1 + x2) / 2 + 30;
            flows += `<path class="dg-e dg-e-dotted" data-from="@open" data-to="${t}" d="M ${x1} ${by} C ${mx} ${by}, ${mx} ${y2}, ${x2 - 3} ${y2}"/>`;
        });
        flows += `<text class="dg-flow-lbl" x="${BRX + 14}" y="${by - 8}">${esc(S('poids téléchargés', 'downloaded weights'))}</text>`;

        let heads = '';
        LM.heads.forEach(h => {
            heads += `<text class="dg-head ${h.g.open ? 'dg-head-open' : 'dg-head-closed'}" x="${LX + 2}" y="${h.y}">${esc(h.g.title)}</text>`;
        });
        LI.heads.forEach(h => {
            heads += `<text class="dg-head" x="${RX + 2}" y="${h.y}">${esc(h.g.title)}</text>`;
        });
        heads += `<text class="dg-head dg-head-col" x="${W / 2}" y="14" text-anchor="middle">${esc(S('MODÈLES → INTERFACES', 'MODELS → INTERFACES'))}</text>`;

        let nodes = '';
        MODEL_GROUPS.forEach(g => g.ids.forEach(id => {
            nodes += chip('model', id, LX, LM.pos[id], MODELS[id], { stripe: true, cls: g.open ? ' dg-open' : ' dg-closed' });
        }));
        IFACE_GROUPS.forEach(g => g.ids.forEach(id => {
            nodes += chip('iface', id, RX, LI.pos[id], IFACES[id], { zone: IFACES[id].zone });
        }));

        svg.innerHTML = `<g class="dg-edges">${edges}${flows}</g>${heads}${nodes}`;
        wireDiagram(svg);
    }

    /* ---------- Interaction : isoler les liens d'un nœud ---------- */
    function describe(id, isModel) {
        const own = [], third = [];
        if (isModel) {
            EDGES.forEach(([f, t, k]) => { if (f === id) (k === 'solid' ? own : third).push(IFACES[t].name); });
            const m = MODELS[id];
            if (!own.length && !third.length) {
                return `<strong>${esc(m.name)}</strong> : ${esc(S('aucune interface grand public ici ; ses poids ouverts servent surtout à d’autres développeurs.', 'no consumer interface here; its open weights mostly serve other developers.'))}`;
            }
            let s = `<strong>${esc(m.name)}</strong> ${esc(S('alimente', 'powers'))} `;
            const parts = [];
            if (own.length) parts.push(`${esc(own.join(', '))} <em>(${esc(S('maison', 'in-house'))})</em>`);
            if (third.length) parts.push(`${esc(third.join(', '))} <em>(${esc(S('en invité', 'as a guest'))})</em>`);
            return s + parts.join(S(' et ', ' and ')) + '.';
        }
        EDGES.forEach(([f, t, k]) => { if (t === id) (k === 'solid' ? own : third).push(MODELS[f].name); });
        const i = IFACES[id];
        const parts = [];
        if (own.length) parts.push(`${esc(own.join(', '))} <em>(${esc(S('maison', 'in-house'))})</em>`);
        if (third.length) parts.push(`${esc(third.join(', '))} <em>(${esc(S('tiers', 'third-party'))})</em>`);
        if (OPEN_FLOWS.includes(id)) parts.push(`${esc(S('les modèles à poids ouverts de votre choix', 'the open-weight models of your choice'))}`);
        return `<strong>${esc(i.name)}</strong> ${esc(S('utilise', 'uses'))} ${parts.join(S(' et ', ' and '))}.`;
    }

    function wireDiagram(svg) {
        const readout = document.getElementById('dg-readout');
        const hint = readout ? readout.innerHTML : '';
        const nodes = svg.querySelectorAll('.dg-node');
        const paths = svg.querySelectorAll('.dg-e');
        const openIds = MODEL_GROUPS[1].ids;
        let pinned = null;

        function show(id) {
            if (!id) {
                svg.classList.remove('is-focus');
                nodes.forEach(n => n.classList.remove('is-on'));
                paths.forEach(p => p.classList.remove('is-on'));
                if (readout) readout.innerHTML = hint;
                return;
            }
            const isModel = !!MODELS[id];
            const linked = new Set([id]);
            paths.forEach(p => {
                const f = p.dataset.from, t = p.dataset.to;
                let on = f === id || t === id;
                if (f === '@open' && isModel && openIds.includes(id)) on = true;
                p.classList.toggle('is-on', on);
                if (on) {
                    if (f === '@open') { if (!isModel) openIds.forEach(o => linked.add(o)); }
                    else linked.add(f);
                    linked.add(t);
                }
            });
            svg.classList.add('is-focus');
            nodes.forEach(n => n.classList.toggle('is-on', linked.has(n.dataset.id)));
            if (readout) readout.innerHTML = describe(id, isModel);
        }

        nodes.forEach(n => {
            const id = n.dataset.id;
            n.addEventListener('mouseenter', () => { if (!pinned) show(id); });
            n.addEventListener('mouseleave', () => { if (!pinned) show(null); });
            n.addEventListener('focus', () => show(id));
            n.addEventListener('blur', () => { if (!pinned) show(null); });
            n.addEventListener('click', (e) => {
                e.stopPropagation();
                pinned = pinned === id ? null : id;
                show(pinned);
            });
            n.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); n.dispatchEvent(new MouseEvent('click')); }
                if (e.key === 'Escape') { pinned = null; show(null); n.blur(); }
            });
        });
        svg.addEventListener('click', () => { pinned = null; show(null); });
    }

    /* ---------- Annuaire : filtre « où partent vos données » ---------- */
    function wireFilter() {
        const chips = document.querySelectorAll('.im-filter .im-chip');
        const cards = document.querySelectorAll('.im-card');
        const groups = document.querySelectorAll('.im-group');
        chips.forEach(c => c.addEventListener('click', () => {
            const z = c.dataset.zone;
            chips.forEach(o => o.setAttribute('aria-pressed', String(o === c)));
            cards.forEach(card => { card.hidden = z !== 'all' && card.dataset.zone !== z; });
            groups.forEach(g => { g.hidden = !g.querySelector('.im-card:not([hidden])'); });
        }));
    }


    function init() { buildDiagram(); wireFilter(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();

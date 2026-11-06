/* Page IA et modèles — grand schéma SVG : modèles, interfaces, flèches.
   Données : synthèse structurelle « Modèles, interfaces, données », nov. 2026. */

/* i18n léger : la page EN recharge le même script */
const I18N_EN = document.documentElement.lang === 'en';
const S = (fr, en) => (I18N_EN ? (en !== undefined ? en : fr) : fr);
const LOGO = (p) => (I18N_EN ? '../' + p : p);

/* --- Nœuds --- */
const MODELS = {
    /*_cluster ouverts (3 colonnes x 3 rangées) */
    mistral:    { open: true,  col: 0, row: 0, name: 'Mistral L/S/M', sub: 'Mistral AI · France', logo: 'images/mistral_logo.png' },
    llama:      { open: true,  col: 1, row: 0, name: 'Llama', sub: 'Meta', logo: 'images/meta_logo.jpg' },
    deepseek:   { open: true,  col: 2, row: 0, name: 'DeepSeek V4', sub: 'DeepSeek · MIT', logo: 'images/deepseek_logo.svg' },
    kimi:       { open: true,  col: 0, row: 1, name: 'Kimi K3', sub: 'Moonshot · 2 800 Md', logo: 'images/kimi_logo.jpg' },
    qwen:       { open: true,  col: 1, row: 1, name: 'Qwen (série)', sub: 'Alibaba', logo: 'images/qwen_logo.svg' },
    glm:        { open: true,  col: 2, row: 1, name: 'GLM', sub: 'Z.ai', logo: 'images/zai_logo.png' },
    sonar:      { open: true,  col: 0, row: 2, name: 'Sonar', sub: S('dérivé Llama · Perplexity', 'Llama derivative · Perplexity'), logo: 'images/perplexity_logo.svg' },
    nova:       { open: true,  col: 1, row: 2, name: 'Nova', sub: 'Amazon', logo: 'images/amazon_logo.svg' },
    gemma:      { open: true,  col: 2, row: 2, name: 'Gemma', sub: S('Google · diffusion en aval', 'Google · downstream diffusion'), logo: 'images/gemini_logo.svg' },
    /* cluster fermés (2 colonnes x 4 rangées) */
    gpt:        { open: false, col: 0, row: 0, name: 'GPT-5.6 / GPT-6', sub: 'OpenAI', logo: 'images/openai_logo.png' },
    claude:     { open: false, col: 1, row: 0, name: 'Claude 5', sub: 'Anthropic', logo: 'images/claude_logo.png' },
    gemini:     { open: false, col: 0, row: 1, name: 'Gemini 3.x', sub: 'Google', logo: 'images/gemini_logo.svg' },
    grok:       { open: false, col: 1, row: 1, name: 'Grok 4.x', sub: 'xAI', logo: 'images/grok_logo.jpg' },
    qwmax:      { open: false, col: 0, row: 2, name: 'Qwen3-Max', sub: 'Alibaba · flagship', logo: 'images/qwen_logo.svg' },
    muse:       { open: false, col: 1, row: 2, name: 'Muse Spark', sub: 'Meta · frontière', logo: 'images/meta_logo.jpg' },
    yandex:     { open: false, col: 0, row: 3, name: 'YandexGPT', sub: 'Yandex', logo: 'images/yandex_logo.png' }
};

const IFACES = {
    /* verticales */
    chatgpt:      { group: 'V', row: 0, name: 'ChatGPT', sub: 'OpenAI', logo: 'images/openai_logo.png' },
    claude_ai:    { group: 'V', row: 1, name: 'Claude.ai', sub: 'Anthropic', logo: 'images/claude_logo.png' },
    gemini_ai:    { group: 'V', row: 2, name: 'Gemini', sub: 'Google', logo: 'images/gemini_logo.svg' },
    grok_x:       { group: 'V', row: 3, name: 'Grok', sub: S('sur X · xAI', 'on X · xAI'), logo: 'images/grok_logo.jpg' },
    vibe:         { group: 'V', row: 4, name: 'Le Chat / Vibe', sub: 'Mistral (+ GLM)', logo: 'images/mistral_logo.png' },
    deepseek_app: { group: 'V', row: 5, name: 'DeepSeek', sub: 'DeepSeek', logo: 'images/deepseek_logo.svg' },
    kimi_app:     { group: 'V', row: 6, name: 'Kimi', sub: 'Moonshot', logo: 'images/kimi_logo.jpg' },
    qwen_chat:    { group: 'V', row: 7, name: 'Qwen Chat', sub: 'Alibaba', logo: 'images/qwen_logo.svg' },
    /* écosystèmes */
    meta_ai:      { group: 'E', row: 0, name: 'Meta AI', sub: 'WhatsApp · Instagram', logo: 'images/meta_logo.jpg' },
    copilot:      { group: 'E', row: 1, name: 'Copilot', sub: 'Windows · Office', logo: 'images/copilot_logo.webp' },
    alexa:        { group: 'E', row: 2, name: 'Alexa+', sub: 'Amazon', logo: 'images/amazon_logo.svg' },
    alice:        { group: 'E', row: 3, name: 'Alice', sub: 'Yandex', logo: 'images/yandex_logo.png' },
    /* agrégateurs */
    perplexity:   { group: 'A', row: 0, name: 'Perplexity', sub: S('recherche augmentée', 'augmented search'), logo: 'images/perplexity_logo.svg' },
    venice:       { group: 'A', row: 1, name: 'Venice', sub: S('zéro rétention', 'zero retention'), logo: 'images/venice_logo.png' },
    /* locales */
    ollama:       { group: 'L', row: 0, name: 'Ollama', sub: S('150+ modèles locaux', '150+ local models'), logo: 'images/ollama_logo.png' },
    opera:        { group: 'L', row: 1, name: 'Opera', sub: S('navigateur', 'browser'), logo: 'images/opera_logo.png' }
};

const GROUPS = {
    V: { x: 45,  title: S('VERTICALES', 'VERTICAL'), sub: S('le chatbot pur, modèles maison', 'the pure chatbot, in-house models') },
    E: { x: 335, title: S('ÉCOSYSTÈMES', 'ECOSYSTEM'), sub: S('greffée sur une plateforme', 'grafted onto a platform') },
    A: { x: 625, title: S('AGRÉGATEURS', 'AGGREGATORS'), sub: S('modèles tiers, orchestration', 'third-party models, orchestration') },
    L: { x: 915, title: S('LOCALES', 'LOCAL'), sub: S('sur votre machine', 'on your machine') }
};

/* --- Liens : solide = moteur maison ; dashed = modèle tiers invité --- */
const EDGES = [
    ['gpt', 'chatgpt', 'solid'], ['claude', 'claude_ai', 'solid'], ['gemini', 'gemini_ai', 'solid'],
    ['grok', 'grok_x', 'solid'], ['mistral', 'vibe', 'solid'], ['deepseek', 'deepseek_app', 'solid'],
    ['kimi', 'kimi_app', 'solid'], ['qwen', 'qwen_chat', 'solid'], ['qwmax', 'qwen_chat', 'solid'],
    ['muse', 'meta_ai', 'solid'], ['llama', 'meta_ai', 'solid'], ['nova', 'alexa', 'solid'],
    ['sonar', 'perplexity', 'solid'], ['yandex', 'alice', 'solid'],
    ['glm', 'vibe', 'dashed'], ['gpt', 'copilot', 'dashed'], ['claude', 'copilot', 'dashed'],
    ['grok', 'copilot', 'dashed'], ['mistral', 'alexa', 'dashed'],
    ['gpt', 'perplexity', 'dashed'], ['claude', 'perplexity', 'dashed'], ['gemini', 'perplexity', 'dashed'],
    ['grok', 'perplexity', 'dashed'], ['kimi', 'perplexity', 'dashed']
];

/* Liens spéciaux depuis le cluster des poids ouverts */
const OPEN_FLOWS = [
    { to: 'venice', label: S('GPU décentralisés', 'decentralized GPUs') },
    { to: 'ollama', label: S('téléchargés chez vous', 'downloaded to your machine') }
];

/* --- Géométrie --- */
const OPEN_CLUSTER  = { x: 40, y: 56, w: 600, h: 326 };
const CLOSED_CLUSTER = { x: 680, y: 56, w: 520, h: 326 };
const M_CHIP = { w: 176, h: 54, dx: 16, dy: 14, x0: 60, y0: 100 };   /* ouverts : 3 colonnes */
const C_CHIP = { w: 238, h: 54, dx: 20, dy: 14, x0: 704, y0: 100 };  /* fermés : 2 colonnes */
const I_CHIP = { w: 250, h: 46, x: 0, y0: 502, dy: 58 };

function modelPos(id) {
    const m = MODELS[id];
    if (m.open) return { x: M_CHIP.x0 + m.col * (M_CHIP.w + M_CHIP.dx), y: M_CHIP.y0 + m.row * (M_CHIP.h + M_CHIP.dy), w: M_CHIP.w, h: M_CHIP.h };
    return { x: C_CHIP.x0 + m.col * (C_CHIP.w + C_CHIP.dx), y: C_CHIP.y0 + m.row * (C_CHIP.h + C_CHIP.dy), w: C_CHIP.w, h: C_CHIP.h };
}

function ifacePos(id) {
    const i = IFACES[id];
    return { x: GROUPS[i.group].x, y: I_CHIP.y0 + i.row * I_CHIP.dy, w: I_CHIP.w, h: I_CHIP.h };
}

function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function chipSvg(id, p, name, sub, logo, cls) {
    return `
  <g class="dg-chip ${cls}" data-id="${id}">
    <rect class="dg-chip-rect" x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="10"/>
    <rect class="dg-tile" x="${p.x + 10}" y="${p.y + (p.h - 36) / 2}" width="36" height="36" rx="8"/>
    <image href="${LOGO(logo)}" x="${p.x + 15}" y="${p.y + (p.h - 36) / 2 + 5}" width="26" height="26" preserveAspectRatio="xMidYMid meet"/>
    <text class="dg-name" x="${p.x + 56}" y="${p.y + p.h / 2 - 5}">${esc(name)}</text>
    <text class="dg-sub" x="${p.x + 56}" y="${p.y + p.h / 2 + 12}">${esc(sub)}</text>
  </g>`;
}

function buildDiagram() {
    /* Décalages d'arrivée : quand plusieurs flèches ciblent la même interface, on les répartit */
    const inMap = {};
    EDGES.forEach(([from, to]) => { (inMap[to] = inMap[to] || []).push(from); });

    let edges = '';
    EDGES.forEach(([from, to, kind]) => {
        const f = modelPos(from);
        const t = ifacePos(to);
        const list = inMap[to];
        const i = list.indexOf(from);
        const n = list.length;
        const spread = n > 1 ? (i - (n - 1) / 2) * Math.min(28, 220 / n) : 0;
        const fx = Math.min(Math.max(f.x + f.w / 2, f.x + 18), f.x + f.w - 18);
        const fy = f.y + f.h;
        const tx = t.x + t.w / 2 + spread;
        const ty = t.y;
        edges += `
  <path class="dg-edge dg-edge-${kind}" d="M ${fx} ${fy} C ${fx} ${fy + 45}, ${tx} ${ty - 45}, ${tx} ${ty}"/>`;
    });

    /* Les chemins spéciaux partent du bord droit du cluster des poids ouverts */
    OPEN_FLOWS.forEach(flow => {
        const t = ifacePos(flow.to);
        const fx = OPEN_CLUSTER.x + OPEN_CLUSTER.w;
        const fy = OPEN_CLUSTER.y + OPEN_CLUSTER.h / 2 + (flow.to === 'venice' ? -30 : 30);
        const tx = t.x + t.w / 2;
        const ty = t.y;
        const midX = (fx + tx) / 2, midY = (fy + ty) / 2;
        edges += `
  <path class="dg-edge dg-edge-cluster" d="M ${fx} ${fy} C ${fx + 60} ${fy}, ${tx} ${ty - 60}, ${tx} ${ty}"/>
  <text class="dg-flow-label" x="${midX + 6}" y="${midY - 8}">${esc(flow.label)}</text>`;
    });

    let models = '';
    Object.keys(MODELS).forEach(id => {
        const m = MODELS[id];
        models += chipSvg(id, modelPos(id), m.name, m.sub, m.logo, m.open ? 'dg-model-open' : 'dg-model-closed');
    });

    let ifaces = '';
    Object.keys(IFACES).forEach(id => {
        const i = IFACES[id];
        ifaces += chipSvg(id, ifacePos(id), i.name, i.sub, i.logo, 'dg-iface');
    });

    let groups = '';
    Object.keys(GROUPS).forEach(g => {
        const G = GROUPS[g];
        const count = Object.values(IFACES).filter(i => i.group === g).length;
        const h = (count - 1) * I_CHIP.dy + I_CHIP.h + 70;
        groups += `
  <rect class="dg-group-rect" x="${G.x - 7}" y="446" width="264" height="${h}" rx="12"/>
  <text class="dg-group-title" x="${G.x}" y="470">${esc(G.title)}</text>
  <text class="dg-group-sub" x="${G.x}" y="486">${esc(G.sub)}</text>`;
    });

    document.getElementById('ia-diagram').innerHTML = `
  <defs>
    <marker id="dg-arr-solid" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#E0C068"/>
    </marker>
    <marker id="dg-arr-dashed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(224,192,104,.7)"/>
    </marker>
    <marker id="dg-arr-cluster" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(240,240,240,.45)"/>
    </marker>
  </defs>

  <text class="dg-band-title" x="40" y="30">${S('COUCHE 1 · LES MODÈLES — ce qui « pense »', 'LAYER 1 · THE MODELS — the thinking part')}</text>

  <rect class="dg-cluster dg-cluster-open" x="${OPEN_CLUSTER.x}" y="${OPEN_CLUSTER.y}" width="${OPEN_CLUSTER.w}" height="${OPEN_CLUSTER.h}" rx="14"/>
  <text class="dg-cluster-title dg-cluster-title-open" x="${OPEN_CLUSTER.x + 20}" y="${OPEN_CLUSTER.y + 28}">${S('POIDS OUVERTS', 'OPEN WEIGHTS')}</text>
  <text class="dg-cluster-sub" x="${OPEN_CLUSTER.x + 20}" y="${OPEN_CLUSTER.y + 44}">${S('téléchargeables, utilisables par d\u2019autres interfaces', 'downloadable, usable by other interfaces')}</text>

  <rect class="dg-cluster dg-cluster-closed" x="${CLOSED_CLUSTER.x}" y="${CLOSED_CLUSTER.y}" width="${CLOSED_CLUSTER.w}" height="${CLOSED_CLUSTER.h}" rx="14"/>
  <text class="dg-cluster-title dg-cluster-title-closed" x="${CLOSED_CLUSTER.x + 20}" y="${CLOSED_CLUSTER.y + 28}">${S('POIDS FERMÉS', 'CLOSED WEIGHTS')}</text>
  <text class="dg-cluster-sub" x="${CLOSED_CLUSTER.x + 20}" y="${CLOSED_CLUSTER.y + 44}">${S('non téléchargeables, chez l\u2019éditeur', 'not downloadable, on the vendor side')}</text>

  <text class="dg-band-title" x="40" y="426">${S('COUCHE 2 · LES INTERFACES — ce que l\u2019utilisateur voit', 'LAYER 2 · THE INTERFACES — what the user sees')}</text>
${edges}
${groups}
${models}
${ifaces}`;
}

document.addEventListener('DOMContentLoaded', buildDiagram);

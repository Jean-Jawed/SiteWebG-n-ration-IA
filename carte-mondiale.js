/* Page Carte mondiale — placement des points (lat/lon → equirectangulaire)
   Le fond de carte couvre 90°N -> 60°S (le bas de l'Antarctique est coupé). */

/* i18n léger : la page EN recharge le même script */
const I18N_EN = document.documentElement.lang === 'en';
const S = (fr, en) => (I18N_EN ? (en !== undefined ? en : fr) : fr);

const CM_DOTS = [
    { id: 'c-france',     name: 'France',            actor: 'Mistral AI',          lat: 46.6,  lon: 2.4,    st: 'dispo' },
    { id: 'c-suisse',     name: S('Suisse', 'Switzerland'),            actor: 'Apertus',             lat: 46.8,  lon: 8.2,    st: 'dispo' },
    { id: 'c-allemagne',  name: S('Allemagne', 'Germany'),         actor: 'Aleph Alpha, Flux',   lat: 50.4,  lon: 9.6,    st: 'dispo' },
    { id: 'c-royaume-uni', name: S('Royaume-Uni', 'United Kingdom'),      actor: 'DeepMind',            lat: 52.5,  lon: -1.6,   st: 'dispo' },
    { id: 'c-finlande',   name: S('Finlande', 'Finland'),         actor: 'Silo AI',             lat: 61.5,  lon: 24.9,   st: 'dispo' },
    { id: 'c-norvege',   name: S('Norvège', 'Norway'),           actor: 'Opera',               lat: 60.0,  lon: 10.5,   st: 'dispo' },
    { id: 'c-pologne',    name: 'Pologne',           actor: 'Bielik',              lat: 52.1,  lon: 19.5,   st: 'dispo' },
    { id: 'c-italie',     name: S('Italie', 'Italy'),            actor: 'Minerva',             lat: 42.6,  lon: 12.6,   st: 'dispo' },
    { id: 'c-canada',     name: 'Canada',           actor: 'Cohere',              lat: 43.7,  lon: -79.4,  st: 'dispo' },
    { id: 'c-bresil',     name: S('Brésil', 'Brazil'),            actor: 'Sabiá — Maritaca',    lat: -23.6, lon: -46.6,  st: 'dispo' },
    { id: 'c-argentine',  name: S('Argentine', 'Argentina'),         actor: 'Latam-GPT',           lat: -34.6, lon: -58.4,  st: 'endev' },
    { id: 'c-mexique',    name: S('Mexique', 'Mexico'),           actor: 'Mexico IA',           lat: 19.4,  lon: -99.1,  st: 'endev' },
    { id: 'c-emirats',    name: S('Émirats', 'UAE'),           actor: 'Falcon, Jais',        lat: 24.5,  lon: 54.4,   st: 'dispo' },
    { id: 'c-qatar',      name: 'Qatar',             actor: 'Fanar',               lat: 25.3,  lon: 51.5,   st: 'dispo' },
    { id: 'c-arabie',     name: S('Arabie saoudite', 'Saudi Arabia'),   actor: 'ALLaM, HUMAIN',       lat: 24.7,  lon: 46.7,   st: 'dispo' },
    { id: 'c-afsu',       name: S('Afrique du Sud', 'South Africa'),    actor: 'Lelapa AI',           lat: -26.2, lon: 28.0,   st: 'dispo' },
    { id: 'c-egypte',     name: S('Égypte', 'Egypt'),            actor: 'Karnak',              lat: 30.0,  lon: 31.2,   st: 'dispo' },
    { id: 'c-maroc',      name: S('Maroc', 'Morocco'),             actor: 'Maroc IA 2030',       lat: 31.8,  lon: -7.9,   st: 'endev' },
    { id: 'c-algerie',    name: S('Algérie', 'Algeria'),            actor: 'DziriBOT',            lat: 36.7,  lon: 3.1,    st: 'endev' },
    { id: 'c-nigeria',    name: S('Nigéria', 'Nigeria'),            actor: 'N-ATLAS',             lat: 9.1,   lon: 7.4,    st: 'endev' },
    { id: 'c-rwanda',     name: 'Rwanda',            actor: 'Digital Umuganda',    lat: -1.95, lon: 30.06,  st: 'dispo' },
    { id: 'c-namibie',    name: S('Namibie', 'Namibia'),            actor: 'Institut nat. d\u2019IA', lat: -22.6, lon: 17.08, st: 'endev' },
    { id: 'c-russie',     name: S('Russie', 'Russia'),            actor: 'Alice / GigaChat',    lat: 55.75, lon: 37.6,   st: 'dispo' },
    { id: 'c-japon',      name: S('Japon', 'Japan'),             actor: 'tsuzumi, Sakana AI',  lat: 35.7,  lon: 139.7,  st: 'dispo' },
    { id: 'c-coree',      name: S('Corée du Sud', 'South Korea'),       actor: 'HyperCLOVA, EXAONE', lat: 37.2,  lon: 127.0,  st: 'dispo' },
    { id: 'c-inde',       name: S('Inde', 'India'),              actor: 'Sarvam, Krutrim',     lat: 13.0,  lon: 77.6,   st: 'dispo' },
    { id: 'c-singapour',  name: 'Singapour',         actor: 'SEA-LION',            lat: 1.35,  lon: 103.82, st: 'dispo' },
    { id: 'c-vietnam',    name: 'Vietnam',           actor: 'FPT AI Factory',      lat: 21.0,  lon: 105.8,  st: 'dispo' },
    { id: 'c-kazakhstan', name: 'Kazakhstan',        actor: 'KazLLM',              lat: 51.1,  lon: 71.4,   st: 'dispo' },
    { id: 'c-australie',  name: S('Australie', 'Australia'),         actor: 'Leonardo.Ai',         lat: -33.9, lon: 151.2,  st: 'dispo' }
];

document.addEventListener('DOMContentLoaded', () => {
    const holder = document.getElementById('cm-dots');
    if (!holder) return;

    const LAT_TOP = 90, LAT_BOT = -60;

    CM_DOTS.forEach(d => {
        const x = (d.lon + 180) / 360 * 100;
        const y = (LAT_TOP - d.lat) / (LAT_TOP - LAT_BOT) * 100;
        const a = document.createElement('a');
        a.className = 'cm-dot-link st-' + d.st;
        a.href = '#' + d.id;
        a.style.left = x + '%';
        a.style.top = y + '%';
        a.setAttribute('aria-label', d.name + ' : ' + d.actor);
        a.innerHTML = '<span class="cm-dot-core"></span>' +
            '<span class="cm-tip"><strong>' + d.name + '</strong> — ' + d.actor + '</span>';
        a.addEventListener('click', e => {
            const target = document.getElementById(d.id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.add('cm-flash');
                setTimeout(() => target.classList.remove('cm-flash'), 2200);
                history.replaceState(null, '', '#' + d.id);
            }
        });
        holder.appendChild(a);
    });
});

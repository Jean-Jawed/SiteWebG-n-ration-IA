const EN = document.documentElement.lang === 'en';
const T = (fr, en) => (EN ? (en !== undefined ? en : fr) : fr);

const EN_NAV = {
    'Accueil': 'Home',
    'IA et modèles': 'AI & models',
    'Carte mondiale': 'World map',
    'Comment ça marche ?': 'How does it work?',
    'Multimédia': 'Multimedia',
    'Prompting': 'Prompting',
    'Art & IA': 'AI & Art',
    'Énergie': 'Energy',
    "L'IA offline": 'Offline AI',
    'Développeurs': 'Developers',
    'Enseignants': 'Teachers',
    'Archipelle': 'Archipelle',
    'À propos': 'About'
};

const SITE_NAV = [
    {
        label: 'Découvrir', items: [
            { href: 'index.html', text: 'Accueil', icon: 'fa-house' },
            { href: 'ia-modeles.html', text: 'IA et modèles', icon: 'fa-layer-group' },
            { href: 'carte-mondiale.html', text: 'Carte mondiale', icon: 'fa-globe' },
            { href: 'howitworks.html', text: 'Comment ça marche ?', icon: 'fa-diagram-project' },
            { href: 'multimedia.html', text: 'Multimédia', icon: 'fa-photo-film' },
            { href: 'prompting.html', text: 'Prompting', icon: 'fa-terminal' },
            { href: 'art.html', text: 'Art & IA', icon: 'fa-palette' },
        ]
    },
    {
        label: 'Approfondir', items: [
            { href: 'energie.html', text: 'Énergie', icon: 'fa-bolt' },
            { href: 'offline.html', text: "L'IA offline", icon: 'fa-plug-circle-xmark' },
            { href: 'developpeurs.html', text: 'Développeurs', icon: 'fa-code' },
            { href: 'enseignants.html', text: 'Enseignants', icon: 'fa-graduation-cap' },
        ]
    },
    {
        label: 'Le studio', items: [
            { href: 'archipelle.html', text: 'Archipelle', icon: 'fa-water' },
            { href: 'about.html', text: 'À propos', icon: 'fa-circle-info' },
        ]
    }
];

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const current = window.location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
        let n = 0;
        const groups = SITE_NAV.map(group => `
            <div class="snav-group">
                <p class="snav-label">${T(group.label, { 'Découvrir': 'Discover', 'Approfondir': 'Go deeper', 'Le studio': 'The studio' }[group.label])}</p>
                <ul>
                    ${group.items.map(item => {
                        n++;
                        const label = T(item.text, EN_NAV[item.text]);
                        const active = item.href.replace(/\.html$/, '') === current;
                        return `<li style="--i:${n}"><a href="${item.href}"${active ? ' class="is-active" aria-current="page"' : ''} title="${label}">
                            <span class="snav-num">${String(n).padStart(2, '0')}</span>
                            <span class="snav-text">${label}</span>
                            <i class="fa-solid ${item.icon} snav-icon" aria-hidden="true"></i>
                        </a></li>`;
                    }).join('')}
                </ul>
            </div>`).join('');

        this.innerHTML = `
    <header class="snav-bar">
        <a href="index.html" class="logo"><span class="logo-full">GÉNÉRATION</span><span>-IA</span></a>
        <div class="snav-bar-right">
            <a class="snav-lang snav-lang-mobile" href="/en/" hreflang="en">EN</a>
            <button class="snav-toggle" type="button" aria-expanded="false" aria-controls="snav-panel">
                <span class="snav-toggle-text">Menu</span>
                <span class="snav-toggle-icon" aria-hidden="true"><span></span><span></span></span>
            </button>
        </div>
    </header>
    <a class="snav-lang snav-lang-desktop" href="/en/" hreflang="en">EN</a>
    <div class="snav-backdrop" hidden></div>
    <nav class="snav" id="snav-panel" aria-label="Navigation principale">
        <div class="snav-head">
            <a href="index.html" class="logo snav-logo"><span class="logo-full">GÉNÉRATION</span><span>-IA</span></a>
            <p class="snav-tagline">${T("Comprendre l'IA générative", 'Understanding generative AI')}</p>
        </div>
        <button class="snav-collapse" type="button" aria-expanded="true" aria-controls="snav-panel">
            <i class="fa-solid fa-angles-left" aria-hidden="true"></i>
        </button>
        <div class="snav-groups">${groups}</div>
        <div class="snav-foot">
            <span class="snav-dot" aria-hidden="true"></span>
            <span class="snav-foot-link">${T('Une agence', 'A')} <a href="https://virgule-studio.fr" target="_blank" rel="noopener noreferrer">Virgule-Studio</a></span>
        </div>
    </nav>
        `;

        const toggle = this.querySelector('.snav-toggle');
        const backdrop = this.querySelector('.snav-backdrop');
        const panel = this.querySelector('.snav');
        const setOpen = open => {
            document.body.classList.toggle('snav-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            if (open) backdrop.hidden = false;
            else setTimeout(() => { if (!document.body.classList.contains('snav-open')) backdrop.hidden = true; }, 400);
            toggle.querySelector('.snav-toggle-text').textContent = open ? T('Fermer', 'Close') : 'Menu';
        };
        toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('snav-open')));
        backdrop.addEventListener('click', () => setOpen(false));
        panel.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && document.body.classList.contains('snav-open')) { setOpen(false); toggle.focus(); }
        });
        window.matchMedia('(min-width: 1100px)').addEventListener('change', e => { if (e.matches) setOpen(false); });

        // Repli / déploiement de la barre latérale (desktop)
        const collapseBtn = this.querySelector('.snav-collapse');
        const readStored = () => {
            try { return localStorage.getItem('snav-collapsed'); }
            catch (e) { return null; }
        };
        const setCollapsed = c => {
            document.body.classList.toggle('snav-collapsed', c);
            collapseBtn.setAttribute('aria-expanded', String(!c));
            collapseBtn.setAttribute('aria-label', c ? 'Déplier la barre de navigation' : 'Replier la barre de navigation');
        };
        setCollapsed(readStored() === '1');
        collapseBtn.addEventListener('click', () => {
            setCollapsed(!document.body.classList.contains('snav-collapsed'));
            try {
                localStorage.setItem('snav-collapsed', document.body.classList.contains('snav-collapsed') ? '1' : '0');
            } catch (e) { /* stockage indisponible : on ignore */ }
        });

        const bar = this.querySelector('.snav-bar');

        // Lien de changement de langue (FR <-> EN)
        const path = window.location.pathname;
        const isEn = path.includes('/en/');
        const file = (path.split('/').pop() || 'index.html');
        const other = isEn
            ? (file === 'index.html' ? '/' : '/' + file)
            : '/en/' + (file === 'index.html' ? '' : file);
        const langLinks = this.querySelectorAll('.snav-lang');
        langLinks.forEach(link => {
            link.href = other;
            link.textContent = isEn ? 'FR' : 'EN';
            link.setAttribute('aria-label', isEn
                ? 'Switch to the French version'
                : 'Passer \u00e0 la version anglaise');
        });

        const onScroll = () => bar.classList.toggle('scrolled', window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section about">
                    <h3>Génération-IA</h3>
                    <p>${T("Explorer le futur de l'intelligence artificielle et ses applications dans tous les domaines.", 'Exploring the future of artificial intelligence and its applications across all fields.')}</p>
                </div>
                <div class="footer-section links">
                    <h3>${T('Liens rapides', 'Quick links')}</h3>
                    <ul>
                        <li><a href="index.html">${T('Accueil', 'Home')}</a></li>
                        <li><a href="ia-modeles.html">${T('IA et modèles', 'AI & models')}</a></li>
                        <li><a href="carte-mondiale.html">${T('Carte mondiale', 'World map')}</a></li>
                        <li><a href="multimedia.html">${T('Multimédia', 'Multimedia')}</a></li>
                        <li><a href="enseignants.html">${T('Enseignants', 'Teachers')}</a></li>
                        <li><a href="offline.html">${T("L'IA offline", 'Offline AI')}</a></li>
                        <li><a href="archipelle.html">${T('Archipelle', 'Archipelle')}</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Génération-IA. ${T('Tous droits réservés. Conception et contenu du site par', 'All rights reserved. Site design and content by')} <a href="https://virgule-studio.fr" target="_blank" rel="noopener noreferrer">Virgule-Studio</a>.</p>
            </div>
        </div>
    </footer>
        `;
    }
}

// Définition des Web Components
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
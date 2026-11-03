const SITE_NAV = [
    {
        label: 'Découvrir', items: [
            { href: 'index.html', text: 'Accueil', icon: 'fa-house' },
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
                <p class="snav-label">${group.label}</p>
                <ul>
                    ${group.items.map(item => {
                        n++;
                        const active = item.href.replace(/\.html$/, '') === current;
                        return `<li style="--i:${n}"><a href="${item.href}"${active ? ' class="is-active" aria-current="page"' : ''}>
                            <span class="snav-num">${String(n).padStart(2, '0')}</span>
                            <span class="snav-text">${item.text}</span>
                            <i class="fa-solid ${item.icon} snav-icon" aria-hidden="true"></i>
                        </a></li>`;
                    }).join('')}
                </ul>
            </div>`).join('');

        this.innerHTML = `
    <header class="snav-bar">
        <a href="index.html" class="logo">GÉNÉRATION<span>-IA</span></a>
        <button class="snav-toggle" type="button" aria-expanded="false" aria-controls="snav-panel">
            <span class="snav-toggle-text">Menu</span>
            <span class="snav-toggle-icon" aria-hidden="true"><span></span><span></span></span>
        </button>
    </header>
    <div class="snav-backdrop" hidden></div>
    <nav class="snav" id="snav-panel" aria-label="Navigation principale">
        <div class="snav-head">
            <a href="index.html" class="logo snav-logo">GÉNÉRATION<span>-IA</span></a>
            <p class="snav-tagline">Comprendre l'IA générative</p>
        </div>
        <div class="snav-groups">${groups}</div>
        <div class="snav-foot">
            <span class="snav-dot" aria-hidden="true"></span>
            Une agence <a href="https://virgule-studio.fr" target="_blank" rel="noopener noreferrer">Virgule-Studio</a>
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
            toggle.querySelector('.snav-toggle-text').textContent = open ? 'Fermer' : 'Menu';
        };
        toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('snav-open')));
        backdrop.addEventListener('click', () => setOpen(false));
        panel.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && document.body.classList.contains('snav-open')) { setOpen(false); toggle.focus(); }
        });
        window.matchMedia('(min-width: 1100px)').addEventListener('change', e => { if (e.matches) setOpen(false); });

        const bar = this.querySelector('.snav-bar');
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
                    <p>Explorer le futur de l'intelligence artificielle et ses applications dans tous les domaines.</p>
                </div>
                <div class="footer-section links">
                    <h3>Liens rapides</h3>
                    <ul>
                        <li><a href="index.html">Accueil</a></li>
                        <li><a href="multimedia.html">Multimédia</a></li>
                        <li><a href="enseignants.html">Enseignants</a></li>
                        <li><a href="offline.html">L'IA offline</a></li>
                        <li><a href="archipelle.html">Archipelle</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Génération-IA. Tous droits réservés. Conception et contenu du site par <a href="https://virgule-studio.fr" target="_blank" rel="noopener noreferrer">Virgule-Studio</a>.</p>
            </div>
        </div>
    </footer>
        `;
    }
}

// Définition des Web Components
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <header>
        <div class="container">
            <a href="index.html" class="logo">GÉNÉRATION<span>-IA</span></a>
            <nav>
                <ul class="nav-links">
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="multimedia.html">Multimédia</a></li>
                    <li><a href="prompting.html">Prompting</a></li>
                    <li><a href="howitworks.html">Comment ça marche ?</a></li>
                    <li><a href="energie.html">Énergie</a></li>
                    <li><a href="developpeurs.html">Développeurs</a></li>
                    <li><a href="enseignants.html">Enseignants</a></li>
                    <li><a href="offline.html">L'IA OFFLINE</a></li>
                    <li><a href="art.html">Art & IA</a></li>
                    <li><a href="about.html">À propos</a></li>
                </ul>
                <div class="hamburger">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </nav>
        </div>
    </header>
        `;

        // Gestion automatique du lien actif
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = this.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
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
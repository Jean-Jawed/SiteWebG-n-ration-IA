document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des particules
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00f0ff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00f0ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer le menu mobile quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Données des IA
    const aiData = [
        {
            name: "ChatGPT",
            description: "Modèle de langage avancé développé par OpenAI",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png",
            link: "https://chat.openai.com"
        },
        {
            name: "Claude",
            description: "IA conversationnelle développée par Anthropic",
            logo: "https://www.anthropic.com/images/icons/apple-touch-icon.png",
            link: "https://claude.ai"
        },
        {
            name: "Gemini",
            description: "Modèle multimodal développé par Google DeepMind",
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
            link: "https://gemini.google.com"
        },
        {
            name: "Mistral",
            description: "IA française créée en 2023. Modèles open-source performants",
            logo: "https://fr.wikipedia.org/wiki/Mistral_AI#/media/Fichier:Mistral_AI_logo_(2025%E2%80%93).svg",
            link: "https://chat.mistral.ai/chat"
        },
        {
            name: "Yiaho",
            description: "Le site français pour l'IA gratuite et illimitée",
            logo: "https://www.yiaho.com/wp-content/uploads/2023/03/yiaho-intelligence-artificielle-gratuite-en-ligne.jpg",
            link: "https://www.yiaho.com/"
        },
        {
            name: "Deepseek",
            description: "Modèle performant spécialisé dans la recherche d'information",
            logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/DeepSeek_logo.svg",
            link: "https://deepseek.com/en"
        },
        {
            name: "Perplexity",
            description: "IA de recherche avec citations des sources",
            logo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg",
            link: "https://www.perplexity.ai"
        },
        {
            name: "Kimi",
            description: "Assistant conversationnel chinois",
            logo: "https://kimi.moonshot.cn/favicon.ico",
            link: "https://kimi.moonshot.cn"
        },
        {
            name: "Qwen",
            description: "Modèles open-source d'Alibaba Cloud",
            logo: "https://qianwen.aliyun.com/favicon.ico",
            link: "https://qianwen.aliyun.com"
        },
        {
            name: "Llama",
            description: "Modèles open-source de Meta",
            logo: "https://ai.meta.com/static/images/favicon/favicon-32x32.png",
            link: "https://ai.meta.com/llama"
        },
        {
            name: "Cohere",
            description: "API de modèles de langage pour entreprises",
            logo: "https://cohere.com/favicon.ico",
            link: "https://cohere.com"
        },
        {
            name: "Groq",
            description: "Plateforme d'IA ultra-rapide",
            logo: "https://groq.com/favicon.ico",
            link: "https://groq.com"
        }
    ];

    // Remplir la grille des IA
    const grid = document.querySelector('.grid');
    
    aiData.forEach(ai => {
        const card = document.createElement('div');
        card.className = 'ai-card';
        card.innerHTML = `
            <img src="${ai.logo}" alt="${ai.name}">
            <div class="ai-card-content">
                <h3>${ai.name}</h3>
                <p>${ai.description}</p>
                <a href="${ai.link}" target="_blank">Visiter</a>
            </div>
        `;
        grid.appendChild(card);
    });

    // Effet de hover sur les cartes
    const cards = document.querySelectorAll('.ai-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Animation au chargement
    document.body.classList.add('page-transition');
});

// Fonction pour charger le contenu des autres pages
function loadPageContent(page) {
    fetch(page + '.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('main').innerHTML;
            
            document.querySelector('main').innerHTML = newContent;
            document.body.classList.add('page-transition');
            
            // Réinitialiser les scripts si nécessaire
            initPageSpecificScripts(page);
            
            // Mettre à jour l'URL sans recharger la page
            window.history.pushState({}, '', page + '.html');
            
            // Faire défiler vers le haut
            window.scrollTo(0, 0);
        })
        .catch(err => {
            console.error('Erreur de chargement:', err);
            window.location.href = page + '.html';
        });
}

// Initialiser les scripts spécifiques à la page
function initPageSpecificScripts(page) {
    // Initialiser les onglets pour la page multimédia
    if (page === 'multimedia') {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Retirer active de tous les boutons et contenus
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Ajouter active au bouton cliqué
                button.classList.add('active');
                
                // Afficher le contenu correspondant
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Autres initialisations spécifiques aux pages...
}

// Gestion de la navigation SPA (Single Page Application)
document.addEventListener('DOMContentLoaded', function() {
    // Intercepter les clics sur les liens de navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('http') || 
                this.getAttribute('href').startsWith('mailto') || 
                this.getAttribute('href').startsWith('tel')) {
                return; // Laisser les liens externes se comporter normalement
            }
            
            e.preventDefault();
            const page = this.getAttribute('href').replace('.html', '');
            
            // Mettre à jour la classe active
            document.querySelectorAll('nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Charger le contenu de la page
            loadPageContent(page);
        });
    });
    
    // Gérer le bouton retour/avant du navigateur
    window.addEventListener('popstate', function() {
        const page = window.location.pathname.replace('.html', '').replace('/', '') || 'index';
        loadPageContent(page);
    });
});

// Effet de parallaxe pour les sections
function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const speed = parseFloat(section.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrollPosition * speed);
            section.style.backgroundPosition = `center ${yPos}px`;
        });
    });
}

// Initialiser les tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
    });
}

// Ajouter le CSS pour les tooltips
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
.tooltip {
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10000;
    max-width: 200px;
    text-align: center;
}
`;
document.head.appendChild(tooltipStyle);

// Initialiser toutes les fonctions
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initTooltips();
});

// Tout le JavaScript fourni précédemment reste inchangé
// Ajoutez ces nouvelles fonctions à la fin du fichier

// Initialisation spécifique à la page Art
function initArtPage() {
    if (document.querySelector('.art-content')) {
        // Animation des cartes de projet
        const artProjects = document.querySelectorAll('.art-project');
        artProjects.forEach((project, index) => {
            project.style.transitionDelay = `${index * 0.1}s`;
            project.classList.add('fade-in');
        });

        // Gestion des débats
        const debateCards = document.querySelectorAll('.debate-card');
        debateCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    }
}

// Initialisation spécifique à la page Enseignants
function initTeachersPage() {
    if (document.querySelector('.teachers-content')) {
        // Accordéon pour les groupes d'âge
        const ageGroups = document.querySelectorAll('.age-group');
        ageGroups.forEach(group => {
            const heading = group.querySelector('h3');
            heading.addEventListener('click', () => {
                group.classList.toggle('expanded');
            });
        });
    }
}

// Initialisation spécifique à la page Développeurs
function initDevelopersPage() {
    if (document.querySelector('.dev-content')) {
        // Copier les extraits de code
        const codeBlocks = document.querySelectorAll('.code-block');
        codeBlocks.forEach(block => {
            block.addEventListener('click', function() {
                const range = document.createRange();
                range.selectNode(this);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                
                // Feedback visuel
                const originalText = this.textContent;
                this.textContent = 'Copié !';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }
}

// Initialisation spécifique à la page Énergie
function initEnergyPage() {
    if (document.querySelector('.energy-content')) {
        // Animation des statistiques
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(value => {
            const originalText = value.textContent;
            value.textContent = '0';
            
            let counter = 0;
            const target = parseInt(originalText.replace(/\D/g, ''));
            const suffix = originalText.replace(/[0-9]/g, '');
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const updateCount = () => {
                counter += increment;
                if (counter < target) {
                    value.textContent = Math.floor(counter) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    value.textContent = originalText;
                }
            };
            
            setTimeout(updateCount, 500);
        });
    }
}

// Initialisation spécifique à la page Prompting
function initPromptingPage() {
    if (document.querySelector('.prompting-content')) {
        // Interaction avec les exemples de prompts
        const promptExamples = document.querySelectorAll('.prompt-example');
        promptExamples.forEach(example => {
            example.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    }
}

// Initialisation spécifique à la page Multimédia
function initMultimediaPage() {
    if (document.querySelector('.multimedia-tabs')) {
        // Rien de supplémentaire ici car déjà géré dans le HTML
    }
}

// Au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation générale
    initParticles();
    initMenu();
    initScrollEffects();
    initAIcards();
    initPageTransitions();
    initTooltips();
    
    // Initialisations spécifiques aux pages
    initArtPage();
    initTeachersPage();
    initDevelopersPage();
    initEnergyPage();
    initPromptingPage();
    initMultimediaPage();
});

// Nouvelle fonction pour les transitions entre pages
function initPageTransitions() {
    // Intercepter les clics sur les liens
    document.querySelectorAll('a[href^="/"], a[href^="."]').forEach(link => {
        if (link.href.includes('.html') && !link.classList.contains('no-transition')) {
            link.addEventListener('click', function(e) {
                if (!this.hash && this.href !== window.location.href) {
                    e.preventDefault();
                    document.body.classList.add('page-exit');
                    
                    setTimeout(() => {
                        window.location.href = this.href;
                    }, 500);
                }
            });
        }
    });
}

// Animation de sortie de page
const pageExitStyle = document.createElement('style');
pageExitStyle.textContent = `
@keyframes fadeOut {
    to { opacity: 0; transform: translateY(20px); }
}
.page-exit {
    animation: fadeOut 0.5s ease forwards;
}
`;
document.head.appendChild(pageExitStyle);
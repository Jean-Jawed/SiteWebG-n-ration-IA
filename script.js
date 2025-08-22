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

    if (hamburger && navLinks) {
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
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
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

    // Initialisation des tooltips
    initTooltips();

    // Initialisation de la parallaxe
    initParallax();

    // Initialisations spécifiques aux pages
    initArtPage();
    initTeachersPage();
    initDevelopersPage();
    initEnergyPage();
    initPromptingPage();
    initMultimediaPage();

    // Gestion de la navigation SPA (Single Page Application)
    initSPANavigation();

    // Initialisation des transitions entre pages
    initPageTransitions();
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
    
    // Réinitialiser les autres pages si nécessaire
    initArtPage();
    initTeachersPage();
    initDevelopersPage();
    initEnergyPage();
    initPromptingPage();
}

// Gestion de la navigation SPA
function initSPANavigation() {
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
}

// Effet de parallaxe pour les sections
function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax');
    
    if (parallaxSections.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            parallaxSections.forEach(section => {
                const speed = parseFloat(section.getAttribute('data-speed')) || 0.5;
                const yPos = -(scrollPosition * speed);
                section.style.backgroundPosition = `center ${yPos}px`;
            });
        });
    }
}

// Initialiser les tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    if (tooltipElements.length > 0) {
        // Vérifier si le style des tooltips existe déjà
        if (!document.querySelector('style#tooltip-style')) {
            const tooltipStyle = document.createElement('style');
            tooltipStyle.id = 'tooltip-style';
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
        }
        
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
}

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
            if (heading) {
                heading.addEventListener('click', () => {
                    group.classList.toggle('expanded');
                });
            }
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

// Initialisation spécifique à la page Multimédia
function initMultimediaPage() {
    if (document.querySelector('.multimedia-tabs')) {
        // Rien de supplémentaire ici car déjà géré dans le HTML
    }
}

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
    
    // Vérifier si le style de transition de page existe déjà
    if (!document.querySelector('style#page-exit-style')) {
        const pageExitStyle = document.createElement('style');
        pageExitStyle.id = 'page-exit-style';
        pageExitStyle.textContent = `
            @keyframes fadeOut {
                to { opacity: 0; transform: translateY(20px); }
            }
            .page-exit {
                animation: fadeOut 0.5s ease forwards;
            }
        `;
        document.head.appendChild(pageExitStyle);
    }
}

// Fonction d'initialisation pour la page Prompting
function initPromptingPage() {
    if (document.querySelector('.prompting-content')) {
        // Base de données des templates de prompts
        const promptTemplates = {
            nouvelleBesan: {
        title: "Écrire une nouvelle de 45 pages qui se passe à Besançon",
        prompt: `# MISSION : Écriture d'une nouvelle littéraire de 45 pages située à Besançon

## CONTEXTE
Vous êtes un écrivain professionnel spécialisé dans la fiction contemporaine. Votre mission est de créer une nouvelle complète et captivante qui met en valeur la ville de Besançon et son patrimoine unique.

## OBJECTIFS SPÉCIFIQUES
- Rédiger une nouvelle de 45 pages (environ 27 000 mots)
- Intégrer authentiquement l'atmosphère et les lieux emblématiques de Besançon
- Développer une intrigue captivante avec des personnages mémorables
- Respecter les codes littéraires de la nouvelle contemporaine

## PARAMÈTRES DE L'HISTOIRE
**Genre** : [Fiction contemporaine/Thriller/Romance/Fantastique urbain]
**Thématique principale** : [Relations humaines/Mystère historique/Découverte de soi]
**Ton** : [Mélancolique/Optimiste/Mystérieux/Humoristique]
**Public cible** : Adultes, lecteurs de littérature contemporaine

## ÉLÉMENTS OBLIGATOIRES À INTÉGRER
### Lieux emblématiques de Besançon :
- La Citadelle de Vauban et ses remparts
- La boucle du Doubs et ses berges
- Le centre historique et ses hôtels particuliers
- [Choisir 2-3 lieux supplémentaires selon l'intrigue]

### Références culturelles locales :
- L'horlogerie comtoise et son héritage
- L'architecture de Vauban
- Les traditions gastronomiques franc-comtoises
- L'université et sa vie étudiante

## STRUCTURE NARRATIVE
1. **Ouverture** (5 pages) : Présentation du protagoniste et du cadre
2. **Développement** (30 pages) : Intrigue principale avec péripéties
3. **Climax** (5 pages) : Point culminant de l'histoire
4. **Dénouement** (5 pages) : Résolution et conclusion

## PERSONNAGES À DÉVELOPPER
**Protagoniste** : [Âge, profession, lien avec Besançon]
**Personnages secondaires** : 2-3 personnages qui incarnent différents aspects de la ville
**Antagoniste/Obstacle** : [Conflit interne/externe lié au lieu]

## STYLE ET TONALITÉ
- Descriptions immersives des paysages bisontins
- Dialogues authentiques reflétant la culture locale
- Rythme adapté au format nouvelle (concision et intensité)
- Style littéraire soigné avec recherche esthétique

Créez une nouvelle qui fera découvrir ou redécouvrir Besançon sous un angle original et captivant.`
    },
    
    appBudget: {
        title: "Développer une appli Android pour mieux gérer mon budget",
        prompt: `# MISSION : Développement d'une application Android de gestion budgétaire personnelle

## CONTEXTE
Vous êtes un développeur Android expérimenté spécialisé dans les applications de finance personnelle. Votre objectif est de créer une application complète, intuitive et sécurisée pour la gestion de budget personnel.

## OBJECTIFS DE L'APPLICATION
### Fonctionnalités principales :
- Suivi des revenus et dépenses en temps réel
- Catégorisation automatique et manuelle des transactions
- Objectifs d'épargne avec suivi de progression
- Alertes et notifications personnalisables
- Rapports visuels et analyses de tendances

### Fonctionnalités avancées :
- Synchronisation bancaire sécurisée (API PSD2)
- Prédictions budgétaires basées sur l'historique
- Mode multi-comptes et multi-devises
- Export des données (PDF, Excel)
- Sauvegarde cloud chiffrée

## ARCHITECTURE TECHNIQUE
### Stack technologique :
- **Langage** : Kotlin (100% Kotlin)
- **Architecture** : MVVM avec Architecture Components
- **Base de données** : Room Database
- **Réseau** : Retrofit2 + OkHttp3
- **UI** : Material Design 3 + Compose
- **Injection de dépendance** : Hilt/Dagger

### Modules de l'application :
1. **Module Auth** : Authentification biométrique + PIN
2. **Module Transactions** : Gestion des entrées/sorties
3. **Module Budget** : Planification et suivi budgétaire
4. **Module Analytics** : Rapports et statistiques
5. **Module Settings** : Configuration et préférences

## SPÉCIFICATIONS FONCTIONNELLES
### Écran d'accueil :
- Vue d'ensemble du solde actuel
- Graphique des dépenses du mois
- Transactions récentes (5 dernières)
- Alertes budget dépassé
- Raccourcis vers actions fréquentes

### Gestion des transactions :
- Saisie rapide avec reconnaissance de reçus (OCR)
- Catégories prédéfinies et personnalisables
- Récurrence automatique (salaire, abonnements)
- Géolocalisation des achats
- Photos de justificatifs

## SÉCURITÉ ET CONFIDENTIALITÉ
### Mesures de sécurité :
- Chiffrement AES-256 des données sensibles
- Authentification forte (biométrique + PIN)
- Certificat SSL Pinning pour les communications
- Obfuscation du code et protection anti-reverse
- Conformité RGPD

Développez cette application en priorisant la sécurité, l'intuitivité et la performance pour créer un outil vraiment utile au quotidien.`
    },
    
    entretienEmbauche: {
        title: "Me préparer pour l'entretien d'embauche que j'ai bientôt",
        prompt: `# MISSION : Préparation complète pour un entretien d'embauche

## CONTEXTE
Vous êtes un coach professionnel spécialisé dans l'accompagnement aux entretiens d'embauche. Votre mission est de préparer efficacement un candidat pour maximiser ses chances de succès lors de son entretien.

## INFORMATIONS SUR LE POSTE
**Entreprise** : [Nom de l'entreprise]
**Poste visé** : [Intitulé exact du poste]
**Secteur d'activité** : [Industrie/domaine]
**Type de contrat** : [CDI/CDD/Stage/Freelance]
**Date de l'entretien** : [Date prévue]
**Format** : [Présentiel/Visioconférence/Téléphone]

## ANALYSE PRÉLIMINAIRE
### Recherche sur l'entreprise :
- Histoire et évolution de l'entreprise
- Mission, vision et valeurs
- Produits/services principaux
- Position sur le marché et concurrents
- Actualités récentes et projets en cours
- Culture d'entreprise et environnement de travail

### Analyse du poste :
- Missions principales et responsabilités
- Compétences techniques requises
- Soft skills valorisées
- Évolution de carrière possible
- Équipe et hiérarchie
- Défis spécifiques du poste

## PRÉPARATION PERSONNELLE
### Auto-évaluation :
1. **Forces principales** : [3-5 atouts majeurs]
2. **Expériences pertinentes** : Situations concrètes à valoriser
3. **Compétences techniques** : Niveau et certifications
4. **Réalisations quantifiables** : Résultats chiffrés
5. **Points de vigilance** : Faiblesses à transformer en opportunités

### Storytelling personnel :
- Pitch de présentation (30 secondes, 2 minutes)
- 3 histoires STAR (Situation-Tâche-Action-Résultat)
- Motivation pour le poste et l'entreprise
- Projet professionnel à 3-5 ans

## QUESTIONS FRÉQUENTES ET RÉPONSES PRÉPARÉES
### Questions classiques :
1. **"Parlez-moi de vous"** - Structure : parcours + compétences + motivation
2. **"Pourquoi ce poste/cette entreprise ?"** - Connexion valeurs personnelles/entreprise
3. **"Quels sont vos défauts ?"** - Défaut réel mais en cours d'amélioration
4. **"Où vous voyez-vous dans 5 ans ?"** - Évolution cohérente avec le poste

### Vos questions à poser :
1. "Quels sont les principaux défis du poste ?"
2. "Comment mesure-t-on le succès dans ce rôle ?"
3. "Pouvez-vous me parler de l'équipe avec laquelle je travaillerais ?"
4. "Quelles sont les perspectives d'évolution ?"
5. "Quels sont les prochaines étapes du processus ?"

## GESTION DU STRESS
### Techniques de relaxation :
- Respiration profonde (4-7-8)
- Visualisation positive
- Ancrage physique (pieds au sol)
- Affirmations positives

Vous êtes maintenant prêt(e) à briller lors de cet entretien ! La clé du succès réside dans la préparation et l'authenticité.`
    },
    
    reparationBaignoire: {
        title: "M'aider à réparer ma baignoire qui fuit",
        prompt: `# MISSION : Diagnostic et réparation d'une baignoire qui fuit

## CONTEXTE
Vous êtes un plombier expérimenté avec 15 ans d'expertise dans la réparation de sanitaires. Votre mission est de guider étape par étape la réparation d'une baignoire qui présente des fuites.

## DIAGNOSTIC INITIAL
### Informations à collecter :
**Type de baignoire** : [Acrylique/Fonte émaillée/Acier émaillé/Résine]
**Âge approximatif** : [Récente <5 ans / Ancienne >10 ans]
**Localisation de la fuite** : [À préciser par observation]
**Intensité** : [Goutte-à-goutte/Écoulement continu/Importante]
**Moment de la fuite** : [Permanente/Uniquement quand elle est pleine/Après utilisation]

### Zones de fuite possibles :
1. **Joints d'étanchéité** (murs et bords)
2. **Évacuation** (bonde et siphon)
3. **Robinetterie** (mitigeur, robinets)
4. **Fissures** dans la baignoire elle-même
5. **Trop-plein**
6. **Canalisations** sous la baignoire

## OUTILS ET MATÉRIAUX NÉCESSAIRES
### Outils de base :
- Lampe de poche ou éclairage portable
- Clés à molette (plusieurs tailles)
- Tournevis cruciforme et plat
- Cutter ou grattoir
- Miroir d'inspection
- Gants de protection

### Matériaux de réparation :
- **Pour joints** : Silicone sanitaire blanc, pistolet à cartouche
- **Pour évacuation** : Joints d'étanchéité, pâte à joint
- **Pour fissures** : Kit de réparation acrylique/polyester selon type
- **Divers** : Chiffons, dégraissant, alcool à 90°

## PROCÉDURE DE DIAGNOSTIC
### Étape 1 : Inspection visuelle
1. **Vidanger complètement la baignoire**
2. **Nettoyer et sécher toute la surface**
3. **Examiner méthodiquement** :
   - Joints silicone (décollement, moisissures, fissures)
   - Robinetterie (traces de calcaire, corrosion)
   - Évacuation (étanchéité bonde, état du joint)
   - Surface baignoire (micro-fissures, éclats)

### Étape 2 : Test de localisation
1. **Remplir la baignoire à 1/3**
2. **Observer pendant 15 minutes** sans bouger
3. **Marquer les zones suspectes** au crayon
4. **Vider et répéter avec robinets fermés**
5. **Tester le trop-plein** séparément

## RÉPARATIONS PAR TYPE DE FUITE
### JOINTS SILICONE DÉFAILLANTS
**Réparation** :
1. **Découper l'ancien joint** au cutter
2. **Nettoyer soigneusement** les surfaces (dégraissant)
3. **Laisser sécher 24h minimum**
4. **Appliquer le nouveau joint** en tirant un cordon régulier
5. **Attendre 48h** avant utilisation

### ÉVACUATION DÉFECTUEUSE
**Réparation** :
1. **Démonter la bonde** (clé spéciale ou pince)
2. **Inspecter le joint** d'étanchéité
3. **Nettoyer le filetage** et les surfaces
4. **Remplacer le joint** si nécessaire
5. **Remonter avec pâte à joint** sur les filetages

## SÉCURITÉ
⚠️ **Important** : Couper l'eau et l'électricité si nécessaire
⚠️ Porter des équipements de protection
⚠️ Ventiler le local lors des réparations

Suivez ces étapes méthodiquement et votre baignoire retrouvera son étanchéité parfaite !`
    },
    
    marketingJusPomme: {
        title: "Développer une stratégie marketing pour l'entreprise de vente de jus de pomme de ma tante",
        prompt: `# MISSION : Stratégie marketing pour entreprise de jus de pomme artisanal

## CONTEXTE
Vous êtes consultant en marketing spécialisé dans l'agroalimentaire artisanal. Votre mission est de développer une stratégie marketing complète pour l'entreprise familiale de jus de pomme, en valorisant l'authenticité et la qualité du produit.

## ANALYSE DE L'ENTREPRISE
### Profil de l'entreprise :
**Nom** : [Les Vergers de Tante Marie / À définir]
**Localisation** : [Région/département]
**Production annuelle** : [Litres/an estimés]
**Gamme actuelle** : [Jus pur, mélanges, bio, etc.]
**Canaux de vente existants** : [Marchés locaux, magasins, etc.]
**USP principale** : Jus artisanal 100% naturel, pommes locales

### Forces identifiées :
- Savoir-faire familial et authenticité
- Qualité supérieure et goût authentique
- Circuit court et traçabilité
- Flexibilité et proximité client
- Histoire et tradition familiale

## ANALYSE DU MARCHÉ
### Marché du jus de pomme :
- **Taille du marché** : 850M€ en France
- **Tendances** : Bio (+12% par an), local, artisanal
- **Saisonnalité** : Pic automne-hiver
- **Prix moyen** : 2,50€/L grande surface vs 4,50€/L artisanal

### Concurrence directe :
- Autres producteurs locaux
- Marques artisanales régionales
- Coopératives agricoles
- **Avantage différenciant** : [Histoire familiale unique à valoriser]

## POSITIONNEMENT STRATÉGIQUE
### Proposition de valeur :
"Le jus de pomme authentique de [Région], élaboré selon la recette familiale depuis [X] générations, pour retrouver le vrai goût de l'enfance"

### Segments cibles :
1. **Familles soucieuses de qualité** (30-50 ans, revenus moyens/élevés)
2. **Consommateurs locavores** (25-45 ans, sensibles au terroir)
3. **Seniors nostalgiques** (50+ ans, attachés aux traditions)
4. **Restauration locale** (restaurants, cafés, hôtels)

## STRATÉGIE PRODUIT
### Gamme optimisée :
- **Jus pur traditionnel** (produit phare)
- **Variétés anciennes** (reinette, cox, etc.)
- **Bio certifié** (segment premium)
- **Format famille** 1,5L et format dégustation 250ml
- **Éditions limitées** saisonnières

### Packaging différenciant :
- Bouteilles en verre (image premium)
- Étiquettes artisanales avec histoire familiale
- QR code vers origine des pommes
- Design vintage/authentique

## STRATÉGIE PRIX
### Grille tarifaire :
- **Jus traditionnel** : 4,20€/L
- **Variétés anciennes** : 4,80€/L
- **Bio certifié** : 5,20€/L
- **Remises** : -10% achat direct, -15% en gros volumes

## STRATÉGIE DISTRIBUTION
### Canaux prioritaires :
1. **Vente directe** (40%) : Ferme, marchés, fêtes locales
2. **Magasins spécialisés** (30%) : Bio, épiceries fines
3. **Restauration** (20%) : Restaurants, cafés, hôtels
4. **E-commerce** (10%) : Site web, marketplaces locales

### Développement géographique :
- **Phase 1** : Rayonnement 50km autour de l'exploitation
- **Phase 2** : Région étendue (150km)
- **Phase 3** : Expédition nationale ciblée

## STRATÉGIE COMMUNICATION
### Messages clés :
- "4 générations de passion pour la pomme"
- "Du verger à votre verre, rien que du naturel"
- "Le goût authentique de notre terroir"

### Actions de communication :
#### Digital :
- **Site web** avec storytelling et e-boutique
- **Réseaux sociaux** : Instagram (visuel), Facebook (communauté)
- **Newsletter** mensuelle avec actualités du verger
- **SEO local** : "jus de pomme [région]"

#### Traditionnel :
- **Relations presse** locale (journaux, radios)
- **Événementiel** : foires, salons, portes ouvertes
- **Partenariats** : autres producteurs locaux, restaurants

### Budget communication annuel :
- **Digital** : 3 000€ (site web, publicité en ligne)
- **Print/Radio** : 2 000€ (encarts, spots locaux)
- **Événementiel** : 4 000€ (salons, stands, matériel)
- **Total** : 9 000€ (soit 8% du CA prévu)

## PLAN D'ACTION
### Trimestre 1 :
- Finalisation gamme et packaging
- Création site web et réseaux sociaux
- Prospection magasins spécialisés locaux

### Trimestre 2 :
- Lancement communication (campagne locale)
- Participation à 3 salons/foires régionales
- Développement partenariats restaurants

### Trimestre 3 :
- Extension zone de chalandise
- Optimisation basée sur premiers retours
- Préparation saison haute (automne/hiver)

### Trimestre 4 :
- Campagne saisonnière intensive
- Bilan et ajustements pour année suivante
- Développement nouveaux produits

## OBJECTIFS ET KPI
### Objectifs année 1 :
- **CA** : 120 000€ (+50% vs année précédente)
- **Nouveaux points de vente** : 25
- **Notoriété locale** : 35% de la population cible
- **Fidélisation** : 60% de clients récurrents

### KPI de suivi :
- Ventes par canal de distribution
- Coût d'acquisition client
- Taux de conversion site web
- Engagement réseaux sociaux
- Satisfaction client (enquêtes)

Cette stratégie positioning votre jus de pomme comme un produit premium authentique ancré dans son terroir, tout en développant une approche marketing moderne et efficace.`
    },
    
    articleIAChine: {
        title: "Écrire un article sur les IA chinoises pour mon blog",
        prompt: `# MISSION : Article complet sur l'intelligence artificielle chinoise

## CONTEXTE
Vous êtes un journaliste spécialisé en technologie avec une expertise approfondie sur l'écosystème tech chinois. Votre mission est de rédiger un article informatif et engageant sur l'état actuel de l'IA en Chine pour un blog tech grand public.

## OBJECTIFS DE L'ARTICLE
- Présenter un panorama complet de l'IA chinoise en 2024
- Expliquer les enjeux géopolitiques et technologiques
- Analyser les forces et défis du secteur
- Maintenir un ton accessible tout en restant technique
- Longueur cible : 2500-3000 mots

## STRUCTURE DE L'ARTICLE

### Introduction accrocheuse (300 mots)
- **Angle d'attaque** : Une anecdote ou statistique frappante sur l'IA chinoise
- **Problématique** : Où en est la Chine dans la course mondiale à l'IA ?
- **Annonce du plan** : Les 4 axes de développement à explorer

### Partie I : L'écosystème des géants tech chinois (600 mots)
#### Baidu et son pari sur l'IA générative :
- **ERNIE Bot** : Le ChatGPT chinois et ses spécificités
- **Apollo** : La conduite autonome et partenariats industriels
- **Stratégie** : Comment Baidu pivote vers l'IA

#### Alibaba et l'IA commerciale :
- **Tongyi Qianwen** : LLM intégré à l'écosystème Alibaba
- **Applications concrètes** : E-commerce, logistique, fintech
- **Cloud computing** : Infrastructure IA pour les entreprises

#### Tencent et l'IA sociale :
- **Hunyuan** : Modèle de langage pour les réseaux sociaux
- **Gaming et créativité** : IA pour le divertissement
- **WeChat** : Intégration de l'IA dans les services quotidiens

#### ByteDance (TikTok) :
- **Algorithmes de recommandation** : Le secret de TikTok
- **Création de contenu** : IA générative pour les créateurs
- **Expansion internationale** vs restrictions

### Partie II : Innovation et recherche (500 mots)
#### Écosystème de recherche :
- **Universités chinoises** : Tsinghua, Peking University, recherches de pointe
- **Publications scientifiques** : Position de la Chine dans la recherche mondiale
- **Talents** : Formation et attraction des chercheurs

#### Startups prometteuses :
- **SenseTime** : Vision par ordinateur et reconnaissance faciale
- **Megvii (Face++)** : Applications de l'IA visuelle
- **iFlytek** : Reconnaissance vocale et traitement du langage
- **Nouvelles pépites** : [3-4 startups émergentes à mentionner]

#### Domaines d'excellence :
- **Reconnaissance faciale** : Technologies et controverses
- **Smart cities** : Villes connectées et surveillance
- **Fintech** : Paiements mobiles et crédit social
- **Manufacturing 4.0** : Robotique et automatisation

### Partie III : Défis et limitations (400 mots)
#### Contraintes technologiques :
- **Sanctions américaines** : Impact sur les semi-conducteurs
- **Dépendance** aux technologies occidentales
- **GPU et puissance de calcul** : Les goulets d'étranglement

#### Enjeux réglementaires :
- **Régulation gouvernementale** : Contrôle des contenus générés
- **Conformité** : Alignement avec les valeurs chinoises
- **Censure** : Limitations sur certains sujets sensibles

#### Competition internationale :
- **USA vs Chine** : Course technologique et géopolitique
- **Europe** : Positionnement et opportunités
- **Fracture numérique** : Risques de balkanisation de l'IA

### Partie IV : Perspectives et impact mondial (400 mots)
#### Vision 2025-2030 :
- **Plan gouvernemental** : Objectifs de leadership mondial
- **Investissements** : Budgets publics et privés
- **Applications prioritaires** : Santé, éducation, environnement

#### Impact géopolitique :
- **Soft power** technologique : Influence culturelle et politique
- **Exportation** : Diffusion des solutions chinoises à l'international
- **Coopération/competition** : Équilibres avec l'Occident

#### Enseignements pour l'écosystème mondial :
- **Modèle chinois** : Centralisation vs décentralisation
- **Innovation** : Leçons pour les autres pays
- **Collaboration** : Opportunités de partenariats

### Conclusion prospective (300 mots)
- **Synthèse** des forces et faiblesses identifiées
- **Prédictions** à 5 ans sur l'évolution du secteur
- **Questions ouvertes** : Défis éthiques, technologiques, géopolitiques
- **Call-to-action** : Invitation au débat et aux commentaires

## SOURCES ET DONNÉES À INTÉGRER
### Statistiques clés :
- **Investissements** : Montants en R&D IA (gouvernement + privé)
- **Brevets** : Nombre de dépôts en IA par rapport aux autres pays
- **Market cap** : Valorisation des principales entreprises
- **Adoption** : Taux d'utilisation de l'IA dans différents secteurs

### Sources fiables :
- **Rapports officiels** : Gouvernement chinois, ministère de la Science
- **Think tanks** : McKinsey, CB Insights, PwC sur l'IA chinoise
- **Médias spécialisés** : TechCrunch, Wired, MIT Technology Review
- **Données financières** : Crunchbase, PitchBook pour les levées de fonds

## STYLE ET TON
- **Accessible** mais expert : Vulgarisation sans simplification excessive
- **Équilibré** : Ni sinophobe ni sinophile, analyse factuelle
- **Engageant** : Anecdotes, exemples concrets, storytelling
- **Actualisé** : Références aux développements récents (2024)

## ÉLÉMENTS VISUELS À INTÉGRER
- **Infographie** : Comparaison USA/Chine/Europe en IA
- **Timeline** : Évolution des principales entreprises chinoises
- **Cartes** : Géographie de l'innovation en Chine
- **Graphiques** : Investissements, brevets, performances

Rédigez cet article en position d'expert reconnu, avec un angle original qui apporte une valeur ajoutée par rapport aux analyses existantes.`
    },
    
    techniqueRespiration: {
        title: "Me guider dans l'apprentissage de techniques de respiration",
        prompt: `# MISSION : Guide complet d'apprentissage des techniques de respiration

## CONTEXTE
Vous êtes un instructeur certifié en techniques de respiration avec 10 ans d'expérience, formé aux méthodes orientales et occidentales. Votre mission est d'accompagner un débutant dans l'apprentissage progressif et sécurisé des techniques respiratoires.

## OBJECTIFS PÉDAGOGIQUES
- Maîtriser 6 techniques de base en 4 semaines
- Comprendre les bienfaits physiologiques et mentaux
- Développer une pratique quotidienne autonome
- Adapter les exercices selon les besoins spécifiques
- Identifier les contre-indications et précautions

## FONDAMENTAUX THÉORIQUES

### Anatomie respiratoire de base :
- **Diaphragme** : Muscle principal de la respiration
- **Inspiration** : Expansion de la cage thoracique et abdomen
- **Expiration** : Relaxation et retour naturel
- **Respiration normale** : 12-20 cycles par minute au repos

### Bienfaits scientifiquement prouvés :
- **Système nerveux** : Activation du parasympathique (relaxation)
- **Stress** : Réduction du cortisol et de l'adrénaline
- **Sommeil** : Amélioration de l'endormissement
- **Focus** : Augmentation de la concentration
- **Immunité** : Renforcement du système immunitaire
- **Pression artérielle** : Diminution mesurable

## PROGRAMME D'APPRENTISSAGE 4 SEMAINES

### SEMAINE 1 : BASES FONDAMENTALES

#### Technique 1 : Respiration abdominale (Jour 1-3)
**Objectif** : Réapprendre à respirer avec le ventre
**Position** : Allongé, une main sur la poitrine, une sur le ventre
**Exercice** :
1. Inspirez lentement par le nez (4 secondes)
2. Le ventre se gonfle, la poitrine reste immobile
3. Expirez par la bouche (6 secondes)
4. Le ventre se dégonfle naturellement
**Durée** : 5 minutes, 3 fois par jour
**Bénéfice** : Relaxation immédiate, base de toutes les autres techniques

#### Technique 2 : Respiration 4-7-8 (Jour 4-7)
**Objectif** : Technique de relaxation et d'endormissement
**Position** : Assis ou allongé confortablement
**Exercice** :
1. Inspirez par le nez (comptez 4)
2. Retenez votre souffle (comptez 7)
3. Expirez complètement par la bouche (comptez 8)
4. Répétez 4 cycles maximum au début
**Durée** : 5 minutes avant le coucher
**Bénéfice** : Endormissement rapide, apaisement du mental

### SEMAINE 2 : TECHNIQUES ÉNERGISANTES

#### Technique 3 : Respiration carrée (Box Breathing)
**Objectif** : Équilibrage et concentration
**Position** : Assis droit, pieds au sol
**Exercice** :
1. Inspirez (comptez 4)
2. Retenez poumons pleins (comptez 4)
3. Expirez (comptez 4)
4. Retenez poumons vides (comptez 4)
**Progressions** : Commencer par 4, puis 5, puis 6 secondes
**Durée** : 10 minutes, matin et soir
**Bénéfice** : Focus mental, gestion du stress

#### Technique 4 : Respiration de feu (Kapalabhati)
**Objectif** : Énergisation et purification
**Position** : Assis en tailleur ou sur chaise
**Exercice** :
1. Inspirations passives, expirations actives et rapides
2. Contractions abdominales rythmées
3. 30 respirations rapides, puis respiration normale
4. Répéter 3 cycles avec pauses
**Précaution** : Arrêter si vertiges, contre-indiqué si hypertension
**Durée** : 5 minutes le matin
**Bénéfice** : Énergie, clarté mentale

### SEMAINE 3 : TECHNIQUES AVANCÉES

#### Technique 5 : Respiration alternée (Nadi Shodhana)
**Objectif** : Équilibrage des deux hémisphères cérébraux
**Position** : Assis, colonne droite
**Exercice** :
1. Pouce droit ferme narine droite, inspirez par la gauche
2. Annulaire ferme narine gauche, retirez le pouce, expirez à droite
3. Inspirez par la droite
4. Fermez la droite, ouvrez la gauche, expirez
5. Un cycle complet = inspiration gauche → expiration droite → inspiration droite → expiration gauche
**Durée** : 10 cycles, 2 fois par jour
**Bénéfice** : Équilibre émotionnel, clarté mentale

#### Technique 6 : Respiration cohérente
**Objectif** : Synchronisation cœur-cerveau
**Position** : Confortable, yeux fermés
**Exercice** :
1. Respirations de 5 secondes à l'inspiration
2. Respirations de 5 secondes à l'expiration
3. Total : 6 respirations par minute
4. Optionnel : visualiser le souffle qui entre et sort du cœur
**Durée** : 15-20 minutes
**Bénéfice** : Cohérence cardiaque, bien-être profond

### SEMAINE 4 : INTÉGRATION ET PERSONNALISATION

#### Séances thématiques :
- **Lundi** : Anti-stress (4-7-8 + cohérente)
- **Mardi** : Énergisation (feu + carrée)
- **Mercredi** : Concentration (carrée + alternée)
- **Jeudi** : Relaxation (abdominale + 4-7-8)
- **Vendredi** : Équilibrage (alternée + cohérente)
- **Weekend** : Pratique libre selon besoins

## CONSEILS PRATIQUES

### Environnement optimal :
- **Lieu calme** sans distractions
- **Température** confortable (18-22°C)
- **Vêtements** amples et confortables
- **Horaires réguliers** : même moment chaque jour

### Progressions sécurisées :
- **Commencer doucement** : 5 minutes puis augmenter
- **Écouter son corps** : arrêter si malaise
- **Régularité** > intensité : mieux vaut 5 min/jour que 30 min/semaine
- **Patience** : Les bénéfices apparaissent après 2-3 semaines

### Adaptations selon les objectifs :
- **Stress/Anxiété** : Privilégier 4-7-8 et cohérente
- **Fatigue/Manque d'énergie** : Respiration de feu et carrée
- **Insomnie** : 4-7-8 avant le coucher
- **Concentration** : Respiration carrée et alternée
- **Équilibre général** : Rotation de toutes les techniques

## CONTRE-INDICATIONS ET PRÉCAUTIONS

### Arrêter immédiatement si :
- Vertiges ou étourdissements
- Douleurs thoraciques
- Hyperventilation
- Palpitations anormales

### Contre-indications relatives :
- **Hypertension sévère** : Éviter les rétentions longues
- **Troubles cardiaques** : Consulter un médecin avant
- **Grossesse** : Privilégier les techniques douces
- **Asthme sévère** : Adapter selon capacités

## JOURNAL DE PRATIQUE
**À tenir quotidiennement** :
- Technique pratiquée et durée
- État avant/après (échelle 1-10)
- Difficultés rencontrées
- Sensations physiques et mentales
- Contexte (stress, fatigue, émotion)

Commencez votre voyage vers une meilleure maîtrise de votre souffle, porte d'entrée vers un bien-être durable !`
    },
    
    planMaison: {
        title: "Concevoir les plans d'une maison écologique de 120m²",
        prompt: `# MISSION : Conception architecturale d'une maison écologique de 120m²

## CONTEXTE
Vous êtes un architecte spécialisé en construction durable avec 15 ans d'expérience en éco-conception. Votre mission est de concevoir une maison individuelle de 120m² habitables, optimisée pour l'efficacité énergétique et l'impact environnemental minimal.

## CAHIER DES CHARGES

### Contraintes du projet :
**Surface habitable** : 120m² (±5m²)
**Terrain** : [Type de terrain à préciser : plat/en pente/dimensions]
**Orientation** : [À optimiser selon exposition solaire]
**Budget estimé** : [150 000 - 200 000€ construction]
**Nombre d'habitants** : [Famille de 3-4 personnes]
**Style architectural** : Contemporain écologique

### Objectifs écologiques :
- **Certification** : Viser label BBC (Bâtiment Basse Consommation)
- **Consommation énergétique** : <50 kWh/m²/an
- **Matériaux biosourcés** : Minimum 60% des matériaux
- **Gestion des eaux** : Récupération et traitement
- **Biodiversité** : Intégration paysagère respectueuse

## CONCEPTION BIOCLIMATIQUE

### Orientation optimale :
- **Façade principale** : Plein sud (±15°)
- **Pièces de vie** : Exposition sud/sud-ouest
- **Chambres** : Exposition est (soleil matinal)
- **Locaux techniques** : Exposition nord
- **Protection solaire** : Casquettes et végétation caduque

### Compacité du bâtiment :
- **Forme** : Privilégier un plan compact (rectangle ou L)
- **Ratio surface/volume** : Optimisé pour limiter déperditions
- **Hauteur sous plafond** : 2,50m (optimum confort/énergie)
- **Isolation par l'extérieur** : Continuité de l'enveloppe

## PROGRAMME ARCHITECTURAL

### Rez-de-chaussée (70m²) :
**Entrée/dégagement** : 8m²
- Hall d'entrée avec placard
- Transition thermique (sas)

**Pièce de vie** : 35m²
- Salon/salle à manger décloisonné
- Cuisine américaine intégrée
- Accès direct terrasse sud

**Cuisine** : 10m² (si séparée)
- Plan en U ou L optimisé
- Fenêtre sur jardin
- Cellier/garde-manger attenant

**WC invités** : 2m²
**Buanderie/cellier** : 8m²
**Chambre parentale** : 15m² (option plain-pied)

### Étage (50m²) :
**Palier/circulation** : 6m²
**Chambre 1** : 12m²
**Chambre 2** : 12m²  
**Chambre 3** : 10m² (bureau modulable)
**Salle de bains** : 6m²
**WC séparé** : 2m²
**Rangements** : 2m² sous combles

## SOLUTIONS TECHNIQUES ÉCOLOGIQUES

### Structure :
**Ossature bois** : Pin douglas ou épicéa local
- Poteaux-poutres 145x45mm
- Contreventement OSB écologique
- Assemblages mécaniques (chevilles bois)

**Alternative** : Monomur terre cuite ou béton cellulaire

### Isolation performante :
**Murs** : 20cm ouate de cellulose (R=5,5)
**Toiture** : 30cm ouate de cellulose (R=8)
**Plancher bas** : 16cm liège expansé (R=4)
**Menuiseries** : Triple vitrage, Uw<1,0 W/m².K

### Étanchéité à l'air :
- **Objectif** : n50 < 0,6 vol/h (PassivHaus)
- **Membrane** : Frein-vapeur intelligent
- **Test** : Blower door en cours de chantier

### Énergies renouvelables :
**Chauffage** :
- Pompe à chaleur air-eau haute performance (COP>4)
- Poêle à bois d'appoint (bûches ou granulés)
- Plancher chauffant basse température

**Eau chaude sanitaire** :
- Chauffe-eau thermodynamique
- Préchauffage solaire (2-3 capteurs)

**Électricité** :
- Panneaux photovoltaïques 3-4 kWc
- Autoconsommation maximisée
- Stockage batterie optionnel

### Ventilation :
**VMC double flux** haut rendement (>90%)
- Récupération de chaleur
- Filtration de l'air entrant
- Puits canadien/provençal optionnel

## MATÉRIAUX ÉCOLOGIQUES

### Gros œuvre :
- **Fondations** : Béton à base de ciment bas carbone
- **Murs** : Ossature bois local certifié PEFC/FSC
- **Charpente** : Bois massif local
- **Couverture** : Tuiles terre cuite ou ardoise naturelle

### Second œuvre :
- **Cloisons** : Plaques de plâtre recyclé ou fermacell
- **Isolants** : Ouate de cellulose, fibre de bois, liège
- **Revêtements sols** : Parquet chêne français, carrelage grès
- **Peintures** : Peintures naturelles à base d'argile ou chaux

### Finitions :
- **Menuiseries** : Bois local avec finition naturelle
- **Sanitaires** : Céramiques éco-labellisées
- **Robinetterie** : Économiseurs d'eau intégrés

## GESTION DE L'EAU

### Récupération eau de pluie :
- **Cuve enterrée** : 3000L minimum
- **Filtration** : Système multicouches
- **Usages** : WC, lave-linge, arrosage

### Traitement des eaux usées :
- **Micro-station** : Traitement biologique compact
- **Phyto-épuration** : Option selon réglementation locale
- **Infiltration** : Tranchées d'épandage

## AMÉNAGEMENTS EXTÉRIEURS

### Jardin écologique :
- **Végétalisation** : Essences locales et mellifères
- **Potager** : Carré surélevé 20m²
- **Composteur** : Intégré au jardin
- **Récupérateurs d'eau** : Citernes apparentes

### Terrasse et circulations :
- **Terrasse** : Bois local ou dalles perméables
- **Allées** : Graviers drainants ou pavés enherbés
- **Stationnement** : 2 places, revêtement perméable

## PERFORMANCE ÉNERGÉTIQUE VISÉE

### Besoins énergétiques :
- **Chauffage** : <30 kWh/m²/an
- **ECS** : <15 kWh/m²/an  
- **Éclairage/auxiliaires** : <5 kWh/m²/an
- **Total** : <50 kWh/m²/an (BBC)

### Production renouvelable :
- **Photovoltaïque** : 3500 kWh/an
- **Solaire thermique** : 1500 kWh/an
- **Bois de chauffage** : 3-4 stères/an

## BUDGET PRÉVISIONNEL

### Coûts de construction :
- **Gros œuvre** : 80 000€ (40%)
- **Second œuvre** : 60 000€ (30%)
- **Équipements techniques** : 40 000€ (20%)
- **Aménagements extérieurs** : 20 000€ (10%)
- **Total** : 200 000€ HT

### Aides financières disponibles :
- **MaPrimeRénov** : Jusqu'à 10 000€
- **Éco-PTZ** : Prêt à taux zéro 50 000€
- **TVA réduite** : 5,5% sur certains postes
- **Aides locales** : Variables selon région

## LIVRABLES ATTENDUS

### Plans architecturaux :
1. **Plan de masse** (1/500)
2. **Plans de niveaux** (1/100)
3. **Facades et coupes** (1/100)
4. **Plan de toiture** (1/200)

### Études techniques :
1. **Étude thermique RT2012/RE2020**
2. **Note de calcul structure**
3. **Schémas techniques** (chauffage, ventilation, électricité)
4. **Cahier des clauses techniques** 

### Documentation :
1. **Descriptif détaillé** des matériaux
2. **Planning de construction** (12-15 mois)
3. **Guide d'entretien** de la maison
4. **Dossier de demande** de permis de construire

Concevez cette maison comme un modèle de construction durable, alliant performance énergétique, confort de vie et respect de l'environnement.`
    },
    
    recetteVegan: {
        title: "Créer un livre de recettes véganes pour débutants",
        prompt: `# MISSION : Création d'un livre de recettes véganes pour débutants

## CONTEXTE
Vous êtes un chef cuisinier spécialisé en cuisine végétale avec 10 ans d'expérience, formateur en nutrition végane et auteur de plusieurs ouvrages culinaires. Votre mission est de créer un livre de recettes accessible, pratique et inspirant pour les personnes découvrant l'alimentation végane.

## CONCEPT DU LIVRE

### Positionnement éditorial :
**Titre** : "Végane et Gourmand - 80 recettes pour bien commencer"
**Angle** : Guide pratique et bienveillant pour transitions alimentaires
**Public cible** : Débutants en cuisine végane, flexitariens, curieux
**Format** : 200 pages, photos couleur, format 19x24cm
**Niveau** : Accessible, techniques simples, ingrédients faciles

### Promesse du livre :
"Découvrir que la cuisine végane peut être simple, savoureuse et nutritionnellement complète, avec des recettes testées et approuvées par des débutants."

## STRUCTURE ÉDITORIALE

### INTRODUCTION (20 pages)
#### Chapitre 1 : Pourquoi choisir le véganisme ?
- **Définition claire** : Différence végétarien/végétalien/végane
- **Motivations diverses** : Santé, environnement, éthique animale
- **Bénéfices prouvés** : Études scientifiques vulgarisées
- **Témoignages** : 3-4 parcours de transition réussis

#### Chapitre 2 : Nutrition végane simplifiée
- **Nutriments clés** : Protéines, B12, fer, calcium, oméga-3
- **Associations gagnantes** : Légumineuses + céréales
- **Supplémentation** : B12 obligatoire, autres selon besoins
- **Menus types** : 7 jours équilibrés avec calculs nutritionnels

#### Chapitre 3 : Équiper sa cuisine végane
- **Ustensiles indispensables** : Blender, presse-agrumes, etc.
- **Placard de base** : 30 ingrédients essentiels à avoir
- **Conservation** : Techniques de stockage optimales
- **Budget malin** : Acheter en vrac, de saison, local

### PARTIE 1 : BASES ET SUBSTITUTIONS (40 pages)

#### Les laits végétaux maison (8 recettes)
- **Lait d'amande** : Technique de base + variantes
- **Lait d'avoine** : Ultra-crémeux, parfait café
- **Lait de coco** : Épais pour desserts
- **Lait de soja** : Riche en protéines
+ Conseils conservation, utilisations spécifiques

#### Fromages végétaux simples (6 recettes)
- **Parmesan de cajou** : 5 minutes au blender
- **Mozzarella fondante** : Aux amandes et agar-agar
- **Ricotta d'amandes** : Pour lasagnes et tartes
- **Beurre végétal** : Coco + huile d'olive

#### Œufs végétaux et liants (5 techniques)
- **Aquafaba** : Montée en neige pour desserts
- **Chia/lin** : Gélifiant pour pâtisseries  
- **Compote de pommes** : Moelleux des gâteaux
- **Farine de pois chiche** : Omelettes et quiches
- **Tofu soyeux** : Crèmes et mousses

### PARTIE 2 : PETITS DÉJEUNERS (20 pages)

#### Bowls et porridges (8 recettes)
- **Porridge d'avoine** : 5 variations gourmandes
- **Chia pudding** : Préparation la veille
- **Smoothie bowls** : Fruits + superaliments
- **Granola maison** : Sans sucre raffiné

#### Pains et viennoiseries (6 recettes)  
- **Pain de mie** : Moelleux sans œufs
- **Banana bread** : Aux noix et pépites chocolat
- **Muffins myrtilles** : Légers et parfumés
- **Pancakes fluffy** : À l'aquafaba

### PARTIE 3 : PLATS PRINCIPAUX (60 pages)

#### Légumineuses réinventées (15 recettes)
- **Curry de lentilles corail** : Lait de coco et épices
- **Chili sin carne** : Haricots rouges et protéines de soja
- **Houmous de betterave** : Original et coloré
- **Dal de lentilles** : Confort food indien
- **Falafels au four** : Croustillants sans friture

#### Céréales et pseudo-céréales (10 recettes)
- **Risotto de quinoa** : Aux champignons et noix
- **Riz sauté aux légumes** : Technique du wok
- **Boulghour méditerranéen** : Tomates séchées et olives
- **Épeautre aux légumes racines** : Plat d'automne réconfortant

#### Légumes sublimés (12 recettes)
- **Ratatouille revisitée** : Technique de cuisson parfaite
- **Aubergines farcies** : Quinoa et herbes fraîches
- **Courgetti carbonara** : Crème de cajou et "lardons" fumés
- **Chou-fleur rôti** : Entier aux épices moyen-orientales

#### Plats du monde (8 recettes)
- **Pad thaï végane** : Tamarind et tofu ferme
- **Tajine légumes-abricots** : Parfums du Maghreb
- **Buddha bowl** : Équilibré et coloré
- **Pâtes alla arrabbiata** : Sauce tomate épicée

### PARTIE 4 : DESSERTS (30 pages)

#### Desserts crus (8 recettes)
- **Cheesecake cru** : Base dattes-noix, crème cajou
- **Truffes au chocolat** : Dattes et poudre de cacao
- **Tarte citron crue** : Sans cuisson, 100% fraîcheur
- **Energy balls** : 5 variétés énergisantes

#### Pâtisseries classiques végétalisées (10 recettes)
- **Gâteau au chocolat** : Moelleux à l'aquafaba
- **Tarte aux pommes** : Pâte brisée végane
- **Cookies aux pépites** : Irrésistibles et fondants  
- **Crumble fruits rouges** : Pâte sablée à l'huile de coco

#### Desserts glacés (4 recettes)
- **Nice cream** : Glaces aux fruits sans sorbetière
- **Sorbet mangue-coco** : Crémeux et exotique
- **Popsicles** : Bâtonnets fruités maison

### PARTIE 5 : ANNEXES PRATIQUES (30 pages)

#### Menus types et batch cooking
- **21 menus équilibrés** : 3 semaines sans répétition
- **Prep du dimanche** : 2h pour préparer la semaine
- **Liste de courses** : Modèles à personnaliser
- **Meal prep containers** : Organisation optimale

#### Guide des courses et substitutions
- **Où acheter** : Magasins bio, épiceries spécialisées, en ligne
- **Saisonnalité** : Calendrier fruits et légumes
- **Tableau équivalences** : 50 substitutions courantes
- **Budget type** : Coût semaine pour 1, 2, 4 personnes

#### Techniques de base illustrées
- **Découpes** : Julienne, brunoise, chiffonnade
- **Cuissons** : Vapeur, wok, rôtissage
- **Fermentation** : Lactofermentation simple
- **Germination** : Graines germées maison

## SPÉCIFICATIONS TECHNIQUES

### Présentation des recettes :
**Format standardisé** pour chaque recette :
- **Titre** et temps de préparation/cuisson
- **Difficulté** : 1 à 3 étoiles
- **Pour X personnes** + coût approximatif
- **Liste ingrédients** : Quantités précises
- **Étapes numérotées** : Instructions claires
- **Astuces du chef** : Variantes et conseils
- **Info nutrition** : Points forts nutritionnels

### Iconographie :
- **Photos de plats** : 80 photos finales appétissantes
- **Photos de techniques** : 20 pas-à-pas illustrés
- **Illustrations** : Schémas nutritionnels, saisonnalité
- **Style photo** : Lumineux, naturel, vaisselle simple

## TESTS ET VALIDATION

### Protocole de test :
- **Testeurs** : 10 débutants en cuisine végane
- **Critères** : Facilité, goût, accessibilité ingrédients
- **Grille d'évaluation** : Note /10 sur 5 critères
- **Ajustements** : Recettes retravaillées selon retours

### Validation nutritionnelle :
- **Consultation** diététicienne spécialisée
- **Calculs** : Apports nutritionnels de chaque recette
- **Équilibre** : Vérification menus hebdomadaires

## STRATÉGIE DE PUBLICATION

### Format et distribution :
- **Édition papier** : Impression offset qualité
- **Prix public** : 24,90€
- **E-book** : Version numérique 15,90€
- **Distribution** : Librairies + vente en ligne

### Marketing et promotion :
- **Blog culinaire** : Recettes en avant-première
- **Réseaux sociaux** : Vidéos courtes de recettes
- **Partenariats** : Influenceurs véganes, magasins bio
- **Dédicaces** : Salons bio et librairies spécialisées

Créez ce livre comme un véritable compagnon de transition, rassurant et inspirant, qui démystifie la cuisine végane tout en régalant les papilles !`
    },
    
    apprendrePiano: {
        title: "Apprendre à jouer du piano en 6 mois à l'âge de 35 ans",
        prompt: `# MISSION : Plan d'apprentissage du piano pour adulte débutant - 6 mois

## CONTEXTE
Vous êtes un professeur de piano expérimenté spécialisé dans l'enseignement aux adultes, avec 20 ans d'expérience pédagogique. Votre mission est de créer un programme d'apprentissage intensif mais réaliste pour un adulte de 35 ans souhaitant apprendre le piano en 6 mois.

## PROFIL DE L'APPRENANT
**Âge** : 35 ans  
**Expérience musicale** : [Débutant complet/Quelques notions/Autre instrument]
**Objectif** : Jouer des morceaux simples en 6 mois
**Temps disponible** : [1h/jour en semaine + 2h le weekend = 9h/semaine]
**Budget** : [Piano numérique + cours + méthodes]
**Motivation** : [Plaisir personnel/Projet de famille/Défi personnel]

## OBJECTIFS RÉALISTES À 6 MOIS

### Compétences techniques visées :
- **Lecture de partitions** : Clés de sol et de fa, rythmes de base
- **Coordination** : Indépendance des deux mains
- **Répertoire** : 8-10 morceaux maîtrisés de difficulté progressive
- **Théorie** : Gammes majeures, accords de base, armures simples
- **Styles** : Classique facile, variété, accompagnements simples

### Morceaux objectifs :
**Mois 6** - Niveau visé :
- Bach : Menuet en Sol majeur
- Einaudi : Nuvole Bianche (version simplifiée)
- Yann Tiersen : Amélie (thème principal)
- The Beatles : Let It Be (mélodie + accords simples)
- Chopin : Prélude n°7 en La majeur

## ÉQUIPEMENT NÉCESSAIRE

### Piano numérique (investissement prioritaire) :
**Recommandations** :
- **Yamaha P-125** : 700€, excellent toucher
- **Casio CDP-S350** : 450€, rapport qualité-prix
- **Roland FP-30X** : 800€, son premium

**Critères essentiels** :
- 88 touches lestées
- Polyphonie 128 voix minimum  
- Pédale sustain incluse
- Prise casque (pratique silencieuse)

### Accessoires :
- **Banquette réglable** : 80-120€
- **Pupitre** : Si non intégré au piano
- **Métronome** : App smartphone suffisante
- **Casque audio** : Pour pratique nocturne

## MÉTHODE PÉDAGOGIQUE

### Approche hybride optimisée :
**70% Pratique instrumentale** : Jeu, techniques, morceaux
**20% Théorie appliquée** : Solfège intégré aux morceaux  
**10% Écoute active** : Développement de l'oreille

### Supports pédagogiques :
**Méthodes principales** :
- "Adult Piano Adventures" (Faber) : Progression adulte
- "Piano Facile" (Christophe Astié) : Méthode française
- **Apps complémentaires** : Simply Piano, Flowkey

**Partitions progressives** :
- Recueils "Piano facile" variété française
- "First 50 Songs" pour piano solo
- Partitions libres IMSLP pour classique

## PROGRAMME DÉTAILLÉ 6 MOIS

### MOIS 1 : FONDATIONS
**Semaine 1-2 : Premiers contacts**
- Position corps/mains/doigts
- Toucher du clavier, numérotation des doigts
- Notes blanches main droite (Do à Sol)
- Rythmes simples : noires, blanches

**Objectif** : Jouer "Mary Had a Little Lamb" main droite

**Semaine 3-4 : Extension et coordination**
- Gamme de Do majeur main droite
- Introduction main gauche (Do-Sol-Do)
- Premiers accords : Do majeur, Fa majeur
- Lecture clé de sol (Do à Sol)

**Objectif** : "Twinkle Twinkle Little Star" deux mains

### MOIS 2 : DÉVELOPPEMENT
**Semaine 5-6 : Théorie intégrée**
- Armure de Do majeur, altérations
- Gamme complète Do majeur deux mains
- Accords Do-Fa-Sol en renversements
- Introduction clé de fa (Do grave)

**Objectif** : Bach - Menuet en Sol (première partie)

**Semaine 7-8 : Rythme et phrasé**
- Croches simples, liaisons
- Nuances forte/piano
- Pédale sustain (technique de base)
- Premier blues simple (12 mesures)

**Objectif** : "Happy Birthday" avec accompagnement

### MOIS 3 : COORDINATION AVANCÉE
**Semaine 9-10 : Indépendance des mains**
- Gamme Sol majeur
- Arpèges simples main droite
- Accompagnement "Alberti bass"
- Morceaux avec mains décalées

**Objectif** : Mozart - Sonate K331 (thème, tempo lent)

**Semaine 11-12 : Style et expression**
- Rubato et phrasé musical
- Accords septième (Sol7, Do7)
- Introduction au swing léger
- Travail sur les nuances

**Objectif** : "Autumn Leaves" (mélodie + accords)

### MOIS 4 : RÉPERTOIRE ÉLARGI
**Semaine 13-14 : Classique romantique**
- Chopin : Valse minute (thème principal)
- Pédale à retardement
- Gammes mineures (La mineur)
- Ornements simples (trilles)

**Objectif** : Chopin - Valse Op.64 n°1 (première page)

**Semaine 15-16 : Musique de film**
- Yann Tiersen : "Comptine d'un autre été"
- Techniques répétitives main gauche
- Superposition de mélodies
- Pédale de résonance avancée

**Objectif** : Amélie Poulain (thème complet)

### MOIS 5 : PERFECTIONNEMENT
**Semaine 17-18 : Vélocité et précision**
- Gammes rapides (noires 120 BPM)
- Études techniques Czerny faciles  
- Coordination complexe (3 contre 2)
- Accords étendus (neuvièmes)

**Objectif** : Bach - Invention n°1 en Do majeur

**Semaine 19-20 : Style contemporain**
- Einaudi : "Nuvole Bianche" (version complète)
- Techniques modales
- Pédales créatives
- Improvisation guidée

**Objectif** : Interprétation personnelle d'un standard

### MOIS 6 : MAÎTRISE ET PERFORMANCE
**Semaine 21-22 : Polissage du répertoire**
- Révision complète des 8 morceaux acquis
- Travail de la mémoire musicale
- Gestion du stress de performance
- Enregistrement et auto-évaluation

**Semaine 23-24 : Concert personnel**
- Préparation "récital maison"
- Stabilité du jeu sous pression
- Expression et communication musicale
- Projet post-6 mois (morceaux suivants)

**Objectif final** : Récital de 20 minutes avec 6-8 morceaux

## PLANNING HEBDOMADAIRE TYPE

### Répartition temps quotidien (1h) :
**Lundi** : Technique (20') + Nouveau morceau (40')
**Mardi** : Révisions (30') + Théorie (30')  
**Mercredi** : Gammes (15') + Travail difficultés (45')
**Jeudi** : Morceaux en cours (60')
**Vendredi** : Déchiffrage nouveau (30') + Favoris (30')

**Weekend** : 2h samedi OU dimanche
- Session longue : technique + répertoire complet
- Jeu plaisir : morceaux préférés
- Écoute active : concerts, enregistrements

## TECHNIQUES D'APPRENTISSAGE ADULTE

### Optimisations spécifiques :
**Mémorisation** : Analyse harmonique plutôt que répétition mécanique
**Motivation** : Morceaux plaisir dès le mois 2
**Efficacité** : Sessions courtes mais régulières
**Compréhension** : "Pourquoi" musical autant que "Comment"

### Gestion des difficultés :
**Mains séparées** : Toujours maîtriser avant assemblage
**Tempo lent** : 50% vitesse finale puis accélération graduelle  
**Sections courtes** : 4-8 mesures par session
**Enregistrement** : S'écouter pour progresser

## SUIVI ET ÉVALUATION

### Auto-évaluation mensuelle :
- **Technique** : Gammes, arpèges (vitesse et régularité)
- **Lecture** : Déchiffrage nouveaux morceaux
- **Répertoire** : Solidité des acquis
- **Plaisir** : Satisfaction et motivation

### Cours avec professeur (recommandé) :
- **Fréquence** : Bi-mensuelle (2x/mois)
- **Objectifs** : Correction technique, guidance répertoire
- **Budget** : 50€/cours x 12 = 600€ sur 6 mois

### Étapes de validation :
**Mois 2** : Premier morceau deux mains fluide
**Mois 4** : Morceau classique simple par cœur
**Mois 6** : Mini-récital famille/amis

## APRÈS 6 MOIS : PERSPECTIVES

### Niveaux atteignables à 1 an :
- Chopin : Valses faciles complètes
- Jazz : Standards avec improvisations simples
- Accompagnement : Chant ou autres instruments
- Lecture à vue : Déchiffrage partitions moyennes

### Chemins de progression :
**Classique** : Sonates Mozart/Haydn, Nocturnes Chopin
**Jazz** : Harmonie complexe, improvisation
**Variété** : Accompagnement chant, arrangements
**Composition** : Créations personnelles

Lancez-vous dans cette aventure musicale ! À 35 ans, vous avez tous les atouts : motivation d'adulte, capacité d'analyse, et time management. Le piano n'attend que vos doigts !`
    },

    startupFintech: {
        title: "Lancer une startup fintech spécialisée dans les cryptomonnaies",
        prompt: `# MISSION : Lancement d'une startup fintech crypto

## CONTEXTE
Vous êtes un consultant en innovation financière avec 10 ans d'expérience dans la fintech et la blockchain. Votre mission est d'accompagner la création d'une startup spécialisée dans les services crypto, de l'idéation au lancement opérationnel.

## ANALYSE DU MARCHÉ CRYPTO

### État du marché 2024 :
**Taille globale** : 2,3 trillions $ (capitalisation totale)
**Adoption** : 580M utilisateurs crypto dans le monde
**Croissance** : +45% adoption institutionnelle en 2024
**Régulation** : Cadre européen MiCA en vigueur

### Opportunités identifiées :
- **Services B2B** : Solutions crypto pour entreprises
- **DeFi accessible** : Interface simplifiée finance décentralisée
- **Conformité réglementaire** : Outils compliance automatisés
- **Passerelles traditionnelles** : Pont entre crypto et banques

## POSITIONNEMENT STRATÉGIQUE

### Proposition de valeur :
"La première plateforme qui démocratise l'accès aux services crypto professionnels pour les PME européennes, avec une conformité réglementaire garantie et une interface pensée pour les non-experts."

### Segment cible primaire :
**PME françaises/européennes** (10-250 salariés)
- Secteurs : E-commerce, services B2B, startups tech
- Besoin : Accepter paiements crypto, optimiser trésorerie
- Pain point : Complexité technique et réglementaire

### Segments secondaires :
- **Freelances/consultants** : Facturation internationale
- **Associations** : Collecte de dons en crypto
- **Particuliers aisés** : Gestion de patrimoine crypto

## SOLUTION TECHNIQUE

### Plateforme SaaS modulaire :
**Module 1 - Passerelle de paiement**
- Accepter Bitcoin, Ethereum, stablecoins
- Conversion automatique EUR/crypto
- APIs d'intégration e-commerce
- Frais : 1,5% par transaction

**Module 2 - Trésorerie crypto**  
- Portefeuilles multi-signatures sécurisés
- Yield farming automatisé sur stablecoins
- Reporting comptable intégré
- Abonnement : 99€/mois

**Module 3 - Conformité**
- KYC/AML automatisé
- Reporting réglementaire (TRACFIN)
- Audit trail complet
- Service premium : 299€/mois

**Module 4 - Analytics**
- Dashboard temps réel
- Alertes prix et volumes
- Rapports personnalisés
- Inclus dans tous les plans

### Architecture technique :
**Infrastructure** : AWS/Google Cloud multi-région
**Sécurité** : HSM, cold storage, assurance Lloyd's
**APIs** : RESTful + WebSocket temps réel
**Blockchain** : Ethereum, Bitcoin, Polygon
**Base de données** : PostgreSQL + Redis cache

## MODÈLE ÉCONOMIQUE

### Structure de revenus :
1. **Freemium** : 0€/mois (limité à 1000€ volume)
2. **Starter** : 49€/mois (jusqu'à 10K€ volume)  
3. **Business** : 149€/mois (jusqu'à 100K€ volume)
4. **Enterprise** : Sur devis (volume illimité)

### Revenus additionnels :
- **Transaction fees** : 0,5-1,5% selon volume
- **Services managés** : 2-5% AUM (Assets Under Management)
- **API premium** : 0,01€ par call
- **Formation/consulting** : 1500€/jour

### Projections financières 3 ans :
**Année 1** : 180K€ ARR (150 clients payants)
**Année 2** : 720K€ ARR (400 clients, croissance organique)
**Année 3** : 2,1M€ ARR (800 clients + enterprise)

## ÉQUIPE FONDATRICE

### Profils recherchés :
**CEO/Co-fondateur** : Expérience fintech + levée de fonds
**CTO/Co-fondateur** : Développement blockchain + sécurité  
**CPO** : Product manager avec background crypto
**Head of Compliance** : Expertise réglementaire finance

### Recrutements prioritaires :
- **Développeurs full-stack** (2-3 profils)
- **Security engineer** spécialisé crypto
- **Sales manager** BtoB
- **Head of Marketing** growth hacking

### Budget équipe année 1 :
- 4 fondateurs : 40K€ salaire différé chacun
- 4 employés : 55K€ salaire moyen
- Charges sociales : +45%
- **Total** : 480K€ masse salariale

## RÉGLEMENTATION ET CONFORMITÉ

### Statut juridique France :
**PSAN** (Prestataire Services Actifs Numériques)
- Enregistrement ACPR obligatoire
- Capital minimum : 125K€  
- Assurance RC professionnelle
- Procédures KYC/LCB-FT

### Conformité européenne :
**Passeport MiCA** : Accès marché unique européen
**RGPD** : Protection données personnelles
**PCI DSS** : Sécurité données de paiement
**ISO 27001** : Management sécurité information

### Coûts conformité :
- **Licence PSAN** : 15K€ + 10K€/an
- **Audit sécurité** : 25K€ initial + 15K€/an
- **Assurances** : 35K€/an (RC + cyber)
- **Legal/compliance** : 60K€/an

## FINANCEMENT ET LEVÉE DE FONDS

### Besoin de financement :
**Seed round** : 1,5M€ sur 18 mois
- **Développement produit** : 600K€ (40%)
- **Équipe** : 480K€ (32%) 
- **Marketing/Sales** : 240K€ (16%)
- **Réglementaire** : 120K€ (8%)
- **Runway** : 60K€ (4%)

### Sources de financement :
**Business Angels** : 200K€ (industry experts)
**VC spécialisés** : 800K€ (Partech, Kima, Eurazeo)
**Fonds publics** : 300K€ (BPI, dispositifs innovation)
**Pré-ventes** : 200K€ (clients early adopters)

### Valorisation pré-money : 6M€
**Dilution fondateurs** : 20% (après seed)
**Employee stock options** : 15% pool

## GO-TO-MARKET STRATEGY

### Phase 1 - MVP et validation (Mois 1-6) :
- **Développement MVP** module paiements
- **Alpha test** avec 10 clients pilotes
- **Feedback loop** produit-clients
- **Métriques** : Product-market fit

### Phase 2 - Traction initiale (Mois 7-12) :
- **Lancement public** version beta
- **Content marketing** : Blog technique + legal
- **Partenariats** : Intégrateurs, consultants
- **Objectif** : 50 clients payants

### Phase 3 - Scale-up (Mois 13-24) :
- **Sales team** structurée
- **Expansion produit** : modules 2 et 3
- **International** : UK, Allemagne
- **Objectif** : 300 clients, 1M€ ARR

### Canaux d'acquisition :
**Inbound marketing** (40% leads)
- SEO/SEA sur "paiement crypto PME"
- Webinars éducatifs
- Livre blanc "Crypto for Business"

**Outbound sales** (35% leads)  
- LinkedIn Sales Navigator
- Prospection téléphonique qualifiée
- Participation salons fintech

**Partenariats** (25% leads)
- Intégrateurs Shopify/WooCommerce  
- Experts-comptables
- Consultants en transformation digitale

## RISQUES ET MITIGATION

### Risques techniques :
**Sécurité** : Hack, vol de fonds
→ *Mitigation* : Audit continu, assurance, cold storage

**Volatilité** : Fluctuations extrêmes crypto
→ *Mitigation* : Hedging automatique, stablecoins focus

### Risques business :
**Adoption lente** : Marché pas prêt
→ *Mitigation* : Éducation marché, freemium

**Competition** : Géants tech (Google, Apple Pay)
→ *Mitigation* : Spécialisation niche, service premium

### Risques réglementaires :
**Durcissement** : Interdiction crypto
→ *Mitigation* : Conformité proactive, diversification

**Taxes** : Fiscalité défavorable
→ *Mitigation* : Veille juridique, optimisation

## ROADMAP PRODUIT 24 MOIS

### Q1 2025 : Foundation
- MVP passerelle paiement
- Interface admin basique  
- Intégrations Shopify/WooCommerce
- 10 clients beta

### Q2 2025 : Enhancement  
- Module trésorerie crypto
- API publiques v1
- Dashboard analytics
- 25 clients actifs

### Q3 2025 : Expansion
- Module conformité automatisée
- App mobile iOS/Android
- Partenariat banque traditionnelle
- 75 clients actifs

### Q4 2025 : Scale
- IA prédictive prix crypto
- Marketplace DeFi intégrée  
- Expansion Europe (UK/DE)
- 150 clients actifs

### H1 2026 : Maturation
- Services managés premium
- Acquisition concurrents
- IPO preparation track
- 500+ clients actifs

Cette startup se positionne pour surfer sur la vague d'adoption crypto B2B tout en résolvant les vrais problèmes d'accessibilité et conformité. Le timing est idéal avec la clarification réglementaire européenne !`
    },
        };

        // Gestion de l'interface des templates
        const templateSelector = document.getElementById('templateSelector');
        const templateOutput = document.getElementById('templateOutput');
        const generatedPrompt = document.getElementById('generatedPrompt');
        const copyButton = document.getElementById('copyButton');
        const displayButton = document.getElementById('displayButton');

        if (templateSelector && displayButton) {
            templateSelector.addEventListener('change', function() {
                if (this.value) {
                    displayButton.disabled = false;
                    displayButton.innerHTML = '<i class="fas fa-eye"></i> Afficher le prompt';
                } else {
                    displayButton.disabled = true;
                    displayButton.innerHTML = '<i class="fas fa-eye"></i> Sélectionnez d\'abord une situation';
                    if (templateOutput) templateOutput.style.display = 'none';
                }
            });
        }

        // Gestion du clic sur le bouton "Afficher"
        if (displayButton) {
            displayButton.addEventListener('click', function() {
                const selectedTemplate = templateSelector.value;
                
                if (selectedTemplate && promptTemplates[selectedTemplate]) {
                    // Effet de chargement temporaire
                    const originalContent = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        if (generatedPrompt) {
                            generatedPrompt.value = promptTemplates[selectedTemplate].prompt;
                        }
                        if (templateOutput) {
                            templateOutput.style.display = 'block';
                            
                            // Animation d'apparition
                            templateOutput.style.opacity = '0';
                            templateOutput.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                templateOutput.style.transition = 'all 0.5s ease';
                                templateOutput.style.opacity = '1';
                                templateOutput.style.transform = 'translateY(0)';
                            }, 10);
                            
                            // Scroll vers le résultat sur mobile
                            setTimeout(() => {
                                templateOutput.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'start' 
                                });
                            }, 300);
                        }
                        
                        // Restaurer le bouton
                        this.innerHTML = originalContent;
                        this.disabled = false;
                    }, 800); // Petit délai pour l'effet
                }
            });
        }
                
        if (copyButton && generatedPrompt) {
            copyButton.addEventListener('click', function() {
                generatedPrompt.select();
                document.execCommand('copy');
                
                // Feedback visuel
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copié !';
                this.style.background = '#2a8a2a';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);
            });
        }

        // Interaction avec les exemples de prompts
        const promptExamples = document.querySelectorAll('.prompt-example');
        promptExamples.forEach(example => {
            example.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    }
}

// Fonctions d'initialisation (pour compatibilité)
function initMenu() {
    // Cette fonctionnalité est déjà gérée dans le DOMContentLoaded principal
}

function initScrollEffects() {
    // Cette fonctionnalité est déjà gérée dans le DOMContentLoaded principal
}

function initAIcards() {
    // Les cartes AI sont maintenant statiques, donc pas besoin d'initialisation JavaScript
}
/* ===== SCRIPTS POUR LA PAGE ÉNERGIE ===== */

document.addEventListener('DOMContentLoaded', function() {
    // Animation des nombres au chargement
    animateNumbers();
    
    // Initialisation des graphiques
    initCharts();
    
    // Simulateur interactif
    initSimulator();
    
    // Système d'onglets
    initTabs();
    
    // Animation au scroll
    initScrollAnimations();
    
    // Navigation fluide
    initSmoothScrolling();
});

// Animation des nombres compteurs
function animateNumbers() {
    const numbers = document.querySelectorAll('.animate-number, .preview-number[data-target]');
    
    const animateNumber = (element) => {
        const target = parseInt(element.dataset.target) || parseInt(element.textContent);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    // Observer pour déclencher l'animation quand l'élément est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateNumber(entry.target);
            }
        });
    });
    
    numbers.forEach(number => observer.observe(number));
}

// Système de sections pliables
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const header = content.previousElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        header.classList.remove('expanded');
        icon.textContent = '+';
    } else {
        content.classList.add('expanded');
        header.classList.add('expanded');
        icon.textContent = '−';
    }
}

// Rendre la fonction accessible globalement
window.toggleSection = toggleSection;

// Initialisation des graphiques
function initCharts() {
    // Graphique d'évolution des consommations d'entraînement
    const trainingCtx = document.getElementById('trainingChart');
    if (trainingCtx) {
        new Chart(trainingCtx, {
            type: 'bar',
            data: {
                labels: ['BERT (2018)', 'GPT-1 (2018)', 'GPT-2 (2019)', 'GPT-3 (2020)', 'GPT-4 (2023)', 'GPT-5 (Est.)'],
                datasets: [{
                    label: 'Consommation d\'entraînement (MWh)',
                    data: [300, 450, 650, 1287, 1750, 3500],
                    backgroundColor: [
                        'rgba(102, 187, 106, 0.8)',
                        'rgba(66, 165, 245, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(255, 138, 101, 0.8)',
                        'rgba(186, 104, 200, 0.8)',
                        'rgba(239, 83, 80, 0.8)'
                    ],
                    borderColor: [
                        'rgb(76, 175, 80)',
                        'rgb(33, 150, 243)',
                        'rgb(255, 193, 7)',
                        'rgb(255, 87, 34)',
                        'rgb(156, 39, 176)',
                        'rgb(244, 67, 54)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#00ff88',
                            font: {
                                family: 'Roboto'
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#ccc',
                            callback: function(value) {
                                return value + ' MWh';
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#ccc'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'
                }
            }
        });
    }
    
    // Graphique de consommation d'eau
    const waterCtx = document.getElementById('waterChart');
    if (waterCtx) {
        new Chart(waterCtx, {
            type: 'doughnut',
            data: {
                labels: ['GPT-4 (par requête)', 'Data center moyen/jour', 'Hyperscale/jour'],
                datasets: [{
                    data: [0.519, 1135000, 2082000], // en litres
                    backgroundColor: [
                        'rgba(0, 153, 255, 0.8)',
                        'rgba(0, 204, 255, 0.8)',
                        'rgba(0, 102, 204, 0.8)'
                    ],
                    borderColor: [
                        'rgb(0, 153, 255)',
                        'rgb(0, 204, 255)',
                        'rgb(0, 102, 204)'
                    ],
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ccc',
                            padding: 20,
                            font: {
                                family: 'Roboto'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                if (value < 1) {
                                    return context.label + ': ' + (value * 1000).toFixed(0) + ' ml';
                                }
                                return context.label + ': ' + value.toLocaleString() + ' litres';
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }
}

// Simulateur interactif
function initSimulator() {
    const slider = document.getElementById('requestsSlider');
    const valueDisplay = document.getElementById('requestsValue');
    const dailyConsumption = document.getElementById('dailyConsumption');
    const co2Equivalent = document.getElementById('co2Equivalent');
    const annualCost = document.getElementById('annualCost');
    
    if (slider) {
        const updateSimulator = () => {
            const requests = parseInt(slider.value);
            valueDisplay.textContent = requests;
            
            // Calculs (basés sur GPT-4o : 0.3 Wh par requête)
            const dailyWh = requests * 0.3;
            const dailyKwh = dailyWh / 1000;
            const co2PerKwh = 0.5; // kg CO2 par kWh (moyenne mondiale)
            const dailyCO2 = dailyKwh * co2PerKwh;
            const costPerKwh = 0.16; // € par kWh (moyenne France)
            const annualCostEur = dailyKwh * 365 * costPerKwh;
            
            // Mise à jour de l'affichage
            dailyConsumption.textContent = dailyWh.toFixed(1) + ' Wh';
            co2Equivalent.textContent = (dailyCO2 * 1000).toFixed(1) + ' g';
            annualCost.textContent = annualCostEur.toFixed(2) + ' €';
            
            // Animation des valeurs
            [dailyConsumption, co2Equivalent, annualCost].forEach(el => {
                el.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    el.style.transform = 'scale(1)';
                }, 200);
            });
        };
        
        slider.addEventListener('input', updateSimulator);
        updateSimulator(); // Initialisation
    }
}

// Système d'onglets
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Désactiver tous les onglets
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activer l'onglet cliqué
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Animations au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                
                // Animation spéciale pour les cartes
                if (entry.target.classList.contains('stat-card') || 
                    entry.target.classList.contains('inference-card') ||
                    entry.target.classList.contains('sector-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll(`
        .stat-card, 
        .inference-card, 
        .sector-card, 
        .solution-item, 
        .practice-card,
        .resource-card,
        .timeline-item
    `);
    
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Navigation fluide
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100; // Offset pour le header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Effet de survol sur les cartes de secteur
document.addEventListener('DOMContentLoaded', function() {
    const sectorCards = document.querySelectorAll('.sector-card');
    
    sectorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const impact = this.dataset.impact;
            const bar = this.querySelector('.impact-fill');
            if (bar) {
                bar.style.animation = 'none';
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.animation = `fill-bar 1s ease-out forwards`;
                    bar.style.width = impact + '%';
                }, 50);
            }
        });
    });
});

// Effet parallaxe pour le fond
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const particles = document.getElementById('particles-js');
    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animation des barres de progression au scroll
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const originalWidth = entry.target.style.width;
                entry.target.style.width = '0';
                entry.target.offsetHeight; // Force reflow
                entry.target.style.transition = 'width 2s ease-out';
                entry.target.style.width = originalWidth;
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Initialiser les animations des barres de progression
document.addEventListener('DOMContentLoaded', animateProgressBars);

// Effet de typing pour certains textes
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

// Easter egg : clic sur l'icône énergie
document.addEventListener('DOMContentLoaded', function() {
    const energyPulse = document.querySelector('.energy-pulse');
    if (energyPulse) {
        let clickCount = 0;
        energyPulse.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                this.style.background = 'radial-gradient(circle, #ffd700 0%, #ff6b6b 100%)';
                this.querySelector('::before') && (this.querySelector('::before').textContent = '🌱');
                setTimeout(() => {
                    this.style.background = 'radial-gradient(circle, #00ff88 0%, #0066ff 100%)';
                }, 3000);
                clickCount = 0;
            }
        });
    }
});

// Détection du mode sombre/clair (si implémenté)
function detectColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
}

// Optimisation des performances pour les animations
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Application du throttle au scroll
window.addEventListener('scroll', throttle(function() {
    // Code des animations au scroll ici si nécessaire
}, 16)); // ~60fps
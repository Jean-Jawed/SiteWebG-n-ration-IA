// JavaScript pour la page IA Offline
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des cartes à déplier
    const toggleButtons = document.querySelectorAll('.card-toggle');
    
    toggleButtons.forEach(button => {
        // Définir le texte initial pour chaque bouton
        button.setAttribute('data-expand', button.textContent);
        
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.textContent = 'Réduire';
            } else {
                this.textContent = this.getAttribute('data-expand');
            }
        });
    });
    
    // Animation des cartes de plateformes
    const platformCards = document.querySelectorAll('.platform-card');
    
    function animatePlatformCards() {
        platformCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 200);
        });
    }
    
    // Observer pour déclencher l'animation des cartes de plateformes
    const platformsSection = document.querySelector('.platforms-section');
    
    if ('IntersectionObserver' in window) {
        const platformObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePlatformCards();
                    platformObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        platformObserver.observe(platformsSection);
    } else {
        animatePlatformCards();
    }
    
    // Animation des étapes
    const steps = document.querySelectorAll('.step');
    
    function animateSteps() {
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '0';
                step.style.transform = 'translateY(20px)';
                step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                }, 50);
            }, index * 200);
        });
    }
    
    // Observer pour déclencher l'animation des étapes
    const gettingStarted = document.querySelector('.getting-started');
    
    if ('IntersectionObserver' in window) {
        const stepsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSteps();
                    stepsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        stepsObserver.observe(gettingStarted);
    } else {
        animateSteps();
    }
    
    // Animation des cartes d'information
    const infoCards = document.querySelectorAll('.info-card');
    
    function animateInfoCards() {
        infoCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 200);
        });
    }
    
    // Observer pour déclencher l'animation des cartes d'information
    const cardsContainer = document.querySelector('.cards-container');
    
    if ('IntersectionObserver' in window) {
        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateInfoCards();
                    cardsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        cardsObserver.observe(cardsContainer);
    } else {
        animateInfoCards();
    }
});
// JavaScript pour la page How It Works
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des cartes à déplier
    const toggleButtons = document.querySelectorAll('.card-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.textContent = 'Réduire';
            } else {
                this.textContent = this.getAttribute('data-expand') || 'En savoir plus';
            }
        });
    });
    
    // Animation des étapes du processus
    const flowSteps = document.querySelectorAll('.flow-step');
    
    function animateSteps() {
        flowSteps.forEach((step, index) => {
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
    
    // Observer pour déclencher l'animation lorsque la section est visible
    const processFlow = document.querySelector('.process-flow');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSteps();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(processFlow);
    } else {
        // Fallback pour les navigateurs sans support d'IntersectionObserver
        animateSteps();
    }
    
    // Animation d'apparition des cartes
    const infoCards = document.querySelectorAll('.info-card');
    
    function animateCards() {
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
    
    // Observer pour déclencher l'animation des cartes
    const cardsContainer = document.querySelector('.cards-container');
    
    if ('IntersectionObserver' in window) {
        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCards();
                    cardsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        cardsObserver.observe(cardsContainer);
    } else {
        animateCards();
    }
});
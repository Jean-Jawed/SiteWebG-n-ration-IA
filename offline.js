// JavaScript pour la page IA Offline
document.addEventListener('DOMContentLoaded', function() {
    // Respect de la préférence système : réduire les animations
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Gestion des cartes et questions à déplier
    const toggleButtons = document.querySelectorAll('.card-toggle');

    toggleButtons.forEach(button => {
        // Mémoriser le libellé initial de chaque bouton
        button.setAttribute('data-expand', button.textContent.trim());

        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            if (!details) return;

            const isOpen = details.classList.toggle('active');

            // Mise à jour de l'état pour les lecteurs d'écran
            this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

            // Les boutons de la FAQ gardent leur libellé (l'icône +/- suffit) ;
            // les autres alternent entre « En savoir plus » et « Réduire ».
            const inFaq = this.closest('.faq-item');
            if (!inFaq) {
                this.textContent = isOpen ? 'Réduire' : this.getAttribute('data-expand');
            }
        });
    });

    // Animation d'apparition générique d'un groupe d'éléments
    function revealGroup(elements) {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 50);
            }, index * 200);
        });
    }

    // Observe une section et anime ses enfants une seule fois quand elle devient visible
    function observeAndReveal(sectionSelector, childSelector) {
        const section = document.querySelector(sectionSelector);
        if (!section) return;

        const children = section.querySelectorAll(childSelector);
        if (!children.length) return;

        // Si l'utilisateur préfère moins d'animations, on affiche directement
        if (reduceMotion) {
            children.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        revealGroup(children);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(section);
        } else {
            revealGroup(children);
        }
    }

    // Sections animées au défilement
    observeAndReveal('.cards-container', '.info-card');
    observeAndReveal('.usecases-section', '.usecase-card');
    observeAndReveal('.platforms-section', '.platform-card');
    observeAndReveal('.limits-section', '.limit-card');
    observeAndReveal('.getting-started', '.step');
});

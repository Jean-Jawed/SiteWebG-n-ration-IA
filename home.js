/* Page d'accueil — parallaxe du hero + apparitions au scroll. */

document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Parallaxe : léger décalage de l'image au scroll
    const hero = document.querySelector('.home-hero');
    const heroImg = document.querySelector('.home-hero-media img');

    if (hero && heroImg && !reduceMotion) {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const y = window.scrollY;
                    if (y < hero.offsetHeight) {
                        heroImg.style.transform = 'translate3d(0, ' + (y * 0.22) + 'px, 0)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Apparitions : chaque groupe de cartes se relève en cascade
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window && !reduceMotion) {
        const groups = new Map();
        revealEls.forEach(el => {
            const parent = el.parentElement;
            if (parent.classList.contains('home-cards') || parent.classList.contains('container')) {
                groups.set(parent, (groups.get(parent) || 0) + 1);
                el.style.transitionDelay = ((groups.get(parent) - 1) * 80) + 'ms';
            }
        });
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }
});

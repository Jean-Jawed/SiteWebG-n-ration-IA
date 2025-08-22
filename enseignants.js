// JavaScript pour la page Enseignants - Version ultra-simplifiée
document.addEventListener('DOMContentLoaded', function() {
    // Désactiver complètement la fonction initTeachersPage du script général
    window.initTeachersPage = function() {
        console.log('Fonction initTeachersPage désactivée');
    };
    
    // Gestion simplifiée des onglets
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Cacher tous les panneaux de contenu
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.style.display = 'none';
            });
            
            // Afficher le panneau correspondant
            const tabId = this.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.style.display = 'block';
            }
        });
    });
    
    // Activer le premier onglet par défaut
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
    
    // Animation des cartes de bénéfices
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    function animateBenefitCards() {
        benefitCards.forEach((card, index) => {
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
    
    // Observer pour déclencher l'animation des cartes de bénéfices
    const benefitsSection = document.querySelector('.benefits-section');
    
    if (benefitsSection && 'IntersectionObserver' in window) {
        const benefitsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateBenefitCards();
                    benefitsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        benefitsObserver.observe(benefitsSection);
    } else if (benefitsSection) {
        animateBenefitCards();
    }
    
    // Animation des cartes d'élèves
    const studentCards = document.querySelectorAll('.student-card');
    
    function animateStudentCards() {
        studentCards.forEach((card, index) => {
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
    
    // Observer pour déclencher l'animation des cartes d'élèves
    const studentSection = document.querySelector('.student-assistance');
    
    if (studentSection && 'IntersectionObserver' in window) {
        const studentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStudentCards();
                    studentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        studentObserver.observe(studentSection);
    } else if (studentSection) {
        animateStudentCards();
    }
    
    // Animation des activités par groupe d'âge
    const ageGroups = document.querySelectorAll('.age-group');
    
    function animateAgeGroups() {
        ageGroups.forEach((group, groupIndex) => {
            setTimeout(() => {
                group.style.opacity = '0';
                group.style.transform = 'translateY(20px)';
                group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translateY(0)';
                    
                    // Animer les activités à l'intérieur de chaque groupe
                    const activities = group.querySelectorAll('.activity-card');
                    activities.forEach((activity, activityIndex) => {
                        setTimeout(() => {
                            activity.style.opacity = '0';
                            activity.style.transform = 'translateY(20px)';
                            activity.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            
                            setTimeout(() => {
                                activity.style.opacity = '1';
                                activity.style.transform = 'translateY(0)';
                            }, 50);
                        }, activityIndex * 200);
                    });
                }, 50);
            }, groupIndex * 300);
        });
    }
    
    // Observer pour déclencher l'animation des groupes d'âge
    const teachingSection = document.querySelector('.teaching-ia-section');
    
    if (teachingSection && 'IntersectionObserver' in window) {
        const teachingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateAgeGroups();
                    teachingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        teachingObserver.observe(teachingSection);
    } else if (teachingSection) {
        animateAgeGroups();
    }
    
    // Animation des étapes de démarrage
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
    
    if (gettingStarted && 'IntersectionObserver' in window) {
        const stepsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSteps();
                    stepsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        stepsObserver.observe(gettingStarted);
    } else if (gettingStarted) {
        animateSteps();
    }
    
    // Animation des ressources
    const resourceCards = document.querySelectorAll('.resource-card');
    
    function animateResourceCards() {
        resourceCards.forEach((card, index) => {
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
    
    // Observer pour déclencher l'animation des ressources
    const resourcesSection = document.querySelector('.resources-section');
    
    if (resourcesSection && 'IntersectionObserver' in window) {
        const resourcesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateResourceCards();
                    resourcesObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        resourcesObserver.observe(resourcesSection);
    } else if (resourcesSection) {
        animateResourceCards();
    }
    
    // Animation des lignes directrices
    const guidelineCards = document.querySelectorAll('.guideline-card');
    
    function animateGuidelineCards() {
        guidelineCards.forEach((card, index) => {
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
    
    // Observer pour déclencher l'animation des lignes directrices
    const guidelinesSection = document.querySelector('.ethical-guidelines');
    
    if (guidelinesSection && 'IntersectionObserver' in window) {
        const guidelinesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateGuidelineCards();
                    guidelinesObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        guidelinesObserver.observe(guidelinesSection);
    } else if (guidelinesSection) {
        animateGuidelineCards();
    }
    
    // Animation de la section d'introduction
    const introSection = document.querySelector('.intro-section');
    
    function animateIntroSection() {
        if (introSection) {
            introSection.style.opacity = '0';
            introSection.style.transform = 'translateY(20px)';
            introSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                introSection.style.opacity = '1';
                introSection.style.transform = 'translateY(0)';
            }, 50);
        }
    }
    
    // Observer pour déclencher l'animation de l'introduction
    if (introSection && 'IntersectionObserver' in window) {
        const introObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateIntroSection();
                    introObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        introObserver.observe(introSection);
    } else if (introSection) {
        animateIntroSection();
    }
    
    // Animation de l'impact pédagogique
    const impactSection = document.querySelector('.pedagogical-impact');
    
    function animateImpactSection() {
        if (impactSection) {
            impactSection.style.opacity = '0';
            impactSection.style.transform = 'translateY(20px)';
            impactSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                impactSection.style.opacity = '1';
                impactSection.style.transform = 'translateY(0)';
            }, 50);
        }
    }
    
    // Observer pour déclencher l'animation de l'impact pédagogique
    if (impactSection && 'IntersectionObserver' in window) {
        const impactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateImpactSection();
                    impactObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        impactObserver.observe(impactSection);
    } else if (impactSection) {
        animateImpactSection();
    }
    
    // Désactiver le comportement des titres de groupe d'âge (précaution supplémentaire)
    const ageGroupHeadings = document.querySelectorAll('.age-group h3');
    ageGroupHeadings.forEach(heading => {
        heading.style.cursor = 'default';
        heading.onclick = null;
        
        // Cloner et remplacer pour supprimer tous les écouteurs
        const newHeading = heading.cloneNode(true);
        heading.parentNode.replaceChild(newHeading, heading);
    });
});
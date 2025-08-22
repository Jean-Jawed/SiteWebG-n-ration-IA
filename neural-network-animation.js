// neural-network-animation.js
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'animation est présente sur la page
    const neuralNetwork = document.querySelector('.neural-network');
    if (!neuralNetwork) return;
    
    const connectionsContainer = document.getElementById('connections');
    const layers = document.querySelectorAll('.layer');
    const neurons = document.querySelectorAll('.neuron');
    let animationSpeed = 2;
    
    // Créer les connexions entre les neurones
    for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];
        
        const currentNeurons = currentLayer.querySelectorAll('.neuron');
        const nextNeurons = nextLayer.querySelectorAll('.neuron');
        
        currentNeurons.forEach(currentNeuron => {
            nextNeurons.forEach(nextNeuron => {
                createConnection(currentNeuron, nextNeuron);
            });
        });
    }
    
    function createConnection(fromNeuron, toNeuron) {
        const fromRect = fromNeuron.getBoundingClientRect();
        const toRect = toNeuron.getBoundingClientRect();
        
        const containerRect = neuralNetwork.getBoundingClientRect();
        
        const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
        const fromY = fromRect.top - containerRect.top + fromRect.height / 2;
        const toX = toRect.left - containerRect.left + toRect.width / 2;
        const toY = toRect.top - containerRect.top + toRect.height / 2;
        
        const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
        const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
        
        const connection = document.createElement('div');
        connection.className = 'connection';
        connection.style.width = `${length}px`;
        connection.style.height = '1px';
        connection.style.left = `${fromX}px`;
        connection.style.top = `${fromY}px`;
        connection.style.transform = `rotate(${angle}deg)`;
        connection.style.opacity = Math.random() * 0.3 + 0.1;
        
        connectionsContainer.appendChild(connection);
        
        // Créer des signaux aléatoires qui voyagent le long des connexions
        if (Math.random() > 0.7) {
            setInterval(() => {
                createSignal(connection, length);
            }, Math.random() * 3000 + 1000);
        }
    }
    
    function createSignal(connection, length) {
        const signal = document.createElement('div');
        signal.className = 'signal';
        
        signal.style.left = `${-5}px`;
        signal.style.top = `${-5}px`;
        
        connection.appendChild(signal);
        
        const animation = signal.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(${length}px)` }
        ], {
            duration: 2000 / animationSpeed,
            easing: 'ease-in-out'
        });
        
        animation.onfinish = () => {
            signal.remove();
        };
    }
    
    // Gestion des boutons de contrôle de vitesse
    document.getElementById('slowBtn').addEventListener('click', () => {
        animationSpeed = 0.5;
        updateAnimations();
    });
    
    document.getElementById('normalBtn').addEventListener('click', () => {
        animationSpeed = 1;
        updateAnimations();
    });
    
    document.getElementById('fastBtn').addEventListener('click', () => {
        animationSpeed = 2;
        updateAnimations();
    });
    
    function updateAnimations() {
        // Mettre à jour la vitesse de toutes les animations existantes
        document.querySelectorAll('.signal').forEach(signal => {
            signal.getAnimations().forEach(anim => {
                anim.playbackRate = animationSpeed;
            });
        });
    }
    
    // Ajouter des effets au survol des neurones
    neurons.forEach(neuron => {
        neuron.addEventListener('mouseenter', () => {
            neuron.style.transform = 'scale(1.2)';
            neuron.style.boxShadow = '0 0 20px currentColor';
        });
        
        neuron.addEventListener('mouseleave', () => {
            neuron.style.transform = 'scale(1)';
            if (neuron.closest('.input-layer')) {
                neuron.style.boxShadow = '0 0 15px rgba(247, 255, 106, 0.5)';
            } else if (neuron.closest('.output-layer')) {
                neuron.style.boxShadow = '0 0 15px rgba(255, 106, 167, 0.5)';
            } else {
                neuron.style.boxShadow = '0 0 15px rgba(109, 213, 237, 0.5)';
            }
        });
    });
    
    // Ajuster les connexions au redimensionnement de la fenêtre
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            document.querySelectorAll('.connection').forEach(conn => conn.remove());
            
            for (let i = 0; i < layers.length - 1; i++) {
                const currentLayer = layers[i];
                const nextLayer = layers[i + 1];
                
                const currentNeurons = currentLayer.querySelectorAll('.neuron');
                const nextNeurons = nextLayer.querySelectorAll('.neuron');
                
                currentNeurons.forEach(currentNeuron => {
                    nextNeurons.forEach(nextNeuron => {
                        createConnection(currentNeuron, nextNeuron);
                    });
                });
            }
        }, 250);
    });
});
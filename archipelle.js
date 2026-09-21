// JavaScript pour la page Archipelle
document.addEventListener('DOMContentLoaded', function () {

    // Copie des blocs de commandes, sans l'invite de terminal ($)
    document.querySelectorAll('.arch-code').forEach(function (block) {
        const button = block.querySelector('.arch-copy');
        const code = block.querySelector('pre code');
        if (!button || !code) return;

        // Mémoriser le libellé initial pour le restaurer après confirmation
        button.setAttribute('data-label', button.textContent.trim());

        button.addEventListener('click', function () {
            // On travaille sur une copie du bloc pour en retirer les invites
            const clone = code.cloneNode(true);
            clone.querySelectorAll('.tok-prompt').forEach(el => el.remove());
            const text = clone.textContent.replace(/[ \t]+$/gm, '').trim();

            copyText(text).then(function (ok) {
                button.textContent = ok ? 'Copié' : 'Échec';
                button.classList.toggle('is-done', ok);

                setTimeout(function () {
                    button.textContent = button.getAttribute('data-label');
                    button.classList.remove('is-done');
                }, 2000);
            });
        });
    });

    // Presse-papiers moderne, avec repli pour les navigateurs anciens
    // ou les contextes non sécurisés (fichier ouvert en local).
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text)
                .then(() => true)
                .catch(() => fallbackCopy(text));
        }
        return Promise.resolve(fallbackCopy(text));
    }

    function fallbackCopy(text) {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();

        let ok = false;
        try {
            ok = document.execCommand('copy');
        } catch (e) {
            ok = false;
        }

        document.body.removeChild(area);
        return ok;
    }
});

/* Dossier « L'IA et l'environnement » : simulateur, citations copiables, sommaire actif. */
(function () {
    'use strict';

    var lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    var nf = function (v, d) {
        return v.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
            minimumFractionDigits: d,
            maximumFractionDigits: d
        });
    };
    var smart = function (v) {
        if (v >= 100) return nf(Math.round(v), 0);
        if (v >= 10) return nf(v, 0);
        return nf(v, 1);
    };

    /* ---------- Simulateur ---------- */
    function initSim() {
        var inputs = document.querySelectorAll('.ep-range input');
        if (!inputs.length) return;
        var $ = function (id) { return document.getElementById(id); };

        function update() {
            var total = 0;
            var video = 0;
            inputs.forEach(function (inp) {
                var n = +inp.value;
                var out = inp.parentNode.querySelector('output');
                if (out) out.textContent = n;
                var wh = n * parseFloat(inp.dataset.wh) * parseFloat(inp.dataset.per);
                total += wh;
                if (inp.id === 's-vid') video = wh;
            });
            var kwh = total / 1000;
            $('sim-kwh').textContent = smart(kwh);
            $('sim-kettle').textContent = smart(kwh / 0.1);
            $('sim-km').textContent = smart(kwh / 0.17);
            $('sim-co2').textContent = smart(kwh * 0.45);
            var pct = total > 0 ? Math.round(video / total * 100) : 0;
            $('sim-vidbar').style.width = pct + '%';
            $('sim-vidpct').textContent = pct + (lang === 'fr' ? ' %' : '%');
        }

        inputs.forEach(function (inp) { inp.addEventListener('input', update); });
        update();
    }

    /* ---------- Citations copiables ---------- */
    function initCopy() {
        document.querySelectorAll('.ep-copy').forEach(function (btn) {
            var label = btn.querySelector('span');
            var initial = label.textContent;
            btn.addEventListener('click', function () {
                var text = btn.dataset.cite;
                var done = function () {
                    btn.classList.add('is-done');
                    label.textContent = lang === 'fr' ? 'Copié' : 'Copied';
                    setTimeout(function () {
                        btn.classList.remove('is-done');
                        label.textContent = initial;
                    }, 1800);
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
                } else {
                    fallback(text);
                    done();
                }
            });
        });

        function fallback(text) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch (e) { /* rien */ }
            document.body.removeChild(ta);
        }
    }

    /* ---------- Sommaire : section en cours ---------- */
    function initToc() {
        var links = document.querySelectorAll('.ep-toc a');
        if (!links.length || !('IntersectionObserver' in window)) return;
        var map = {};
        links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
        var current = null;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting && map[e.target.id]) {
                    if (current) current.removeAttribute('aria-current');
                    current = map[e.target.id];
                    current.setAttribute('aria-current', 'true');
                }
            });
        }, { rootMargin: '-35% 0px -60% 0px' });
        Object.keys(map).forEach(function (id) {
            var el = document.getElementById(id);
            if (el) io.observe(el);
        });
    }

    function init() {
        initSim();
        initCopy();
        initToc();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

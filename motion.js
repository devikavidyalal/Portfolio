/* ==========================================================================
   motion.js
   Self-contained interaction layer for Devika T V's portfolio.
   Safe to include on every page — every feature checks for the elements
   it needs before doing anything, so it never errors on pages that
   don't have a given piece of markup.
   ========================================================================== */
(function () {
    'use strict';

    var reduceMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', function () {
        document.body.classList.add('motion-ready');

        setupScrollProgress();
        setupRevealOnScroll();
        setupHeroTilt();
        setupRipple();
        setupTypingHero();
        setupBackToTop();

        if (!reduceMotion) {
            setupCursorGlow();
        }
    });

    /* ---- thin progress bar tied to scroll position ---------------------- */
    function setupScrollProgress() {
        var bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);

        function update() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var docHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = pct + '%';
        }

        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ---- fade/rise elements into view as the reader scrolls ------------- */
    function setupRevealOnScroll() {
        var selector = [
            '.folio-card',
            '.toc-row',
            '.role-item',
            '.thanks-line',
            '.story-card',
            '.quote',
            '.feature-list li',
            '.image-block',
            '.about-copy > p',
            '.tech-grid span'
        ].join(',');

        var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
        if (!nodes.length) return;

        var parentCounts = new Map();

        nodes.forEach(function (el) {
            if (el.classList.contains('reveal-init')) return;
            var parent = el.parentElement || document.body;
            var idx = parentCounts.get(parent) || 0;
            parentCounts.set(parent, idx + 1);
            var delay = Math.min(idx * 0.08, 0.48);
            el.style.setProperty('--reveal-delay', delay + 's');
            el.classList.add('reveal-init');
        });

        if (reduceMotion || !('IntersectionObserver' in window)) {
            nodes.forEach(function (el) {
                el.classList.add('is-visible');
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        nodes.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ---- subtle 3D tilt, reserved for the hero portrait only ------------ */
    function setupHeroTilt() {
        if (reduceMotion) return;
        var card = document.querySelector('.portrait-card');
        if (!card) return;

        card.setAttribute('data-tilt', '');

        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;
            var rotateX = (y * -7).toFixed(2);
            var rotateY = (x * 7).toFixed(2);
            card.style.transform =
                'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    }

    /* ---- material-style ripple on interactive buttons/links -------------- */
    function setupRipple() {
        var selector = '.btn, .toc-row-button, .read-more, .back-home-btn, .text-link';

        document.addEventListener('click', function (e) {
            var target = e.target.closest ? e.target.closest(selector) : null;
            if (!target) return;

            var rect = target.getBoundingClientRect();
            var size = Math.max(rect.width, rect.height);
            var ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            if (window.getComputedStyle(target).position === 'static') {
                target.style.position = 'relative';
            }
            target.style.overflow = 'hidden';

            target.appendChild(ripple);
            setTimeout(function () {
                ripple.remove();
            }, 650);
        });
    }

    /* ---- typewriter effect on the hero role line ------------------------- */
    function setupTypingHero() {
        var el = document.querySelector('.hero-role');
        if (!el || reduceMotion) return;

        var text = el.textContent.trim();
        if (!text) return;

        el.textContent = '';
        var cursor = document.createElement('span');
        cursor.className = 'type-cursor';
        el.appendChild(cursor);

        var i = 0;
        function typeChar() {
            if (i < text.length) {
                cursor.insertAdjacentText('beforebegin', text.charAt(i));
                i++;
                setTimeout(typeChar, 45);
            } else {
                setTimeout(function () {
                    cursor.style.animationDuration = '1.1s';
                }, 400);
            }
        }
        setTimeout(typeChar, 400);
    }

    /* ---- floating back-to-top button --------------------------------------- */
    function setupBackToTop() {
        var btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
        document.body.appendChild(btn);

        window.addEventListener(
            'scroll',
            function () {
                btn.classList.toggle('show', window.pageYOffset > 500);
            },
            { passive: true }
        );

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---- soft ambient glow that follows the cursor (desktop only) --------- */
    function setupCursorGlow() {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        var glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        document.addEventListener('mousemove', function (e) {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            glow.classList.add('active');
        });

        document.addEventListener('mouseleave', function () {
            glow.classList.remove('active');
        });
    }
})();
(function () {
    var ASSETS = [
        ['meta', { name: 'keywords', content: 'Uberstrike' }],
        ['meta', { name: 'robots', content: 'index, follow' }],
        ['meta', { name: 'language', content: 'English' }]
    ];
    ASSETS.forEach(function (item) {
        var el = document.createElement(item[0]);
        Object.keys(item[1]).forEach(function (k) {
            el.setAttribute(k, item[1][k]);
        });
        document.head.appendChild(el);
    });
})();

(function () {
    var pre = document.createElement('link');
    pre.rel = 'preconnect';
    pre.href = 'https://www.termsfeed.com';
    document.head.appendChild(pre);

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://www.termsfeed.com/public/cookie-consent/4.2.0/cookie-consent.js';
    s.charset = 'UTF-8';
    document.head.appendChild(s);

    function start() {
        try {
            cookieconsent.run({
                "notice_banner_type": "standalone",
                "consent_type": "express",
                "palette": "dark",
                "language": "en",
                "page_load_consent_levels": ["strictly-necessary"],
                "notice_banner_reject_button_hide": false,
                "preferences_center_close_button_hide": false,
                "page_refresh_confirmation_buttons": false,
                "website_name": "UberStrike Steam Portal",
                "callbacks": {
                    "scripts_specific_loaded": function (level) {
                        if (level === 'tracking') {
                            window.gtag('consent', 'update', {
                                'analytics_storage': 'granted'
                            });
                        } else if (level === 'targeting') {
                            window.gtag('consent', 'update', {
                                'ad_storage': 'granted',
                                'ad_user_data': 'granted',
                                'ad_personalization': 'granted',
                                'analytics_storage': 'granted'
                            });
                        }
                    }
                },
                "callbacks_force": true
            });
        } catch (e) {}
    }

    document.addEventListener('DOMContentLoaded', function () {
        var b = document.createElement('button');
        b.type = 'button';
        b.id = 'open_preferences_center';
        b.className = 'cookie-preferences-link';
        b.setAttribute('aria-label', 'Update cookies preferences');
        b.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="currentColor"/><circle cx="9" cy="9.5" r="1.3" fill="#05070d"/><circle cx="12.5" cy="7" r="1.1" fill="#05070d"/><circle cx="15.5" cy="10" r="1.2" fill="#05070d"/><circle cx="8.5" cy="13.5" r="1" fill="#05070d"/><circle cx="14" cy="14.5" r="1.2" fill="#05070d"/><circle cx="11" cy="16" r="1" fill="#05070d"/></svg>';
        document.body.appendChild(b);

        if (window.cookieconsent) {
            start();
        } else {
            s.addEventListener('load', start);
        }
    });
})();

(function () {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };

    var pre = document.createElement('link');
    pre.rel = 'preconnect';
    pre.href = 'https://www.googletagmanager.com';
    document.head.appendChild(pre);

    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });
    gtag('js', new Date());
    gtag('config', 'AW-18463699538');
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18463699538';
    document.head.appendChild(s);
})();

(function () {
    var PAGES = [
        { key: 'home', label: 'Home', href: 'index.html' },
        { key: 'vision', label: 'Vision', href: 'vision.html' },
        { key: 'social', label: 'Social Media', href: 'social.html' },
        { key: 'downloads', label: 'Download', href: 'downloads.html' }
    ];

    document.addEventListener('DOMContentLoaded', function () {
        var nav = document.querySelector('nav.uber-nav');
        if (!nav) return;
        var page = document.body.getAttribute('data-page') || 'home';
        var isHome = page === 'home';
        var brandHref = isHome ? '#' : 'index.html';
        var items = PAGES.map(function (p) {
            var href = (p.key === 'home' && isHome) ? '#' : p.href;
            var active = p.key === page ? ' active' : '';
            return '<li class="nav-item">' +
                '<a class="nav-link' + active + '" href="' + href + '">' + p.label + '</a>' +
                '</li>';
        }).join('');
        nav.innerHTML =
            '<div class="container">' +
            '<a class="navbar-brand uber-brand" href="' + brandHref + '">UberStrike</a>' +
            '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#uberNav"' +
            ' aria-controls="uberNav" aria-expanded="false" aria-label="Toggle navigation">' +
            '<span class="navbar-toggler-icon"></span>' +
            '</button>' +
            '<div class="collapse navbar-collapse" id="uberNav">' +
            '<ul class="navbar-nav ms-auto mb-2 mb-lg-0">' + items + '</ul>' +
            '</div>' +
            '</div>';
    });
})();

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var home = document.getElementById('home');
        if (home) {
            var links = document.querySelectorAll('.uber-nav .nav-link');
            var spy = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        links.forEach(function (l) {
                            l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id || (entry.target.id === 'home' && l.getAttribute('href') === '#'));
                        });
                    }
                });
            }, { rootMargin: '-20% 0px -70% 0px' });
            spy.observe(home);
        }

        function fallbackCopy(text, done) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
                done();
            } catch (e) {}
            document.body.removeChild(ta);
        }

        document.querySelectorAll('.social-copy').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var url = btn.getAttribute('data-copy');
                var done = function () {
                    var original = btn.innerHTML;
                    btn.classList.add('copied');
                    btn.innerHTML = 'Copied!';
                    setTimeout(function () {
                        btn.classList.remove('copied');
                        btn.innerHTML = original;
                    }, 1600);
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(done).catch(function () {
                        fallbackCopy(url, done);
                    });
                } else {
                    fallbackCopy(url, done);
                }
            });
        });

        var dlMain = document.getElementById('dl2-main');
        if (dlMain) {
            var issues = document.getElementById('dl2-issues');
            dlMain.addEventListener('click', function () {
                setTimeout(function () {
                    issues.classList.remove('d-none');
                }, 1500);
            });
        }
    });
})();

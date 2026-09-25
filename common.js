(function () {
    var KEY = 'cookiehub-choice';
    var chScript = document.createElement('script');
    chScript.src = 'https://cdn.cookiehub.eu/c2/f228c587.js';
    document.head.appendChild(chScript);

    function getCookie(name) {
        try {
            var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
            return m ? decodeURIComponent(m[1]) : null;
        } catch (e) {
            return null;
        }
    }

    function setCookie(name, value) {
        try {
            var d = new Date();
            d.setDate(d.getDate() + 365);
            document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
        } catch (e) {}
    }

    function getSavedConsentState() {
        try {
            var raw = localStorage.getItem(KEY);
            if (!raw) raw = getCookie(KEY);
            return JSON.parse(raw || 'null');
        } catch (e) {
            try {
                return JSON.parse(getCookie(KEY) || 'null');
            } catch (e2) {
                return null;
            }
        }
    }

    function saveConsentState(status) {
        try {
            if (!status || status.answered !== true) return;
            var raw = JSON.stringify(status);
            try {
                localStorage.setItem(KEY, raw);
            } catch (e) {}
            setCookie(KEY, raw);
        } catch (e) {}
    }

    document.addEventListener('DOMContentLoaded', function () {
        var cpm = {
            onInitialise: saveConsentState,
            onStatusChange: saveConsentState
        };
        var saved = getSavedConsentState();
        if (saved && saved.answered === true) {
            cpm.consentState = saved;
        }
        var start = function () {
            try {
                window.cookiehub.load(cpm);
            } catch (e) {}
        };
        if (window.cookiehub) {
            start();
        } else {
            chScript.addEventListener('load', start);
        }
    });
})();

(function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
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

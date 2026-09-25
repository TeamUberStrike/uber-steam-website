(function () {
    var KEY = 'cookiehub-choice';
    window.__chDebug = { page: location.pathname, saved: null, restored: false, saveEvents: 0, loadOk: false, error: null };

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
            window.__chDebug.saveEvents++;
            try {
                localStorage.setItem(KEY, raw);
                window.__chDebug.saved = 'localStorage';
            } catch (e) {
                window.__chDebug.error = String(e);
            }
            setCookie(KEY, raw);
        } catch (e) {
            window.__chDebug.error = String(e);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var cpm = {
            onInitialise: saveConsentState,
            onStatusChange: saveConsentState
        };
        var saved = getSavedConsentState();
        if (saved && saved.answered === true) {
            cpm.consentState = saved;
            window.__chDebug.restored = true;
        }
        try {
            window.cookiehub.load(cpm);
            window.__chDebug.loadOk = true;
        } catch (e) {
            window.__chDebug.error = String(e);
        }
        try {
            AOS.init();
        } catch (e) {}
    });
})();

(function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'AW-18463699538');
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18463699538';
    document.head.appendChild(s);
})();

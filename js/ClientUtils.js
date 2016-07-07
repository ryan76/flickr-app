(function(document, window) {
    'use strict';

    function buildUrl(url, params) {
        var queryString = '';

        for(var key in params) {
            if (params.hasOwnProperty(key)) {
                queryString += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
            }
        }

        if (queryString.lastIndexOf('&') === queryString.length - 1){
            queryString = queryString.substring(0, queryString.length - 1);
        }

        return url + '?' + queryString;
    }

    function extend(target) {
        for(var i = 1; i < arguments.length; i++) {
            for(var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    target[key] = arguments[i][key];
                }
            }
        }

        return target;
    }

    window.ClientUtils = {
        buildUrl: buildUrl,
        extend: extend
    };
})(document, window);
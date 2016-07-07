
(function(document, window) {
    'use strict';

    function initPhotos(page) {
        page = page > 0 ? page : 1;

        Flickr.fetchPhotos({
            per_page: 6,
            jsoncallback: 'Site.Main.showPhotos',
            page: page
        });
    }

    function init() {
        initPhotos(1);
    }

    function showPhotos(data) {
        console.log(data);
    }

    window.Site = ClientUtils.extend(window.Site || {}, {
        Main: {
            init: init,
            initPhotos: initPhotos,
            showPhotos: showPhotos
        }
    });
})(document, window);

Site.Main.init();


(function(document, window) {
    'use strict';

    var thumbnailGallery;
    
    function initPhotos(page) {
        page = page > 0 ? page : 1;

        Flickr.fetchPhotos({
            per_page: 12,
            jsoncallback: 'Site.Main.showPhotos',
            page: page
        });
    }

    function init() {
        initPhotos(1);
    }

    function showPhotos(data) {
        var photos = data.photos.photo;
        var thumbnailList = document.getElementsByClassName('thumbnails-list')[0];
        thumbnailGallery = new ThumbnailGallery(photos, thumbnailList);
        thumbnailGallery.createGallery();
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

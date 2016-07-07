
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
        var photos = data.photos.photo;
        var img, link, listItem;
        var thumbnailList = document.getElementsByClassName('thumbnails-list')[0];
        for (var i = 0; i < photos.length; i++) {
            img = document.createElement('img');
            img.src = Flickr.buildPhotoUrlThumbnail(photos[i]);
            img.className = 'thumbnail';
            img.alt = photos[i].title;
            img.title = photos[i].title;

            link = document.createElement('a');
            link.href = img.src;
            link.appendChild(img);

            listItem = document.createElement('li');
            listItem.appendChild(link);

            thumbnailList.appendChild(listItem);
        }

        console.log(data);
        console.log(photos);
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

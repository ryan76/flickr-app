
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
        var prevButton, nextButton;
        initPhotos(1);
        nextButton = document.getElementById('next-button');
        nextButton.addEventListener('click', function() {
            thumbnailGallery.showNextPage.bind(thumbnailGallery)();
        });

        prevButton = document.getElementById('prev-button');
        prevButton.addEventListener('click', function() {
            thumbnailGallery.showPrevPage.bind(thumbnailGallery)();
        });
    }

    function showPhotos(data) {
        // TODO - remove after debugging
        console.log(data);
        
        var photos = data.photos.photo;
        var thumbnailList = document.getElementsByClassName('thumbnails-list')[0];
        thumbnailGallery = new ThumbnailGallery(photos, thumbnailList);
        thumbnailGallery.createGallery();;
    }
    
    function updatePhotos(data) {
        var photos = data.photos.photo;
        var currentPage = data.photos.page;
        var totalPages = data.photos.pages;
        var thumbnailList = document.getElementsByClassName('thumbnails-list')[0];
        while (thumbnailList.firstChild) {
            thumbnailList.removeChild(thumbnailList.firstChild);
        }
        thumbnailGallery = new ThumbnailGallery(photos, thumbnailList, currentPage, totalPages);
        thumbnailGallery.createGallery();
    }

    window.Site = ClientUtils.extend(window.Site || {}, {
        Main: {
            init: init,
            initPhotos: initPhotos,
            showPhotos: showPhotos,
            updatePhotos: updatePhotos
        }
    });
})(document, window);

Site.Main.init();

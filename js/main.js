
(function(document, window) {
    'use strict';

    var thumbnailGallery;
    var lastSearch = '';
    var filterPhotosMode = false;
    var filterText = '';
    
    function initPhotos(page) {
        page = page > 0 ? page : 1;

        Flickr.fetchPhotos({
            per_page: 12,
            jsoncallback: 'Site.Main.showPhotos',
            page: page
        });
    }

    function filterPhotos(text, page) {
        page = page > 0 ? page : 1;
        filterPhotosMode = true;
        filterText = text;
        
        Flickr.filterPhotos({
            text: text,
            per_page: 12,
            jsoncallback: 'Site.Main.updatePhotos',
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

        document.getElementsByClassName('form-filter')[0].addEventListener('submit', function(event) {
            event.preventDefault();

            lastSearch = document.getElementById('query').value;
            if (lastSearch.length > 0) {
                filterPhotos(lastSearch, 1);
            }
        });
    }

    function showPhotos(data) {
        var photos, currentPage, totalPages, thumbnailList;
        photos = data.photos.photo;
        currentPage = data.photos.page;
        totalPages = data.photos.pages;
        thumbnailList = document.getElementsByClassName('thumbnails-list')[0];
        thumbnailGallery = new ThumbnailGallery(photos, thumbnailList, currentPage, totalPages, filterPhotosMode, filterText);
        thumbnailGallery.createGallery();;
    }
    
    function updatePhotos(data) {
        var photos, currentPage, totalPages, thumbnailList;
        photos = data.photos.photo;
        currentPage = data.photos.page;
        totalPages = data.photos.pages;
        thumbnailList = document.getElementsByClassName('thumbnails-list')[0];

        while (thumbnailList.firstChild) {
            thumbnailList.removeChild(thumbnailList.firstChild);
        }
        
        thumbnailGallery = new ThumbnailGallery(photos, thumbnailList, currentPage, totalPages, filterPhotosMode, filterText);
        thumbnailGallery.createGallery();
    }

    window.Site = ClientUtils.extend(window.Site || {}, {
        Main: {
            init: init,
            initPhotos: initPhotos,
            filterPhotos: filterPhotos,
            showPhotos: showPhotos,
            updatePhotos: updatePhotos
        }
    });
})(document, window);

Site.Main.init();


(function(document, window) {
    'use strict';

    function ThumbnailGallery(photos, thumbnailList, currentPage, totalPages, filterPhotosMode, filterText) {
        this.photos = photos;
        this.thumbnailList = thumbnailList;
        this.currentPage = currentPage || 1;
        this.totalPages = totalPages;
        this.filterPhotosMode = filterPhotosMode || false;
        this.filterText = filterText || '';
    }

    ThumbnailGallery.prototype.createGallery = function() {
        
        var img, link, listItem, photos, thumbnailList, imageNumber;
        photos = this.photos;
        thumbnailList = this.thumbnailList;

        for (var i = 0, len = photos.length; i < len; i++) {
            img = document.createElement('img');
            img.src = Flickr.buildPhotoUrlThumbnail(photos[i]);
            img.className = 'thumbnail';
            img.alt = photos[i].title;
            img.title = photos[i].title;

            link = document.createElement('a');
            link.href = Flickr.buildPhotoUrlDefault(photos[i]);
            imageNumber = i + 1;
            link.setAttribute('data-lightbox', 'image-' + imageNumber);
            link.setAttribute('data-title', photos[i].title);
            link.appendChild(img);

            listItem = document.createElement('li');
            listItem.appendChild(link);

            thumbnailList.appendChild(listItem);
        }
    };
    
    ThumbnailGallery.prototype.showNextPage = function() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }

        if (this.filterPhotosMode) {
            Flickr.filterPhotos({
                text: this.filterText,
                per_page: 12,
                jsoncallback: 'Site.Main.updatePhotos',
                page: this.currentPage
            });
        } else {
            Flickr.fetchPhotos({
                per_page: 12,
                jsoncallback: 'Site.Main.updatePhotos',
                page: this.currentPage
            });
        }
    }

    ThumbnailGallery.prototype.showPrevPage = function() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }

        if (this.filterPhotosMode) {
            Flickr.filterPhotos({
                text: this.filterText,
                per_page: 12,
                jsoncallback: 'Site.Main.updatePhotos',
                page: this.currentPage
            });
        } else {
            Flickr.fetchPhotos({
                per_page: 12,
                jsoncallback: 'Site.Main.updatePhotos',
                page: this.currentPage
            });
        }
    }

    window.ThumbnailGallery = ThumbnailGallery;
})(document, window);

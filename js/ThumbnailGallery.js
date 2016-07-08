
(function(document, window) {
    'use strict';

    function ThumbnailGallery(photos, thumbnailList, currentPage, totalPages) {
        this.photos = photos;
        this.thumbnailList = thumbnailList;
        this.currentPage = currentPage || 1;
        this.totalPages = totalPages;
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

        // TODO - remove after debugging
        console.log(photos);
    };
    
    ThumbnailGallery.prototype.showNextPage = function() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }

        Flickr.fetchPhotos({
            per_page: 12,
            jsoncallback: 'Site.Main.updatePhotos',
            page: this.currentPage
        });
    }

    ThumbnailGallery.prototype.showPrevPage = function() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }

        Flickr.fetchPhotos({
            per_page: 12,
            jsoncallback: 'Site.Main.updatePhotos',
            page: this.currentPage
        });
    }

    window.ThumbnailGallery = ThumbnailGallery;
})(document, window);

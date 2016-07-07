
(function(document, window) {
    'use strict';

    function ThumbnailGallery(photos, thumbnailList) {
        this.photos = photos;
        this.thumbnailList = thumbnailList;
    }

    ThumbnailGallery.prototype.createGallery = function() {
        
        var img, link, listItem, photos, thumbnailList;
        photos = this.photos;
        thumbnailList = this.thumbnailList;

        for (var i = 0, len = photos.length; i < len; i++) {
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

        // TODO - remove after debugging
        console.log(data);
        console.log(photos);
    };

    window.ThumbnailGallery = ThumbnailGallery;
})(document, window);

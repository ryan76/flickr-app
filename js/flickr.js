
(function(document, window) {
    'use strict';

    var API_KEY = 'a5e95177da353f58113fd60296e1d250';
    var API_URL = 'https://api.flickr.com/services/rest/';
    var USER_ID = '24662369@N07';

    function fetchPhotos(params) {
        var requestParameters = ClientUtils.extend(params, {
            method: 'flickr.people.getPublicPhotos',
            api_key: API_KEY,
            user_id: USER_ID,
            format: 'json'
        });

        var script = document.createElement('script');
        script.src = ClientUtils.buildUrl(API_URL, requestParameters);
        document.head.appendChild(script);
        document.head.removeChild(script);
    }

    function filterPhotos(params) {
        var requestParameters = ClientUtils.extend(params, {
            method: 'flickr.photos.search',
            api_key: API_KEY,
            user_id: USER_ID,
            format: 'json'
        });

        var script = document.createElement('script');
        script.src = ClientUtils.buildUrl(API_URL, requestParameters);
        document.head.appendChild(script);
        document.head.removeChild(script);
    }

    function buildPhotoUrlDefault(imgObj) {
        return 'https://farm' + imgObj.farm + '.staticflickr.com/' + imgObj.server +
            '/' + imgObj.id + '_' + imgObj.secret + '.jpg';
    }

    function buildPhotoUrlThumbnail(imgObj) {
        return 'https://farm' + imgObj.farm + '.staticflickr.com/' + imgObj.server +
            '/' + imgObj.id + '_' + imgObj.secret + '_q.jpg';
    }

    function buildPhotoUrlLarge(imgObj) {
        return 'https://farm' + imgObj.farm + '.staticflickr.com/' + imgObj.server +
            '/' + imgObj.id + '_' + imgObj.secret + '_b.jpg';
    }

    window.Flickr = ClientUtils.extend(window.Flickr || {}, {
        fetchPhotos: fetchPhotos,
        filterPhotos: filterPhotos,
        buildPhotoUrlDefault: buildPhotoUrlDefault,
        buildPhotoUrlThumbnail: buildPhotoUrlThumbnail,
        buildPhotoUrlLarge: buildPhotoUrlLarge
    });
})(document, window);

mainApp.service('fileService', function ($httpParamSerializer, $location) {

    var _fileService = {
        getBase64FromImageUrl:function(url, onLoad) {
            var img = new Image();

            img.setAttribute('crossOrigin', 'anonymous');

            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(this, 0, 0);

                var dataURL = canvas.toDataURL("image/png");

                if (onLoad)
                    onLoad(dataURL);
            };

            img.src = url;
        },
        dataURItoBlob: function (dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            if (dataURI.split(',')[0] && dataURI.split(',')[0].split(':')[1]) {
                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                // write the bytes of the string to a typed array
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], { type: mimeString });
            }
        },
        blobToFile: function (theBlob, fileName) {
            //A Blob() is almost a File() - it's just missing the two properties below which we will add
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        },
        create_blob: function (file, callback) {
            var reader = new FileReader();
            reader.onload = function () { callback(reader.result) };
            reader.readAsDataURL(file);
        },
        isImage: function (mimeType) {

            var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];


            if (ValidImageTypes.indexOf(mimeType) !== -1) {

                return true;
            }

            return false;

        },
        isPDF: function (mimeType) {

            var ValidImageTypes = ["application/pdf"];


            if (ValidImageTypes.indexOf(mimeType) !== -1) {

                return true;
            }
            return false;
        },
        downloadFile: function (blob, fileName) {

            var link = document.createElement('a');
            link.setAttribute("type", "hidden"); // make it hidden if needed
            // append to body
            document.body.appendChild(link);

            link.href = window.URL.createObjectURL(blob);

            link.download = fileName;
            // click it (download)
            link.click();
            // remove link from body
            document.body.removeChild(link);

        }
    }

    return _fileService;
});
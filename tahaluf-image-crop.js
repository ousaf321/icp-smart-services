mainApp.directive('tahalufImageCrop', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'EA',
        scope: {
            options: '=',
            imageOut: '=',
            crop: "&",
            cancel: "&",
            control: '='
        },
        //  templateUrl: '/cropperToolsTemplate',
        template:
            //'<image-crop  image-out="imageOut" crop-options="options" ng-transclude>' +
            //    '<table><tr><td><edit-crop class="col-md-12 canvassection"></edit-crop></td>' +
            //    '</tr></table>' +
            //'</image-crop>' +
            '<div class="" >'
            + '<div class="row">'
            + '<div class="col-md-12" > '
            + ' <div class="img-container" >  '
            + '  <img alt="Picture"> '
            + '   </div> '
            + '  </div> '
            + ' </div> '
            + '  </div> '


            + '<div class="row" id="actions"> '
            + '  <div> '
            + '   <p class="m-l-md">{{"cropFeatureNote" | translate}} </p> '
            + '   <div class="col-md-12 docs-buttons cropbtns"> '
            + '  <div class="btn-group"> '
            + '  <button type="button" class="btn btn-info mrg33 bg-gd-dk" data-method="move" data-option="0" data-second-option="-10" title="Move Up"> '
            + '   <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(0, -10)"> '
            + '      <span class="fa fa-arrow-up"></span> '
            + '     </span> '
            + '   </button> '
            + '<div class="clearfix"></div>'
            + '    <button type="button" class="btn btn-info bg-gd-dk" data-method="move" data-option="-10" data-second-option="0" title="Move Left"> '
            + '       <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(-10, 0)"> '
            + '           <span class="fa fa-arrow-left"></span> '
            + '       </span> '
            + '   </button> '
            + '   <button type="button" class="btn btn-info bg-gd-dk" data-method="move" data-option="0" data-second-option="10" title="Move Down"> '
            + '   <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(0, 10)"> '
            + '        <span class="fa fa-arrow-down"></span> '
            + '    </span> '
            + ' </button> '
            + '    <button type="button" class="btn btn-info bg-gd-dk" data-method="move" data-option="10" data-second-option="0" title="Move Right"> '
            + '     <span class="docs-tooltip" data-toggle="tooltip" title="cropper.move(10, 0)"> '
            + '         <span class="fa fa-arrow-right"></span> '
            + '      </span>  '
            + '  </button> '


            + '  </div> '
            + '    <div class="btn-group hide"> '
            + '    <button type="button" class="btn btn-info bg-gd-dk" data-method="setDragMode" data-option="move" title="Move"> '
            + '      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.setDragMode(&quot;move&quot;)"> '
            + '       <span class="fa fa-arrows"></span> '
            + '    </span> '
            + '   </button> '
            + '   <button type="button" class="btn btn-info bg-gd-dk" data-method="setDragMode" data-option="crop" title="Crop"> '
            + '      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.setDragMode(&quot;crop&quot;)"> '
            + '          <span class="fa fa-crop"></span> '
            + '       </span> '
            + '    </button> '
            + ' </div> '
            //+ '  <div class="btn-group mt40"> '
            //+ '     <button type="button" class="btn btn-info bg-gd-dk" data-method="zoom" data-option="0.1" title="Zoom In"> '
            //+ '         <span class="docs-tooltip" data-toggle="tooltip" title="cropper.zoom(0.1)"> '
            //+ '            <span class="fa fa-search-plus"></span> '
            //+ '        </span> '
            //+ '     </button> '
            //+ '   <button type="button" class="btn btn-info bg-gd-dk" data-method="zoom" data-option="-0.1" title="Zoom Out"> '
            //+ '       <span class="docs-tooltip" data-toggle="tooltip" title="cropper.zoom(-0.1)"> '
            //+ '    <span class="fa fa-search-minus"></span> '
            //+ '    </span> '
            //+ '   </button> '
            //+ '  </div> '

            + '<div class="btn-group mt40"> '
            + '  <button type="button" class="btn btn-info bg-gd-dk" data-method="rotate" data-option="-45" title="Rotate Left"> '
            + '  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.rotate(-45)"> '
            + '    <span class="fa fa-rotate-left"></span> '
            + '    </span> '
            + '  </button> '
            + '  <button type="button" class="btn btn-info bg-gd-dk" data-method="rotate" data-option="45" title="Rotate Right"> '
            + '   <span class="docs-tooltip" data-toggle="tooltip" title="cropper.rotate(45)"> '
            + '    <span class="fa fa-rotate-right"></span> '
            + '  </span> '
            + '  </button> '
            + '  </div> '
            + '  <div class="btn-group mt40"> '
            + '   <button type="button" class="btn btn-info bg-gd-dk" data-flip="horizontal" data-method="scaleX" data-option="-1" title="Flip Horizontal"> '
            + '     <span class="docs-tooltip" data-toggle="tooltip" title="cropper.scaleX(-1)"> '
            + '     <span class="fa fa-arrows-h"></span> '
            + '   </span> '
            + '  </button>  '
            + ' <button type="button" class="btn btn-info bg-gd-dk" data-flip="vertical" data-method="scaleY" data-option="-1" title="Flip Vertical"> '
            + '  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.scaleY(-1)"> '
            + '   <span class="fa fa-arrows-v"></span> '
            + '  </span> '
            + '  </button> '
            + ' </div> '

            //    + ' <div class="btn-group"> '
            //      + '   <button type="button" class="btn btn-primary" data-method="crop" title="Crop"> '
            //          + '   <span class="docs-tooltip" data-toggle="tooltip" title="cropper.crop()"> '
            //             + '    <span class="fa fa-check"></span> '
            //          + '   </span> '
            //        + ' </button> '
            //        + ' <button type="button" class="btn btn-primary" data-method="clear" title="Clear"> '
            //           + '  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.clear()"> '
            //              + '   <span class="fa fa-remove"></span> '
            //        + '     </span> '
            //      + '   </button> '
            //+ '     </div> '
            // + ' <div class="btn-group"> '
            //     + ' <button type="button" class="btn btn-primary" data-method="disable" title="Disable"> '
            //        + '  <span class="docs-tooltip" data-toggle="tooltip" title="cropper.disable()"> '
            //      + '        <span class="fa fa-lock"></span> '
            //     + '     </span> '
            //   + '   </button> '
            //   + '   <button type="button" class="btn btn-primary" data-method="enable" title="Enable"> '
            //      + '    <span class="docs-tooltip" data-toggle="tooltip" title="cropper.enable()"> '
            //         + '     <span class="fa fa-unlock"></span> '
            //      + '    </span> '
            //     + ' </button> '
            //+ '  </div> '
            + ' <div class="btn-group hide mt40"> '
            + ' <button type="button" class="btn btn-primary" data-method="reset" title="Reset"> '
            + '   <span class="docs-tooltip" data-toggle="tooltip" title="cropper.reset()"> '
            + '     <span class="fa fa-refresh"></span> '
            + '    </span> '
            + '  </button> '
            + '   <label class="btn btn-primary" for="inputImage" title="Upload image file"> '
            + '     <input type="file" class="sr-only" id="inputImage" name="file" accept="image/*"> '
            + '     <span class="docs-tooltip" data-toggle="tooltip" title="Import image with Blob URLs"> '
            + '         <span class="fa fa-upload"></span> '
            + '     </span> '
            + '  </label> '
            + '   <button type="button" class="btn btn-primary" data-method="destroy" title="Destroy"> '
            + '      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.destroy()"> '
            + '         <span class="fa fa-power-off"></span> '
            + '        </span> '
            + '     </button> '
            + '  </div> '
            + '  <div class="btn-group btn-group-crop pull-right"> '
            + '    <button type="button" class="btn btn-info btncropimg bg-gd-dk" data-method="getCroppedCanvas"> '
            + '     <span class="docs-tooltip" data-toggle="tooltip" title="cropper.getCroppedCanvas()"> '
            + '        {{"GetCroppedCanvas" | translate}}'
            + '     </span> '
            + '   </button> '

            + ' </div> '
            + '  <div class="btn-group btn-group-crop pull-right"> '
            + '    <button type="button" class="btn btn-info bg-gray btncropimg bg-gd-dk" data-method="destroy"> '
            + '     <span class="docs-tooltip" data-toggle="tooltip"  title="cropper.destroy()" > '
            + '        {{"CancelCrop" | translate}}'
            + '     </span> '
            + '   </button> '

            + ' </div> '
            + '  <!-- Show the cropped image in modal --> '
            + '  <div class="modal fade docs-cropped" id="getCroppedCanvasModal" role="dialog" aria-hidden="true" aria-labelledby="getCroppedCanvasTitle" tabindex="-1"> '
            + '       <div class="modal-dialog"> '
            + '         <div class="modal-content"> '
            + '             <div class="modal-header"> '
            + '                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> '
            + '                  <h4 class="modal-title" id="getCroppedCanvasTitle">Cropped</h4> '
            + '              </div> '
            + '              <div class="modal-body"></div> '
            + '              <div class="modal-footer"> '
            + '                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> '
            + '                   <a class="btn btn-primary bg-gd-dk" id="download" href="javascript:void(0);" download="cropped.jpg">Download</a> '
            + '              </div> '
            + '      </div> '
            + '     </div> '
            + '  </div><!-- /.modal --> '
            + '  <!-- '
            + '      <button type="button" class="btn btn-primary" data-method="getData" data-option data-target="#putData"> '
            + '        <span class="docs-tooltip" data-toggle="tooltip" title="cropper.getData()"> '
            + '          Get Data '
            + '          </span> '
            + '     </button> '
            + '       <button type="button" class="btn btn-primary" data-method="setData" data-target="#putData"> '
            + '       <span class="docs-tooltip" data-toggle="tooltip" title="cropper.setData(data)"> '
            + '         Set Data '
            + '       </span> '
            + '     </button> '
            + '   <button type="button" class="btn btn-primary" data-method="getContainerData" data-option data-target="#putData"> '
            + '      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.getContainerData()"> '
            + '      Get Container Data '
            + '     </span> '
            + '    </button> '
            + '     <button type="button" class="btn btn-primary" data-method="getImageData" data-option data-target="#putData"> '
            + '    <span class="docs-tooltip" data-toggle="tooltip" title="cropper.getImageData()"> '
            + '      Get Image Data '
            + '    </span> '
            + '   </button> '
            + '   <button type="button" class="btn btn-primary" data-method="getCanvasData" data-option data-target="#putData"> '
            + '    <span class="docs-tooltip" data-toggle="tooltip" title="cropper.getCanvasData()"> '
            + '     Get Canvas Data '
            + '    </span> '
            + '   </button> '
            + '  <button type="button" class="btn btn-primary" data-method="setCanvasData" data-target="#putData"> '
            + '     <span class="docs-tooltip" data-toggle="tooltip" title="cropper.setCanvasData(data)"> '
            + '         Set Canvas Data '
            + '      </span> '
            + '      </button> '
            + '     <button type="button" class="btn btn-primary" data-method="getCropBoxData" data-option data-target="#putData"> '
            + '      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.getCropBoxData()"> '
            + '       Get Crop Box Data '
            + '     </span> '
            + '   </button> '
            + '    <button type="button" class="btn btn-primary" data-method="setCropBoxData" data-target="#putData"> '
            + '     <span class="docs-tooltip" data-toggle="tooltip" title="cropper.setCropBoxData(data)"> '
            + '        Set Crop Box Data '
            + '     </span> '
            + '     </button> '
            + '    <button type="button" class="btn btn-primary" data-method="moveTo" data-option="0"> '
            + '      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.moveTo(0)"> '
            + '       0,0 '
            + '     </span> '
            + '    </button> '
            + '     <button type="button" class="btn btn-primary" data-method="zoomTo" data-option="1"> '
            + '     <span class="docs-tooltip" data-toggle="tooltip" title="cropper.zoomTo(1)"> '
            + '         100% '
            + '      </span> '
            + '     </button> '
            + '     <button type="button" class="btn btn-primary" data-method="rotateTo" data-option="180"> '
            + '      <span class="docs-tooltip" data-toggle="tooltip" title="cropper.rotateTo(180)"> '
            + '        180°  '
            + '         </span> '
            + '      </button> '
            + '       <input type="text" class="form-control" id="putData" placeholder="Get data to here or set data with this value"> '

            + '     </div> '
            + ' --> '
            + '    <div class="col-md-3 docs-toggles"> '
            + '       <!-- <h3 class="page-header">Toggles:</h3> --> '
            + '      <div class="btn-group docs-aspect-ratios" data-toggle="buttons"> '
            + '      </div> '

            + '   </div><!-- /.docs-toggles --> '
            + ' </div> '
            + '  </div> '
            //  + ' <div class="col-md-12"> '
            //  + '     <div id="myDiv"></div> '
            //+ '   </div> '
            + '   </div> ',

        controllerAs: 'vm',
        bindToController: true,
        controller: function () {
            'use strict';

            this.$onInit = function () {
                var vm = this;


                var Cropper = window.Cropper;

                if (typeof $rootScope.personal === 'undefined') {
                    $rootScope.personal = false;
                }

                var container = document.querySelector('.img-container');
                var image = container.getElementsByTagName('img').item(0);
                var download = document.getElementById('download');
                var actions = document.getElementById('actions');
                var dataX = document.getElementById('dataX');
                var dataY = document.getElementById('dataY');
                var dataHeight = document.getElementById('dataHeight');
                var dataWidth = document.getElementById('dataWidth');
                var dataRotate = document.getElementById('dataRotate');
                var dataScaleX = document.getElementById('dataScaleX');
                var dataScaleY = document.getElementById('dataScaleY');

                var options = {
                    //aspectRatio: 16 / 9,
                    preview: '.img-preview',
                    ready: function (e) {
                        //console.log(e.type);
                        cropper.resize();
                    },
                    cropstart: function (e) {
                    },
                    cropmove: function (e) {
                    },
                    cropend: function (e) {
                    },
                    crop: function (e) {
                        var data = e.detail;
                    },
                    zoom: function (e) {
                    },
                    responsive: true,
                    cropBoxResizable: true,
                    zoomable: true,
                    viewSizeWidth: 600,
                    viewSizeHeight: 600,


                    /*
                    minContainerWidth: 600,
                    minContainerHeight: 400,
                    minCanvasWidth: 600,
                    minCanvasHeight: 400*/
                };

                var cropper = new Cropper(image, options);


                // Download
                if (typeof download.download === 'undefined') {
                    download.className += ' disabled';
                }
                // Optionsrootscope
                actions.querySelector('.docs-toggles').onclick = function (event) {
                    var e = event || window.event;
                    var target = e.target || e.srcElement;
                    var cropBoxData;
                    var canvasData;
                    var isCheckbox;
                    var isRadio;

                    if (!cropper) {
                        return;
                    }

                    if (target.tagName.toLowerCase() === 'span') {
                        target = target.parentNode;
                    }

                    if (target.tagName.toLowerCase() === 'label') {
                        target = target.getElementsByTagName('input').item(0);
                    }

                    isCheckbox = target.type === 'checkbox';
                    isRadio = target.type === 'radio';

                    if (isCheckbox || isRadio) {
                        if (isCheckbox) {
                            options[target.name] = target.checked;
                            cropBoxData = cropper.getCropBoxData();
                            canvasData = cropper.getCanvasData();

                            options.ready = function () {
                                cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                            };
                        } else {
                            options[target.name] = target.value;
                            options.ready = function () {
                            };
                        }

                        // Restart
                        cropper.destroy();
                        cropper = new Cropper(image, options);
                    }
                };


                // Methods
                actions.querySelector('.docs-buttons').onclick = function (event) {
                    var e = event || window.event;
                    var target = e.target || e.srcElement;
                    var result;
                    var input;
                    var data;

                    if (!cropper) {
                        return;
                    }

                    while (target !== this) {
                        if (target.getAttribute('data-method')) {
                            break;
                        }

                        target = target.parentNode;
                    }

                    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
                        return;
                    }

                    data = {
                        method: target.getAttribute('data-method'),
                        target: target.getAttribute('data-target'),
                        option: target.getAttribute('data-option'),
                        secondOption: target.getAttribute('data-second-option')
                    };

                    if (data.method) {
                        if (typeof data.target !== 'undefined') {
                            input = document.querySelector(data.target);

                            if (!target.hasAttribute('data-option') && data.target && input) {
                                try {
                                    data.option = JSON.parse(input.value);
                                } catch (e) {
                                    console.log(e.message);
                                }
                            }
                        }

                        if (data.method === 'getCroppedCanvas') {
                            data.option = JSON.parse(data.option);
                        }

                        result = cropper[data.method](data.option, data.secondOption);

                        switch (data.method) {
                            case 'scaleX':
                            case 'scaleY':
                                target.setAttribute('data-option', -data.option);
                                break;

                            case 'getCroppedCanvas':
                                if (result) {

                                    // Bootstrap's Modal
                                    //$('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

                                    //var ni = document.getElementById('myDiv');
                                    //ni.innerHTML = "";
                                    //ni.appendChild(result);

                                    if (!download.disabled) {
                                        vm.imageOut = result.toDataURL('image/jpeg');
                                        download.href = result.toDataURL('image/jpeg');
                                        //vm.crop + "(" + vm.imageOut + ")");
                                        vm.crop({ croppedImage: vm.imageOut });

                                    }
                                }

                                break;
                            case 'cancelCrop':
                                if (vm.cancel)
                                    vm.cancel();
                                break;

                            case 'destroy':
                                if (vm.cancel)
                                    vm.cancel();


                                //cropper = null;
                                break;
                        }

                        if (typeof result === 'object' && result !== cropper && input) {
                            try {
                                input.value = JSON.stringify(result);
                            } catch (e) {
                                console.log(e.message);
                            }
                        }

                    }
                };

                document.body.onkeydown = function (event) {
                    var e = event || window.event;

                    if (!cropper || this.scrollTop > 300) {
                        return;
                    }

                    switch (e.keyCode) {
                        case 37:
                            e.preventDefault();
                            cropper.move(-1, 0);
                            break;

                        case 38:
                            e.preventDefault();
                            cropper.move(0, -1);
                            break;

                        case 39:
                            e.preventDefault();
                            cropper.move(1, 0);
                            break;

                        case 40:
                            e.preventDefault();
                            cropper.move(0, 1);
                            break;
                    }
                };


                // Import image
                var inputImage = document.getElementById('inputImage');
                var URL = window.URL || window.webkitURL;
                var blobURL;

                if (URL) {
                    inputImage.onchange = function () {

                        var files = this.files;
                        var file;

                        if (cropper && files && files.length) {
                            file = files[0];

                            if (/^image\/\w+/.test(file.type)) {
                                blobURL = URL.createObjectURL(file);
                                cropper.reset().replace(blobURL);
                                inputImage.value = null;
                            } else {
                                window.alert('Please choose an image file.');
                            }
                        }
                    };
                } else {
                    inputImage.disabled = true;
                    inputImage.parentNode.className += ' disabled';
                }
                if (!vm.control)
                    vm.control = {};

                vm.internalControl = vm.control;

                vm.internalControl.uploadImage = function (imageBlob) {
                    cropper.destroy();
                    if ($rootScope.personal == true) {
                        cropper.resetNew(0).replace(imageBlob);
                    }
                    else {
                        cropper.resetNew(1).replace(imageBlob);
                    }
                }

                vm.internalControl.destroy = function () {
                    cropper.destroy();
                }


            };


        }
    }

}]);

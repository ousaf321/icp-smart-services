/// <reference path="../templates/dialogs.html" />
mainApp.run(['$uibModal', function ($uibModal) {

    //this code must be written just in one place
    //start
    /*
    * Options: {templateUrl, controller ,size, data}
    * */
    function Dialog(options, callback) {
        this.modalInstance = null;
        this.options = options;
        this.callback = callback;
    };


    Dialog.prototype.open = function (options) {
        var t = this;
        var opt = options || this.options;
        this.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: opt.templateUrl,
            controller: opt.controller,
            size: opt.size,
            backdrop: opt.backdrop ? false : true,
            resolve: {
                $data: function () {
                    return opt.data;
                },
                $dialog: function () {
                    return t;
                }
            }
        });


        this.modalInstance.result.then(function (r) {
            if (t.callback) {
                t.callback(r);
            }
        });
    };


    Dialog.prototype.close = function (result) {
        this.modalInstance.close(result);
    };


    window.openDialog = function (options, callback) {
        if (!options)
            throw ("options have not been provided to openDialog");
        else if (!options.controller)
            console.warn("window.openDialog :: You have to pass the controller value to the openDialog function");
        var d = new Dialog(options, callback);
        d.open();
        return d;
    };

    window.showConfirm = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/confirmDialog.html';
        if (options.reason) {
            _templateUrl = '../templates/confirmDialogWithTxtInput.html';
        }

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'sm',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showConfirmCancel = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/confirmCancelDialog.html';
        if (options.reason) {
            _templateUrl = '../templates/confirmCancelDialogWithTxtInput.html';
        }

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'sm',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showConfirmSaveAddress = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }

        var _templateUrl = '../templates/confirmationDialog.html';

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'bg',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();

        return d;
    };

    window.showConfirmWithExternalUrl = function (options, callback, templateUrl) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }

        var openDialogOptions = {
            templateUrl: templateUrl,
            controller: 'dialogCtrl',
            size: 'sm',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showSubscriptionConfirm = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/confirmDialogSubscription.html';


        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'sm',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };


    window.showAlert = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }


        var openDialogOptions = {
            templateUrl: '../templates/alertDialog.html',
            controller: 'dialogCtrl',
            size: 'sm',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };


    window.LoginShowAlert = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }


        var openDialogOptions = {
            templateUrl: 'templates/alertDialog.html',
            controller: 'dialogCtrl',
            size: 'sm',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };


    window.showWarningMessage = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/warningMessage.html';


        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',

            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showConfirmUpdateInformationMessage = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/confirmUpdateInformation.html';


        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',

            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showConfirmationMessageForVisaServices = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/confirmationMessageForVisaServices.html';


        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',

            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showReasonPopup = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/reasonPopup.html';


        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',

            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };



    window.showRSAAuthenticationForm = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../client/templates/RSAAuthenticationForm.html';


        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'md',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showSecondStepVerificationPopup = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../client/templates/SecondStepVerificationPopup.html';

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'md',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.resetAppAuthPopup = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../client/templates/resetAppAuthPopup.html';

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'md',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };


    window.showSecondStepVerificationUsingAuthAppPopup = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../client/templates/secondStepVerificationUsingAuthAppPopup.html';

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'md',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showeChannelsAuthenticationForm = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/eChannelsAuthenticationForm.html';


        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'md',
            backdrop: 'static',
            position: ['center', 'middle'],
            data: { options: options }

        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };



    window.showRegistrationConfirm = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = 'templates/confirmDialog.html';

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'md',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showIcpTCRegistrationConfirm = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/confirmDialog.html';

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'md',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };

    window.showTypingCenterMissingInfo = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }

        var _templateUrl = 'templates/confirmationDialog.html';

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'bg',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();

        return d;
    };

    window.showCitizenAdminRegionId = function (options, callback, data) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        if (data)
            options.info = data;

        var _templateUrl = 'templates/citizenAdminRegions.html';

        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            size: 'bg',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();

        return d;
    };


    window.showRegisterArrivalsConfirmation = function (options, callback, templateUrl) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }

        var openDialogOptions = {
            templateUrl: templateUrl,
            controller: 'dialogCtrl',
            size: 'md',
            backdrop: 'static',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };
    window.showServiceCardCommercialVideoDialog = function (options, callback, templateUrl) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }

        var openDialogOptions = {
            templateUrl: templateUrl,
            controller: 'dialogCtrl',
            size: 'bg',
            backdrop: 'static',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };
    window.showDialogConfirmation = function (options, callback, templateUrl) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }

        var openDialogOptions = {
            templateUrl: templateUrl,
            controller: 'dialogCtrl',
            size: 'md',
            backdrop: 'static',
            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };
    window.showPOSConfirmationDialog = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/POSConfirmationDialog.html';


        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',

            position: ['center', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };


    window.showOtpValidationDialog = function (options, callback) {
        if (arguments.length > 0 && typeof (arguments[0]) == 'function') {
            callback = options;
            options = null;
        }
        var _templateUrl = '../templates/otpValidation.html';


        var openDialogOptions = {
            templateUrl: _templateUrl,
            controller: 'dialogCtrl',
            backdrop: 'static',
            size: 'md',
           // position: ['top', 'middle'],
            data: { options: options }
        };

        var d = new Dialog(openDialogOptions, callback);
        d.open();
        return d;
    };
}]);
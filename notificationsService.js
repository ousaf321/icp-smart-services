mainApp.service('notificationsService', function (toaster, $translate, $rootScope) {

    //Show Notification as Toaster
    this.showNotification = function (options) {

        //Clear any pending messages
       toaster.clear();

        if (options.localizationControllers)
            $rootScope.CurrentController($rootScope.getCurrentController());

        var duration = 0;
        if (!options.isSticky && options.duration)
            duration = 5000;

        //Text
        var textKey = $translate.instant(options.messageKey);
        if (options.messageKey && textKey != options.messageKey)
            options.messageKey = textKey;
        else
            textKey = null;

        if (textKey == null) {
            var textBody = $translate.instant(options.messageBody);
            if (options.messageBody && textBody != options.messageBody)
                options.messageBody = textBody;
        }

        //Title
        var titleKey = $translate.instant(options.titleKey);
        if (options.titleKey && titleKey != options.titleKey)
            options.titleKey = titleKey;
        else
            titleKey = null;

        if (titleKey == null) {
            var titleBody = $translate.instant(options.titleBody);
            if (options.titleBody && titleBody != options.titleBody)
                options.titleBody = titleBody;
        }

        var message = null;
        var title = null;
        if (options.type == 'success') {
            message = $translate.instant('success');
            title = $translate.instant('success');
        }
        else if (options.type == 'error') {
            message = $translate.instant('error');
            title = $translate.instant('error');
        }
        else if (options.type == 'warning') {
            message = $translate.instant('warning');
            title = $translate.instant('warning');
        }

        if (options.titleKey || options.titleKey == "")
            title = options.titleKey;
        else if (options.titleBody || options.titleBody == "")
            title = options.titleBody;


        if (options.messageKey)
            message = options.messageKey;
        else if (options.messageBody)
            message = options.messageBody;

        toaster.pop(options.type, title, message, duration, 'trustedHtml');


    }

    //Clear Notification
    this.clear = function (options) {
        toaster.clear();
    }
});
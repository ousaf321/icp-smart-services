mainApp.service('scannerService', ['apiHelperService', '$rootScope', '$translate', function (apiHelperService, $rootScope, $translate) {

    //Initialize 3m Reader WebSocket
    this.initialize = function (scope, callback) {
        var browser = this.getBrowser();
        if (browser != 'unknown')// For IE
        {
            websocket = new WebSocket(config.passport3MWebSocketUrl);
            var result = null;
            websocket.onopen = function (event) { onOpen(event) };
            websocket.onmessage = function (event) {
                result = onMessage(event);
                if (result && result.Message.DocType) {
                    callback(mapData(scope, result.Message));
                }

            };
            websocket.onerror = function (event) { onError(event) };
            websocket.onclose = function (event) { };
        }
    };
    var cardWebsocket;
    var readDataCallBack;
    var readPublicDataCB = function (response, error) {
            document.getElementsByClassName('pace-inactive')[0].classList.add("ng-hide");
        if (error === null) {
         //   alert(response);
            var readerData = {
                "EnglishFullName": response.nonModifiablePublicData.fullNameEnglish.replace(/[\*\\]/, '').replace(/,+/g, " "),
                "ArabicFullName": response.nonModifiablePublicData.fullNameArabic.replace(/[\*\\]/, '').replace(/,+/g, " "),
                "IdNumber": response.iDNumber.replace(/[\*\\]/, ''),
                "NationalityCode": response.nonModifiablePublicData.nationalityCode,
                "investorUnifiedNumber": response.modifiablePublicData.sponsorUnifiedNumber,
                "CardexpiryDate": response.nonModifiablePublicData.expiryDate,
                "Gender": response.nonModifiablePublicData.gender,
                "BirthDate": response.nonModifiablePublicData.dateOfBirth
            };
            readDataCallBack(readerData);
        } else {
            alert(error.message);
        }
        /* enable all buttons as request is completed */
    };

    function generateRandomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    function DisplayPublicData(nfc) {
        if (null === readerClass || undefined === readerClass) {
          //  alert('ERROR : Reader is not initiaized.');
            return;
        }
        /*  disable all buttons till request is processed */
        /*  generate the random string */
        var randomStr = generateRandomString(40);
        /* convert randomString to base64 */
        var requestId = btoa(randomStr);
        /**
         * call the read public data function and pass readPublicDataCB to be executed
         * after the response is received from server
         */
        var address = true;
        if (self.IsNfc) {
            address = false;
        }
        readerClass.readPublicData(
            requestId,
            true,
            true,
            true,
            true,
            address,
            readPublicDataCB);
    }

    var listReaderCB = function (response, error) {
        if (error !== null) {
            document.getElementsByClassName('pace-inactive')[0].classList.add("ng-hide");
            alert(error.message || error.description);
            ToolkitOB = null;
        } else {
            var readerName = null;
            var readerList = response;
            if (IsSam.sam_secure_messaging) {
                readerClass = readerList;
            } else {
                if (readerList && 0 < readerList.length) {
                    readerClass = readerList[0];
                } else {
                    document.getElementsByClassName('pace-inactive')[0].classList.add("ng-hide");
                    return 'No readers found';
                }
            }
            /**
             * call the connect reader function and pass connectReaderCB to be executed
             * after the response is received from server
             */
            var ret = readerClass.connect(connectReaderCB);
          
        }
    };


    //var connectReaderCB = function (response, error) {
    //    if (null !== error) {
    //        alert(error.code + ' : ' + error.message);
    //        ToolkitOB = null;
    //        return;
    //    }

    //    readerClass.getInterfaceType(getInterfaceCB);
    //};

    //var getInterfaceCB = function (response, error) {
    //    if (null !== error) {
    //        alert(error.code + ' : ' + error.message);
    //        ToolkitOB = null;
    //        return;
    //    }
    //    if (response === 2) {
    //        self.IsNfc = true;
    //        alert("Initialize Success. First Set NFC Parameters.");
    //    } else {
    //        self.IsNfc = false;
    //    }
    //};

    var options = {
        //"jnlp_address": "../../scripts/IDCardToolkitService.jnlp",
        "debugEnabled": false,
        "agent_tls_enabled": false,
        "agent_host_name": "toolkitagent.emiratesid.ae",
        "CONFIRM_TEXT_WINDOWS": $translate.instant('downloadSDKAgentMessage')
    };
    var IsSam = {
        sam_secure_messaging: true
    };
    //options.toolkitConfig = 'vg_url = http://172.16.11.13/ValidationGatewayService\n';
    //options.toolkitConfig = 'vg_connection_timeout = 60 \n';
    //options.toolkitConfig += 'log_level = "INFO" \n';
    //options.toolkitConfig += 'log_performance_time = true \n';
    options.toolkitConfig += 'read_publicdata_offline = true \n';
    //onOpen call back function
    var onOpenCB = function (response, error) {
        if (error === null) {
            /**
             * call the list reader function and pass listReaderCB to be executed
             * after the response is received from server
             */
            if (IsSam.sam_secure_messaging) {
                ToolkitOB.getReaderWithEmiratesId(listReaderCB);
            } else {
                ToolkitOB.listReaders(listReaderCB);
            }
        } else {
            ToolkitOB = null;
        }
    };

    // onError call back function
    var onErrorCB = function (err) {
        readerClass = null;
        ToolkitOB = null;
        if (null !== err) {
            document.getElementsByClassName('pace-inactive')[0].classList.add("ng-hide");
            // hideLoader();
            alert('errorHandler ERROR : ' + err);
        }
    };

    var onCloseCB = function (response, error) {
        ToolkitOB = null;
        readerClass = null;
        if (null !== response && undefined == response) {
            document.getElementsByClassName('pace-inactive')[0].classList.add("ng-hide");}
    };


    // connectReader call back function
    var connectReaderCB = function (response, error) {
        if (null != response) {
      //      console.log('Connected to the reader..');
            DisplayPublicData(false);
        }
        if (null != error) {
            document.getElementsByClassName('pace-inactive')[0].classList.add("ng-hide");
            return error.code + ' : ' + error.message;
        }
    };

    this.initializeCardReader = function (callback) {
        document.getElementsByClassName('pace-inactive')[0].classList.remove("ng-hide");
        readDataCallBack = callback;
        var browser = this.getBrowser();
        if (browser != 'unknown')// For IE
        {
            // provide the call backs
            ToolkitOB = new Toolkit(
                onOpenCB, // reference to onOpenCB call back function
                onCloseCB, // reference to onCloseCB call back function
                onErrorCB, // reference to onErrorCB call back function
                options // toolkit script options object
            );
            

          //  if (browser == "chrome")
        //        config.cardReaderWebSocketUrl =  config.cardReaderWebSocketUrl.replace("5060", "8080");

            //cardWebsocket = new WebSocket(config.cardReaderWebSocketUrl, 'eida-toolkit');
            //var result = null;

            //cardWebsocket.onopen = function () {
            //};

            //cardWebsocket.onmessage = function (event) {
            //    if (event && event.data != 'Connected to WebSockets Server!') {
            //        result = JSON.parse(event.data);
            //        if (result.EventName == 'CardInserted') {
            //            setTimeout(function () {
            //                var sentmsg = "ReadCard" + JSON.stringify(
            //                {
            //                    "ReadPersonalInfo": true,
            //                    "SilentReading": false,
            //                    "ReaderIndex": -1,
            //                    "ReaderName": "",
            //                    "OutputFormat": "JSON"
            //                });
            //                cardWebsocket.send(sentmsg);
            //            }, 5000);
            //        }
            //        if (result.CardData) {
            //            result.CardData.EnglishFullName = result.CardData.EnglishFullName.replace(/[\*\\]/, '');
            //            result.CardData.ArabicFullName = result.CardData.ArabicFullName.replace(/[\*\\]/, '');
            //            result.CardData.IdNumber = result.CardData.IdNumber.replace(/[\*\\]/, '');
            //            callback(result.CardData);
            //        }
            //    } else if (event.data == 'Connected to WebSockets Server!') {
            //        var returnfromsent = cardWebsocket.send("RunCardDetection");
            //    }

            //};

            //cardWebsocket.onclose = function () {
            //    // websocket is closed.
            //};
        }
    }
    this.getBrowser = function () {


        var userAgent = window.navigator.userAgent;

        var browsers = { chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i };

        for (var key in browsers) {
            if (browsers[key].test(userAgent)) {
                return key;
            }
        };

        return 'unknown';

    }
    this.ReadPassportInfo = function (attachmentFile, callback) {
        var options = {
            success: function (passresult) {

                validatePassportInfo(passresult);
                callback({ result: passresult, success: true });
            },
            error: function (result) {

                callback({ result: passresult, success: false });
            },

        };

        var fd = new FormData();
        fd.append('file', attachmentFile);
        apiHelperService.postFormData('utility/passport/read', fd, options);

    }
    function validatePassportInfo(passportInfo) {


        if (passportInfo) {

            var momentCurrentDate = moment(new Date()).format('YYYY/MM/DD');
            var currentDate = new Date(momentCurrentDate);
            var dateOfBirth, dateOfExpiry;

            if (passportInfo.dateOfBirth)
                dateOfBirth = moment(passportInfo.dateOfBirth).format('YYYY/MM/DD');

            if (passportInfo.dateOfExpiry)
                dateOfExpiry = moment(passportInfo.dateOfExpiry).format('YYYY/MM/DD');

            if (passportInfo.nationalityID && passportInfo.nationalityID != '')
                passportInfo.nationalityID = passportInfo.nationalityID

            if (dateOfBirth && new Date(dateOfBirth) < currentDate)
                passportInfo.dateOfBirth = dateOfBirth;

            if (passportInfo.passportNumber && passportInfo.passportNumber != '')
                passportInfo.passportNumber = passportInfo.passportNumber;

            if (passportInfo.issuingCountryID && passportInfo.issuingCountryID != '')
                passportInfo.issuingCountryID = passportInfo.issuingCountryID

            if (dateOfExpiry && new Date(dateOfExpiry) > currentDate)
                passportInfo.dateOfExpiry = dateOfExpiry;

            if (passportInfo.genderID && passportInfo.genderID != '')
                passportInfo.genderID = passportInfo.genderID;
        }
    }
    function disconnect() {
        websocket.close();
    }

    function onOpen(event) {
        var config = {
            "Message":
                { "Aztec": false, "DataMatrix": false, "EnableAAMVA": false, "EnableIR": true, "EnablePhoto": true, "EnableRF": true, "EnableRFMRZ": true, "EnableRFPhoto": true, "EnableUV": true, "EnableVIS": true, "OneD": false, "PDF417": true, "QRcode": false },
            "Type": "START"
        }

        websocket.send(JSON.stringify(config));
    }

    function onMessage(event) {
        var data = event.data;
        var result = null;
        //check if the webSocket get data from scanner
        if (data != 'ping') {
            result = JSON.parse(event.data);
        }
        return result;
    }

    function onError(event) {
        var errorMessage = event.data;
    }

    function getCountryText(countries, isoCode) {
        if (isoCode) {
            if (countries) {
                var country = ((countries.filter(
                    function (country) {
                        if (country.isoThreeCharactersCode.toLowerCase() == isoCode)
                            return true;
                        return false;
                    }))[0]);

                if (country)
                    return country.text;
            }
        }

    }

    function getCountryId(countries, isoCode) {
        if (isoCode) {
            if (countries) {
                var country = ((countries.filter(
                    function (country) {
                        if (country.isoThreeCharactersCode.toLowerCase() == isoCode)
                            return true;
                        return false;
                    }))[0]);

                if (country)
                    return country.id;
            }
        }

    }

    function mapData(scope, result) {
        result.fullName = result.Forenames + ' ' + result.Surname;
        result.dateOfBirth = result.DateofBirth;
        result.expiryDate = result.DateofExpiry;
        result.documentNumber = result.DocumentNumber;
        result.genderId = result.Sex.toLowerCase() == 'male' ? 1 : 0;
        result.issuer = getCountryText(scope.countries, result.Issuer.toLowerCase());
        result.nationalityId = getCountryId(scope.countries, result.Nationality.toLowerCase());
        return result;
    }

    function mapCardData(scope, result) {
        return result;
    }

}]);
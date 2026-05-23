mainApp.service('languageService', function () {
    var _languageService = {
        setCurrent: function (currentLanguage) {
            if (currentLanguage == 1 || currentLanguage == 'ar') {
                localStorage.currentLanguage = 'ar';//arabic
            } else if (currentLanguage == 2 || currentLanguage == 'en') {
                localStorage.currentLanguage = 'en';//english
            } else if (currentLanguage == 3 || currentLanguage == 'it') {
                localStorage.currentLanguage = 'it';//Italian
            } else if (currentLanguage == 4 || currentLanguage == 'bd') {
                localStorage.currentLanguage = 'bd';//Bengali
            } else if (currentLanguage == 5 || currentLanguage == 'cn') {
                localStorage.currentLanguage = 'cn';//Chinese
            } else if (currentLanguage == 6 || currentLanguage == 'fr') {
                localStorage.currentLanguage = 'fr';//French
            } else if (currentLanguage == 7 || currentLanguage == 'de') {
                localStorage.currentLanguage = 'de';//German
            } else if (currentLanguage == 8 || currentLanguage == 'in') {
                localStorage.currentLanguage = 'in';//Hindi
            } else if (currentLanguage == 9 || currentLanguage == 'pt') {
                localStorage.currentLanguage = 'pt';//Portuguese
            } else if (currentLanguage == 10 || currentLanguage == 'ru') {
                localStorage.currentLanguage = 'ru';//Russian
            }  else if (currentLanguage == 11 || currentLanguage == 'jp') {
                localStorage.currentLanguage = 'jp';//Japanies
            } else if (currentLanguage == 12 || currentLanguage == 'es') {
                localStorage.currentLanguage = 'es';//Espanish
            }
        }
        ,
        getCurrent: function () {
            if (localStorage.currentLanguage) {
                return localStorage.currentLanguage;
            }
            return 'en'
        }
        ,
        getCurrentID: function () {
            var currentLanguageId;
            switch (localStorage.currentLanguage) {
                case 'ar':
                    var currentLanguageId = 1; //arabic
                    break;
                case 'en':
                    var currentLanguageId = 2;//english
                    break;
                case 'it':
                    var currentLanguageId = 3;//Italian
                    break;
                case 'bd':
                    var currentLanguageId = 4;//Bengali
                    break;
                case 'cn':
                    var currentLanguageId = 5;//Chinese
                    break;
                case 'fr':
                    var currentLanguageId = 6;//French
                    break;
                case 'de':
                    var currentLanguageId = 7;//German
                    break;
                case 'in':
                    var currentLanguageId = 8;//Hindi
                    break;
                case 'pt':
                    var currentLanguageId = 9;//Portuguese
                    break;
                case 'ru':
                    var currentLanguageId = 10;//Russian
                    break;
                case 'jp':
                    var currentLanguageId = 11;//Japanese
                    break;
                case 'es':
                    var currentLanguageId = 12;//Espanish
                    break;
                default:
                    var currentLanguageId = 2;//english
                    break;
            }
            return currentLanguageId;
        }
    }
    return _languageService;
});
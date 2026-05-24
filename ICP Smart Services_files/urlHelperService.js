mainApp.service('urlHelperService', function ($httpParamSerializer, $location) {
    var _URLHelperService = {
        serializeObjectToSearch: function (searchCriteria) {
            if (searchCriteria) {
                $location.search('search', $httpParamSerializer(searchCriteria));
            }
        },
        serializeObjectToStringSearchKey: function (searchCriteria) {
            if (searchCriteria) {
                return {'search': $httpParamSerializer(searchCriteria)};
            }
        },
        deserializeSearchToObject: function (searchCriteria) {
            if ($location.search() && $location.search().search) {
                return JSON.parse('{"' + decodeURIComponent($location.search().search.split('+').join(' ')).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
            }
            return {};
        }
    }
    return _URLHelperService;
});
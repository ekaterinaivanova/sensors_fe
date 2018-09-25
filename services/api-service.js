angular.module('constant-module', [])
    .service('apiService', function($http) {
        var apiHost = 'http://localhost:8484'
       return function(entity) {
            var endpoint = apiHost + '/' + entity;
            var request =  {
                post: function(params, data) {
                    return $http({
                        url: endpoint,
                        method: 'POST',
                        params: params,
                        data:data
                    })
                },
                query: function(params) {
                        return $http({
                            url: endpoint,
                            method: 'GET',
                            params: params
                    })
                },
                put: function(params, data) {
                        return $http({
                            url: endpoint,
                            method: 'PUT',
                            params: params,
                            data:data
                    })
                },
                delete: function(params) {
                        return $http({
                            url: endpoint,
                            method: 'DELETE',
                            params: params
                    })
                }
            };
            return request;
        };

    });
angular.module('service-module', [])
    .service('apiService', function($resource) {
        var apiHost = 'http://localhost:8484/'
       return function(entity) {
            console.log(apiHost + '/' + entity + '/:id')
            var resource = $resource(apiHost + '/' + entity, {}, {
                post: {
                    method: 'POST'
                },
                query: {
                    method: 'GET'
                },
                put: {
                    method: 'PUT'
                },
                delete: {
                    method: 'DELETE',
                },
                queryCache: {
                    method: 'GET'
                }
            });
            console.log(resource)
            return resource;
        };

    });
angular.module('alertingService', [])
    .service('alertingService', function($http) {

        function Error (msg) {
            console.log(msg)
        }
       return {
        Error: Error
       }

    });
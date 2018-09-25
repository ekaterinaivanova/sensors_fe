/**
 * Created by Administrator on 11.5.2016.
 */
angular.module('sensordata', [])
    .service('sensordataService', function(apiService, $q) {
        function fetchValues(id) {
            var deferred = $q.defer();
            apiService('sensordata/' + id).query().then(function(res) {
                deferred.resolve(res.data);
            }, function(err) {
                deferred.reject(err);
            })
            return deferred.promise;
        }
        return {
            fetchValues: fetchValues
        }
    });
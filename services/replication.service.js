/**
 * Created by Administrator on 11.5.2016.
 */
angular.module('services', [])
    .service('replicationService', function(apiService, $q) {
        var replications = {};
        var fetching;

        // function listReplications(measurementId) {
        //     if (!replications[measurementId] && !fetching) {
        //         fetchReplications(measurementId);
        //     }
        //     return replications[measurementId];
        // }

        function fetchReplications(measurementId) {
            var deferred = $q.defer();
            fetching = true;
            apiService('replications').query({
                MeasurementID: measurementId
            }).then(function(res) {
                fetching = false;
                if (res.data) {
                    replications[measurementId] = res.data;
                    deferred.resolve(res.data)
                 }
            }, function(err) {
                fetching = false;
                deferred.reject(err);
            })
            return deferred.promise
        }

        function fetchReplication(replicationId) {
            var deferred = $q.defer();
            apiService('replications/' + replicationId).query().then(function(res) {
                if (res.data && res.data[0]) {
                    deferred.resolve(res.data[0]);
                 } else {
                    deferred.reject('No data');
                 }
            }, function(err) {
                fetching = false;
                deferred.reject(err);
            })
            return deferred.promise
        }

        function stopReplication(replicationId) {
            var deferred = $q.defer();
            apiService('replications/' + replicationId).put(null, {
                Active: false,
                TimestampTo: new Date().getTime()
            }).then(function(res) {
                deferred.resolve();
            }, function(err) {
                deferred.reject('Couldn\'t stop replication');
            });
            return deferred.promise
        }


        return {
            stopReplication: stopReplication,
            // listReplications: listReplications,
            fetchReplications: fetchReplications,
            fetchReplication: fetchReplication
        }
    });
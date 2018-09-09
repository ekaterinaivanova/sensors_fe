/**
 * Created by Administrator on 11.5.2016.
 */
angular.module('data.model', [])
    .service('measurementService', function($http, userModel, $q, apiService) {
    	var dataModel = this;
        var userid = null;
        var measureData = {
            availableOptions: null,
            selectedOption: null
            //This sets the default value of the select in the ui
        };

        var measurements = {};
        var fetching;

        dataModel.getMeasurements = getMeasurements;

        function getMeasures(){

           return apiService('measurements').query().then(function(res) {
            	return res.data.data;
            }, function(err) {
            	return [];
            })
        }

        function getMeasurements(userId){
        	var deferred = $q.defer();
            fetching = true;
            apiService('measurements').query({
                userID: userId
            }).then(function(res) {
            	measurements[userId] = res.data;
                fetching = false;
                deferred.resolve(res.data);
            }, function(err) {
                fetching = false;
            	deferred.reject(err);
            })
          return deferred.promise;
        }

        function listMeasurements(userId) {
            if (!measurements[userId] && !fetching) {
                getMeasurements(userId);
            }
            console.log(measurements[userid])
            return measurements[userId];
        }


        dataModel.deleteMeasurement = function(id) {
        	var deferred = $q.defer();
            return apiService('measurements/' + id).delete().then(function(res) {
            	if (res.data.status == "AOK") {
                    deferred.resolve();
                } else {
                    deferred.reject()
                }
            }, function() {
            	deferred.reject();
            })
            return deferred.promise;
        };

        return {
            listMeasurements: listMeasurements
        }
    });
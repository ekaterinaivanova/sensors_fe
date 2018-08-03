/**
 * Created by Administrator on 11.5.2016.
 */
angular.module('data.model', [])
    .service('dataModel', function($http, userModel, $q, apiService) {
    	var dataModel = this;
        var userid = null;
        var measureData = {
            availableOptions: null,
            selectedOption: null
            //This sets the default value of the select in the ui
        };

        dataModel.getMeasurements = getMeasurements;

        function getMeasures(){

           return apiService('measurements').query().then(function(res) {
            	return res.data.data;
            }, function(err) {
            	return [];
            })
        }

        function getMeasurements(id){

        	var deferred = $q.defer();
            apiService('measurements' + (typeof id !== 'undefined' ? ('/' + id) : '')).query().then(function(res) {
            	deferred.resolve(res.data);
            }, function(err) {
            	deferred.reject(err);
            })
          return deferred.promise;
        }

        dataModel.selectMeasure = function(measure){
            measureData.selectedOption = measure;
        };

        dataModel.getSelectedMeasure = function(){
            return measureData.selectedOption;
        };
        dataModel.getMeasureById = function(measureId){
            //console.log(".........")
            var deferred = $q.defer();
            deferred.resolve(
                getMeasure(measureId)
            );
            return deferred.promise;
        };
        function getMeasure(id){

            return  _.find(measureData.availableOptions, function(measure){
                //console.log(measure);
                return measure.id_measure === parseInt(id, 10);
            })

        }

        dataModel.getMeasures = function(id){
            var deferred = $q.defer();
            if (measureData.availableOptions && userid == id) {
                deferred.resolve(measureData.availableOptions)
            }else{
                userid = id;
                deferred.resolve( getMeasures())
            }
            return deferred.promise;

        };
        function removeDeletedMeasure(id){
            _.remove(measureData.availableOptions,
            function(measure){
                console.log(measure.id_measure + " " + id);
                return measure.id_measure === parseInt(id, 10);
            })
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
    });
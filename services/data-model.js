/**
 * Created by Administrator on 11.5.2016.
 */
angular.module('data.model', [])
    .service('dataModel', function($http, userModel, $q, constants) {
    	var dataModel = this;
        var userid = null;
        var measureData = {
            availableOptions: null,
            selectedOption: null
            //This sets the default value of the select in the ui
        };

        dataModel.getMeasurements = getMeasurements;

        function getMeasures(){
          return   $http.post('http://212.235.190.198:8484/measures',{userid:userid})
                .then(function(a){
                    console.log("Measure response is ... ");
                    console.log(a);
                    measureData.availableOptions = a.data.res;
                    return a.data.res.reverse();
                })
        }

        function getMeasurements(){
        	var deferred = $q.defer();
        	var endpoint = constants.apiEndpoint + 'measurements';
        	console.log(endpoint)
            $http.get(endpoint).then(function(res){
                deferred.resolve(res.data);
            }, function (err) {
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


        dataModel.deleteMeasure = function(id) {
            return $http.put('http://212.235.190.198:8484/delete/measure', {
                    measureid: id
                }).then(function(a) {
                    console.log(a.data)
                    if (a.data.status == "AOK") {
                        var deferred = $q.defer();
                        dataModel.getMeasures().then(function() {
                            deferred.resolve(removeDeletedMeasure(id))
                        });
                        return deferred.promise;

                    } else {
                        return a.data.res;

                    }

                })
        };
    });
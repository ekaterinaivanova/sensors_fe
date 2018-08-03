/**
 * Created by Administrator on 11.5.2016.
 */
angular.module("sensors.data.panel.controller", ['sampleRouting','user.model','d2Directive','data.model','graph.data.model'])


    .controller('DataController', function($state, $http, userModel, graphDataModel, dataModel, apiService) {
        var dataCtrl = this;
        if(!userModel.isLoggedIn()){
            $state.go("login");
        }
        dataCtrl.measures = null;
        dataCtrl.email = userModel.getEmail();

        if(userModel.isLoggedIn()){
            dataModel.getMeasurements(userModel.getId()).then(
                function(result){
                    dataCtrl.measurements = result.data;
                }
            );
        }
        dataCtrl.getSensors = function(measure){
            //dataCtrl.showSelectMeasure = true;
            // getMeasuresById();
            dataModel.selectedOption = measure;
            $state.go("home.measure", {id:measure});
            //console.log( graphDataModel.getData());

        };
        dataCtrl.getSensors($state.params.id);

        dataCtrl.isCurrentMeasure = function(measure){
            // console.log(measure.id_measure + "  " + $state.params.id + $state.params.measureid) ;

            return measure.id_measure == $state.params.id ;
        }

        dataCtrl.getReplications = function(measurementID) {
            apiService('replications').query({
                measurementID: measurementID
            }).then(function(res) {
                dataModel.selectedOption = measurementID
                console.log(res.data)
            }, function(err) {

            })
        }

        //TODO
        dataCtrl.deleteMeasurement = function(id){
            dataModel.deleteMeasurement(id).then(function() {
                _.remove(dataCtrl.measurements, function(item) {
                    return item.ID === id;
                })
            },function() {
                console.log('Couldn\t  delete' + id)
            })
        }
    });
/**
 * Created by Administrator on 11.5.2016.
 */
angular.module("sensors.data.panel.controller", ['sampleRouting','user.model','d2Directive','data.model','graph.data.model'])


    .controller('DataController', function($state, $http, userModel, graphDataModel, dataModel) {
        var dataCtrl = this;
        if(!userModel.isLoggedIn()){
            $state.go("login");
        }
        dataCtrl.measures = null;
        dataCtrl.email = userModel.getEmail();

        if(userModel.isLoggedIn()){
        console.log("User is logged in" );
            dataModel.getMeasures(userModel.getId()).then(
                function(result){
                    dataCtrl.measures = result;
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

        //TODO
        dataCtrl.deleteMeasure = function(id){
            console.log("deleeting....")
            dataModel.deleteMeasure(id).then(
                function(a){
                    console.log(a);
                    // dataCtrl.$apply()
                    $state.reload();

                }
            )
        }
    });
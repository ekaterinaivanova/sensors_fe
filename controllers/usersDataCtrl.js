/**
 * Created by Administrator on 13.5.2016.
 */

angular.module("sensors.users.data.panel.controller", ['sampleRouting','user.model','data.model'])


    .controller('UsersDataSidebarController', function($state, $http, userModel, graphDataModel, dataModel) {
        var dataCtrl = this;
        if(!userModel.isLoggedIn()){
            $state.go("login");
        }
        dataCtrl.measures = null;
        var userid = $state.params.id;

        //dataCtrl.userid =

        if(userModel.isLoggedIn()){
            //console.log("User is logged in" );
            dataModel.getMeasures(userid).then(
                function(result){
                    dataCtrl.measures = result;
                }
            );
        }

        dataCtrl.isCurrentMeasure = function(measure){
            // console.log(measure.id_measure + "  " + $state.params.measureid) ;

            return measure.id_measure == $state.params.measureid
        } ;
        
        dataCtrl.getSensors = function(measure){
            //dataCtrl.showSelectMeasure = true;
            // getMeasuresById();
            dataModel.selectedOption = measure;
            $state.go("users.user.data.measure", {measureid:measure});
            //console.log( graphDataModel.getData());

        };
    });
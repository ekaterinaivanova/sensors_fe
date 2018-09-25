/**
 * Created by Administrator on 13.5.2016.
 */

angular.module("sensors.home.users.data.controller", ['sampleRouting','user.model'])
    .controller('HomeUsersDataController', function($state, userModel, graphDataModel, homeUsersModel,dataModel) {

        var homeCtrl = this;
        //if(!userModel.isLoggedIn()){
        //    $state.go("login");
        //}
        homeCtrl.user = null;
        homeCtrl.graphData = null;
        homeCtrl.measure = null;

        homeCtrl.headers = [];
        homeCtrl.titles = [];
        console.log($state.params.id);
        homeCtrl.extent = [0,0]

        dataModel.getMeasureById($state.params.measureid).then(
            function(result){
                homeCtrl.measure = result;
            }
        );


        homeUsersModel.getUserById($state.params.id).then(
            function(result){
                homeCtrl.user = result;
                if(homeCtrl.user){
                    //usersCtrl.admin = usersCtrl.user.admin ? true : false;
                }else{
                    $state.go('^');
                }
                //console.log(usersCtrl.admin)
            }
        );

        graphDataModel.getSensorsData($state.params.measureid).then(function(data){
            homeCtrl.headers = [];
            homeCtrl.titles = [];
            homeCtrl.graphData = data;
            _.forEach(data, 
            function(d){
                homeCtrl.headers.push(Object.keys(d[0]));
                var t =  d3.map(d[0])
                    .has("acc_x") ? "accelerotion" : d3.map(d[0]).has("grav_x") ? "gravity" : d3.map(d[0]).has("gyro_x") ? "rotation" : d3.map(d[0]).has("mag_x") ? "magneticfield" : "rawaxcceleration";
                homeCtrl.titles.push(t);

            })



        });
    });
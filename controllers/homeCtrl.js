/**
 * Created by Administrator on 9.5.2016.
 */
angular.module("sensors.home.controller", ['sampleRouting','user.model','d2Directive'])
    .controller('HomeController', function($state, userModel, graphDataModel, dataModel) {

        var homeCtrl = this;

        if(!userModel.isLoggedIn()){
            $state.go("login");
        }

        var user = userModel.getLocal();

        homeCtrl.headers = [];
        homeCtrl.titles = [];
        
        homeCtrl.brushExtent = [0,0];
        homeCtrl.testModel = [0,0];
        homeCtrl.graphData = null;

        homeCtrl.decimalSeparator =  user.decimal_point ? "." : ",";
        homeCtrl.separator = user.delimiter;
        homeCtrl.getMeasureMeta = getMeasureMeta;
        homeCtrl.deleteMeasure = deleteMeasure;

        function getCurrentMeasurements () {
            dataModel.getMeasurements().then(function(res){
                homeCtrl.measurements = res.data;
            }, function(err) {})
        }


        function getMeasureMeta() {
            console.log($state.params.id)
            dataModel.getMeasureById($state.params.id).then(function(m){
                if (m) {
                    console.log(m);
                    console.log(m.id_type);
                    console.log(m.location_start);
                    console.log(m.location_end);
                }
           });
        };


        function deleteMeasure(){
            console.log("deleeting....");
            dataModel.deleteMeasure($state.params.id).then(
                function(a){
                    console.log(a);
                    $state.go('^');
                }
            )
        }

        function getSencorsData () {
            graphDataModel.getSensorsData($state.params.id).then(function(data){
                homeCtrl.graphData = data;
                homeCtrl.headers = [];
                homeCtrl.titles = [];
                

                _.forEach(data,
                    function(d){
                        homeCtrl.headers.push(Object.keys(d[0]));
                        var t =  d3.map(d[0])
                            .has("acc_x") ? "accelerotion" : d3.map(d[0]).has("grav_x") ? "gravity" : d3.map(d[0]).has("gyro_x") ? "rotation" : d3.map(d[0]).has("mag_x") ? "magneticfield" : "rawaxcceleration";
                        homeCtrl.titles.push(t);

                    })
                
            }); 
        }

        
        // getSencorsData()
        // homeCtrl.getMeasureMeta();
        //TODO
        getCurrentMeasurements()
        
    });
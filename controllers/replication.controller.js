/**
 * Created by Administrator on 9.5.2016.
 */
angular.module("sensors.home.controller", [])
    .controller('ReplicationController', function($state, userModel, graphDataModel, dataModel, apiService) {

        var vm = this;
        var user;
        var descriptionID;
        var originalDescription;

        vm.headers = [];
        vm.titles = [];
        
        vm.brushExtent = [0,0];
        vm.testModel = [0,0];
        vm.graphData = null;
        vm.measurementId = $state.params.measurementId;

        vm.saveReplicationDescription = saveReplicationDescription;
        vm.cancelEditing = cancelEditing;
        

        function initialize() {
            if(!userModel.isLoggedIn()){
                $state.go("login");
            } else {
                user = userModel.getLocal();
                vm.decimalSeparator =  user.decimal_point ? "." : ",";
                vm.separator = user.delimiter;
                vm.getMeasureMeta = getMeasureMeta;
                vm.deleteMeasure = deleteMeasure;
                // TODO
                // getCurrentMeasurements();
                fetchMetadata();
            }

        }

        function fetchMetadata() {
            apiService('replication-metadata').query({
                ReplicationID: $state.params.id
            }).then(function(res) {
                vm.description = res.data[0].MetaData;
                descriptionID = res.data[0].ID;
                originalDescription = angular.copy(vm.description);
            }, function(err) {
                console.log(err);
            })
        }

        function getCurrentMeasurements () {
            dataModel.getMeasurements().then(function(res){
                vm.measurements = res.data;
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
                    // $state.go('^');
                }
            )
        }

        function getSencorsData () {
            graphDataModel.getSensorsData($state.params.id).then(function(data){
                vm.graphData = data;
                vm.headers = [];
                vm.titles = [];
                
                _.forEach(data,
                    function(d){
                        vm.headers.push(Object.keys(d[0]));
                        var t =  d3.map(d[0])
                            .has("acc_x") ? "accelerotion" : d3.map(d[0]).has("grav_x") ? "gravity" : d3.map(d[0]).has("gyro_x") ? "rotation" : d3.map(d[0]).has("mag_x") ? "magneticfield" : "rawaxcceleration";
                        vm.titles.push(t);
                    })
            }); 
        }

        function saveReplicationDescription() {
            var endpoint = 'replication-metadata';
            var query;
            console.log(descriptionID)
            if (descriptionID) {
                endpoint += ('/' + descriptionID);
                query = apiService(endpoint).put(null, {
                    ReplicationID: $state.params.id,
                    MetaData: vm.description
                })
            } else {
                query = apiService(endpoint).post(null, {
                    ReplicationID: $state.params.id,
                    MetaData: vm.description
                })
            }

            query.then(function(res) {
                vm.editDescription = false;
                originalDescription = angular.copy(vm.description);
            }, function(err) {
                vm.editDescription = false;
                vm.description = angular.copy(originalDescription);
                alert('Couldnt save description.')
            });
        }

        function cancelEditing() {
            vm.description = angular.copy(originalDescription);
            vm.editDescription = false;
        }
        initialize();
        
    });
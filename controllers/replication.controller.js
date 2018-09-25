/**
 * Created by Administrator on 9.5.2016.
 */
angular.module("sensors.home.controller", [])
    .controller('ReplicationController', function(
        $state,
        userModel,
        measurementService,
        apiService,
        replicationService,
        alertingService,
        sensordataService,
        graphService,
        $timeout
    ) {

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
        vm.diactivateReplication = diactivateReplication;
        
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
                fetchReplication();
            }

        }

        function fetchMetadata() {
            apiService('replication-metadata').query({
                ReplicationID: $state.params.id
            }).then(function(res) {
                if (res.data && res.data[0]) {
                    vm.description = res.data[0].MetaData;
                    descriptionID = res.data[0].ID;
                    originalDescription = angular.copy(vm.description);
                }
            }, function(err) {
                console.log(err);
            })
        }

        function fetchReplication() {
            replicationService.fetchReplication($state.params.id).then(function(replication) {
                vm.replication = replication;
                if (vm.replication.TimestampTo) {
                    fetchMeasurementReplicationValues();
                }
            }, function(err) {
                alertingService.Error(err);
            })
        }

        function getCurrentMeasurements () {
            measurementService.getMeasurements().then(function(res){
                vm.measurements = res.data;
            }, function(err) {})
        }

        function diactivateReplication() {
            replicationService.stopReplication(vm.replication.ID).then(function() {
                vm.replication.Active = false;
            }, function (err) {
                alertingService.Error(err);
            })
        }


        function getMeasureMeta() {
            measurementService.getMeasureById($state.params.id).then(function(m){
                if (m) {
                    console.log(m);
                    console.log(m.id_type);
                    console.log(m.location_start);
                    console.log(m.location_end);
                }
           });
        };

        function fetchMeasurementReplicationValues() {
            sensordataService.fetchValues($state.params.id).then(function(values) {
                var temp = {};

                values.forEach(function(value) {
                    if (!temp[value.SensorID]) {
                        temp[value.SensorID] = [];
                    }

                    temp[value.SensorID].push(value);
                });

                vm.graphs = [];
                var randomHash
                _.each(temp, function(item, key) {
                    randomHash = Math.random().toString(36).substring(2);
                    vm.graphs.push(randomHash);
                });

                $timeout(function() {
                    vm.graphs.forEach(function(hash, index) {
                         var title = 'Sensor ' + (index + 1);
                        graphService.getConfiguration(temp[index + 1], title, hash);
                    })
                });
            })
        }


        function deleteMeasure(){
            measurementService.deleteMeasure($state.params.id).then(
                function(a){
                    console.log(a);
                }
            )
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
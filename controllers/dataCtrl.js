/**
 * Created by Administrator on 11.5.2016.
 */
angular.module("sensors.data.panel.controller", [])


    .controller('DataController', function(
        $state,
        $http,
        userModel,
        measurementService,
        apiService,
        replicationService
    ) {
        var vm = this;
        var removeEndpoint;

        vm.email = userModel.getEmail();
        vm.deleteMeasurement = deleteMeasurement;
        vm.redirectTo = redirectTo;
        vm.fetchMenuItems = fetchMenuItems;

        function initialize() {
            if(!userModel.isLoggedIn()){
                $state.go("login");
            } else {
                switch ($state.current.name) {
                    case 'home':
                       // getMeasurements();
                       vm.dateParam = 'MeasurementDate';
                       removeEndpoint = 'measurements';
                    break;
                    case 'measurement':
                    case 'replication':
                        vm.dateParam = 'Timestamp';
                        removeEndpoint = 'replications';
                    break;
                    default:
                }
                
            }
        }   


        function fetchMenuItems() {
            switch ($state.current.name) {
                case 'home':
                   return measurementService.listMeasurements(userModel.getId());
                break;
                case 'measurement':
                case 'replication':
                   return replicationService.listReplications($state.params.measurementId);
                break;
                default:
            }
            
        }

        function getMeasurements() {
            dataModel.getMeasurements().then(function(result){
                vm.menuItems = result.data;
            });
        }
       
        function deleteMeasurement(id){

            apiService(removeEndpoint + '/' + id).delete().then(function(res) {
                if (res.data.status === 'AOK') {
                    _.remove(vm.menuItems, function(item) {
                        return item.ID === id;
                    });
                }
                
            },function() {
                console.log('Couldn\t  delete' + id)
            })
        }

        function redirectTo(option) {
            switch ($state.current.name) {
                    case 'home':
                       $state.go('measurement', {
                            measurementId: option.ID
                        });
                    break;
                    case 'measurement':
                    case 'replication':
                        $state.go('replication', {
                            id: option.ID,
                            measurementId: $state.params.measurementId
                        });
                    break;
                    default:
                }
        }

        initialize();
    });
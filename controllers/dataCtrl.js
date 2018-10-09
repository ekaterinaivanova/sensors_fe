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
        replicationService,
        $interval,
        $scope
    ) {
        var vm = this;
        var removeEndpoint;
        var refreshInterval;

        vm.email = userModel.getEmail();
        vm.deleteMeasurement = deleteMeasurement;
        vm.redirectTo = redirectTo;
        vm.fetchMenuItems = fetchMenuItems;

        $scope.$on("$destroy", function() {
            if (refreshInterval) {
                $interval.cancel(refreshInterval);
            }
        });

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
                        vm.dateParam = 'TimestampFrom';
                        removeEndpoint = 'replications';
                    break;
                    default:
                }

                fetchMenuItems();

                refreshInterval = $interval(fetchMenuItems, 30000);              
            }
        }   


        function fetchMenuItems() {
            var promise;
            switch ($state.current.name) {
                case 'home':
                   promise =  measurementService.getMeasurements(userModel.getId());
                break;
                case 'measurement':
                case 'replication':
                   promise = replicationService.fetchReplications($state.params.measurementId);
                break;
                default:
            }
            promise.then(function(items) {
                items.forEach(function(item) {
                    switch ($state.current.name) {
                        case 'home':
                         if (item.ID === $state.params.measurementId) {
                            item.currentlySelected = true;
                         }
                           
                        break;
                        case 'measurement':
                        case 'replication':
                            if (item.ID === $state.params.id) {
                                item.currentlySelected = true;
                            }
                        break;
                        default:
                    }
                    
                })
                vm.menuItems = items;
            });
            
        }

        function getMeasurements() {
            dataModel.getMeasurements().then(function(result){
                vm.menuItems = result.data;
            });
        }
       
        function deleteMeasurement(id){

            apiService(removeEndpoint + '/' + id).delete().then(function(res) {
                _.remove(vm.menuItems, function(item) {
                    return item.ID === id;
                });                
            },function() {
                console.log('Couldn\t  delete' + id)
            })
        }

        function redirectTo(option) {
            vm.menuItems.forEach(function(item) {
                item.currentlySelected = false;
            });
            option.currentlySelected = true;
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
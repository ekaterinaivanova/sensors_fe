/**
 * Created by Administrator on 11.5.2016.
 */
angular.module("sensors.data.panel.controller", [
    'sampleRouting','user.model','d2Directive','data.model','graph.data.model'])


    .controller('DataController', function(
        $state,
        $http,
        userModel,
        graphDataModel,
        dataModel,
        apiService
    ) {
        var vm = this;
        var removeEndpoint;

        vm.email = userModel.getEmail();
        vm.deleteMeasurement = deleteMeasurement;
        vm.redirectTo = redirectTo;

        function initialize() {
            if(!userModel.isLoggedIn()){
                $state.go("login");
            } else {
                switch ($state.current.name) {
                    case 'home':
                       getMeasurements();
                       vm.dateParam = 'MeasurementDate';
                       removeEndpoint = 'measurements';
                    break;
                    case 'measurement':
                    case 'replication':
                        getReplications($state.params.measurementId);
                        vm.dateParam = 'Timestamp';
                        removeEndpoint = 'replications';
                    break;
                    default:
                }
                
            }
        }        

        function getReplications(measurementID) {
            apiService('replications').query({
                MeasurementID: measurementID
            }).then(function(res) {
                vm.menuItems = res.data.data;
            }, function(err) {

            })
        }

        function getMeasurements() {
            dataModel.getMeasurements(userModel.getId()).then(function(result){
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
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
        vm.email = userModel.getEmail();
        vm.measures = null;

        function initialize() {
            if(!userModel.isLoggedIn()){
                $state.go("login");
            } else {
                switch ($state.current.name) {
                    case 'home':
                       getMeasurements();
                    break;
                    case 'measurement':
                        getReplications($state.params.id);
                    break;
                    default:
                }
                
            }




            // vm.getSensors($state.params.id);

        }


        vm.getSensors = function(measure){
            //vm.showSelectMeasure = true;
            // getMeasuresById();
            dataModel.selectedOption = measure;
            // $state.go("home.replication", {id:measure});
            //console.log( graphDataModel.getData());

        };

        

        vm.isCurrentMeasure = function(measure){
            return measure.id_measure == $state.params.id ;
        }

        function getReplications(measurementID) {
            apiService('replications').query({
                measurementID: measurementID
            }).then(function(res) {
                dataModel.selectedOption = measurementID
                vm.menuItems = res.data.data;
            }, function(err) {

            })
        }

        function getMeasurements() {
            dataModel.getMeasurements(userModel.getId()).then(function(result){
                vm.menuItems = result.data;
            });
        }

        //TODO
        vm.deleteMeasurement = function(id){
            dataModel.deleteMeasurement(id).then(function() {
                _.remove(vm.measurements, function(item) {
                    return item.ID === id;
                })
            },function() {
                console.log('Couldn\t  delete' + id)
            })
        }
        initialize();
    });
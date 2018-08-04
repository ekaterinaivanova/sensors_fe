/**
 * Created by Administrator on 13.5.2016.
 */

angular.module("sensors.users.data.panel.controller", [])


    .controller('UsersDataSidebarController', function(
        $state,
        userModel,
        dataModel
    ) {
        var vm = this;
        console.log('Hello')
       
        function initiate() {
            if(!userModel.isLoggedIn()){
                $state.go("login");
            }

            var userid = $state.params.id;


            console.log($state.current)
        }

        initiate();

        //vm.userid =

        if(userModel.isLoggedIn()){
            //console.log("User is logged in" );
            dataModel.getMeasures(userid).then(
                function(result){
                    vm.measures = result;
                }
            );
        }



        vm.isCurrentMeasure = function(measure){
            // console.log(measure.id_measure + "  " + $state.params.measureid) ;

            return measure.id_measure == $state.params.measureid
        } ;
        
        vm.getSensors = function(measure){
            //vm.showSelectMeasure = true;
            // getMeasuresById();
            dataModel.selectedOption = measure;
            $state.go("users.user.data.measure", {measureid:measure});
            //console.log( graphDataModel.getData());

        };
    });
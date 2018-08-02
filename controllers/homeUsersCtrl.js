/**
 * Created by Administrator on 10.5.2016.
 */
angular.module("sensors.home.users.controller", ['sampleRouting'])
    .controller('HomeUsersController', function($state, $http, userModel, homeUsersModel) {
        var usersCtrl = this;
        usersCtrl.user = null;
            usersCtrl.admin = usersCtrl.user ? (usersCtrl.user.admin ? true : false) : false;
        //console.log(usersCtrl.admin)

        homeUsersModel.getUserById($state.params.id).then(
            function(result){
                usersCtrl.user = result;
                if(usersCtrl.user){
                    usersCtrl.admin = usersCtrl.user.admin ? true : false;
                }else{
                    $state.go('^');
                }
                //console.log(usersCtrl.admin)
            }
        );
        usersCtrl.goToMeasures = function(){
            $state.go("users.user.data");
        };

        usersCtrl.delete = function(){
            homeUsersModel.deleteUser($state.params.id).then(
                function(result){
                    //console.log(result);
                    //TODO something with the result
                    $state.go('^');

                }
            )
        };

        usersCtrl.cancel = function(){
            $state.go('^');
        };

        usersCtrl.updateUser = function(){
            homeUsersModel.updateUser($state.params.id, usersCtrl.admin).then(
                function(result){
                    //console.log(result);
                    //TODO something with the result
                    $state.go('^');

                }
            )
        };

    });
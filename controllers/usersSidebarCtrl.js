/**
 * Created by Administrator on 12.5.2016.
 */

angular.module("sensors.home.users.sidebar.controller", ['sampleRouting','home.users.model','user.model'])
    .controller('HomeUsersSidebarController', function($state, $http, userModel, homeUsersModel) {
        if(!userModel.isAdmin()){
            // $state.go("home");
        }else{
            var homeUsersCtrl = this;
            homeUsersCtrl.users = null;
            homeUsersModel.getUsers().then(
                function(result){
                    homeUsersCtrl.users = result;
                }
            )

        }
    });
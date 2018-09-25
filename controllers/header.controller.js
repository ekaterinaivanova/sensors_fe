/**
 * Created by Administrator on 10.5.2016.
 */
angular.module('sensors.header.controller', ['sampleRouting'])
    .controller('HeaderController', function RegisterController(
        $http,
        $state,
        userModel,
        alertingService
    ) {
        var vm = this;
        // vm.isLoggedIn = isLoggedIn;
        // vm.getUserName = getUserName;
        // vm.isAdmin = isAdmin;
        vm.buttonTapped = buttonTapped;

        function initialize() {
            userModel.cachedProfile().then(function(profile) {
                setButtons();
            }, function(err) {
                alertingService.Error(err);
                $state.go('login')
            })
           
        }

        function setButtons() {
             vm.buttons = [
                {
                    name: 'my data',
                    action: 'home'
                },
                {
                    name: 'other users',
                    action: 'users'
                },
                {
                    name: 'my account (' + getUserName() + ')',
                    action: 'account'
                }
            ];
        }
        
        function isLoggedIn(){
            return userModel.isLoggedIn();
        };
        
        function getUserName(){
            return userModel.getName();
        };

        
        function isAdmin(){
            //console.log(userModel.isAdmin());
            return userModel.isAdmin();
        };
        
        function buttonTapped(action){
            $state.go(action);
        };

        initialize();
    });

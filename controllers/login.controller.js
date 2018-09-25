/**
 * Created by EkaterinaAcc on 15-Apr-16.
 */
angular.module('controllers', [
    'sensors.home.controller',
    'sampleRouting',
    'user.model',
    "sensors.login.controller"
])
    .controller('LoginController', function LoginController(
        $state,
        apiService,
        userModel,
        $localStorage,
        alertingService
    ){

       var loginCtrl = this;
        loginCtrl.message = 'This is login screen';
        var user = $localStorage.config;
        loginCtrl.email = user ? user.email : "";
        loginCtrl.password = user ? user.password : "";
        loginCtrl.rememberMe = user ? true : false;

        loginCtrl.message = null;
        loginCtrl.showAlert = false;
        loginCtrl.redirectToRegister = function(){
            $state.go("register");
        };

        function saveData(user){
            if(loginCtrl.rememberMe){
                $localStorage.config = {
                    email: user.Email,
                    password:loginCtrl.password,
                    userID: user.ID
                }
            }
        }
        loginCtrl.login = function(){
            if(loginCtrl.email && loginCtrl.password){
                userModel.Login(loginCtrl.email, loginCtrl.password).then(function() {
                    $state.go("home");
                }, function(err) {
                    alertingService.Error(err.data);
                    loginCtrl.message = err;
                    loginCtrl.showAlert = true;
                })
                // apiService('user-login').post(null, {
                //     Email:loginCtrl.email,
                //     Password:loginCtrl.password,
                //     PhoneID:"PC",
                //     PhoneName:"PC"
                // }).then(function(res){
                //     var user = res.data;
                //     user.Password = loginCtrl.password;
                //     userModel.createUser(user);
                //     $state.go("home");
                //     saveData(res.data);
                // }, function(err) {
                //     alertingService.Error(err.data);
                //     loginCtrl.message = err;
                //     loginCtrl.showAlert = true;
                // });
            }
        }

    })
;
//
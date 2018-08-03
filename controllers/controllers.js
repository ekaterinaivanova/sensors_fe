/**
 * Created by EkaterinaAcc on 15-Apr-16.
 */
angular.module('controllers', ['sensors.home.controller','sampleRouting','user.model','d2Directive',"sensors.login.controller"])
    .controller('LoginController', function LoginController($state, apiService, userModel,$localStorage){
        var loginCtrl = this;
        loginCtrl.message = 'This is login screen';
        var user = $localStorage.message;
        loginCtrl.email = user ? user.email : "";
        loginCtrl.password = user ? user.password : "";
        // console.log( loginCtrl.email +" "+ userModel.getEmail());
        loginCtrl.rememberMe = user ? true : false;

        loginCtrl.message = null;
        loginCtrl.showAlert = false;
        loginCtrl.redirectToRegister = function(){
            $state.go("register");
        };

        function saveData(){
            if(loginCtrl.rememberMe){
                $localStorage.message = {
                    email:loginCtrl.email,
                    password:loginCtrl.password
                }
            }
        }
        loginCtrl.login = function(){
            if(loginCtrl.email && loginCtrl.password){
                apiService('user-login').post(null, {
                    Email:loginCtrl.email,
                    Password:loginCtrl.password,
                    PhoneID:"PC",
                    PhoneName:"PC"
                }).then(function(res){
                    loginCtrl.message = res.data.response;
                    loginCtrl.showAlert = true;
                    if(res.data.status == "AOK"){
                        userModel.createUser(res.data);
                        $state.go("home");
                        saveData();
                    }
                });
            }
        }

    })
;
//
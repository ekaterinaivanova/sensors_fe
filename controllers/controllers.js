/**
 * Created by EkaterinaAcc on 15-Apr-16.
 */
angular.module('controllers', ['sensors.home.controller','sampleRouting','user.model','d2Directive',"sensors.login.controller"])
    .controller('LoginController', function LoginController($state, $http, userModel,$localStorage){
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
            console.log("Saving...." + loginCtrl.rememberMe);
            if(loginCtrl.rememberMe){
                $localStorage.message = {email:loginCtrl.email, password:loginCtrl.password}
            }
        }
        loginCtrl.login = function(){
            console.log("Sending login request...");
            if(loginCtrl.email && loginCtrl.password){
                $http.post('http://localhost:8484/login',
                    {email:loginCtrl.email, pwd:loginCtrl.password,phoneId:"PC",phoneName:"PC"})
                    .then(function(a){
                        // console.log(a.data.name);
                        loginCtrl.message = a.data.response;
                        loginCtrl.showAlert = true;
                        if(a.data.status == "AOK"){
                            userModel.createUser(a.data);
                            $state.go("home");
                            saveData()
                        }
                    });
            }
        }

    })
;
//
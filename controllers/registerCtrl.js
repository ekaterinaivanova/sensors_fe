/**
 * Created by Administrator on 9.5.2016.
 */
angular.module("sensors.login.controller", [])
    .controller('RegisterController', function RegisterController($http, $state, userModel) {
    var registerCtrl = this;
    registerCtrl.message = 'This is register screen';
    registerCtrl.email = null;
    registerCtrl.name = null;
    registerCtrl.lastname = null;
    registerCtrl.password = null;
    registerCtrl.repassword = null;
    registerCtrl.showAlert = false;
        registerCtrl.redirectToLogin = function(){
            $state.go("login");
        };
    registerCtrl.register = function(){
        if(registerCtrl.email && registerCtrl.name && registerCtrl.lastname && registerCtrl.password && registerCtrl.repassword){
            if(registerCtrl.password == registerCtrl.repassword){
                $http.post('http://212.235.190.198:8484/register', {
                        email:registerCtrl.email, pwd:registerCtrl.password,name: registerCtrl.name, lastname: registerCtrl.lastname})
                    .then(function(a){
                        registerCtrl.showAlert = true;
                        console.log(a.data.email);
                        registerCtrl.message = a.data.response;
                        switch( a.data.status){
                            case "AOK":
                                userModel.setEmail(registerCtrl.email);
                                //console.log( userModel.getEmail());

                                $state.go("login");
                                break;

                            default:
                                registerCtrl.showAlert = true;
                                break

                        }
                        //if(a.data.status == 'AOK'){
                        //    //    todo redirect
                        //    userModel.setEmail(registerCtrl.email);
                        //    //console.log( userModel.getEmail());
                        //
                        //    $state.go("login");
                        //}else if
                    })
            }
        }
    }

})
/**
 * Created by Administrator on 10.5.2016.
 */
angular.module("sensors.top-panel.controller", ['sampleRouting'])
    .controller('TopPanelController', function RegisterController($http, $state, userModel) {
        var topPanelCtrl = this;

        //var buttons = [];
        topPanelCtrl.isLoggedIn = function(){
            return userModel.isLoggedIn();
        };
        topPanelCtrl.getUserName = function(){
            return userModel.getName();
        };

        topPanelCtrl.isAdmin = function(){
            //console.log(userModel.isAdmin());
            return userModel.isAdmin();
        };
        topPanelCtrl.buttonTapped = function(action){
            $state.go( action);
        };
        var buttons = [{name:"my data", action:"home"},{name:"other users",action:"users"}, {name:"my account (" + topPanelCtrl.getUserName() + ")",action:"account"}];
        //["data", "users"]
        topPanelCtrl.getButtons = function(){
            if(topPanelCtrl.isAdmin()){
                return buttons;
            }else{
                return [];
            }
        }
    });

/**
 * Created by Katja on 20/05/16.
 */

angular.module('sensors.account', [])
   
    
    .controller('AccountController', function AccountController(userModel, $state){
        var accountCtrl = this;
        var user = userModel.getLocal();
        // console.log(user);
        accountCtrl.delimiter = user.delimiter;
        accountCtrl.decimalPointOptions = [",", "."];
        accountCtrl.decimalSeparator = accountCtrl.decimalPointOptions[user.decimal_point];
        // console.log(accountCtrl.decimalSeparator);

        //Tesst
        accountCtrl.change = function(){
            // console.log(accountCtrl.decimalSeparator);
            // console.log(index)
        };
        //
        accountCtrl.getUser = function(){
            return user;
        };
        accountCtrl.saveChanges = function(){
            var decimalPoint = (accountCtrl.decimalSeparator == "." )? 1:0;
            // console.log(decimalPoint);
            userModel.updateUser(decimalPoint,accountCtrl.delimiter).then(
                function(a){
                    // console.log(a);
                    user = a;
                }
            )
        };
        accountCtrl.cancelEditing = function(){
            $state.go("home");
        }
        
    });
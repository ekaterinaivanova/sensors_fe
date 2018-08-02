///**
// * Created by EkaterinaAcc on 15-Apr-16.
// */
angular.module('user.model', ["ngStorage"])
    .service('userModel', function($sessionStorage,$q, $http  ) {
        var service = this;

        var user = $sessionStorage.SessionMessage;



        service.createUser = function(newUser){
            $sessionStorage.SessionMessage = newUser;
            user = newUser;
            //setData(user);
        };


      


        service.updateUser = function(decimalSeparator, delimiter){
            console.log({decimal_point:decimalSeparator, delimiter:delimiter, id:user.userid})
            return   $http.put('http://212.235.190.198:8484/user/change/delimiters',
                {decimal_point:decimalSeparator, delimiter:delimiter, id:user.userid})
                .then(function(a){
                    console.log(a.data);
                    if(a.data.status == "AOK"){
                        var deferred = $q.defer();
                        deferred.resolve(changeDelimiters(decimalSeparator, delimiter));
                        return deferred.promise;

                    }

                    return user;
                })
        };
        
        function changeDelimiters(decimalSeparator, delimiter){
            user.decimal_point = decimalSeparator;
            user.delimiter = delimiter;
            service.createUser(user);
            return user;
        }
        //


        service.isLoggedIn = function(){
            if(user){
                return true;
            }else{
                return false
            }
        };

        service.getName = function(){
            if(user){
                return user.name;
            }else{
                return "";
            }
        };
        service.isAdmin = function(){
            if(user){
                return user.admin;
            }else{
                return false;
            }
        };
        service.getLastName = function(){
            if(user){
                return user.lastname;
            }else{
                return "";
            }
        };
        service.getEmail = function(){
            if(user){
                return user.email;
            }else{
                return "";
            }
        };
        service.getId = function(){
            if(user){
                return user.userid;
            }else{
                return 0
            }
        };
        service.setEmail = function(email){
            user.email = email;
        };

        service.getLocal = function(){
            return  $sessionStorage.SessionMessage ;
        };

    });
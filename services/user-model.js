///**
// * Created by EkaterinaAcc on 15-Apr-16.
// */
angular.module('user.model', ["ngStorage"])
    .service('userModel', function(
        $sessionStorage,
        $q,
        apiService,
        $localStorage
    ) {
        var service = this;

        var user = {};
        service.createUser = createUser;
        service.Profile = Profile;
        service.cachedProfile = cachedProfile;
        service.Login = Login;
        
        function changeDelimiters(decimalSeparator, delimiter){
            user.decimal_point = decimalSeparator;
            user.delimiter = delimiter;
            service.createUser(user);
            return user;
        }
        
        function Profile() {
            var deferred = $q.defer();
            apiService('users/' + user.ID).query().then(function(res) {
                $sessionStorage.SessionMessage = Object.assign(user, res.data);
                user = $sessionStorage.SessionMessage;
                console.log(user.Password)
                deferred.resolve(user);
            }, function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        function cachedProfile() {
            var deferred = $q.defer();
            if ($sessionStorage.SessionMessage) {
                user = $sessionStorage.SessionMessage;
                deferred.resolve($sessionStorage.SessionMessage)
            } else if (localStorage.config && localStorage.config.userID){
                user.ID = localStorage.config.userID;
                Profile().then(function(user) {
                    deferred.resolve(user);
                }, function (err) {
                    deferred.reject(err);
                })
            } else if (localStorage.config && localStorage.config.email && localStorage.config.password) {
                Login(localStorage.config.email, localStorage.config.password).then(function() {
                    deferred.resolve(user);
                }, function(err) {
                    deferred.reject(err);
                })
            } else {
                deferred.reject('No user data cached');
            }
            return deferred.promise;
        }

        function saveDataToLocalStorage(user) {
            $localStorage.config = {
                email: user.Email,
                password: user.Password,
                userID: user.ID
            }
        }

        function Login(email, password) {
            var deferred = $q.defer();
            if(email && password){
                apiService('user-login').post(null, {
                    Email: email,
                    Password: password,
                    PhoneID: "PC",
                    PhoneName: "PC"
                }).then(function(res){
                    var user = res.data;
                    user.Password = password;
                    createUser(user);
                    saveDataToLocalStorage(user);
                    deferred.resolve();
                }, function(err) {
                    alertingService.Error(err.data);
                    loginCtrl.message = err;
                    loginCtrl.showAlert = true;
                    deferred.reject(err);
                });
            }
            return deferred.promise
        }
        
        service.isLoggedIn = function(){
            if(user){
                return true;
            }else{
                return false
            }
        };

        service.getName = function(){
            if(user){
                return user.FirstName + ' ' + user.LastName ;
            }else{
                return "";
            }
        };
        service.isAdmin = function(){
            if(user){
                return user.Admin;
            }else{
                return false;
            }
        };
        service.getLastName = function(){
            if(user){
                return user.LastName;
            }else{
                return "";
            }
        };
        service.getEmail = function(){
            if(user){
                return user.Email;
            }else{
                return "";
            }
        };
        service.getId = function(){
            if(user){
                return user.ID;
            }else{
                return 0
            }
        };
        service.setEmail = function(email){
            user.Email = email;
        };

        service.getPassword = function(){
            return user.Password;
        };

        service.getLocal = function(){
            return  $sessionStorage.SessionMessage ;
        };

        function createUser(newUser) {
            newUser.Password = undefined;
            $sessionStorage.SessionMessage = Object.assign(user, newUser);
            user = $sessionStorage.SessionMessage;
        }

    });
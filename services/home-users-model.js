/**
 * Created by Administrator on 12.5.2016.
 */
///**
// * Created by EkaterinaAcc on 15-Apr-16.
// */
angular.module('home.users.model', [])
    .service('homeUsersModel', function($q, $http ) {
        var usersModel = this;
        usersModel.users = null;

        function getUsers(){
            return   $http.get('http://212.235.190.198:8484/allusers')
                .then(function(a){
                    console.log("Measure response is ... ");
                    console.log(a);
                    usersModel.users = a.data.res;
                    return a.data.res;
                })
        }

        usersModel.getUsers = function(){
            var deferred = $q.defer();
            if ( usersModel.users) {
                deferred.resolve( usersModel.users)
            }else{
                deferred.resolve( getUsers())
            }
            return deferred.promise;

        };

        usersModel.deleteUser = function(userId){
            return   $http.put('http://212.235.190.198:8484/user/delete', {userid:userId})
                .then(function(a){
                    console.log(a.data)
                    if(a.data.status == "AOK"){
                        var deferred = $q.defer();
                        usersModel.getUsers().then(function () {
                            deferred.resolve(removeDeletedUser(userId))
                        });
                        return deferred.promise;

                    }

                    return a.data.res;
                })
        };

        usersModel.updateUser = function(userId, admin){
            return   $http.put('http://212.235.190.198:8484/user/change/admin', {userid:userId, admin:admin})
                .then(function(a){
                    console.log(a.data);
                    if(a.data.status == "AOK"){
                        var deferred = $q.defer();
                        usersModel.getUsers().then(function () {
                            deferred.resolve(changeUserAdminStatus(userId, admin))
                        });
                        return deferred.promise;

                    }

                    return a.data.res;
                })
        };
        function changeUserAdminStatus(userId, admin){
            return _.forEach(usersModel.users, function(user){
                if( user.id_user === parseInt( userId, 10)){
                    user.admin = admin;
                    return;
                }
            })
        }

        function removeDeletedUser(userId){
            return _.remove(usersModel.users, function(user){
                return user.id_user === parseInt( userId, 10)
            })
        }

         function getUser(userId){
            //console.log(userId);

            return _.find(usersModel.users, function (user) {
                //console.log(user);
                return user.id_user === parseInt(userId, 10);
            })
        }



        usersModel.getUserById = function (userId) {
            var deferred = $q.defer();
            if (usersModel.users) {
                deferred.resolve(getUser(userId))
            } else {
                usersModel.getUsers().then(function () {
                    deferred.resolve(getUser(userId))
                })
            }
            return deferred.promise;
        };
    });
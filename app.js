/**
 * Created by EkaterinaAcc on 14-Apr-16.
 */
var app = angular.module('sampleRouting', [
    'ui.router',
    'ngRoute',
    'ngResource',
    'sensors.data.panel.controller',
    'controllers',
    'sensors.header.controller',
    'sensors.home.users.controller',
    'sensors.home.users.sidebar.controller',
    'sensors.users.data.panel.controller',
    'sensors.home.users.data.controller',
    'sensors.account',
    'constant-module',
    'sensors.measurements',
    'sensor.directive',
    'services',
    'data.model',
    'alertingService',
    'sensordata',
    'graph'
]);


app.config(function(
    $stateProvider,
    $urlRouterProvider,
    $httpProvider
){

    $stateProvider.state('account', {
        url: '/account',
        views: {
            'main@': {
                templateUrl: 'account/account.html',
                controller: 'AccountController as accountCtrl'

            },
            'toppanel@': {
                templateUrl: 'templates/header.html',
                controller: 'HeaderController as headerCtrl'

            }
            // 'sidebar@':{
            //     templateUrl: 'templates/sidebar.html',
            //     controller: 'DataController as vm'
            // }
        }

    });

    $stateProvider.state('home',{
        url:'/home',
        views:{
            'toppanel@':{
                templateUrl: 'templates/header.html',
                controller: 'HeaderController as headerCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/sidebar.html',
                controller: 'DataController as vm'
            }
        }

    });

 

    $stateProvider.state('replication',{
        url:'/measurement/:measurementId/replication/:id',
        views:{
            'main@':{
                templateUrl: 'templates/replication.html',
                controller: 'ReplicationController as ctrl'
            }
            ,
            'toppanel@':{
                templateUrl: 'templates/header.html',
                controller: 'HeaderController as headerCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/sidebar.html',
                controller: 'DataController as vm'
            }
        }

    });

    $stateProvider.state('measurement',{
        url:'/measurement/:measurementId',
        views:{
            'main@':{
                templateUrl: 'templates/measurement.html',
                controller: 'MeasurementController as ctrl'
            },
            'toppanel@':{
                templateUrl: 'templates/header.html',
                controller: 'HeaderController as headerCtrl'
            },
            'sidebar@':{
                templateUrl: 'templates/sidebar.html',
                controller: 'DataController as vm'
            }
        }

    });

    $stateProvider.state('users',{
        url:'/users',
        views:{

            'toppanel@':{
                templateUrl: 'templates/header.html',
                controller: 'HeaderController as headerCtrl'
            },
            'sidebar@':{
                templateUrl: 'templates/users-sidebar.html',
                controller: 'HomeUsersSidebarController as homeUsersCtrl'
            }
        }

    });
    $stateProvider.state('users.user',{
        url:'/:id',
        views:{
            'main@':{
                templateUrl: 'templates/home-users.html',
                controller: 'HomeUsersController as homeUsersCtrl'
            },
            'toppanel@':{
                templateUrl: 'templates/header.html',
                controller: 'HeaderController as headerCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/users-sidebar.html',
                controller: 'HomeUsersSidebarController as homeUsersCtrl'
            }
        }

    });
    $stateProvider.state('users.user.data',{
        url:'/data',
        views:{
            'main@':{
                //templateUrl: 'templates/home-users.html',
                //controller: 'HomeUsersController as homeUsersCtrl'
            },
            'toppanel@':{
                templateUrl: 'templates/header.html',
                controller: 'HeaderController as headerCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/users-data-sidebar.html',
                controller: 'UsersDataSidebarController as vm'
            }
        }

    });

    $stateProvider.state('users.user.data.measure',{
        url:'/:measureid',
        views:{
            'main@':{
                templateUrl: 'templates/home-users-data.html',
                controller: 'HomeUsersDataController as homeUserDataCtrl'
            },
            'toppanel@':{
                templateUrl: 'templates/header.html',
                controller: 'HeaderController as headerCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/users-data-sidebar.html',
                controller: 'UsersDataSidebarController as usersDataSidebarCtrl'
            }
        }

    });

    $stateProvider.state('login',{
        url:'/login',
        views:{
            'main@':{
                templateUrl: 'templates/login.html',
                controller: 'LoginController as loginCtrl'

            }
        }

    });
    $stateProvider.state('register',{
        url:'/register',
        views:{
            'main@':{
                templateUrl: 'templates/register.html',
                controller: 'RegisterController as registerCtrl'

            }
        }

    });
    $urlRouterProvider.otherwise('/home');
});

app.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.cancellable = true;
}]);


/**
 * Created by EkaterinaAcc on 14-Apr-16.
 */
var sampleApp = angular.module('sampleRouting', [
    'ui.router',
    'ngResource',
    'sensors.data.panel.controller',
    'controllers',
    'sensors.top-panel.controller',
    "sensors.home.users.controller",
    "sensors.home.users.sidebar.controller",
    "sensors.users.data.panel.controller",
    "sensors.home.users.data.controller",
    'ngSanitize',
    'ngCsv',
    "sensors.account",
    'constant-module'
]);


sampleApp.config(function($stateProvider,$urlRouterProvider, $httpProvider){
    $stateProvider.state("account", {
        url: "/account",
        views: {
            'main@': {
                templateUrl: 'account/account.html',
                controller: 'AccountController as accountCtrl'

            },
            'toppanel@': {
                templateUrl: 'templates/top-panel.html',
                controller: 'TopPanelController as topPanelCtrl'

            }
            // 'sidebar@':{
            //     templateUrl: 'templates/sidebar.html',
            //     controller: 'DataController as dataCtrl'
            // }
        }

    });

    $stateProvider.state("home",{
        url:"/home",
        views:{
            //'main@':{
            //    templateUrl: 'templates/home.html',
            //    controller: 'HomeController as homeCtrl'
            //
            //},
            'toppanel@':{
                templateUrl: 'templates/top-panel.html',
                controller: 'TopPanelController as topPanelCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/sidebar.html',
                controller: 'DataController as dataCtrl'
            }
        }

    });

    $stateProvider.state("home.measure",{
        url:"/:id",
        views:{
            'main@':{
                templateUrl: 'templates/home.html',
                controller: 'HomeController as homeCtrl'
            }
            ,
            'toppanel@':{
                templateUrl: 'templates/top-panel.html',
                controller: 'TopPanelController as topPanelCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/sidebar.html',
                controller: 'DataController as dataCtrl'
            }
        }

    });

    $stateProvider.state("users",{
        url:"/users",
        views:{

            'toppanel@':{
                templateUrl: 'templates/top-panel.html',
                controller: 'TopPanelController as topPanelCtrl'
            },
            'sidebar@':{
                templateUrl: 'templates/users-sidebar.html',
                controller: 'HomeUsersSidebarController as homeUsersCtrl'
            }
        }

    });
    $stateProvider.state("users.user",{
        url:"/:id",
        views:{
            'main@':{
                templateUrl: 'templates/home-users.html',
                controller: 'HomeUsersController as homeUsersCtrl'
            },
            'toppanel@':{
                templateUrl: 'templates/top-panel.html',
                controller: 'TopPanelController as topPanelCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/users-sidebar.html',
                controller: 'HomeUsersSidebarController as homeUsersCtrl'
            }
        }

    });
    $stateProvider.state("users.user.data",{
        url:"/data",
        views:{
            'main@':{
                //templateUrl: 'templates/home-users.html',
                //controller: 'HomeUsersController as homeUsersCtrl'
            },
            'toppanel@':{
                templateUrl: 'templates/top-panel.html',
                controller: 'TopPanelController as topPanelCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/users-data-sidebar.html',
                controller: 'UsersDataSidebarController as usersDataSidebarCtrl'
            }
        }

    });

    $stateProvider.state("users.user.data.measure",{
        url:"/:measureid",
        views:{
            'main@':{
                templateUrl: 'templates/home-users-data.html',
                controller: 'HomeUsersDataController as homeUserDataCtrl'
            },
            'toppanel@':{
                templateUrl: 'templates/top-panel.html',
                controller: 'TopPanelController as topPanelCtrl'

            },
            'sidebar@':{
                templateUrl: 'templates/users-data-sidebar.html',
                controller: 'UsersDataSidebarController as usersDataSidebarCtrl'
            }
        }

    });

    $stateProvider.state("login",{
        url:"/login",
        views:{
            'main@':{
                templateUrl: 'templates/login.html',
                controller: 'LoginController as loginCtrl'

            }
        }

    });
    $stateProvider.state("register",{
        url:"/register",
        views:{
            'main@':{
                templateUrl: 'templates/register.html',
                controller: 'RegisterController as registerCtrl'

            }
        }

    });
    $urlRouterProvider.otherwise('/home');

  



});


angular.module('sensors.account', [])
   
    
    .controller('AccountController', function AccountController(
        userModel,
        $state,
        apiService,
        alertingService
    ){
        var vm = this;
        var user = userModel.getLocal();
        vm.delimiter = user.delimiter;
        vm.decimalPointOptions = [",", "."];
        vm.editAccount = editAccount;
        vm.saveAccountData = saveAccountData;
        
        vm.getUser = function() {
            return user;
        };
     
        vm.cancelEditing = function(){
            vm.editingAccount = false;
        }

        function editAccount() {
            vm.editingAccount = true;
            vm.form = Object.assign({}, user);
            vm.form.DecimalPoint = vm.decimalPointOptions[user.DecimalPoint];
            vm.form.Admin = !!user.Admin;
        }

        function saveAccountData() {
            var apiObj = {
                FirstName: vm.form.FirstName,
                LastName: vm.form.LastName,
                Admin: vm.form.Admin,
                Email: vm.form.Email,
                Delimiter: vm.form.Delimiter,
                DecimalPoint: vm.form.DecimalPoint === '.' ? 1 : 0,
                Password: userModel.getPassword()
            }

            apiService('users/' + userModel.getId()).put(null, apiObj).then(function(res) {
                vm.editingAccount = false;
                constructForm();
            }, function(err) {
                alertingService.Error(err)
            })
        }

        initiate();

        function constructForm() {
            vm.rows = [
                {
                    title: 'First name',
                    value: user.FirstName,
                    param: 'FirstName',
                    type: 'input'
                },
                {
                    title: 'Last name',
                    value: user.LastName,
                    param: 'LastName',
                    type: 'input'
                },
                {
                    title: 'Email',
                    value: user.Email,
                    param: 'Email',
                    type: 'input'
                },
                {
                    title: 'Delimiter',
                    value: user.Delimiter,
                    param: 'Delimiter',
                    type: 'input'
                },
                {
                    title: 'Decimal point delimiter',
                    value: vm.decimalPointOptions[user.DecimalPoint],
                    param: 'DecimalPoint',
                    type: 'select'
                },
                {
                    title: 'Administrator',
                    value: user.Admin ? 'YES' : 'NO',
                    param: 'Admin',
                    type: 'checkbox'
                }
            ];
        }

        function initiate() {
            userModel.Profile().then(function(newUser) {
                user = newUser;
                constructForm();
            }, function(err) {
                alertingService.Error(err);
            });
        }
        
    });
/**
 * Created by Administrator on 11.5.2016.
 */
angular.module("sensors.measurements", [])

    .controller('MeasurementController', function(apiService, $state, $scope, replicationService) {
        var vm = this;
        var measurementId = $state.params.measurementId;
        vm.createReplication = createReplication;
        vm.stopReplication = stopReplication;
        vm.diactivateMeasurement = diactivateMeasurement;

        function initialize () {

            vm.measurementProperties = [
                {
                    title: 'Date',
                    param: 'MeasurementDate',
                    type: 'date'
                },
                {
                    title: 'Experiment',
                    param: 'ExperimentName',
                },
                {
                    title: 'Subject',
                    param: 'ReadableName'
                },
                {
                    title: 'Address',
                    param: 'Address',
                },
                {
                    title: 'Coordinates',
                    param: 'Coordinates'
                }
            ]
            var waterfall = [
                fetchMeasuremet,
                fetchExperiment,
                fetchSubject
            ];

            async.waterfall(waterfall, function(err, measurement) {
                measurement.Coordinates = measurement.Latitude + ' ' + measurement.Longitude;
                vm.measurement = measurement;
            });

            fetchReplications();
        }

        function fetchReplications() {
            replicationService.fetchReplications(measurementId).then(function(replications) {
                 vm.replicationNumber = replications.length
            }, function(err) {
                vm.replicationNumber = 'Error'; 
            })
        }

        function fetchExperiment(measurement, callback) {
            apiService('experiments/' + measurement.ExperimentID).query().then(function(res) {
                if (res.data && res.data.data && res.data.data[0]) {
                    measurement.ExperimentName = res.data.data[0].Name;
                }
                callback(null, measurement);
            }, function(err) {
                callback(null, measurement);
            })
        }

        function fetchSubject(measurement, callback) {
            apiService('subject/' + measurement.SubjectID).query().then(function(res) {
                if (res.data && res.data.data && res.data.data[0]) {
                    measurement.subject = res.data.data[0];
                    measurement.ReadableName = measurement.subject.FirstName + ' ' + measurement.subject.LastName + (measurement.subject.Remark ? ' (' + measurement.subject.Remark + ')' : '' );
                }
                callback(null, measurement);
            }, function(err) {
                callback(null, measurement);
            })
        }


        function fetchMeasuremet(callback) {
            apiService('measurements/' + measurementId).query().then(function(res) {
                if (res.data && res.data[0]) {
                    callback(null, res.data[0])
                } else {
                    callback('No measurement was found')
                }
            }, function(err) {
                callback(err);
            })
        }

        function createReplication() {
            apiService('replications').post(null, {
                MeasurementID: $state.params.measurementId
            }).then(function(res) {
                console.log("Create", res)
                if (res.data) {
                    vm.newReplication = res.data;

                    console.log('vm.newReplication', $scope.vm)
                } else {
                    console.log('Couldn\'t create replication')
                }
            }, function(err) {
                console.log('Couldn\'t create replication', err)
            })
        }

        function stopReplication() {
            replicationService.stopReplication(vm.newReplication.ID).then(function(res) {
                vm.newReplication = null;
            }, function(err) {
                console.log('Couldn\'t stop replication')
            })
        }

        function diactivateMeasurement() {
            if (vm.newReplication) {
                alert('You can not diactivate this measurement. You have an active replication.')
            } else {
                if (confirm("Are you sure you want to diactivate current measurement?")) {
                    apiService('measurements/' + measurementId).put(null, {
                        Active: false
                    }).then(function(res) {
                        if (res.data.status === 'AOK') {
                            vm.measurement.Active = false;
                        }
                    }, function (err) {

                    });
                }
            }
            
            
        }

        initialize();
    });
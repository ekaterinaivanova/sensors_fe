/**
 * Created by Administrator on 11.5.2016.
 */
angular.module("sensors.measurements", [])

    .controller('MeasurementController', function(apiService, $state) {
        var vm = this;

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
            apiService('replications').query({
                MeasurementID: $state.params.id
            }).then(function(res) {
                if (res.data && res.data.status === 'AOK') {
                    console.log(res.data.data.length)
                    vm.replicationNumber = res.data.data.length;
                } else {
                   vm.replicationNumber = 'Error'; 
                }
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
            apiService('measurements/' + $state.params.id).query().then(function(res) {
                if (res.data && res.data.data && res.data.data[0]) {
                    callback(null, res.data.data[0])
                } else {
                    callback('No measurement was found')
                }
            }, function(err) {
                callback(err);
            })
        }

        function createReplication() {
            apiService('replications').post({
                MeasurementID: $state.params.MeasurementID
            })
        }
        initialize();
    });
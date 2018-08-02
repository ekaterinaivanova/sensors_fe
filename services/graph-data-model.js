/**
 * Created by Administrator on 11.5.2016.
 */

angular.module('graph.data.model', [])
    .service('graphDataModel', function($http) {
        var graphDataModel = this;
        var graphData = null;

        graphDataModel.setData = function(data){
            graphData = data;
        };
        graphDataModel.getData = function(){
            return graphData;
        };

        // function setDate(){
        //     _.forEach(graphData, function(data){
        //         _.forEach(data, function(d){
        //             d.time = new Date(d.time);
        //         })
        //     })
        // }
        graphDataModel.getSensorsData = function(measure){
            return $http.post('http://212.235.190.198:8484/sensorsData',
                    {measureid:measure}
                    )
                    .then(function(a){
                        //console.log("Data recieved ....");
                        //dataCtrl.graphData = a.data;
                        graphDataModel.graphData = a.data;

                        console.log(a.data);
                        return a.data;
                    })
        }

    });
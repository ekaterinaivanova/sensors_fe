angular.module('graph', [])
	.service('graphService', function() {
		function getConfiguration(items, title, hash) {
			console.log(items)
			var DOF1 = [];
			var DOF2 = [];
			var DOF3 = [];
			items.forEach(function(item) {
				DOF1.push([
					item.timestamp,
					item.DOF1
				]);
				DOF2.push([
					item.timestamp,
					item.DOF2
				]);
				DOF3.push([
					item.timestamp,
					item.DOF3
				]);
			});

			var myChart = Highcharts.chart(hash, {
				chart: {
	                zoomType: 'x'
	            },
	            title: {
	                text: title
	            },
	            subtitle: {
	                text: document.ontouchstart === undefined ?
	                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
	            },
	            xAxis: {
	                type: 'datetime'
	            },
	            yAxis: {
	                title: {
	                    text: 'Sensor Value'
	                }
	            },
	            legend: {
	                enabled: false
	            },
	            plotOptions: {
	                area: {
	                    fillColor: {
	                        linearGradient: {
	                            x1: 0,
	                            y1: 0,
	                            x2: 0,
	                            y2: 1
	                        },
	                        stops: [
	                            [0, Highcharts.getOptions().colors[0]],
	                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	                        ]
	                    },
	                    marker: {
	                        radius: 2
	                    },
	                    lineWidth: 1,
	                    states: {
	                        hover: {
	                            lineWidth: 1
	                        }
	                    },
	                    threshold: null
	                }
	            },

	            series: [{
	                type: 'spline',
	                name: 'Sensor values DOF1',
	                data: DOF1
	            }, {
	                type: 'spline',
	                name: 'Sensor values DOF2',
	                data: DOF2
	            }, {
	                type: 'spline',
	                name: 'Sensor values DOF3',
	                data: DOF3
	            }]
			});      
		}
      return {
			getConfiguration: getConfiguration
      }
    });
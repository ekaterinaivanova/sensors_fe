
angular.module('sensor.directive', [])
    .directive('align', function($timeout){
        function link(scope, el, attr){
            function getTitles() {  
                var titles = el[0].querySelectorAll('.property .property-title');
                var maxWidth = 0;
                (titles || []).forEach(function(title) {
                    maxWidth = Math.max(maxWidth, title.offsetWidth);
                });
                (titles || []).forEach(function(title) {
                    title.setAttribute('style', 'width: ' + maxWidth + 'px;')
                });
            }
            $timeout(getTitles);
        }
        return{
            restrict:'A',
            link:link
        };
    });

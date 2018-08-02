
angular.module('d2Directive', [])
    .directive('lineChart', function(){
        function link(scope, el, attr){
            // if (!ngModel) return;
            //
            // var modelGetter = $parse(attributes['ngModel']);

            //d3.select(el[0]).append('svg');
            var el = el[0];
            
            var data = scope.data;
            // console.log(data);


            // var secondsFormat = d3.time.format("%S.%L");

            var graphTitle = "";



            var maxValue = function(){

                var maxV = d3.max(data, function(d){
                    var dataMap  = d3.map(d);
                    if(dataMap.has("acc_x")){
                        graphTitle = "Acceleration";
                        return d3.max([d.acc_x, d.acc_y, d.acc_z]);

                    }else if(dataMap.has("mag_x")){
                        graphTitle = "Magnetic field";
                        return d3.max([d.mag_x, d.mag_y, d.mag_z]);
                    }else if(dataMap.has("gyro_x")){
                        graphTitle = "Rotation";
                        return d3.max([d.gyro_x, d.gyro_y, d.gyro_z]);
                    }else if(dataMap.has("grav_x")){
                        graphTitle = "Gravity";
                        return d3.max([d.grav_x, d['grav_y'], d.grav_z]);
                    }
                    else if(dataMap.has("acc_raw_x")){
                        graphTitle = "Raw acceleration";
                        return d3.max([d.acc_raw_x, d['acc_raw_y'], d.acc_raw_z]);
                    }
                });
                //console.log("Max value is for index "+ sensorIndex +  " is " + maxV);
                return maxV;
            };
            var minValue = function() {
                var minV = d3.min(data, function(d){
                    var dataMap  = d3.map(d);
                    if(dataMap.has("acc_x")){
                        return d3.min([d.acc_x, d.acc_y, d.acc_z]);

                    }else if(dataMap.has("acc_raw_x")){
                        return d3.min([d.acc_raw_x, d.acc_raw_y, d.acc_raw_z]);

                    }else if(dataMap.has("mag_x")){
                        return d3.min([d.mag_x, d.mag_y, d.mag_z]);
                    }else if(dataMap.has("gyro_x")){
                        return d3.min([d.gyro_x, d.gyro_y, d.gyro_z]);
                    }else if(dataMap.has("grav_x")){
                        return d3.min([d.grav_x, d['grav_y'], d.grav_z]);
                    }
                });
                return minV;
            };
            var h = el.clientHeight,
                w = el.clientWidth;


            var margin = {top: 50, right: 10, bottom: 120, left: 80},
                margin2 = {top: 430, right: 10, bottom: 20, left: 80},
                width = w - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom,
                height2 = 500 - margin2.top - margin2.bottom;

            // var parseDate = d3.time.format("%b %Y").parse;

            var x = d3.scale.linear().range([0, width]),

                x2 = d3.scale.linear().range([0, width]),
                y = d3.scale.linear().range([height, 0]),
                y2 = d3.scale.linear().range([height2, 0]);

            var xAxis = d3.svg.axis().scale(x).orient("bottom")
                // .tickFormat(function(i){
                //     return  secondsFormat(i)
                // })
                .tickSize(-height, 0)
                .tickPadding(3),

                xAxis2 = d3.svg.axis().scale(x2).orient("bottom")
                    .ticks(data.length/100)
            //     .tickFormat(function(i){
            //     return  secondsFormat(i)
            // })
                ,
                yAxis = d3.svg.axis().scale(y).orient("left");


            var brush = d3.svg.brush()
                .x(x2)
                .on("brush", brushed);

            var getDotData = function(d){
                return  "Time: " + (Math.round(d.time * 1000 - data[0].time  * 1000)) + "<br/>" +
                    "<div style='background-color:rgba(255, 0, 0, 0.29)'   > X-axis: " + lX(d) +"</div>" +
                    "<div style='background-color:rgba(46, 138, 25, 0.29)'   >Y-axis: " + lY(d) +"</div>" +
                    "<div style='background-color:rgba(70, 130, 180, 0.29)'   >Z-axis: " + lZ(d) +"</div>" ;

            };
        //
        // <svg width="50" height="50">
        //         2  <circle cx="25" cy="25" r="25" fill="purple" />
        //         3</svg>

            var svg = d3.select(el).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            svg.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            var focus = svg.append("g")
                .attr("class", "focus")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                // .attr('pointer-events', 'all')
                // .append("rect")
                // .attr("width", width + margin.left + margin.right)
                // .attr("height", height + margin.top + margin.bottom)
                // .attr("opacity", 0)
                ;


            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            var context = svg.append("g")
                .attr("class", "context")
                .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");




            var zoominrectsign =
                context.append("g")
                    .attr("class", "sign")
                    .attr("transform", "translate(  "  + (- margin2.left)+ ", " + 0 + ")");

            zoominrectsign.append("rect")
                .attr("width", margin2.left)
                .attr("height", height2  )

            ;

            zoominrectsign
                .append("text")
                .attr("class","zoomintext")
                .attr("x", (margin2.left / 2))
                .attr("y", (height2 /2  + 4))
                .attr("text-anchor", "middle")
                .text("Zoom in")
            ;


            var lY = function(d){
                var dataMap  = d3.map(d);
                if(dataMap.has("acc_y")){
                    return d.acc_y;
                }else if(dataMap.has("mag_y")){
                    return (d.mag_y);
                }else if(dataMap.has("gyro_y")){
                    return (d.gyro_y);
                }else if(dataMap.has("grav_y")){
                    return  (d.grav_y);
                }else if(dataMap.has("acc_raw_x")){
                    return (d.acc_raw_y);
                }
            };

            var lX = function(d){
                var dataMap  = d3.map(d);

                if(dataMap.has("acc_x")){

                    return (d.acc_x);
                }else if(dataMap.has("acc_raw_x")){
                    return (d.acc_raw_x);
                }else if(dataMap.has("mag_x")){
                    return (d.mag_x);
                }else if(dataMap.has("gyro_x")){
                    return (d.gyro_x);
                }else if(dataMap.has("grav_x")){
                    return  (d.grav_x);
                }
            };

            var lZ = function(d){
                var dataMap  = d3.map(d);
                if(dataMap.has("acc_x")){
                    return (d.acc_z);
                }else if(dataMap.has("mag_x")){
                    return (d.mag_z);
                }else if(dataMap.has("gyro_x")){
                    return (d.gyro_z);
                }else if(dataMap.has("grav_x")){
                    return  (d.grav_z);
                }else if(dataMap.has("acc_raw_x")){
                    return (d.acc_raw_z);
                }

            };

            var graphTime = function(sample){
                return (Math.round(sample.time * 1000 - data[0].time  * 1000))
            };
            var lineX = d3.svg.line()
                .x(function(d,i) {
                    d.graphTime = graphTime(d);
                    return x(graphTime(d));
                })
                .y(function(d) {
                    return y(lX(d));
                })
                .interpolate("basis");

            var lineX2 = d3.svg.line()
                .x(function(d,i) {
                    return x2(graphTime(d));
                })
                .y(function(d) {
                    return y2(lX(d));
                })
                .interpolate("basis");

            var lineY = d3.svg.line()
                .x(function(d,i) {
                    return x(graphTime(d));})
                .y(function(d) {
                    return y(lY(d))
                })
                .interpolate("basis");

            var lineY2 = d3.svg.line()
                .x(function(d,i) {
                    return x(Math.round(d.time * 1000 - data[0].time  * 1000));})
                .y(function(d) {
                   return y2(lY(d))
                })
                .interpolate("basis");

            var lineZ = d3.svg.line()
                .x(function(d,i) {
                    return x(Math.round(d.time * 1000 - data[0].time  * 1000));
                })
                .y(function(d) {
                    return y(lZ(d));
                })
                .interpolate("basis")
            ;

            var lineZ2 = d3.svg.line()
                .x(function(d,i) {
                    return x(Math.round(d.time * 1000 - data[0].time  * 1000));
                })
                .y(function(d) {
                    return y2(lZ(d));
                })
                .interpolate("basis");



            var mask = new SVGMask(context)
                .x(x2)
                .y(y2)
                .style("fill","gray")
                .style("fill-opacity", "0.2");

            // var dotsY = focus.selectAll("dotsY").data(data);
            // var dotsX = focus.selectAll("dotsX").data(data);
            // var dotsZ = focus.selectAll("dotsZ").data(data);

            //NEW VERTICAL

            var hoverLineGroup = focus
                .append("g")
                .attr("class", "hover-line");

            var hoverLine = hoverLineGroup
                .append("line")
                .attr("x1", 0).attr("x2", 0)
                .attr("y1", 0).attr("y2", height);

            // hoverLineGroup.style("opacity", 1e-6);

            var bisect =  d3.bisector(function(d, sample){
                return d.graphTime - sample;
            }).right;

            var area = d3.svg.area()
                .x(function(d) {
                    return x(graphTime(d)) })
                .y0(0)
                .y1(height);

            function update(){


                x.domain(
                    d3.extent(data, function(d) {return Math.round(d.time * 1000 - data[0].time  * 1000); }));

                y.domain([minValue(), maxValue()]);
                x2.domain(x.domain());
                y2.domain(y.domain());



                focus.append("g")
                    .attr("class", "x axis")
                    .attr('transform', 'translate(0,' + (height ) + ')')
                    .call(xAxis)
                    .selectAll("text");


                focus.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);


                focus.on("mouseover", function() {
                    // console.log('mouseover')
                }).on("mousemove", function() {
                    // console.log('mousemove', d3.mouse(this));
                    var mouse_x = d3.mouse(this)[0];

                    var graph_x = x.invert(mouse_x);
                    var sampleIndex = bisect(data, graph_x);

                    div.transition()
                        .duration(10)
                        .style("opacity", .9);
                    div	.html(getDotData(data[sampleIndex]))
                        .style("left", (d3.event.pageX) + 15 + "px")
                        .style("top", (d3.event.pageY - 40) + "px");

                    hoverLine.attr("x1", mouse_x).attr("x2", mouse_x);
                    hoverLineGroup.style("opacity", 1);

                })  .on("mouseout", function() {
                    // console.log('mouseout');
                    hoverLineGroup.style("opacity", 0);

                    div.transition()
                        .duration(50)
                        .style("opacity", 0);
                });

                focus.append("path")
                    .attr("class", "lineX").attr("d", lineX(data));
                focus.append("path")
                    .attr("class", "lineY") .attr("d", lineY(data));
                focus.append("path")
                    .attr("class", "lineZ").attr("d", lineZ(data));


                context.append("path")
                    .attr("class", "lineX")
                    .attr("d", lineX2(data));
                context.append("path")
                    .attr("class", "lineY")
                    .attr("d", lineY2(data));
                context.append("path")
                    .attr("class", "lineZ")
                    .attr("d", lineZ2(data));


                context.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(" + 0 + ", " + height2 + ")")
                    // .attr("stroke-width", "1px")
                    .call(xAxis2)
                    .attr("class", "x axis text")



                context.append("g")
                    .attr("class", "x brush")
                    .call(brush)
                    .selectAll("rect")
                    .attr("y", -5)
                    .attr("height", height2 + 5);


                svg.append("text")
                    .attr("class", "graphTitle")
                    .attr("x", (width / 2))
                    .attr("y", (margin.top / 2 ))
                    .attr("text-anchor", "middle")
                    //.style("font-size", "16px")
                    //.style("text-decoration", "underline")
                    .text(graphTitle);



                brushed()

            }

            function brushed() {
                x.domain(brush.empty() ? x2.domain() : brush.extent());
                mask.reveal(brush.extent());


                if(scope.model[0] == brush.extent()[0] && scope.model[1] == brush.extent()[1]){
                    console.log("Nothing has changed")
                }else{
                    // console.log(scope.model + " " + graphTitle)

                    scope.model = brush.extent();
                    scope.$apply()
                }

                focus.select(".lineX").attr("d", lineX(data));
                focus.select(".x.axis").call(xAxis)
                    .selectAll("text")
                    .attr("class", "x axis text")
                    .style("text-anchor", "middle");

                focus.select(".lineY").attr("d", lineY(data));
                focus.select(".lineZ").attr("d", lineZ(data));

                focus.append('path')
                    .datum(data)
                    .attr('class', 'area')
                    .attr('d', area)
                    .attr("fill-opacity", "0");


            }


            scope.$watch('data', update() );

            // scope.$watch('model', brushed());

            scope.$watch('model', function(value){
                if(value){
                    brush.extent(value);
                    svg.select(".brush").call(brush);
                    // console.log(brush)
                    brush.event(d3.select(".brush"));
                }
            });

        }
        return{
            restrict:'EA',

            scope: {
                data: '=',
                model: "=ngModel"

            },
            replace: true,
            link:link
        };
    });


/**
 * zPath 0.0.1
 * https://github.com/
 * MIT licensed
 *
 * A project by Seviciu Cosmin / ZetCoby
 */

(function ( $ ) {
    'use strict';

    $.fn.zPath = function( options ) {

        var job = 'none';
        if(options == 'start'){
            job = options;
        }
        options = {};

        // SVG elemetns

        var g = "g";
        var path = "path";
        var rect = "rect";
        var circle = "circle";
        var line = "line";
        var polygon = "polygon";

        var z = $.fn.zPath;
        var selector = $(this.selector);

        var settings = $.extend({

            clear:true,
            speed:3000,
            draw:'all'

        },options);

        z.init = function () {           
            z.clearSVG(selector);
            // console.log(selector);
        }

        z.clearSVG = function(el){
            el.children().each(function(){
                // console.log($(this));
                if($(this).is(g)){
                    z.clearSVG($(this));
                }else if($(this).is(path)){
                    clear.path($(this));
                }else if($(this).is(rect)){
                    clear.rect($(this));
                }else if($(this).is(circle)){
                    clear.circle($(this));
                }else if($(this).is(line)){
//                    clear.path($(this));
                    clear.line($(this));
                }else if($(this).is(polygon)){
                    clear.polygon($(this));
                }
            });

        }

        var clear = {
            path:function(el){
                var pathLength = tools.getPathLength(el);
                tools.dashClear(el,pathLength);
                tools.clearFill(el);
            },
            rect:function(el){
                tools.dashClear(el,tools.getRectLength(el));
            },
            circle:function(el){
                tools.dashClear(el,tools.getCircleLength(el));
            },
            line:function(el){
                tools.dashClear(el,tools.getLineLength(el));
            },
            polygon:function(el){
                tools.dashClear(el,tools.getPolygonLength(el));
            }
        }
        
        var tools = {
            
            
            /**
             *
             * Used to get the length of a rect
             *
             * @param el is the rect element ex $('.rect')
             * @return the length of the rect in px
             */
            getRectLength:function(el){
                var w = el.attr('width');
                var h = el.attr('height');
                
                return (w*2)+(h*2);
            },
            
            /**
             *
             * Used to get the length of a Polygon
             *
             * @param el is the Polygon element ex $('.polygon')
             * @return the length of the Polygon in px
             */
            getPolygonLength:function(el){
                var points = el.attr('points');
                points = points.split(" ");
                var x1 = null, x2, y1 = null, y2 , lineLength = 0, x3, y3;
                for(var i = 0; i < points.length; i++){
                    var coords = points[i].split(",");
                    if(x1 == null && y1 == null){
                        
                        if(/(\r\n|\n|\r)/gm.test(coords[0])){
                            coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm,"");
                            coords[0] = coords[0].replace(/\s+/g,"");
                        }
                        
                        if(/(\r\n|\n|\r)/gm.test(coords[1])){
                            coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm,"");
                            coords[0] = coords[1].replace(/\s+/g,"");
                        }
                        
                        x1 = coords[0];
                        y1 = coords[1];
                        x3 = coords[0];
                        y3 = coords[1];
                        
                    }else{
                        
                        if(coords[0] != "" && coords[1] != ""){             
                        
                            if(/(\r\n|\n|\r)/gm.test(coords[0])){
                                coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm,"");
                                coords[0] = coords[0].replace(/\s+/g,"");
                            }

                            if(/(\r\n|\n|\r)/gm.test(coords[1])){
                                coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm,"");
                                coords[0] = coords[1].replace(/\s+/g,"");
                            }

                            x2 = coords[0];
                            y2 = coords[1];
                           
                            lineLength += Math.sqrt(Math.pow((x2-x1), 2)+Math.pow((y2-y1),2));
                            
                            x1 = x2;
                            y1 = y2;
                            if(i == points.length-2){
                                lineLength += Math.sqrt(Math.pow((x3-x1), 2)+Math.pow((y3-y1),2));
                            }
                            
                        }
                    }
                    
                }
                return lineLength;
                
            },
            
            /**
             *
             * Used to get the length of a line
             *
             * @param el is the line element ex $('.line')
             * @return the length of the line in px
             */
            getLineLength:function(el){
                var x1 = el.attr('x1');
                var x2 = el.attr('x2');
                var y1 = el.attr('y1');
                var y2 = el.attr('y2');
                var lineLength = Math.sqrt(Math.pow((x2-x1), 2)+Math.pow((y2-y1),2));
                return lineLength;
                
            },
            
            /**
             *
             * Used to get the length of a circle
             *
             * @param el is the circle element
             * @return the length of the circle in px
             */
            getCircleLength:function(el){
                var r = el.attr('r');
                var circleLength = 2 * Math.PI * r; 
                return circleLength;
            },
            
            ///// fix this to remember the fill color
            
            clearFill:function(el){
                el.css({
                    "fill" : "none"
                });
            },
            
            /**
             *
             * Used to clear the path
             *
             * @param el is the path element
             * @param v is the value of the dash
             */
            dashClear:function(el, v){
                el.css({
                    "stroke-dasharray" : v+"px",
                    "stroke-dashoffset": v+"px"
                });
            },
            
            /**
             *
             * Used to get the length of the path
             *
             * @param el is the path element
             * @return the length of the path in px
             */
            getPathLength:function(el){
                var pathCoords = el.get(0);
                var pathLength = pathCoords.getTotalLength();
                return pathLength;
            }
        }

        return z.init();

    }

 
}( jQuery ));
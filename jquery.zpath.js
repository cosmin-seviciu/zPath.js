
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

                }else if($(this).is(circle)){

                }else if($(this).is(line)){

                }else if($(this).is(polygon)){

                }
            });

        }

        var clear = {
            path:function(el){
                var pathCoords = el.get(0);
                var pathLength = p.getTotalLength();
                console.log(pathLength);
            },
            rect:function(){},
            circle:function(){},
            polygon:function(){}
        }

        return z.init();

    }

 
}( jQuery ));
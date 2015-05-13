
/**
 * zAnimator 0.0.1
 * https://github.com/
 * MIT licensed
 *
 * A project by Seviciu Cosmin / ZetCoby
 */

(function ( $ ) {
    'use strict';

    $.fn.zPath = function( options ) {

        var ZP = $.fn.zPath;
        var selector = $(this.selector);

        var before = "before";
        var after = "after";

        // SVG elemetns

        var g = "g";
        var path = "path";
        var rect = "rect";
        var circle = "circle";
        var lineargradient = "linearGradient";

        // all the elements of the svg, used in a recursive parser just 
        // in case some of them are in groups
        var elements = selector.children();

        // used to have a before and after of all the css
        var historyObj =[];
        
        var pathAttr = ['fill'];

        var settings = $.extend({

            clear:true

        },options);

        ZA.init = function () {
            if(settings.clear){
                ZA.clearSVG(elements);
            }            

        }

        ///////////////////////////////////////////////////////
        //this function will make the SVG 'invisible'
        //it is needed in order to be possible to draw it again
        ///////////////////////////////////////////////////////

        ZA.clearSVG = function(el){
            el.each(function(){
                if($(this).is(g)){
                    ZA.clearSVG($(this).children());
                }else{
                    if($(this).is(path)){
                        clearPath($(this));
                    }
                }
            })
            // console.log(historyObj);
        }



        function clearPath(el){
            var p = el.get(0);
            var pl = p.getTotalLength();
            var cls = randomClass();
            var attributes = [];
            
            var dash1 = {
                "name" : "stroke-dasharray",
                "type": "style",
                "val": "0px"
            };
            
            var dash2 = {
                "name" : "stroke-dashoffset",
                "type": "style",
                "val": "0px"
            };
            
            // makes the path disappear 
            el.css({
                "stroke-dasharray" : pl+"px",
                "stroke-dashoffset": pl+"px"
            });
            
            el.attr('class',cls);
            
            
            
            for(var i = 0 ; i < pathAttr.length ; i++){
                var a = checkFor(el,pathAttr[i]);
                attributes.push(a);
            }
            attributes.push(dash1);
            attributes.push(dash2);
            
            historyObj[cls] = {before:attributes};
            
            for(var i = 0 ; i< attributes.length ; i++){
                var val = attributes[i].val;
                var type = attributes[i].type;
                var name = attributes[i].name;
                if (typeof val !== typeof undefined && val !== false && val != 'none') {
                    if($.inArray(name,pathAttr) != -1){
                        attributes[i].val = 'none';
                        val = 'none';
                        if(type == 'style'){
                            el.css(name,val);
                        }else if(type == 'attr'){
                            el.attr(name,val);
                        }
                    }
                }
            }
        }

        ///////////////////////////////////////////////////////////////////////
        // checks for styles or attributes
        // el = jq selector
        // s  = string 
        // returns ex: obj{name:'fill',type:'attr',val:'#fff'}  type can be attr or style
        ///////////////////////////////////////////////////////////////////////
        
        function checkFor(el,s){
            var attr = el.attr(s);
            var style = el.css(s);
            var obj = {
                name:s,
                type:null,
                val:null
            }
            if (typeof attr !== typeof undefined && attr !== false) {
                obj.type = 'attr';
                obj.val = attr;
            }else if(typeof style !== typeof undefined && style !== false){
                obj.type = 'style';
                obj.val = style;
            }
            
            return obj;
        }
        
        /////////////////////////////////////////////
        // generates a random name for the classes
        /////////////////////////////////////////////

        function randomClass(){
            return '_z' + Math.random().toString(36).substr(2, 9);
        }

        /////////////////////////////////////////////
        // checks if a string contains another string
        /////////////////////////////////////////////

        function contains(str,s){
            if (typeof str !== typeof undefined && str !== false) {
                if(str.indexOf(s) > -1){
                    return true;
                }else{
                    return false
                }
            }            
        }
        
        // color: rgb color
        // alpha: the alpha value, ex 0.4

        function rgbToRgba(color, alpha){
            if(color.indexOf('a') == -1){
                var result = color.replace(')', ', '+alpha+')').replace('rgb', 'rgba');
                return result
            }
        }

        // this function is from:
        // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

        function hexToRgb(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        return ZA.init();

    }

 
}( jQuery ));
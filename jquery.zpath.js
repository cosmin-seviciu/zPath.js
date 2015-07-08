/**
 * zPath 0.0.1
 * https://github.com/
 * MIT licensed
 *
 * A project by Seviciu Cosmin / ZetCoby
 */

(function($) {


  var g = "g";
  var path = "path";
  var rect = "rect";
  var circle = "circle";
  var line = "line";
  var polygon = "polygon";

  

  // var selector = $(this.selector);

    $.fn.zPath = function(options) {

        var opts = $.extend({}, defaults, options);
        // iterate and reformat each matched element
        return this.each(function() {
            $this = $(this);

            if(opts.action == 'clear'){
                clearSVG($this);
            }

            if(opts.action == 'start'){
                if(opts.draw == 'all'){
                    drawSVG($this,opts.speed);
                } 
            }


//            console.log(opts);
        });
    };

  var drawSVG = function(el,speed){
      el.children().each(function(){
          if($(this).is(g)){
              drawSVG($(this),speed);
          }else if($(this).is(path)){
              draw.path($(this),speed);
          }else if($(this).is(rect)){
              draw.rect($(this),speed);
          }else if($(this).is(circle)){
              draw.circle($(this),speed);
          }else if($(this).is(line)){
              draw.line($(this),speed);
          }else if($(this).is(polygon)){
              draw.polygon($(this),speed);
          }
      });
  }

  var clearSVG = function(el){
      el.children().each(function(){
          if($(this).is(g)){
              clearSVG($(this));
          }else if($(this).is(path)){
              clear.path($(this));
          }else if($(this).is(rect)){
              clear.rect($(this));
          }else if($(this).is(circle)){
              clear.circle($(this));
          }else if($(this).is(line)){
              clear.line($(this));
          }else if($(this).is(polygon)){
              clear.polygon($(this));
              // console.log($(this));

          }
      });

  }

    var draw = {
      path:function(el,speed){
        tools.dashDraw(el,speed);
        // tools.drawFill(el,speed);

      },
      rect:function(el,speed){
        tools.dashDraw(el,speed);
        // tools.drawFill(el,speed);

      },
      circle:function(el,speed){
        tools.dashDraw(el,speed);
        // tools.drawFill(el,speed);

      },
      line:function(el,speed){
        tools.dashDraw(el,speed);
        // tools.drawFill(el,speed);

      },
      polygon:function(el,speed){
        tools.dashDraw(el,speed);
        // tools.drawFill(el,speed);

      }
    };

    var clear = {
      path:function(el){
          var pathLength = tools.getPathLength(el);
          tools.dashClear(el,pathLength);
          tools.clearFill(el);
      },
      rect:function(el){
          tools.dashClear(el,tools.getRectLength(el));
          tools.clearFill(el);
      },
      circle:function(el){
          tools.dashClear(el,tools.getCircleLength(el));
          tools.clearFill(el);
      },
      line:function(el){
          tools.dashClear(el,tools.getLineLength(el));
          tools.clearFill(el);
      },
      polygon:function(el){
        // console.log(el);
          tools.dashClear(el,tools.getPolygonLength(el));
          tools.clearFill(el);
      }
    };
  
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
                  
                  if(coords[0] != "" && coords[1] != "" && isNaN(coords)){             
                  
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
          console.log(tools.randomClass());
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
              // "fill" : "none"
              "fill-opacity":"0"
          });
      },

      drawFill:function(el,speed){
          el.animate({
                    "fill-opacity":1
                  },
                  {
                    duration : speed
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
       * Used to clear the path
       *
       * @param el is the path element
       */
      dashDraw:function(el,speed){
          el.animate({
                    // "stroke-dasharray":0,
                    "stroke-dashoffset":0
                  },
                  {
                    queue : false,
                    duration : speed
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
      },
        
      /**
       *
       * Used to generate random class names
       *
       * @return a random class string
       */ 
      randomClass:function(){
        return 'z-' + Math.random().toString(36).substr(2, 6);
      }
        
    }

  //
  // plugin defaults
  //
    var defaults = {
      action:'clear',
      speed:3000,
      draw:'all'
    };

})(jQuery);

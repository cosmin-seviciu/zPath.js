/**
 * zPath 0.1.3
 * https://github.com/Zet-Tools/zPath.js
 * 
 *********************************************
 *********************************************
 *** A project by Seviciu Cosmin / ZetCoby ***
 *********************************************
 *********************************************
 **************** MIT licensed ***************
 *********************************************
 *********************************************
 *
 * A simple svg drawing plugin
 */

(function($) {
  var id = 1;
  var g = "g";
  var path = "path";
  var rect = "rect";
  var circle = "circle";
  var line = "line";
  var polygon = "polygon";
  var elements = [];
  var defaults = {
    action: 'start',
    speed: 3000,
    draw: 'all',
    delay: 20,
    id: 1,
    shuffle: false
  };

  // var selector = $(this.selector);

  $.fn.zPath = function(options) {
    var that = this; + (function() {
      var opts = $.extend({}, defaults, options);

      return $(that).each(function() {

        var $this = $(this);
        opts.id = id;
        if (opts.action == 'start') {
          clearSVG($this, opts);
          drawSVG($this, opts);
          id++;
        }
      });
    }());
  };

  var drawSVG = function(el, opts) {
    var speed = opts.speed;
    var mode = opts.draw;
    var id = opts.id;
    var delay = opts.delay;
    var delayIncrement = opts.delay;
    if (opts.shuffle == true)
      tools.arrayShuffle(elements);
    if (mode == 'all') {
      console.log(el.attr('class'));
      el.children().each(function() {

        if ($(this).is(g)) {
          drawSVG($(this), opts);
        } else if ($(this).is(path)) {
          draw.path($(this), speed);
        } else if ($(this).is(rect)) {
          draw.rect($(this), speed);
        } else if ($(this).is(circle)) {
          draw.circle($(this), speed);
        } else if ($(this).is(line)) {
          draw.line($(this), speed);
        } else if ($(this).is(polygon)) {
          draw.polygon($(this), speed);
        }
      });
    } else if (mode == "delayed" || mode == '1by1') {
      if (mode == '1by1') {
        delayIncrement = speed;
      }
      for (i = 0; i <= elements.length - 1; i++) {
        if (tools.idCompare(elements[i], id)) {
          setTimeout(
            (function(element) {
              return function() {
                if ($('.' + element).is(path)) {
                  draw.path($('.' + element), speed);
                } else if ($('.' + element).is(rect)) {
                  draw.rect($('.' + element), speed);
                } else if ($('.' + element).is(circle)) {
                  draw.circle($('.' + element), speed);
                } else if ($('.' + element).is(line)) {
                  draw.line($('.' + element), speed);
                } else if ($('.' + element).is(polygon)) {
                  draw.polygon($('.' + element), speed);
                }
              }
            })(elements[i]), delay);

          delay += delayIncrement;
        }

      }

    } else if (mode == 'terminus' || mode == 'terminusDelayed') {
      console.log(mode);
      for (var i = 0, j = elements.length - 1; i <= elements.length / 2 && j >= elements.length / 2; i++, j--) {
        setTimeout(
          (function(element1, element2) {
            return function() {
              if ($('.' + element1).is(path)) {
                draw.path($('.' + element1), speed);
              } else if ($('.' + element1).is(rect)) {
                draw.rect($('.' + element1), speed);
              } else if ($('.' + element1).is(circle)) {
                draw.circle($('.' + element1), speed);
              } else if ($('.' + element1).is(line)) {
                draw.line($('.' + element1), speed);
              } else if ($('.' + element1).is(polygon)) {
                draw.polygon($('.' + element1), speed);
              }

              if ($('.' + element2).is(path)) {
                draw.path($('.' + element2), speed);
              } else if ($('.' + element2).is(rect)) {
                draw.rect($('.' + element2), speed);
              } else if ($('.' + element2).is(circle)) {
                draw.circle($('.' + element2), speed);
              } else if ($('.' + element2).is(line)) {
                draw.line($('.' + element2), speed);
              } else if ($('.' + element2).is(polygon)) {
                draw.polygon($('.' + element2), speed);
              }
            }
          })(elements[i], elements[j]), delay);

        if (mode != 'terminusDelayed') {
          delay += speed;
        } else {
          delay += delayIncrement;
        }
      }

    } else {
      var modeArray = [];
      var elementsArray = [];
      var n1;
      var n2;
      if (mode.indexOf("by") >= 0) {
        modeArray = mode.split('by');
        n1 = Number(modeArray[0]);
        n2 = modeArray[1];
        for (i = 0; i <= elements.length - 1; i += n1) {
          if (tools.idCompare(elements[i], id)) {
            for (var j = 0; j < n1; j++) {
              elementsArray.push(elements[i + j])
            }

            setTimeout(
              (function(element) {
                return function() {
                  for (var j = 0; j < n1; j++) {
                    if ($('.' + element[j]).is(path)) {
                      draw.path($('.' + element[j]), speed);
                    } else if ($('.' + element[j]).is(rect)) {
                      draw.rect($('.' + element[j]), speed);
                    } else if ($('.' + element[j]).is(circle)) {
                      draw.circle($('.' + element[j]), speed);
                    } else if ($('.' + element[j]).is(line)) {
                      draw.line($('.' + element[j]), speed);
                    } else if ($('.' + element[j]).is(polygon)) {
                      draw.polygon($('.' + element[j]), speed);
                    }
                  }

                }
              })(elementsArray), delay);
            elementsArray = [];

            if (n2.indexOf("Delayed") >= 0) {
              delay += delayIncrement;
            } else {
              delay += speed;
            }
          }

        }
      }
    }

  }

  var clearSVG = function(el, opts) {
    el.children().each(function() {
      var cls = tools.randomClass();
      $(this).attr('class', cls + "_" + id);
      elements.push(cls + "_" + id);
      if ($(this).is(g)) {
        clearSVG($(this));
      } else if ($(this).is(path)) {
        clear.path($(this));
      } else if ($(this).is(rect)) {
        clear.rect($(this));
      } else if ($(this).is(circle)) {
        clear.circle($(this));
      } else if ($(this).is(line)) {
        clear.line($(this));
      } else if ($(this).is(polygon)) {
        clear.polygon($(this));
      }
    });

  }

  var draw = {
    path: function(el, speed) {
      tools.dashDraw(el, speed);
      tools.drawFill(el, speed);

    },
    rect: function(el, speed) {
      tools.dashDraw(el, speed);
      tools.drawFill(el, speed);

    },
    circle: function(el, speed) {
      tools.dashDraw(el, speed);
      tools.drawFill(el, speed);

    },
    line: function(el, speed) {
      tools.dashDraw(el, speed);
      tools.drawFill(el, speed);

    },
    polygon: function(el, speed) {
      tools.dashDraw(el, speed);
      tools.drawFill(el, speed);

    }
  };

  var clear = {
    path: function(el) {
      var pathLength = tools.getPathLength(el);
      tools.dashClear(el, pathLength);
      tools.clearFill(el);
    },
    rect: function(el) {
      tools.dashClear(el, tools.getRectLength(el));
      tools.clearFill(el);
    },
    circle: function(el) {
      tools.dashClear(el, tools.getCircleLength(el));
      tools.clearFill(el);
    },
    line: function(el) {
      tools.dashClear(el, tools.getLineLength(el));
      tools.clearFill(el);
    },
    polygon: function(el) {
      // console.log(el);
      tools.dashClear(el, tools.getPolygonLength(el));
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
    getRectLength: function(el) {
      var w = el.attr('width');
      var h = el.attr('height');

      return (w * 2) + (h * 2);
    },

    /**
     *
     * Used to get the length of a Polygon
     *
     * @param el is the Polygon element ex $('.polygon')
     * @return the length of the Polygon in px
     */
    getPolygonLength: function(el) {
      var points = el.attr('points');
      points = points.split(" ");
      var x1 = null,
        x2, y1 = null,
        y2, lineLength = 0,
        x3, y3;
      for (var i = 0; i < points.length; i++) {
        var coords = points[i].split(",");
        if (x1 == null && y1 == null) {

          if (/(\r\n|\n|\r)/gm.test(coords[0])) {
            coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm, "");
            coords[0] = coords[0].replace(/\s+/g, "");
          }

          if (/(\r\n|\n|\r)/gm.test(coords[1])) {
            coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm, "");
            coords[0] = coords[1].replace(/\s+/g, "");
          }

          x1 = coords[0];
          y1 = coords[1];
          x3 = coords[0];
          y3 = coords[1];

        } else {

          if (coords[0] != "" && coords[1] != "" && isNaN(coords)) {

            if (/(\r\n|\n|\r)/gm.test(coords[0])) {
              coords[0] = coords[0].replace(/(\r\n|\n|\r)/gm, "");
              coords[0] = coords[0].replace(/\s+/g, "");
            }

            if (/(\r\n|\n|\r)/gm.test(coords[1])) {
              coords[0] = coords[1].replace(/(\r\n|\n|\r)/gm, "");
              coords[0] = coords[1].replace(/\s+/g, "");
            }

            x2 = coords[0];
            y2 = coords[1];

            lineLength += Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

            x1 = x2;
            y1 = y2;
            if (i == points.length - 2) {
              lineLength += Math.sqrt(Math.pow((x3 - x1), 2) + Math.pow((y3 - y1), 2));
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
    getLineLength: function(el) {
      var x1 = el.attr('x1');
      var x2 = el.attr('x2');
      var y1 = el.attr('y1');
      var y2 = el.attr('y2');
      var lineLength = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
      return lineLength;

    },

    /**
     *
     * Used to get the length of a circle
     *
     * @param el is the circle element
     * @return the length of the circle in px
     */
    getCircleLength: function(el) {
      var r = el.attr('r');
      var circleLength = 2 * Math.PI * r;
      return circleLength;
    },

    ///// fix this to remember the fill color

    clearFill: function(el) {
      el.css({
        // "fill" : "none"
        "fill-opacity": "0"
      });
    },

    drawFill: function(el, speed) {
      el.animate({
        "fill-opacity": 1
      }, {
        duration: speed
      });
    },

    /**
     *
     * Used to clear the path
     *
     * @param el is the path element
     * @param v is the value of the dash
     */
    dashClear: function(el, v) {
      el.css({
        "stroke-dasharray": v + "px",
        "stroke-dashoffset": v + "px"
      });
    },

    /**
     *
     * Used to clear the path
     *
     * @param el is the path element
     */
    dashDraw: function(el, speed) {
      el.animate({
        // "stroke-dasharray":0,
        "stroke-dashoffset": 0
      }, {
        queue: false,
        duration: speed
      });
    },

    /**
     *
     * Used to get the length of the path
     *
     * @param el is the path element
     * @return the length of the path in px
     */
    getPathLength: function(el) {
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
    randomClass: function() {
      return 'z-' + Math.random().toString(36).substr(2, 6);
    },

    idCompare: function(cls, id) {
      var clsArray = [];
      clsArray = cls.split('_');
      if (Number(clsArray[1]) == id) {
        return true;
      }
      return false;
    },

    arrayShuffle: function(o) {
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    },

    randomColor: function() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

  }


})(jQuery);
# zPath.js

A simple and easy to use plugin to draw any simple svg that uses only paths ot any other elements but whitout fills.

## Usage
You will need to include:
 - [jQuery library](http://jquery.com/).
 
###Initialization
All you need to do is call the plugin inside a `$(document).ready` function:

```javascript
$(document).ready(function() {
	$('.demo').zPath();
});
```

A more complex initialization with all options set could look like this:
```javascript
$(document).ready(function() {
	$('.demo').zPath({
		draw:'delayed',
		delay:20,
		shuffle:true,
		speed:1000
	});
});
```

## Options

- `draw`: (default `delayed`) the drawing style to use, other styles are `all`,`terminus`,`terminusDelayed`,`1by1`,`2by2`,`3by3`, ... , `10by10`, `2by2Delayed`,`3by3Delayed`, ... ,`10by10Delayed`
  *`all` : will draw all the paths at once
  *`terminus` : draws 2 paths at once, one is from the begining and the other one strats reversed from the end
  *`terminusDelayed` : the same as `terminus` but it wont wait until the previous path has finished animating, instead it will start after the `delay` time has passed
  *`1by1`,`2by2` . . . `10by10` : lets say you will use `4by4` this will draw 4 paths at the same time
  *`2by2Delayed`,3by3Delayed` ... : this will draw the specific number of paths at the same time, but again it wont wait fot the other paths to finish, instead it will start after the `delay` has passed
		
- `speed`: (default `1000`) the time that it will take for each path to draw

- `delay`: (default `20`) the delay between paths

- `shuffle`: (default `false`) if this is `true` it will shuffle the paths draw, looks good on `terminusDelayed` or `nbynDelayed`


## License

(The MIT License)

Copyright (c) 2015 Seviciu Cosmin / ZetCoby &lt;zetcoby@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
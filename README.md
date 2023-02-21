# JS-RECTSLIB
This pure vanilla js class help for the logical constructions of the rectangles.
The groups of rectangles can be conbined using logical ooerations such as union, subtract and intersect. It will generate the border edges of non-overlapped rectangles.
[PHP Version](https://github.com/winaungcho/PHP-RECTSLIB)

## Algorythm
Algorythm is very simple.
- A region on which contains all the rectangles is divided into several rectangles according to the corners of the rectangles.
- Remove the rectangles above which does not lie inside all rectangles. This step gives the non-overlapped union of the rectangles.
- Then choose or remove the rectangles which lies inside the subject rectangles according to boolean operation intersect or subtract.

## Example Demo

[View](https://htmlpreview.github.io/?https://github.com/winaungcho/JS-RECTSLIB/blob/main/src/example.html)
````Js
const c = document.getElementById("myCanvas");
	const ctx = c.getContext("2d");
	
	function detectChange(selectOP) {
		run(selectOP.value);
	}
	
	var rectslib = new RectsLib();
	var A = rectslib.p1p2(10, 10, 400, 480, "A", "Green");
	var B = rectslib.p1p2(120, 130, 350, 650, "B", "blue");
	var C = rectslib.p1p2(140, 240, 480, 360, "C", "Red");
	var D = rectslib.p1p2(340, 560, 580, 750, "D", "Yellow");
	var E = rectslib.p1p2(240, 370, 380, 450, "E", "Grey");
	var rects = [A, B, C, D, E];

	function run(operation) {
		var universal = [];
		var edges = [];
		rects = [A, B, C, D, E];
		ctx.clearRect(0, 0, c.width, c.height);
		var opstr = "Origional Rectangles";
		rectslib.fillRects(ctx, rects);
		rectslib.showRects('out', rects);
		if(operation & 1) {
			universal = rectslib.merge([A, B, C, D, E]);
			
			edges = rectslib.genEdges(universal);
			opstr = "Union of A, B, C, D, E";
		}
		if(operation & 2) {
			universal = rectslib.merge([A, B, C, D, E]);
			
			var Sub = rectslib.subtract(universal, [B, E]);
			edges = rectslib.genEdges(Sub);
			opstr = "Subtract [B, E] from All";
		}
		if(operation & 4) {
			universal = rectslib.merge([A, B, C, D, E]);
		
			var Int = rectslib.intersect(universal, [B, E]);
			edges = rectslib.genEdges(Int);
			opstr = "Intersect [B, E] with All";
		}
		if(operation != 0) {
			rectslib.fillRects(ctx, universal);
			rectslib.drawRects(ctx, universal, "lightgreen");
			rectslib.drawEdges(ctx, edges, "violet");
		}
		document.getElementById('op').innerHTML = "<h2>" + opstr + "</h2>";
	}
	run(0);
````

## Check with Images
### Original Rectangkes
![JS-RECTSLIB](images/origin.jpg)

### Meshing and get union of rectangles
![JS-RECTSLIB](images/union.jpg)

### Intersection of all with 2 rectangles
![JS-RECTSLIB](images/intersect.jpg)

### Subtract of 2 from all
![JS-RECTSLIB](images/subtract.jpg)

## Contact
Contact me for comercial use via mail winaungcho@gmail.com.


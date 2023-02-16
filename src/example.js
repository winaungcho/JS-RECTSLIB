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

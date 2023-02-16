/******
 * RECTSLIB CLASS
 *
 * [RECTSLIB] is a utility for the group of rectangles.
 * Lib help you to construct the rectangles in various logical operations such as Union, Intersect abd Subtract.
 * This lib is free for the educational use as long as maintain this header together with this lib.
 * Author: Win Aung Cho
 * Contact winaungcho@gmail.com
 * version 1.0
 * Date: 16-02-2023
 *
 ******/
    function max(a, b) {
		return a > b ? a : b;
	}

	function min(a, b) {
		return a < b ? a : b;
	}

	function compareNum(a, b) {
		return a - b;
	}
class RectsLib {
    constructor(){
        this.X0 = 10;
		this.Y0 = 10;
		this.arr = [];
    }

	point(x, y) {
		return {
			x: x,
			y: y
		};
	}
	p1p2(x1, y1, x2, y2, name = "result", color = "Grey") {
		return {
			name: name,
			color: color,
			s: "in",
			p1: this.point(x1, y1),
			p2: this.point(x2, y2)
		};
	}
	samePoint(a, b) {
		return a.x == b.x && a.y == b.y;
	}

	sameEdge(e1, e2) {
		var r = (this.samePoint(e1.p1, e2.p1) && this.samePoint(e1.p2, e2.p2)) || 
		(this.samePoint(e1.p2, e2.p1) && this.samePoint(e1.p1, e2.p2));
		return(r);
	}

	containEdge(edges, e) {
		var n = edges.length,
			i;
		for(i = 0; i < n; i++) {
			var edge = edges[i];
			if(this.sameEdge(edge, e)) return i;
		}
		return -1;
	}

	validRect(A) {
		return A.p2.x > A.p1.x && A.p2.y > A.p1.y;
	}

	innerRect(rects, r) {
		if(!Array.isArray(rects)) rects = [rects];
		var n = rects.length,
			i;
		for(i = 0; i < n; i++) {
			var rect = rects[i];
			if((r.p1.x >= rect.p1.x && r.p1.x <= rect.p2.x) && (r.p2.x >= rect.p1.x && r.p2.x <= rect.p2.x) && (r.p1.y >= rect.p1.y && r.p1.y <= rect.p2.y) && (r.p2.y >= rect.p1.y && r.p2.y <= rect.p2.y)) return true;
		}
		return false;
	}
	
	merge(rects) {
		var x = [],
			y = [];
		var mesh = [],
			i, j;
		rects.forEach(function(rect) {
			x.push(rect.p1.x);
			x.push(rect.p2.x);
			y.push(rect.p1.y);
			y.push(rect.p2.y);
		});
		x.sort(compareNum);
		y.sort(compareNum);
		var n = x.length;
		
		for(i = 0; i < n - 1; i++) {
			for(j = 0; j < n - 1; j++) {
				var r = this.p1p2(x[j], y[i], x[j + 1], y[i + 1], "result","grey");
				r.s = "out";
				if(this.innerRect(rects, r)) r.s = "in";
				mesh.push(r);
			}
		}

		return mesh;
	}

	subtract(rects, rs) {
		rects.forEach(function(rect, i) {
			if(this.innerRect(rs, rect)) rect.s = "out";
		}.bind(this));
		return rects;
	}

	intersect(rects, rs) {
		rects.forEach(function(rect, i) {
			rect.s = "out";
			if(this.innerRect(rs, rect)) rect.s = "in";
		}.bind(this));
		return rects;
	}

	edgesRect(rect) {
		var es = [];
		es.push(this.p1p2(rect.p1.x, rect.p1.y, rect.p1.x, rect.p2.y));
		es.push(this.p1p2(rect.p1.x, rect.p2.y, rect.p2.x, rect.p2.y));
		es.push(this.p1p2(rect.p2.x, rect.p2.y, rect.p2.x, rect.p1.y));
		es.push(this.p1p2(rect.p2.x, rect.p1.y, rect.p1.x, rect.p1.y));
		return es;
	}

	genEdges(rects) {
		var edges = [];
		var that = this;
		rects.forEach(function(rect) {
			if(rect.s == 'in') {
				var es = that.edgesRect(rect);
				es.forEach(function(e) {
					var index = that.containEdge(edges, e);
					if(index >= 0) {
						edges.splice(index, 1);
					} else {
						edges.push(e);
					}
				});
			}
		});
		return edges;
	}

	drawEdges(ctx, edges, c) {
		if(!Array.isArray(edges)) edges = [edges];
		edges.forEach(function(edge) {
			ctx.beginPath();
			ctx.lineWidth = "8";
			ctx.strokeStyle = c;
			ctx.moveTo(edge.p1.x + this.X0, edge.p1.y + this.Y0);
			ctx.lineTo(edge.p2.x + this.X0, edge.p2.y + this.Y0);
			ctx.stroke();
		}.bind(this));
	}

	drawRects(ctx, rects, c) {
		if(!Array.isArray(rects)) rects = [rects];
		rects.forEach(function(rect) {
			if(!rect.s || rect.s == 'in') {
				ctx.beginPath();
				ctx.lineWidth = "2";
				ctx.strokeStyle = c;
				ctx.rect(rect.p1.x + this.X0, rect.p1.y + this.Y0, rect.p2.x - rect.p1.x, rect.p2.y - rect.p1.y);
				ctx.stroke();
			}
		}.bind(this));
	}

	fillRects(ctx, rects) {
		if(!Array.isArray(rects)) rects = [rects];
		rects.forEach(function(rect) {
			if(!rect.s || rect.s == 'in') {
				ctx.beginPath();
				ctx.fillStyle = rect.color;
				ctx.rect(rect.p1.x + this.X0, rect.p1.y + this.Y0, rect.p2.x - rect.p1.x, rect.p2.y - rect.p1.y);
				ctx.fill();
			}
		}.bind(this));
	}

	showRects(id, rects) {
		var html = "";
		if(!Array.isArray(rects)) rects = [rects];
		rects.forEach(function(rect) {
			html += "<h3>" + rect.name + "-" + rect.color + "-" + "{" + rect.p1.x + "," + rect.p1.y + ":" + rect.p2.x + "," + rect.p2.y + "}" + "</h3>";
			//html += "<br/>";
		}.bind(this));
		document.getElementById(id).innerHTML = html;
		return html;
	}
}

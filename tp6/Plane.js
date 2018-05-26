/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Plane extends CGFobject {

	constructor(scene, nrDivs, x = 1, xa = 0, y = 1, ya = 0, altimetry) {
		super(scene);

		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.x = x;
		this.xa = xa;
		this.y = y;
		this.ya = ya;
		this.altimetry = altimetry;

		this.factorY=7;

		this.initBuffers();

	};

	getVertex(i, j){
		let c = (j*(this.nrDivs+1)+(i))*3;
		/*if(j!=0){
			c+=(3*(j-1));
		}*/
		return [this.vertices[c], this.vertices[c+1], this.vertices[c+2]/this.factorY];
	}

	/**
	 * 
	 * @param {*} e1 
	 * @param {*} e2 
	 * 
	 * @return a vector normal to the plane
	 */
	getPlaneByEdges (e1, e2){
		return this.crossProduct(e1, e2);
	}

	crossProduct(a, b) {
		/*console.log("a:"+a);
		console.log("b:"+b);*/

		// Check lengths
		if (a.length != 3 || b.length != 3) {
			return;
		}

		let res =  [a[1]*b[2] - a[2]*b[1],
				a[2]*b[0] - a[0]*b[2],
				a[0]*b[1] - a[1]*b[0]];

		//console.log(res);

		return res;
	}

	vopp(p1, p2){
		return [p2[0]-p1[0], p2[1]-p1[1], p2[2]-p1[2]];
	}


	/**
	 * 
	 * @param {*} s selfVertex 
	 * @param {*} vl VertexLeft 
	 * @param {*} vr VertexRight
	 * @param {*} vt VertexTop
	 * @param {*} vb VertexBottom
	 */
	newell(s, vl, vr, vt, vb){
		/*
					y
					^
		 P2 		|		P1
		    	    vt        
					|
		 	 	 	|        
		--vl--------s---------vr---> x
		    	    |      
					|
		 P3  		vb   	P4
					|       

		*/

		let p1, p2, p3, p4;

		p1 = this.getPlaneByEdges(this.vopp(s, vr), this.vopp(s, vt));
		p2 = this.getPlaneByEdges(this.vopp(s, vt), this.vopp(s, vl));
		p3 = this.getPlaneByEdges(this.vopp(s, vl), this.vopp(s, vb));
		p4 = this.getPlaneByEdges(this.vopp(s, vb), this.vopp(s, vr));

		let normalFinal = [
			p1[0] + p2[0] + p3[0] + p4[0],
			p1[1] + p2[1] + p3[1] + p4[1],
			p1[2] + p2[2] + p3[2] + p4[2],
		];

		return normalFinal;
	}

	normalize(n){
		let norm = Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);
		n[0]/=norm;
		n[1]/=norm;
		n[2]/=norm;

		return n;
	}

	initBuffers() {
		/* example for nrDivs = 3 :
		(numbers represent index of point in vertices array)

				y
				^
				|
		0    1  |  2    3
				|
		4	 5	|  6    7
		--------|--------------> x
		8    9  |  10  11
				|
		12  13  |  14  15    

		*/

		// Generate vertices and normals 
		this.vertices = [];
		this.normals = [];

		// Uncomment below to init texCoords
		this.texCoords = [];

		var yCoord = 0.5;

		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, this.altimetry[i][j]*this.factorY);

				// texCoords should be computed here; uncomment and fill the blanks
				this.texCoords.push(this.x / this.nrDivs * i - this.xa, this.y / this.nrDivs * j - this.ya);

				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) {
				if(i>0 && j > 0 && i < this.nrDivs && j < this.nrDivs){
					//common case
					//console.log(i, j);
					
					let self = this.getVertex(i, j);
					let vt = this.getVertex(i-1, j); // vertex left
					let vb = this.getVertex(i+1, j); // vertex right
					let vl = this.getVertex(i, j-1); // vertex top
					let vr = this.getVertex(i, j+1); // vertex bottom
					let normal = this.newell(self, vl, vr, vt, vb);
					//console.log(self);
					normal = this.normalize(normal);
					this.normals.push(normal[0]*10, normal[1]*10, Math.abs(normal[2]*10));
				}
				else
					this.normals.push(0,0,1);

				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
		console.log(this.normals);

		// Generating indices
		/* for nrDivs = 3 output will be 
			[
				 0,  4, 1,  5,  2,  6,  3,  7, 
					7,  4,
				 4,  8, 5,  9,  6, 10,  7, 11,
				   11,  8,
				 8, 12, 9, 13, 10, 14, 11, 15,
			]
		Interpreting this index list as a TRIANGLE_STRIP will draw rows of the plane (with degenerate triangles in between. */

		this.indices = [];
		var ind = 0;


		/*for (var j = 0; j < this.nrDivs; j++) 
		{
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.indices.push(ind);
				this.indices.push(ind+this.nrDivs+1);
				this.indices.push(0);

				ind++;
			}
			if (j+1 < this.nrDivs)
			{
				// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
				// degenerate triangles will not generate fragments
				this.indices.push(ind+this.nrDivs);
				this.indices.push(ind);
			}
		}
		
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;*/

		/* Alternative with TRIANGLES instead of TRIANGLE_STRIP. More indices, but no degenerate triangles */

		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i < this.nrDivs; i++) {
				this.indices.push(ind, ind + this.nrDivs + 1, ind + 1);
				this.indices.push(ind + 1, ind + this.nrDivs + 1, ind + this.nrDivs + 2);

				ind++;
			}
			ind++;
		}

		this.primitiveType = this.scene.gl.TRIANGLES;


		this.initGLBuffers();
	};

};
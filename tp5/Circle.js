
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Circle extends CGFobject{

	constructor(scene, nrVertix=4) 
	{
		super(scene);

		this.nrVertix = nrVertix;

		this.initBuffers();

	};

	initBuffers()
	{
		this.deg2rad=Math.PI/180.0;
		var a_rad = 30.0 * this.deg2rad;
		
		// Generate vertices and normals 
		this.vertices = [
			0, 0, 0 // middle vertex (0)
		];

		this.texCoords = [
			0.5, 0.5 // middle vertex (0)
		];

		this.normals = [];

		this.indices = [];
		
		let angleInc = 360/this.nrVertix;

		for(let i = 0; i < this.nrVertix; i++){
			let angle = angleInc*i;
			this.vertices.push(Math.cos(this.deg2rad*angle), Math.sin(this.deg2rad*angle), 0);
		}

		for(let i = 0; i <= this.nrVertix; i++){
			this.normals.push(0,0,1);
		}
		

		for(let i = 1; i <= this.nrVertix; i++){
			if(i==this.nrVertix){
				this.indices.push(0, i, 1);
			}else{
				this.indices.push(0, i, i+1);
			}

		}
		

		for(let i = 0; i < this.nrVertix; i++){
			let angle = angleInc*i;
			let cos = Math.cos(this.deg2rad*angle);
			let sin = Math.sin(this.deg2rad*angle);
			this.texCoords.push((cos+1)/2,(-sin+1)/2);
		}

		

		/*this.vertices.push(0.5,0.5,0);
		this.vertices.push(1,0,0);*/

		this.initGLBuffers();
	};

};
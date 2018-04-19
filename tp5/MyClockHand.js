/**
 * MyQuad
 * @constructor
 */
class MyClockHand extends CGFobject
{

	constructor(scene,slices)
	{
		super(scene);
		this.ponteiro=new MyCylinder(this.scene,10,1,1,1);
		this.anglerad=0*Math.PI/180;
		//setAngle(0);
		this.slices=slices;
		this.initBuffers();
	};

	setAngle(angle)
	{
	    this.anglerad=angle*Math.PI/180;
	};

	initBuffers()
	{
		this.texCoords = [
			0.5, 0.5 // middle vertex (0)
		];

		this.vertices = [];
		var a = 2*Math.PI/this.slices;

		this.vertices.push(0,0,0);

		for(var i=0; i < this.slices ; i++){
		    this.vertices.push(Math.cos(i*a));
		    this.vertices.push(Math.sin(i*a));
		    this.vertices.push(0);
		}


		this.indices = [];


		for(var i=1; i <= this.slices ; i++){
		    if(i==this.slices){
		    this.indices.push(0);
		    this.indices.push(i);
		    this.indices.push(1);
		    }
		    else {
		    this.indices.push(0);
		    this.indices.push(i);
		    this.indices.push(i+1);
		    }
		}
		
		for(let i = 0; i < this.slices; i++){
			let cos = Math.cos(a*i);
			let sin = Math.sin(a*i);
			this.texCoords.push((cos+1)/2,(-sin+1)/2);
		}
		
		/*this.normals = [];*/

		/*for(var i=0; i <= this.slices ; i++){
		    this.normals.push(0,0,1);
		}*/

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	display(){
	    //this.scene.pushMatrix();		necessario?
	    this.scene.translate(0,0.5,0);
	    this.scene.scale(0.02,1,0.02);
	   	this.scene.rotate(90*Math.PI/180,1,0,0);
	    this.ponteiro.display();
	   // this.scene.popMatrix();
	}
};

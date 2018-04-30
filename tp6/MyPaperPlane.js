/**
 * MyQuad
 * @constructor
 */
class MyPaperPlane extends CGFobject
{

	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		//this.texCoords = [
			//0.5, 0.5 // middle vertex (0)
		//];

		this.vertices = [
		//nariz 1
		0.5, 0, 0, //0
		0.4,0,0, //1
		0.4,0.15,-0.1, //2
		//nariz 2
		0.5, 0, 0, //3
		0.4,0,0, //4
		0.4,0.15,0.1, //5
		//tronco 1 baixo
		0.4,0,0, //6
		-0.5,0,0, //7
		-0.5,0.15,-0.1, //8
		//tronco 2 baixo
		0.4,0,0, //9
		-0.5,0,0, //10
		-0.5,0.15,0.1, //11
		//tronco 1 cima
		0.4,0,0, //12
		-0.5,0.15,-0.1, //13
		0.4,0.15,-0.1, //14
		//tronco 2 cima
		0.4,0,0, //15
		-0.5,0.15,0.1, //16
		0.4,0.15,0.1, //17
		//asa 1
		0.4,0.15,-0.1,//18
		-0.5,0.15,-0.5, //19
		-0.5,0.15,-0.1,//20
		//asa 2
		0.4,0.15,0.1,//21
		-0.5,0.15,0.5, //22
		-0.5,0.15,0.1,//23
		
		];
	


		this.indices = [
		//nariz face 1
		0,2,1,
		0,1,2,
		//nariz face 2
		3,4,5,
		3,5,4,
		//tronco 1 baixo
		6,7,8,
		6,8,7,
		//tronco 2 baixo
		9,10,11,
		9,11,10,
		//tronco 1 cima
		12,13,14,
		12,14,13,
		//tronco 2 cima
		15,16,17,
		15,17,16,
		//asa 1
		18,19,20,
		18,20,19,
		//asa 2
		21,22,23,
		21,23,22

		

		
		];

		/*for(var i=0; i <= this.slices ; i++){
		    this.normals.push(0,0,1);
		}*/



		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
		/*	display()
		{
			//asa
			this.scene.translate(0,0.15,0);
			this.scene.scale(1,1,0.5);
			this.scene.rotate(-90*Math.PI/180,1,0,0);
			this.triangulo.display();

		};*/
};

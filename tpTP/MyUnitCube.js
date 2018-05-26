/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-0.5, 	-0.5, 	-0.5,   // 0
				0.5, 	0.5, 	0.5,    // 1
				-0.5, 	0.5, 	-0.5,   // 2
				0.5, 	0.5, 	-0.5,	// 3
                -0.5,	0.5, 	0.5,	// 4
                -0.5, 	-0.5, 	0.5,	// 5
				0.5, 	-0.5, 	0.5,	// 6
				0.5,	-0.5, 	-0.5,	// 7
				];

		this.indices = [
				4,1,2,
				1,3,2,
				4,5,6,
				6,1,4,
				6,7,3,
				3,1,6,
				0,2,3,
				3,7,0,
				6,5,0,
				0,7,6,
				5,4,2,
				2,0,5
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

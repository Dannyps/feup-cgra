/**
 * MyTrapPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapPrism extends CGFobject
{
	constructor(scene, left = 1, right = 1) 
	{
        
        super(scene);
        
        this.l = left;
        this.r = right;

        this.betaL = Math.PI/2-(Math.acos((this.l)/(this.l*this.l+1)));
        this.betaR = Math.PI/2-(Math.acos((this.r)/(this.r*this.r+1)));
        
        this.initBuffers();
        
	};

	initBuffers() 
	{
		this.vertices = [
            // Front face 
            -0.5, -0.5, 0.5,            // 0    (0)
            0.5, -0.5, 0.5,             // 1    (1)
            0.5, 0.5, 0.5,              // 2    (2)
            -0.5, 0.5, 0.5,             // 3    (3)
 
            // Back face 
            0.5, -0.5, -0.5,            // 4    (4)
            -0.5, -0.5, -0.5,           // 5    (5) 
            0.5, 0.5, -0.5,             // 6    (6) 
            -0.5, 0.5, -0.5,            // 7    (7) 

            // left triangle front face
            -0.5, -0.5, 0.5,            // 0    (8) 
            -0.5-this.l, -0.5, 0.5,     // 10   (9) 
            -0.5, 0.5, 0.5,             // 3    (10) 

            // left triangle back face
            -0.5, -0.5, -0.5,           // 5    (11) 
            -0.5-this.l, -0.5, -0.5,    // 11   (12) 
            -0.5, 0.5, -0.5,            // 7    (13)
            
            // left face
            -0.5-this.l, -0.5, -0.5,    // 11   (14)
            -0.5-this.l, -0.5, 0.5,     // 10   (15) 
            -0.5, 0.5, -0.5,            // 7    (16) 
            -0.5, 0.5, 0.5,             // 3    (17) 

            // left triangle bottom face
            -0.5, -0.5, -0.5,           // 5    (18) 
            -0.5-this.l, -0.5, -0.5,    // 11   (19) 
            -0.5-this.l, -0.5, 0.5,     // 10   (20)
            -0.5, -0.5, 0.5,            // 0    (21)

            // right triangle front face
            0.5, -0.5, 0.5,             // 1    (22) 
            0.5, 0.5, 0.5,              // 2    (23) 
            0.5+this.r, -0.5, 0.5,      // 8    (24) 

            // right triangle back face
            0.5+this.r, -0.5, -0.5,     // 9    (25) 
            0.5, -0.5, -0.5,            // 4    (26) 
            0.5, 0.5, -0.5,             // 6    (27)
            
            // right face
            0.5+this.r, -0.5, -0.5,     // 9    (28)
            0.5+this.r, -0.5, 0.5,      // 8    (29) 
            0.5, 0.5, 0.5,              // 2    (30) 
            0.5, 0.5, -0.5,             // 6    (31) 

            // right triangle bottom face
            0.5, -0.5, 0.5,             // 1    (32) 
            0.5+this.r, -0.5, 0.5,      // 8    (33) 
            0.5+this.r, -0.5, -0.5,     // 9    (34)
            0.5, -0.5, -0.5,            // 4    (35)

            // top face
            0.5, 0.5, 0.5,              // 2    (36)
            -0.5, 0.5, 0.5,             // 3    (37)
            0.5, 0.5, -0.5,             // 6    (38) 
            -0.5, 0.5, -0.5,            // 7    (39) 

            // bottom face
            -0.5, -0.5, 0.5,            // 0    (40)
            0.5, -0.5, 0.5,             // 1    (41)
            0.5, -0.5, -0.5,            // 4    (42)
            -0.5, -0.5, -0.5,           // 5    (43) 

        ];

        this.indices=[
            // Front face 
            0, 1, 2, 
            2, 3, 0, 

            // Back face
            5, 7, 6,
            6, 4, 5,

            // left triangle front face
            10, 9, 8,

            // left triangle back face
            13, 11, 12,
            
            // left face
            17, 16, 14,
            14, 15, 17,

            // left triangle bottom face
            18, 21, 20,
            20, 19, 18,

            // right triangle front face
            22, 24, 23,

            // right triangle back face
            26, 27, 25,

            // right face
            29, 28, 31,
            31, 30, 29,

            // right triangle bottom face
            34, 33, 32,
            32, 35, 34,

            // top face
            37, 36, 38,
            38, 39, 37,

            // bottom face
            40, 43, 42,
            42, 41, 40,

        ];

        this.normals = [

            // Front face 
            0, 0, 1,                    // 0    (0)
            0, 0, 1,                    // 1    (1)
            0, 0, 1,                    // 2    (2)
            0, 0, 1,                    // 3    (3)
 
            // Back face 
            0, 0, -1,                   // 4    (4)
            0, 0, -1,                   // 5    (5) 
            0, 0, -1,                   // 6    (6) 
            0, 0, -1,                   // 7    (7) 

            // left triangle front face
            0, 0, 1,                    // 0    (8) 
            0, 0, 1,                    // 10   (9) 
            0, 0, 1,                    // 3    (10) 

            // left triangle back face
            0, 0, -1,                   // 5    (11) 
            0, 0, -1,                   // 11   (12) 
            0, 0, -1,                   // 7    (13)
            
            // left face
            -Math.cos(this.betaL), Math.sin(this.betaL), 0,    // 11   (14)
            -Math.cos(this.betaL), Math.sin(this.betaL), 0,    // 10   (15) 
            -Math.cos(this.betaL), Math.sin(this.betaL), 0,    // 7    (16) 
            -Math.cos(this.betaL), Math.sin(this.betaL), 0,    // 3    (17) 

            // left triangle bottom face
            0, -1, 0,                   // 5    (18) 
            0, -1, 0,                   // 11   (19) 
            0, -1, 0,                   // 10   (20)
            0, -1, 0,                   // 0    (21)

            // right triangle front face
            0, 0, 1,                    // 1    (22) 
            0, 0, 1,                    // 2    (23) 
            0, 0, 1,                    // 8    (24) 

            // right triangle back face
            0, 0, -1,                   // 9    (25) 
            0, 0, -1,                   // 4    (26) 
            0, 0, -1,                   // 6    (27)
            
            // right face
            Math.cos(this.betaL), Math.sin(this.betaL), 0,     // 9    (28)
            Math.cos(this.betaL), Math.sin(this.betaL), 0,     // 8    (29) 
            Math.cos(this.betaL), Math.sin(this.betaL), 0,     // 2    (30) 
            Math.cos(this.betaL), Math.sin(this.betaL), 0,     // 6    (31) 

            // right triangle bottom face
            0, -1, 0,                   // 1    (32) 
            0, -1, 0,                   // 8    (33) 
            0, -1, 0,                   // 9    (34)
            0, -1, 0,                   // 4    (35)

            // top face 
            0, 1, 0,                    // 2    (36)
            0, 1, 0,                    // 3    (37)
            0, 1, 0,                    // 6    (38) 
            0, 1, 0,                    // 7    (39) 

            // bottom face
            0, -1, 0,                   // 0    (40)
            0, -1, 0,                   // 1    (41)
            0, -1, 0,                   // 4    (42)
            0, -1, 0,                   // 5    (43) 
            
        ];

        this.texCoords=[
            // Front face 
            1/3, 1/2,            // 0    (0)
            2/3, 1/2,            // 1    (1)
            2/3, 3/4,            // 2    (2)
            1/3, 3/4,            // 3    (3)
 
            // Back face 
            2/3, 1/4,            // 4    (4)
            1/3, 1/4,            // 5    (5) 
            2/3, 0,              // 6    (6) 
            1/3, 0,              // 7    (7) 

            // left triangle front face
            1/3, 1/2,            // 0    (8) 
            2/9, 1/2,            // 10   (9) 
            1/3, 3/4,            // 3    (10) 

            // left triangle back face
            1/3, 1/4,            // 5    (11) 
            2/9, 1/4,            // 11   (12) 
            1/3, 0,              // 7    (13)
            
            // left face
            2/9, 1/4,            // 11   (14)
            2/9, 1/2,            // 10   (15) 
            0,   1/4,            // 7    (16) 
            0,   1/2,            // 3    (17) 

            // left triangle bottom face
            1/3, 1/4,            // 5    (18) 
            2/9, 1/4,            // 11   (19) 
            2/9, 1/2,            // 10   (20)
            1/3, 1/2,            // 0    (21)

            // right triangle front face
            2/3, 1/2,            // 1    (22) 
            2/3, 1/4,            // 2    (23) 
            7/9, 1/4,            // 8    (24) 

            // right triangle back face
            7/9, 1/4,            // 9    (25) 
            2/3, 1/4,            // 4    (26) 
            2/3, 0,              // 6    (27)
            
            // right face
            7/9, 1/4,            // 9    (28)
            7/9, 1/2,            // 8    (29) 
            1,   1/2,            // 2    (30) 
            1,   1/4,            // 6    (31) 

            // right triangle bottom face
            2/3, 1/2,            // 1    (32) 
            7/9, 1/2,            // 8    (33) 
            7/9, 1/4,            // 9    (34)
            2/3, 1/4,            // 4    (35)

            // top face
            2/3, 3/4,            // 2    (36)
            1/3, 3/4,            // 3    (37)
            2/3, 1,              // 6    (38) 
            1/3, 1,              // 7    (39) 

            // bottom face
            1/3, 1/2,            // 0    (40)
            2/3, 1/2,            // 1    (41)
            2/3, 1/4,            // 4    (42)
            1/3, 1/4,            // 5    (43) 
        ];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

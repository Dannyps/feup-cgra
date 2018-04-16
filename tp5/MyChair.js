/**
 * MyChair
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyChair extends CGFobject
{
	constructor(scene) 
	{
        super(scene);
        this.quad=new MyUnitCubeQuad(this.scene);
        //this.perna=new MyQuad(this.scene);

        this.quad.initBuffers();
    };
    
    display(){

        // tampo
        this.scene.pushMatrix();
        this.scene.translate(0,2,0);
        this.scene.scale(2, 0.1, 2);
        this.quad.display();
        this.scene.popMatrix();

        // perna1
        this.scene.pushMatrix();
        this.scene.translate(1-0.15/2, 1, 1-0.15/2);
        this.scene.scale(0.15, 2, 0.15);
        this.quad.display();
        this.scene.popMatrix();

       // perna2
        this.scene.pushMatrix();
        this.scene.translate(-1+0.15/2, 1, 1-0.15/2);
        this.scene.scale(0.15, 2, 0.15);
        this.quad.display();
        this.scene.popMatrix();

        // perna3
        this.scene.pushMatrix();
        this.scene.translate(-1+0.15/2, 1, -1+0.15/2);
        this.scene.scale(0.15, 2, 0.15);
        this.quad.display();
        this.scene.popMatrix();

        // perna4
        this.scene.pushMatrix();
        this.scene.translate(1-0.15/2, 1, -1+0.15/2);
        this.scene.scale(0.15, 2, 0.15);
        this.quad.display();
        this.scene.popMatrix();

        // braço1
        this.scene.pushMatrix();
        this.scene.translate(1-0.15/2, 2/2-0.15/2+2, 1-0.15/2);
        this.scene.scale(0.15, 2, 0.15);
        this.quad.display();
        this.scene.popMatrix();

       // braço2
        this.scene.pushMatrix();
        this.scene.translate(-1+0.15/2, 2/2-0.15/2+2, 1-0.15/2);
        this.scene.scale(0.15, 2, 0.15);
        this.quad.display();
        this.scene.popMatrix();

        // braço3
        this.scene.pushMatrix();
        this.scene.translate(0,4,0+1-0.08);
        this.scene.scale(2, 0.15, 0.15);
        this.quad.display();
        this.scene.popMatrix();

        // encosto
        this.scene.pushMatrix();
        this.scene.translate(0,3,0+1-0.08);
        this.scene.scale(1, 1.9, 0.15);
        this.quad.display();
        this.scene.popMatrix();
    }

};

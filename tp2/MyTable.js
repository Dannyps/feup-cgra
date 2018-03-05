/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
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
        this.scene.translate(0,3.5,0);
        this.scene.scale(5, 0.3, 3);
        this.quad.display();
        this.scene.popMatrix();

        // perna1
        this.scene.pushMatrix();
        this.scene.translate(2.5-0.3/2, 3.5/2-0.3/2, 1.5-0.3/2);
        this.scene.scale(0.3, 3.5, 0.3);
        this.quad.display();
        this.scene.popMatrix();

       // perna2
        this.scene.pushMatrix();
        this.scene.translate(-2.5+0.3/2, 3.5/2-0.3/2, 1.5-0.3/2);
        this.scene.scale(0.3, 3.5, 0.3);
        this.quad.display();
        this.scene.popMatrix();

        // perna3
        this.scene.pushMatrix();
        this.scene.translate(-2.5+0.3/2, 3.5/2-0.3/2, -1.5+0.3/2);
        this.scene.scale(0.3, 3.5, 0.3);
        this.quad.display();
        this.scene.popMatrix();

        // perna4
        this.scene.pushMatrix();
        this.scene.translate(2.5-0.3/2, 3.5/2-0.3/2, -1.5+0.3/2);
        this.scene.scale(0.3, 3.5, 0.3);
        this.quad.display();
        this.scene.popMatrix();
    }

};

/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyFloor extends CGFobject
{
	constructor(scene) 
	{
        super(scene);
        this.quad=new MyUnitCubeQuad(this.scene);
        //this.perna=new MyQuad(this.scene);

        this.quad.initBuffers();
    };
    
    display(){

       // chão
        this.scene.pushMatrix();
        this.scene.translate(4,-0.05,3);
        this.scene.scale(8, 0.1, 6);
        this.quad.display();
        this.scene.popMatrix();
    }

};

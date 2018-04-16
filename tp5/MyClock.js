/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject{
    constructor(scene, sides) 
	{
        super(scene);

        this.cyl = new MyCylinder(scene, sides,1);
        this.face = new Circle(scene, sides);

        this.clockText = new CGFappearance(this.scene);
		this.clockText.loadTexture("../resources/images/clock.png");
		this.clockText.setAmbient(0.2,0.2,0.2,0.0);
		this.clockText.setDiffuse(0.2, 0.2, 0.2, 1);
		this.clockText.setSpecular(0.5, 0.5, 0.5,1);
		this.clockText.setShininess(1);


        this.initBuffers();

    };

    display(){

    // cyl
    this.scene.pushMatrix();
        this.scene.scale(1,1,0.5);
        this.scene.translate(0,0,0.5);
        this.cyl.display();
    this.scene.popMatrix();

     // face
     this.scene.pushMatrix();
        this.scene.scale(1,1,0.5);
        this.scene.translate(0,0,1);
        this.clockText.apply();
        this.face.display();
    this.scene.popMatrix();


    }

    
}
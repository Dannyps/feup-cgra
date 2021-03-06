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
		
		this.ponteiroH = new MyClockHand(scene,0.5,90);
        this.ponteiroM = new MyClockHand(scene,0.8,180);
        this.ponteiroS = new MyClockHand(scene,0.95,270);

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
        this.scene.scale(1,1,0.25);
        this.scene.translate(0,0,0.5);
        this.cyl.display();
    this.scene.popMatrix();

     // face
     this.scene.pushMatrix();
        this.scene.scale(1,1,0.5);
        this.scene.translate(0,0,0.5);
        this.clockText.apply();
        this.face.display();
    this.scene.popMatrix();


//				PONTEIROH

this.scene.pushMatrix();
this.scene.translate(0,0,0.25);
this.scene.rotate(-this.ponteiroH.anglerad,0,0,1);
this.ponteiroH.display();
this.scene.popMatrix();

//			PONTEIROM

this.scene.pushMatrix();
this.scene.translate(0,0,0.25);
this.scene.rotate(-this.ponteiroM.anglerad,0,0,1);
this.ponteiroM.display();
this.scene.popMatrix();

//			PONTEIROS

this.scene.pushMatrix();
this.scene.translate(0,0,0.25);
this.scene.rotate(-this.ponteiroS.anglerad,0,0,1);
this.ponteiroS.display();
this.scene.popMatrix();


	}
	
	update(time)
    {
    	this.ponteiroS.setAngle((time *360/ 60));
    	this.ponteiroM.setAngle((time *360/ 60/60));
    	this.ponteiroH.setAngle((time *360/ 60/60/60));
    }

    
}
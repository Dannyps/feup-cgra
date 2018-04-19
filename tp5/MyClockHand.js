/**
 * MyQuad
 * @constructor
 */
class MyClockHand extends CGFobject
{

	constructor(scene)
	{
		super(scene);
		this.ponteiro=new MyCylinder(this.scene,10,1,1,1);
		this.anglerad=0*Math.PI/180;
		//setAngle(0);
	};

	setAngle(angle)
	{
	    this.anglerad=angle*Math.PI/180;
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

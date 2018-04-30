/**
 * MyQuad
 * @constructor
 */
class MyClockHand extends CGFobject
{

	constructor(scene,psize,anglei)
	{
		super(scene);
		this.psize=psize;
		this.ponteiro=new MyCylinder(this.scene,10,1,1,1);
		this.anglerad=anglei*Math.PI/180;
	};

	setAngle(angle)
	{
	    this.anglerad+=angle*Math.PI/180;
	};

	getAngle()
	{
	return this.anglerad;	
	};



	display(){
	    //this.scene.pushMatrix();		necessario?
	    this.scene.translate(0,this.psize/2,0);
	    this.scene.scale(0.02,this.psize,0.02);
	   	this.scene.rotate(90*Math.PI/180,1,0,0);
	    this.ponteiro.display();
	   // this.scene.popMatrix();
	}
};
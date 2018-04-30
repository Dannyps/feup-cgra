/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlaneH extends CGFobject
{
	constructor(scene,xi,yi,zi)
	{
        super(scene);

        this.plane = new MyPaperPlane(this.scene);
        this.x=xi;
        this.y=yi;
        this.z=zi;
        this.xt=0;
        this.yt=0;
        // this.rotflag=1;
        this.bateu=0;
        this.setRotZ(0);

        
		this.materialPlane = new CGFappearance(this.scene);
		this.materialPlane.setAmbient(0.3,0.9,0.7,1);
		this.materialPlane.setDiffuse(0.6,0.6,0.6,1);
		this.materialPlane.setSpecular(0.2,0.2,0.2,1);
		this.materialPlane.setShininess(50);

       // this.initBuffers();

    };

    

    setX(x){
        this.x+=x;
    };

    setY(y){
        this.y+=y;
    };

    setRotZ(angle)
    {
    	this.rotZ=angle*Math.PI/180;
    };

    display()
    {

        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(-this.rotZ,0,0,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.materialPlane.apply();
        this.plane.display();
    };

    linear(time,k)   // time usa se? é o xi acho
    {
    	var xi=-0.05;
    	var yi=k*xi;
        this.setX(xi);
        this.setY(yi);
    };

    parabola(time,d,k,a,b)
    {
    	var xi=0.05*d;		//d = direçao
    	this.xt+=xi;
    	this.yt=((this.xt+a)*(this.xt+a))*k;
    	var yi=this.yt;
    	this.setX(xi);
    	this.setY(yi);
    };

    update(time)
    {
    	var kl=0.1;		//inclinaçao (linear)

    	//if(this.rotflag==1){
    		if(kl>0){
    		this.setRotZ(Math.log(kl+1)*65);
    		}
    	//}
    	if(this.x>0.5){
    	this.linear(time,-kl);
    	console.log("x:" + this.x + "bat: "+this.bateu);
    	}
    	else {
    	this.parabola(time,1,-0.01,0,0);

    	}
    }

};
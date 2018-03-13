/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWood extends CGFobject
{
	constructor(scene) 
	{
        super(scene);
    };

    init(application){
        this.wood = new CGFappearance(this);
		this.wood.setAmbient(1,1,1,1);
		this.wood.setDiffuse(139/255,70/255,8/255,1);
		this.wood.setSpecular(0,0.2,0.8,1);
		this.wood.setShininess(120);
    };
};

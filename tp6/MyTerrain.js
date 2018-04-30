/**
 * MyQuad
 * @constructor
 */
class MyTerrain extends Plane
{

	constructor(scene)
	{
        super(scene, 50, 1, 1, 1, 1);
        
        this.texture = new CGFappearance(this.scene);
		this.texture.setAmbient(139/255*0.5,70/255*0.5,8/255*0.5,1);
		this.texture.setDiffuse(139/255,70/255,8/255,1);
		this.texture.setSpecular(0,0,0,0);
		this.texture.setShininess(120);
	};

};
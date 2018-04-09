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

        this.tableAppearance = new CGFappearance(this.scene);
		this.tableAppearance.loadTexture("../resources/images/table.png");
		this.tableAppearance.setSpecular(0,0,0,0);
		this.tableAppearance.setDiffuse(0.4,0.4,0.4,1);
        this.tableAppearance.setShininess(0.1);
        this.tableAppearance.setTextureWrap( CGFappearance.MIRRORED_REPEAT, CGFappearance.MIRRORED_REPEAT );
        

        this.wood = new CGFappearance(this.scene);
		this.wood.setAmbient(1,1,1,1);
		this.wood.setDiffuse(139/255,70/255,8/255,1);
		this.wood.setSpecular(0,0,0,1);
        this.wood.setShininess(120);

        this.steel = new CGFappearance(this.scene);
		//this.steel.setAmbient(1,1,1,1);
		this.steel.setDiffuse(0.1,0.1,0.1,1);
		this.steel.setSpecular(0.8,0.8,0.8,1);
        this.steel.setShininess(120);
        
        this.quad.initBuffers();
    };
    
    display(){

        
        // tampo
        this.scene.pushMatrix();
            this.tableAppearance.apply();
            this.scene.translate(0,3.5,0);
            this.scene.scale(5, 0.3, 3);
            this.quad.display();
        this.scene.popMatrix();

        this.steel.apply();
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

var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.specialCamera=false;
		this.option2=true;
		this.showAxis=false;
		this.speed=3;


		this.gl.clearColor(0.529, 0.808, 0.922, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.carro = new MyVehicle(this);

		let altimetry= [[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3, 0.0 ],
						[ 2.0 , 3.0 , 2.0, 4.0, 7.5, 6.4, 4.3, 1.3, 0.0 ],
						[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 2.0, 4.0, 3.5, 2.4, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						[ 2.0 , 3.0 , 2.0, 1.0, 2.5, 2.4, 2.3, 1.3, 0.0 ]
						];
		

		this.floor = new MyTerrain(this, 8, altimetry);

		// Materials
		this.materialDefault = new CGFappearance(this);

		this.grassAppearance = new CGFappearance(this);
		this.grassAppearance.setAmbient(0.4, 0.4, 0.4, 1);
		this.grassAppearance.setDiffuse(0.7, 0.7, 0.7, 10);
		this.grassAppearance.setSpecular(0,0,0,0);
        this.grassAppearance.setShininess(120);
        this.grassAppearance.loadTexture("../resources/images/terrain2.png");

        this.wood = new CGFappearance(this);
		this.wood.setAmbient(139/255*0.5,70/255*0.5,8/255*0.5,1);
		this.wood.setDiffuse(139/255,70/255,8/255,1);
		this.wood.setSpecular(0,0,0,0);
		this.wood.setShininess(120);

		this.floorAppearance = new CGFappearance(this);
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.floorAppearance.setAmbient(0.2,0.2,0.2,0.0);
		this.floorAppearance.setDiffuse(139/255,70/255,8/255,1);
		this.floorAppearance.setSpecular(0,0,0,1);
		this.floorAppearance.setShininess(120);
		this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');

		this.columnAppearance = new CGFappearance(this);
		this.columnAppearance.loadTexture("../resources/images/col.png");
		this.columnAppearance.setAmbient(0.5,0.5,0.6,0.0);
		this.columnAppearance.setDiffuse(0.8,0.8,0.9,1);
		this.columnAppearance.setSpecular(0.1,0.1,0.1,1);
		this.columnAppearance.setShininess(120);
		this.columnAppearance.setTextureWrap('REPEAT', 'REPEAT');

		this.windowAppearance = new CGFappearance(this);
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setAmbient(0.2,0.2,0.2,0.0);
		this.windowAppearance.setDiffuse(0.5,0.5,0.5,1);
		this.windowAppearance.setSpecular(0,0,0,1);
		this.windowAppearance.setShininess(120);
		this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');


		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);
		this.materialB.setShininess(120);

		this.slideAppearance = new CGFappearance(this);
		this.slideAppearance.loadTexture("../resources/images/slides.png");
		this.slideAppearance.setAmbient(0.2,0.2,0.2,0.0);
		this.slideAppearance.setDiffuse(0.7, 0.7, 0.8,1);
		this.slideAppearance.setSpecular(0,0,0,1);
		this.slideAppearance.setShininess(1200);
		this.slideAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.loadTexture("../resources/images/board.png");
		this.boardAppearance.setAmbient(0.2,0.2,0.2,0.0);
		this.boardAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
		this.boardAppearance.setSpecular(0.5, 0.5, 0.5,1);
		this.boardAppearance.setShininess(1);


		this.enableTextures(true);
	};

	doSomething(){
		console.log("Doing something...");
	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);

		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(false); // show marker on light position (different from enabled)

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(false); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(false); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6, 5, 1);
		this.lights[3].setVisible(false); // show marker on light position (different from enabled)

		this.lights[4].setPosition(0, 15, 0, 1);
		this.lights[4].setVisible(true); // show marker on light position (different from enabled)

		//this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		//this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0.3, 0.3, 0.3, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
		//this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		//this.lights[1].enable();

		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setConstantAttenuation(0.0);
		this.lights[2].setLinearAttenuation(1.0);
		this.lights[2].setQuadraticAttenuation(0.0);
		//this.lights[2].enable();

		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
		this.lights[3].setConstantAttenuation(0.0);
		this.lights[3].setLinearAttenuation(0.0);
		this.lights[3].setQuadraticAttenuation(0.2);
		//this.lights[3].enable();

		this.lights[4].setAmbient(0.2, 0.2, 0.2, 0.1);
		this.lights[4].setDiffuse(255/255, 183/255, 76/255, 1);
		this.lights[4].setSpecular(0.1, 0.1, 0.1, 0);
		this.lights[4].setConstantAttenuation(0.0);
		this.lights[4].setLinearAttenuation(0.035);
		this.lights[4].setQuadraticAttenuation(0.0);
		this.lights[4].enable();
	};

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.showAxis){
			this.axis.display();
		}


		this.materialDefault.apply();


		//Carro
		this.pushMatrix();
		this.materialDefault.apply();
			this.translate(13,0,6);
			this.rotate(0, 0, Math.PI/2, 1);
			this.carro.display();
		this.popMatrix();


		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section


		// Prism
		/*
		this.pushMatrix();
			this.translate(1.2,2,10);
			this.rotate(Math.PI*1/4,1,0,0);
			this.scale(1,1,5);

			this.prism.display();
		this.popMatrix();
*/
		/*// Cyl
		this.pushMatrix();
			this.columnAppearance.apply();
			this.translate(1.2,3,13.8);
			this.rotate(Math.PI*2/4,1,0,0);
			this.scale(0.6,0.6,6);
			this.cyl.display();
			this.translate(21,0,0);
			this.cyl.display();
		this.popMatrix();
*/
		// Floor
		this.pushMatrix();
			//this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(45, 45, 0.2);
			this.grassAppearance.apply();
			this.floor.display();
		this.popMatrix();
/*
		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.windowAppearance.apply();
			this.wall.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.wall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.slideAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();

		// Chair 1
		this.pushMatrix();
			this.wood.apply();
			this.translate(5,0,9.5);
			this.chair.display();
		this.popMatrix();

		// Chair 2
		this.pushMatrix();
			this.translate(5,0,6.5);
			this.rotate(degToRad*180, 0, 1, 0);
			this.chair.display();
		this.popMatrix();

		// Chair 3
		this.pushMatrix();
			this.translate(12,0,9.5);
			this.chair.display();
		this.popMatrix();

		// Chair 4
		this.pushMatrix();
			this.translate(12,0,6.5);
			this.rotate(degToRad*180, 0, 1, 0);
			this.chair.display();
		this.popMatrix();


		// Clock
		this.pushMatrix();
			this.translate(7,6.5,0);
			this.clock.display();
		this.popMatrix();

		// Plane
		this.pushMatrix();
			this.plane.display();
		this.popMatrix();
*/
		// ---- END Scene drawing section
		this.setUpdatePeriod(1000/60);
	};

	getUpdatePeriod(){
		return this.updatePeriod;
	}

	checkKeys()
	{
		var text="Keys pressed: ";
		var keysPressed=false;

		if (this.gui.isKeyPressed("KeyW")){
			this.carro.incSpeed(0.1);
			text+=" W ";
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyS")){
			this.carro.incSpeed(-0.1);
			text+=" S ";
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyD")){
			text+=" D ";
			this.carro.turnRight(this.speed);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyA")){
			text+=" A ";
			this.carro.turnLeft(this.speed);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyC")&&this.carro.cameratimer>30){
				text+=" C ";
				this.carro.cameratimer=0;
				this.carro.changeCamera();
				keysPressed=true;
		}

		//		TRAVAO?
		
		//if (this.gui.isKeyPressed("space")){
		//	this.carro.incSpeed(-0.08);
		//	keysPressed=true;
		//}

		/*
		if (this.gui.isKeyPressed("KeyD") && this.gui.isKeyPressed("KeyW")){
			text+=" D ";
			//this.carro.turnRight(this.speed);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyA") && this.gui.isKeyPressed("KeyW")){
			text+=" A ";
			//this.carro.turnRight(-this.speed);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyA") && this.gui.isKeyPressed("KeyS")){
			text+=" D ";
			//this.carro.turnRight(this.speed);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyD") && this.gui.isKeyPressed("KeyS")){
			text+=" D ";
			//this.carro.turnRight(-this.speed);
			keysPressed=true;
		}*/

		/*if (this.gui.isKeyPressed("KeyA")){
			text+=" A ";
			this.carro.turnLeft();
			keysPressed=true;
		}*/

		if (keysPressed)
		console.log(text);
	}

	update(currTime)
	{
		if(this.oldTime==null){
			this.oldTime=currTime;
		}
    	this.delta=currTime-this.oldTime;
    	this.time = this.delta/1000;
    	this.oldTime=currTime;
    	this.checkKeys();
		//this.clock.update(this.time);
		//this.plane.update(this.time);

		//console.log("car:" +this.carro.x+ " " +this.carro.z);
		//console.log(this.carro.camerax+ " " +this.carro.cameray+ " " +this.carro.cameraz);
		this.carro.update(this.time);
		if(this.specialCamera){
			this.camera.setTarget(vec3.fromValues(this.carro.cameratx,1, this.carro.cameratz));
			this.camera.setPosition(vec3.fromValues(this.carro.camerax,this.carro.cameray,this.carro.cameraz));
		}else{

		}
	};
};

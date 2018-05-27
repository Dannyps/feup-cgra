 
class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();

		// add a button:
		// the first parameter is the object that is being controlled (in this case the scene)
		// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

		//this.gui.add(this.scene, 'doSomething');	

		// add a group of controls (and close by defult)

		var lights=this.gui.addFolder("Lights");
//		group.close();

		lights.add(this.scene, "l0");
		lights.add(this.scene, "l1");
		lights.add(this.scene, "l2");
		lights.add(this.scene, "l3");
		lights.add(this.scene, "l4");

		// add a group of controls (and open/expand by defult)

		var group=this.gui.addFolder("Car Options");
		group.open();

		// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// e.g. this.option1=true; this.option2=false;

		group.add(this.scene, 'specialCamera');
		//group.add(this.scene, 'option2');

		// add a slider
		// must be a numeric variable of the scene, initialized in scene.init e.g.
		// this.speed=3;
		// min and max values can be specified as parameters

        group.add(this.scene, 'speed', 0, 2);
        let sa = this.gui.add(this.scene, 'showAxis');
        sa.setValue(true);

		// Choose from named values
		group.add(this.scene, 'carText', { Zero: 0, One: 1 } );

        this.initKeys();

		return true;
	};

	/**
	 * initKeys
	 */

	initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){};
		this.activeKeys={};
	}
	
	processKeyDown(event) {
		this.activeKeys[event.code]=true;
	};

	processKeyUp(event) {
		this.activeKeys[event.code]=false;
	};

	isKeyPressed(keyCode) {
		return this.activeKeys[keyCode] || false;
	}


};

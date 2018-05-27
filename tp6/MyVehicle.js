/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);

        this.x = 0;
        this.z = 0;
        this.dir = 0;
        this.rodasrotdir = 0;
        this.rodasdir = 0;
        this.mc = 0.3; // magic const
        this.carspeed=0;
        this.rodasback=0;   // flag para as rodas voltarem po meio

        this.currentCamera=0;
        this.cameratx=0;
        this.cameratz=0;
        this.camerax=0;
        this.cameraz=0;
        this.cameray=0;
        this.cameratimer=0;

        this.cubo = new MyUnitCubeQuad(this.scene);
        this.rodafe = new MyCylinder(this.scene, 30, 10);
        this.facefe = new Circle(this.scene, 30);
        this.rodafd = new MyCylinder(this.scene, 30, 10);
        this.facefd = new Circle(this.scene, 30);
        this.rodate = new MyCylinder(this.scene, 30, 10);
        this.facete = new Circle(this.scene, 30);
        this.rodatd = new MyCylinder(this.scene, 30, 10);
        this.facetd = new Circle(this.scene, 30);
        this.farol = new MySemiSphere(this.scene, 30, 10);
        this.sides = new MyTrapPrism(this.scene, .2, .5);

        this.tyreText = new CGFappearance(this.scene);
        this.tyreText.loadTexture("../resources/images/tyre.png");
        this.tyreText.setAmbient(0.2,0.2,0.2,0.0);
        this.tyreText.setDiffuse(0.2, 0.2, 0.2, 1);
        this.tyreText.setSpecular(0.6, 0.6, 0.6, 1);
        this.tyreText.setShininess(1);

        this.carLight = new CGFappearance(this.scene);
        this.carLight.loadTexture("../resources/images/car_light.png");
        this.carLight.setAmbient(0.2,0.2,0.2,0.0);
        this.carLight.setDiffuse(0.8, 0.8, 0.8, 1);
        this.carLight.setSpecular(0.6, 0.6, 0.6, 1);
        this.carLight.setShininess(1);

        this.tyre2Text = new CGFappearance(this.scene);
        this.tyre2Text.loadTexture("../resources/images/tyre2.png");
        this.tyre2Text.setAmbient(0.2,0.2,0.2,0.0);
        this.tyre2Text.setDiffuse(0.3, 0.3, 0.3, 1);
        this.tyre2Text.setSpecular(0,0,0, 1);
        this.tyre2Text.setShininess(1);

    };

    incSpeed(aceleration){
      this.carspeed += aceleration;   //positiva ou negativa
    };

    changeCamera(){
        if(this.currentCamera==0)
        this.currentCamera=1;
        else if(this.currentCamera==1)
        this.currentCamera=2;
        else if(this.currentCamera==2)
        this.currentCamera=0;
    };

    updatecamera0(){
        this.cameratx=this.x+15*Math.cos(this.dir);
        this.cameratz=(this.z-15*Math.sin(this.dir));
        this.camerax=this.x+6*Math.cos(this.dir+Math.PI);
        this.cameraz=(this.z-6*Math.sin(this.dir+Math.PI));
        this.cameray=4;
    };

    updatecamera1(){
        this.cameratx=this.x+15*Math.cos(this.dir);
        this.cameratz=(this.z-15*Math.sin(this.dir));
        this.camerax=this.x+20*Math.cos(this.dir+Math.PI);
        this.cameraz=(this.z-20*Math.sin(this.dir+Math.PI));
        this.cameray=6;
    };

    updatecamera2(){
        this.camerax=30;
        this.cameraz=30;
        this.cameray=30; console.log(this.camerax+ " " +this.cameray+ " " +this.cameraz);
        this.cameratx=this.x+2*Math.cos(this.dir);
        this.cameratz=(this.z-2*Math.sin(this.dir));

    };

    updateDir() {
      if(this.carspeed>0){
        this.dir += this.rodasdir * this.mc * 0.1;
      } else if(this.carspeed<0)
        this.dir -= this.rodasdir * this.mc * 0.1;
      if(this.rodasback){
          if(this.rodasdir > 0)
          this.rodasdir -= 0.01*Math.abs(this.carspeed);
          else if(this.rodasdir < 0)
          this.rodasdir += 0.01*Math.abs(this.carspeed);
      }
    };

    move(speed) {
        this.x += this.mc * speed * Math.cos(this.dir);
        this.z -= this.mc * speed * Math.sin(this.dir);
        if(speed>0)
        this.rotateFront(speed);
        else
        this.rotateBack(speed);
    };

    setPosition(x,z){
        this.x = x;
        this.z = z;
    };

    setRotation(angle){
        this.dir=angle;
    };

    rotateFront(speed){
        this.rodasrotdir -= this.mc * speed * 0.5;
    }

    rotateBack(speed){
        this.rodasrotdir-= this.mc * speed * 0.5;
    }

    incRodasdir(angle){
        this.rodasdir+=angle;
    }

    display() {

        let c = 0.5;
        /*console.log(this.scene.getUpdatePeriod());
        debugger;
        console.log(this.x, this.z, this.dir);*/
        //corpo
        this.scene.pushMatrix(); {

            this.scene.translate(this.x, 0, this.z);
            this.scene.translate(-1.2,0,0);
            this.scene.rotate(this.dir, 0, 1, 0);
            this.scene.translate(1.2,0,0);

            this.scene.pushMatrix();
            {
                this.scene.scale(5, 1.5, 1);
                this.scene.translate(0, 1, 0);
                this.cubo.display();
            }
            this.scene.popMatrix();

            this.scene.pushMatrix();
            {
                this.scene.rotate(Math.PI/2, 0, 1, 0);
                this.scene.translate(1, 1.8, 1.5);
                this.scene.scale(0.3, 0.3, 0.3);
                this.carLight.apply();
                this.farol.display();
                this.scene.translate(-2/0.3, 0, 0);
                this.farol.display();
                
            }
            this.scene.popMatrix();

            //rodas

                //rodafe
                this.scene.pushMatrix(); {
                    this.scene.translate(0, 1, 0);
                    this.scene.translate(2.5, -0.5, -1.25);
                    this.scene.rotate(this.rodasdir,0,1,0);
                    this.scene.rotate(this.rodasrotdir, 0, 0, 1);
                    this.tyre2Text.apply();
                    this.scene.scale(c, c, c);
                    this.rodafe.display();
                    this.scene.translate(0, 0, -0.5);
                    this.scene.rotate(Math.PI, 1, 0, 0);
                    this.tyreText.apply();
                    this.facefe.display();
                    this.scene.materialDefault.apply();

                }
                this.scene.popMatrix();


                this.scene.pushMatrix(); {
                    this.scene.translate(0, 1, 0);
                    this.scene.translate(2.5, -0.5, 1.25);
                    this.scene.rotate(this.rodasdir,0,1,0);
                        this.scene.rotate(this.rodasrotdir, 0, 0, 1);
                        this.tyre2Text.apply();
                        this.scene.scale(c, c, c);
                    this.rodafd.display();
                    this.scene.translate(0, 0, 0.5);
                    this.tyreText.apply();
                    this.facefd.display();
                    this.scene.materialDefault.apply();

                }
                this.scene.popMatrix();


                this.scene.pushMatrix(); {
                    this.scene.translate(0, 1, 0);
                    this.scene.translate(-2.5, -0.5, -1.25);
                        this.scene.rotate(this.rodasrotdir, 0, 0, 1);
                        this.tyre2Text.apply();
                        this.scene.scale(c, c, c);
                    this.rodate.display();
                    this.scene.translate(0, 0, -0.5);
                    this.scene.rotate(Math.PI, 1, 0, 0);
                    this.tyreText.apply();
                    this.facete.display();
                    this.scene.materialDefault.apply();
                }
                this.scene.popMatrix();

                this.scene.pushMatrix(); {
                    this.scene.translate(0, 1, 0);
                    this.scene.translate(-2.5, -0.5, 1.25);
                        this.scene.rotate(this.rodasrotdir, 0, 0, 1);
                        this.tyre2Text.apply();
                        this.scene.scale(c, c, c);
                    this.rodatd.display();
                    this.scene.translate(0, 0, 0.5);
                    this.tyreText.apply();
                    this.facetd.display();
                    this.scene.materialDefault.apply();
                }

            this.scene.popMatrix();
        }

    
        this.scene.pushMatrix();
        {
            this.scene.translate(-0.4, 1.5, 1);
            this.scene.scale(2.8, 1.5, 1);
            this.sides.display();
            this.scene.translate(0, 0, -2);
            this.sides.display();
            

        }this.scene.popMatrix();

        this.scene.popMatrix();

        

    };


    update(time)
    {

        this.updateDir();

        this.cameratimer++;
      this.move(this.carspeed);

      //    atrito
      if(this.carspeed > 0){
      this.incSpeed(-0.05);
      if(this.carspeed<0)
      this.carspeed=0;
      }
      else if (this.carspeed < 0){
      this.incSpeed(0.05);
      if(this.carspeed>0)
      this.carspeed=0;
      }
      if(this.currentCamera==0){
      this.updatecamera0();
      }
      else if(this.currentCamera==1){
      this.updatecamera1();
      }
      else if(this.currentCamera==2){
      this.updatecamera2();
      }
    }

};

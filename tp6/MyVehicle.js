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
        this.rdir = 0;
        this.mc = 0.3; // magic const
        this.carspeed=0;

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

        this.clockText = new CGFappearance(this.scene);
    this.clockText.loadTexture("../resources/images/clock.png");
    this.clockText.setAmbient(0.2,0.2,0.2,0.0);
    this.clockText.setDiffuse(0.2, 0.2, 0.2, 1);
    this.clockText.setSpecular(0.5, 0.5, 0.5,1);
    this.clockText.setShininess(1);

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
        console.log("camera1");
        this.cameratx=this.x+15*Math.cos(this.dir);
        this.cameratz=(this.z-15*Math.sin(this.dir));
        this.camerax=this.x+6*Math.cos(this.dir+Math.PI);
        this.cameraz=(this.z-6*Math.sin(this.dir+Math.PI));
        this.cameray=4;
    };

    updatecamera1(){
        console.log("camera2");
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

    turnRight(c) {
      if(this.carspeed!=0){
        this.dir -= c * this.mc * 0.1;
      }
    };

    turnLeft(c) {
      if(this.carspeed!=0){
        this.dir += c * this.mc * 0.1;
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



    rotateFront(speed){
        this.rdir -= this.mc * speed * 0.5;
    }

    rotateBack(speed){
        this.rdir-= this.mc * speed * 0.5;
    }

    display() {
        /*console.log(this.scene.getUpdatePeriod());
        debugger;
        console.log(this.x, this.z, this.dir);*/
        //corpo
        this.scene.pushMatrix(); {

            this.scene.translate(this.x, 0, this.z);
            this.scene.rotate(this.dir, 0, 1, 0);


            this.scene.pushMatrix(); {
                this.scene.scale(5, 2, 2.5);
                this.scene.translate(0, 0.5, 0);
                this.cubo.display();
            }

            this.scene.popMatrix();

            //rodas

                //rodafe
                this.scene.pushMatrix(); {
                    this.scene.translate(0, 1, 0);
                    this.scene.translate(2.5, 0, -1.25);
                        this.scene.rotate(this.rdir, 0, 0, 1);
                    this.rodafe.display();
                    this.scene.translate(0, 0, -0.5);
                    this.scene.rotate(Math.PI, 1, 0, 0);
                    this.clockText.apply();
                    this.facefe.display();
                    this.scene.materialDefault.apply();

                }
                this.scene.popMatrix();


                this.scene.pushMatrix(); {
                    this.scene.translate(0, 1, 0);
                    this.scene.translate(2.5, 0, 1.25);
                        this.scene.rotate(this.rdir, 0, 0, 1);
                    this.rodafd.display();
                    this.scene.translate(0, 0, 0.5);
                    this.clockText.apply();
                    this.facefd.display();
                    this.scene.materialDefault.apply();

                }
                this.scene.popMatrix();


                this.scene.pushMatrix(); {
                    this.scene.translate(0, 1, 0);
                    this.scene.translate(-2.5, 0, -1.25);
                        this.scene.rotate(this.rdir, 0, 0, 1);
                    this.rodate.display();
                    this.scene.translate(0, 0, -0.5);
                    this.scene.rotate(Math.PI, 1, 0, 0);
                    this.clockText.apply();
                    this.facete.display();
                    this.scene.materialDefault.apply();
                }
                this.scene.popMatrix();

                this.scene.pushMatrix(); {
                    this.scene.translate(0, 1, 0);
                    this.scene.translate(-2.5, 0, 1.25);
                        this.scene.rotate(this.rdir, 0, 0, 1);
                    this.rodatd.display();
                    this.scene.translate(0, 0, 0.5);
                    this.clockText.apply();
                    this.facetd.display();
                    this.scene.materialDefault.apply();
                }

            this.scene.popMatrix();
        }



        this.scene.popMatrix();

    };


    update(time)
    {
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

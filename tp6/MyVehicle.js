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

        this.cubo = new MyUnitCubeQuad(this.scene);
        // TODO Nao sei se e preciso repetir as faces/rodas
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

    turnRight(c) {
        this.dir -= c * this.mc * 0.1;
    };

    turnLeft(c) {
        this.dir += c * this.mc* 0.1;
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


    update(time) {}

};

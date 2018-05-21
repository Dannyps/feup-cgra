/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCrane extends CGFobject {
    constructor(scene) {
        super(scene);

        this.x = 0;
        this.z = 0;
        this.dir = 0;
        this.rdir = 0;
        this.anglebase = 0;
        this.bracorot = Math.PI/3;
        this.rotY = 0;      //  0 no eixo dos x
        this.braco1size = 10;
        this.braco2size = 4;
        this.imanraio = 1.5;
        this.fiosize = 3;

        this.carlocked=false;

        this.carro= new MyVehicle(scene);

        //  BASEe IMAN
        this.base = new MyCylinder(scene,30,2);
        //  BRACO
        this.braco = new MyPrism(scene,4,10);
        //RODA SUPERIOR
        this.rodasup = new MyCylinder(scene,30,2);
        //FACES
        this.face = new Circle(scene,30);
        //ESFERA
        this.esfera = new MySemiSphere(scene,30,30);
        //FIOS
        this.fio = new MyCylinder(scene,20,20);

    };

    incBraco1rot(angle){
        this.bracorot+=angle;
        console.log(this.bracorot);
    };

    incBraco2rot(angle){
        this.anglebase+=angle;
        console.log(this.anglebase);
    };

    incBraco1length(rsize){
        this.braco1size+=rsize;
    };

    incBraco2length(rsize){
        this.braco2size+=rsize;
    };

    incRoty(angle){
        this.rotY+=angle;
    };

    display() {

        this.scene.pushMatrix();
        this.scene.rotate(this.rotY,0,1,0);

            //  BASE
            this.scene.pushMatrix();
                this.scene.scale(1,0.6,1);
                this.scene.translate(0,0.5,0);
                this.scene.rotate(-Math.PI/2,1,0,0);
                this.base.display();
            this.scene.popMatrix();
            //  FACE BASE
            this.scene.pushMatrix();
                this.scene.translate(0,0.6,0);
                this.scene.rotate(-Math.PI/2,1,0,0);
                this.face.display();
            this.scene.popMatrix();

        //  BRACO 1
            this.scene.pushMatrix();
                this.scene.rotate(this.anglebase,0,0,1);
                this.scene.translate(0,0.5,0);
                this.scene.scale(0.5,this.braco1size,0.5);
                this.scene.translate(0,0.5,0);
                this.scene.rotate(Math.PI/4,0,1,0);
                this.scene.rotate(Math.PI/2,1,0,0);
                this.braco.display();
            this.scene.popMatrix();

            //  RODA SUPERIOR

            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2,this.braco1size*Math.cos(this.anglebase)+0.3,0);
                this.rodasup.display();
            this.scene.popMatrix();
            //  FACE FRONTAL RODA SUPERIOR
            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2,this.braco1size*Math.cos(this.anglebase)+0.3,0.5);
                this.face.display();
            this.scene.popMatrix();
            //  FACE BACKAL RODA SUPERIOR
            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2,this.braco1size*Math.cos(this.anglebase)+0.3,-0.5);
                this.scene.rotate(Math.PI,1,0,0);
                this.face.display();
            this.scene.popMatrix();
            //ESFERA (PA FICAR BONITO)
            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2,this.braco1size*Math.cos(this.anglebase)+0.3,0);
                this.scene.scale(0.8,0.8,0.8);
                this.esfera.display();
                this.scene.rotate(Math.PI,1,0,0);
                this.esfera.display();
            this.scene.popMatrix();

        //  BRACO 2

            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2,this.braco1size*Math.cos(this.anglebase)+0.3,0);
                this.scene.rotate(-Math.PI/2-this.bracorot,0,0,1);
                this.scene.scale(0.5,this.braco2size,0.5);
                this.scene.translate(0,0.5,0);
                this.scene.rotate(Math.PI/4,0,1,0);
                this.scene.rotate(Math.PI/2,1,0,0);
                this.braco.display();
            this.scene.popMatrix();

            //ESFERA do IMAN

            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2 + this.braco2size*Math.cos(this.bracorot),this.braco1size*Math.cos(this.anglebase)+0.3 - this.braco2size*Math.sin(this.bracorot),0);
                this.scene.scale(0.7,0.7,0.7);
                this.esfera.display();
                this.scene.rotate(Math.PI,1,0,0);
                this.esfera.display();
            this.scene.popMatrix();

            //FIOS do IMAN
            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2 + this.braco2size*Math.cos(this.bracorot),this.braco1size*Math.cos(this.anglebase)+0.3 - this.braco2size*Math.sin(this.bracorot),0);
                this.scene.rotate(Math.PI/2,0,1,0);
                this.scene.rotate(Math.PI/7,1,0,0);//fazer em relacao ao tamanho do iman
                this.scene.translate(0,-this.fiosize/2,0);
                this.scene.scale(0.07,this.fiosize,0.07);
                this.scene.rotate(Math.PI/2,1,0,0);
                this.fio.display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2 + this.braco2size*Math.cos(this.bracorot),this.braco1size*Math.cos(this.anglebase)+0.3 - this.braco2size*Math.sin(this.bracorot),0);
                this.scene.rotate(Math.PI,0,1,0);
                this.scene.rotate(Math.PI/7,1,0,0);//fazer em relacao ao tamanho do iman
                this.scene.translate(0,-this.fiosize/2,0);
                this.scene.scale(0.07,this.fiosize,0.07);
                this.scene.rotate(Math.PI/2,1,0,0);
                this.fio.display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2 + this.braco2size*Math.cos(this.bracorot),this.braco1size*Math.cos(this.anglebase)+0.3 - this.braco2size*Math.sin(this.bracorot),0);
                this.scene.rotate(3*Math.PI/2,0,1,0);
                this.scene.rotate(Math.PI/7,1,0,0);//fazer em relacao ao tamanho do iman
                this.scene.translate(0,-this.fiosize/2,0);
                this.scene.scale(0.07,this.fiosize,0.07);
                this.scene.rotate(Math.PI/2,1,0,0);
                this.fio.display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2 + this.braco2size*Math.cos(this.bracorot),this.braco1size*Math.cos(this.anglebase)+0.3 - this.braco2size*Math.sin(this.bracorot),0);
                this.scene.rotate(Math.PI/7,1,0,0);//fazer em relacao ao tamanho do iman
                this.scene.translate(0,-this.fiosize/2,0);
                this.scene.scale(0.07,this.fiosize,0.07);
                this.scene.rotate(Math.PI/2,1,0,0);
                this.fio.display();
            this.scene.popMatrix();

            //  IMAN

            this.scene.pushMatrix();
                this.scene.translate(0,-2.8,0);
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2 + this.braco2size*Math.cos(this.bracorot),this.braco1size*Math.cos(this.anglebase)+0.3 - this.braco2size*Math.sin(this.bracorot),0);
                this.scene.scale(this.imanraio,0.4,this.imanraio);
                this.scene.rotate(Math.PI/2,1,0,0);
                this.base.display();
                this.scene.translate(0,0,0.5);
                this.face.display();
                this.scene.translate(0,0,-1);
                this.scene.rotate(Math.PI,1,0,0);
                this.face.display();
            this.scene.popMatrix();

            //  CARRO

            if(this.carlocked){
            this.scene.pushMatrix();
                this.scene.translate(-this.braco1size*Math.sin(this.anglebase)+0.2 + this.braco2size*Math.cos(this.bracorot),this.braco1size*Math.cos(this.anglebase)+0.3 - this.braco2size*Math.sin(this.bracorot)-5,0);
                this.carro.display();
            this.scene.popMatrix();
            }

        this.scene.popMatrix();

    };



    update(timer,carrox,carroz,carspeed)
    {
        if(carrox<1 && carrox>-2 && carroz>-21 && carroz<-18 && carspeed<0.5){
            if(timer>0 && timer < 160)
            this.braco1size+=0.04;
            if(timer>30 && timer < 160)
            this.anglebase-=0.005;
            if(timer>70 && this.rotY<Math.PI/2 && timer < 400)
            this.rotY+=0.005;
            if(timer > 180 && timer < 220)
            this.braco2size+=0.05;
            if(timer > 400 && timer < 480){
            this.anglebase-=0.005;
            this.bracorot-=0.005;
            }
            if(timer == 480){
                this.carlocked=true;
            }
            if(timer > 540 && timer < 650){
            this.anglebase+=0.005;
            this.bracorot+=0.005
            }
            if(timer > 600){
                this.rotY-=0.005;
            }

            
        }
    }

};

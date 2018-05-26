/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTest extends CGFobject {        //varrimento. n da
    constructor(scene) {
        super(scene);


    this.i=0;
    this.circulos = [this.circulo,
    this.circulo1,
    this.circulo2,
    this.circulo3,
    this.circulo4,
    this.circulo5,
    this.circulo6,
    this.circulo7,
    this.circulo8,
    this.circulo9,
    ];
    this.angle=0;

    var i;
    for (i = 0; i < this.circulos.length; i++) {
        this.circulos[i] = new Circle(scene,20,20);
    }
        
        this.clockText = new CGFappearance(this.scene);
    this.clockText.loadTexture("../resources/images/clock.png");
    this.clockText.setAmbient(0.2,0.2,0.2,0.0);
    this.clockText.setDiffuse(0.2, 0.2, 0.2, 1);
    this.clockText.setSpecular(0.5, 0.5, 0.5,1);
    this.clockText.setShininess(1);

    };

    display() {
        this.scene.pushMatrix();
            this.scene.pushMatrix();
                this.circulos[0].display();
            this.scene.rotate(this.angle,0,0,1);
                this.circulos[1].display();
            this.scene.rotate(this.angle+0.1,0,0,1);
                this.circulos[2].display();
            this.scene.rotate(this.angle+0.2,0,0,1);
                this.circulos[3].display();
            this.scene.rotate(this.angle+0.3,0,0,1);
                this.circulos[4].display();
            this.scene.rotate(this.angle+0.4,0,0,1);
                this.circulos[5].display();
            this.scene.rotate(this.angle+0.5,0,0,1);
                this.circulos[6].display();
            this.scene.rotate(this.angle+0.6,0,0,1);
                this.circulos[7].display();
            this.scene.rotate(this.angle+0.7,0,0,1);
                this.circulos[8].display();
            this.scene.rotate(Math.PI/2,0,0,1);
                this.circulos[9].display();
            this.scene.popMatrix();
        this.scene.popMatrix();

    };


    update(time)
    {
    }

};

/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks) 
	{
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        
        this.initBuffers();

    };
    
    addToIndices(v){
        if ( typeof this.addToIndices.counter == 'undefined' ) {
            // It has not... perform the initialization
            this.addToIndices.counter = 0;
        }
        console.log("Adding index "+v + " to prism.");
        this.indices.push(v);
        if(++this.addToIndices.counter==3){
            console.log("\n");
            this.addToIndices.counter=0;
        }
    };

    initBuffers() 
	{
        let angle = 0;
        let angleIncrement=2*Math.PI/this.slices;


        // Define vertices
        this.vertices = [];

        for(let i = 0; i < this.slices; i++){
            this.vertices.push(Math.cos(angle));
            this.vertices.push(Math.sin(angle));
            this.vertices.push(0.5);

            //repeat this vertix
            this.vertices.push(Math.cos(angle));
            this.vertices.push(Math.sin(angle));
            this.vertices.push(0.5);
            angle+=angleIncrement;
        }

        for(let i = 0; i < this.slices; i++){
            this.vertices.push(Math.cos(angle));
            this.vertices.push(Math.sin(angle));
            this.vertices.push(-0.5);

            // repeat this vertix
            this.vertices.push(Math.cos(angle));
            this.vertices.push(Math.sin(angle));
            this.vertices.push(-0.5);

            angle+=angleIncrement;
        }

        


        /*
		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
		];*/

        // Define indices
        this.indices = [];


        for(var i = 1; i < this.slices*2; i+=2){
            this.addToIndices(i);
            this.addToIndices(i+this.slices*2);
            if(i==this.slices*2-1){
                this.addToIndices(this.slices*2);
            }else{
                this.addToIndices(i+this.slices*2+1);
            }   
        }
        console.log("Switch");

        for(var i = 1; i < this.slices*2; i+=2){
            if(i==this.slices*2-1){
                this.addToIndices(this.slices*2);
                this.addToIndices(0);
            }else{
                this.addToIndices(i+this.slices*2+1);
                this.addToIndices(i+1);
            }
            
            this.addToIndices(i);
            
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};


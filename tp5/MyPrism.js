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
        
        this.debug=false;
        this.initBuffers();

    };
    
    addToIndices(v){
        if ( typeof this.addToIndices.counter == 'undefined' ) {
            // It has not... perform the initialization
            this.addToIndices.counter = 0;
            this.addToIndices.counterT = 0;
        }
        if(this.debug) console.log("Adding "+Math.floor(this.addToIndices.counterT++/3) +"th index "+v + " to prism.");
        this.indices.push(v);
        if(++this.addToIndices.counter==3){
            if(this.debug) console.log("\n");
            this.addToIndices.counter=0;
        }
    };
    addToNormals(v){
        if ( typeof this.addToNormals.counter == 'undefined' ) {
            // It has not... perform the initialization
            this.addToNormals.counter = 0;
        }
        if(this.debug)  console.log("Adding normal "+v + " to prism.");
        this.normals.push(v);
        if(++this.addToNormals.counter==3){
            if(this.debug) console.log("\n");
            this.addToNormals.counter=0;
        }
    };
    addToVertices(v){
        if ( typeof this.addToVertices.counter == 'undefined' ) {
            // It has not... perform the initialization
            this.addToVertices.counter = 0;
            this.addToVertices.counterT = 0;
        }
        if(this.debug) console.log("Adding "+Math.floor(this.addToVertices.counterT++/3) +"th vertix "+v + " to prism.");
        this.vertices.push(v);
        if(++this.addToVertices.counter==3){
            if(this.debug) console.log("\n");
            this.addToVertices.counter=0;
        }
    };

    initBuffers() 
	{
       

        // Define vertices
        this.vertices = [];
        let angleIncrement=2*Math.PI/this.slices;
        let zInc=1/this.stacks;
        let z = 0.5;
        for(let i = 0; i <= this.stacks; i++){
            console.log(z);
            let angle = 0;
            

            for(let j = 0; j < this.slices; j++){
                this.addToVertices(Math.cos(angle));
                this.addToVertices(Math.sin(angle));
                this.addToVertices(z);
    
                if(j != 0){ //repeat this vertix
                    this.addToVertices(Math.cos(angle));
                    this.addToVertices(Math.sin(angle));
                    this.addToVertices(z);
                }
                if(j==this.slices-1){
                    this.addToVertices(Math.cos(0));
                    this.addToVertices(Math.sin(0));
                    this.addToVertices(z); 
                }
                angle+=angleIncrement;
            }
            z-=zInc;
        }

        
    

        
       this.normals = [];
        let angle=2*Math.PI/this.slices/2;
        for(let i = 0; i <= this.slices*this.stacks*2; i++){
            this.addToNormals(Math.cos(angle));
            this.addToNormals(Math.sin(angle));
            this.addToNormals(0);
            this.addToNormals(Math.cos(angle));
            this.addToNormals(Math.sin(angle));
            this.addToNormals(0);
            angle+=angleIncrement;
        }

        // Define indices
        this.indices = [];

        for(let i = 0; i < this.stacks;i++){
            
            console.log("%cStack "+i, "color:#0aa");

            for(var j = i*this.slices*2; j < this.slices*(i+1)*2; j+=2){
                this.addToIndices(j+1);
                this.addToIndices(j);
                this.addToIndices(j+this.slices*2);
            }
            //debugger;
            console.log("%cSwitch", "color:#f00");

            for(var j = i*this.slices*2; j < this.slices*(i+1)*2; j+=2){
                this.addToIndices(j+this.slices*2);
                this.addToIndices(j+this.slices*2+1);
                this.addToIndices(j+1);
            }
            //debugger;
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};


/**
 * MyLamp
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject
{
	constructor(scene, slices, stacks, sr = 1, tr = 1) 
	{
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.sr=sr;
        this.tr=tr;
        
        this.initBuffers();

    };
    
    addToIndices(v){
        if ( typeof this.addToIndices.counter == 'undefined' ) {
            // It has not... perform the initialization
            this.addToIndices.counter = 0;
            this.addToIndices.counterT = 0;
        }
        //console.log("Adding "+Math.floor(this.addToIndices.counterT++/3) +"th index "+v + " to cylinder.");
        this.indices.push(v);

        if(++this.addToIndices.counter==3){
            //console.log("\n");
            this.addToIndices.counter=0;
        }
    };
    addToNormals(v){
        if ( typeof this.addToNormals.counter == 'undefined' ) {
            // It has not... perform the initialization
            this.addToNormals.counter = 0;
        }
        //console.log("Adding normal "+v + " to cylinder.");
        this.normals.push(v);
        if(++this.addToNormals.counter==3){
            //console.log("\n");
            this.addToNormals.counter=0;
        }
    };
    addToVertices(v){
        if ( typeof this.addToVertices.counter == 'undefined' ) {
            // It has not... perform the initialization
            this.addToVertices.counter = 0;
            this.addToVertices.counterT = 0;
        }
        //console.log("Adding "+Math.floor(this.addToVertices.counterT++/3) +"th vertix "+v + " to cylinder.");
        this.vertices.push(v);
        if(++this.addToVertices.counter==3){
            //console.log("\n");
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
            //console.log(z);
            let angle = 0;
            

            for(let j = 0; j < this.slices; j++){
                this.addToVertices(Math.cos(angle));
                this.addToVertices(Math.sin(angle));
                this.addToVertices(z);
                angle+=angleIncrement;
            }
            z-=zInc;
        }

        this.normals = [];
        let angle=0;
        for(let i = 0; i <= this.slices*this.stacks*2; i++){
            this.addToNormals(Math.cos(angle));
            this.addToNormals(Math.sin(angle));
            this.addToNormals(0);
            angle+=angleIncrement;
        }

        // Define indices
        this.indices = [];

        for(let i = 0; i < this.stacks;i++){
            

            for(var j = i*this.slices; j < this.slices*(i+1); j++){
                if(j+1==this.slices*(i+1)){
                    this.addToIndices(i*this.slices);
                }else{
                    this.addToIndices(j+1);
                }
                this.addToIndices(j);
                this.addToIndices(j+this.slices);
            }
            //debugger;

            for(var j = i*this.slices; j < this.slices*(i+1); j++){
                                
                this.addToIndices(j+this.slices);
                
                if(j+this.slices+1==this.slices*(i+2)){
                    this.addToIndices((i+1)*this.slices);
                }else{
                    this.addToIndices(j+this.slices+1);
                }

                if(j+1==this.slices*(i+1)){
                    this.addToIndices(i*this.slices);
                }else{
                    this.addToIndices(j+1);
                }

                
            }
            //debugger;
        }

        this.texCoords = [];

        for(let i = 0; i<=this.stacks;i++){
            let t=(this.stacks-i)/this.stacks;
            for(let j = 0; j < this.slices;j++){
                let s=(this.slices-1-j)/(this.slices-1);
                this.texCoords.push(s*this.sr,t*this.tr);
            }
        }

        //console.log(this.texCoords);
    
        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};


/**
 * MySemiSphere
 * @constructor
 */
class MySemiSphere extends CGFobject 
{
    constructor(scene,slices,stacks)
    {
        super(scene);

    this.slices = slices;
    this.stacks = stacks;


    this.initBuffers();
};

initBuffers() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var theta = 2 * Math.PI / this.slices;
    var fi = (Math.PI / 2) / this.stacks;

    for (let j = 0; j <= this.stacks; j++) {

        for (let i = 0; i <= this.slices; i++) {
            this.vertices.push(Math.cos(theta * i) * Math.cos(fi * j), Math.sin(theta * i) * Math.cos(fi * j), Math.sin(fi * j));
            this.normals.push(Math.cos(theta * i) * Math.cos(fi * j), Math.sin(theta * i) * Math.cos(fi * j), Math.sin(fi * j));
            this.texCoords.push(i * 1 / this.slices, j * 1 / this.stacks);
        }
    }


    for (let i = 0; i < this.stacks; i++) {
        for (let j = 0; j < this.slices; j++) {

            this.indices.push(i * (this.slices + 1) + j, i * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + j);
            this.indices.push(i * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + j);
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    };
};
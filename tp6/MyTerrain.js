/**
 * MyQuad
 * @constructor
 */
class MyTerrain extends Plane
{

	constructor(scene, ndivs, altimetry){
		super(scene, ndivs, ndivs, 0, ndivs, 0, altimetry);        
	}
};
/**
 * @author grey-eminence / http://www.grey-eminence.org/
 */

var ThreeDIT = { REVISION: '1' };

ThreeDIT.Name = 2;
ThreeDIT.json;

var loadedObjects;
var callbacks = [];

ThreeDIT.LoadCity = function( fileName ) {

	var loader = new THREE.OBJMTLLoader();
	callbacks[0] = function ( object ) { ThreeDIT.AddObjectsToScene( object, 0 ) };
	callbacks[1] = function ( object ) { ThreeDIT.AddObjectsToScene( object, 1 ) };
	callbacks[2] = function ( object ) { ThreeDIT.AddObjectsToScene( object, 2 ) };
	callbacks[3] = function ( object ) { ThreeDIT.AddObjectsToScene( object, 3 ) };
	callbacks[4] = function ( object ) { ThreeDIT.AddObjectsToScene( object, 4 ) };
	callbacks[5] = function ( object ) { ThreeDIT.AddObjectsToScene( object, 5 ) };
	callbacks[6] = function ( object ) { ThreeDIT.AddObjectsToScene( object, 6 ) };
	callbacks[7] = function ( object ) { ThreeDIT.AddObjectsToScene( object, 7 ) };

	$.getJSON(fileName, function(json) {
   
	    ThreeDIT.json = json;
	    
	    for (var i = 0; i < json.models.length; i++) {
	 
		    loader.load( json.models[i].url, json.models[i].url_mtl, callbacks[i] );
  
		}

	});
	
};

ThreeDIT.AddObjectsToScene = function( object, id ) {

	for ( var j = 0; j < ThreeDIT.json.models[id].instances.length; j++ ) {

		//console.log("dupa " + ThreeDIT.json.models[id].instances[j].position);
		var objectClone = object.clone();
		objectClone.position = new THREE.Vector3(ThreeDIT.json.models[id].instances[j].position[0], ThreeDIT.json.models[id].instances[j].position[1], ThreeDIT.json.models[id].instances[j].position[2]);
		objectClone.rotation.y = ThreeDIT.json.models[id].instances[j].rotation[1] * Math.PI/180;
		scene.add( objectClone );

/*
		if(id == 6)
		{
			objectClone.traverse( function ( object ) {
				if ( object instanceof THREE.Mesh ) {
					object.castShadow = true;
					object.receiveShadow = true;
					//console.log("dupsadas" + object.material.name);
					if(object.material.name == "MaterialRoof_Brown") {

						object.material.map.repeat.set( 50, 50 );

					}

				}
			} );
		}
		
		objectClone.traverse( function ( object ) {
			if ( object instanceof THREE.Mesh ) {
				object.castShadow = true;
				object.receiveShadow = true;
			}
		} );
		*/
	}
}

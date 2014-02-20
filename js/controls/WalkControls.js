/**
 * @author Jacek Jankowski / http://grey-eminence.org/
 */

WalkControls = function ( object, renderFunction, domElement ) {

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.render = renderFunction;
	this.enabled = true;	
	this.turnSpeedFactor = 1.0;
	this.movementSpeedFactor = 1.0;
	this.cameraHeight = 4.0;

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( object );
	var yawObject = new THREE.Object3D();
	yawObject.add( pitchObject );

	var scope = this;
	var movementSpeed = 0;
	var turnSpeed = 0;
	var mouseDownPosition = new THREE.Vector2();
	var mouseUpPosition = new THREE.Vector2();

	this.getObject = function () {

		return yawObject;

	};

	this.update = function () {

		if ( scope.enabled === false ) return;
		
		yawObject.translateZ(movementSpeed);
		yawObject.position.y = this.cameraHeight;
		yawObject.rotation.y += turnSpeed;

		if ( movementSpeed !== 0 || turnSpeed !== 0 ) render();

	};

	function onMouseDown( event ) {

		if ( scope.enabled === false ) { return; }
		event.preventDefault();

		if ( event.button === 0 ) {

			mouseDownPosition.set( event.clientX, event.clientY );
			scope.domElement.addEventListener( 'mousemove', onMouseMove, false );
			scope.domElement.addEventListener( 'mouseup', onMouseUp, false );

		} 

	}

	function onMouseUp( /* event */ ) {

		if ( scope.enabled === false ) return;
		event.preventDefault();

		if ( event.button === 0 ) {

			turnSpeed = 0;
			movementSpeed = 0;
			scope.domElement.removeEventListener( 'mousemove', onMouseMove, false );
			scope.domElement.removeEventListener( 'mouseup', onMouseUp, false );

		}

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;
		event.preventDefault();

		turnSpeed = ( event.clientX - mouseDownPosition.x ) * -0.00003 * scope.turnSpeedFactor;
		movementSpeed = ( event.clientY - mouseDownPosition.y ) * 0.001 * scope.movementSpeedFactor;

	}


	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
	this.domElement.addEventListener( 'mousedown', onMouseDown, false );

};
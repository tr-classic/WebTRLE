class TR{
  constructor(scene){
    this.scene = scene ;
    this.object = new THREE.Object3D() ;
    this.object.rotation.y = Math.PI ;
    this.scene.add(this.object) ;
    this.view = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 20 ) ;
		this.animations = [] ;
		this.animations_mixer = [] ;

    this.object.add(this.view) ;

    //this.view.lookAt(0, 1.5,0) ;
		//this.view.position.set(0,1.5,-2) ;

    this.refresh() ;

    this.hand = null ;
  }

  refresh(){
    this.view.lookAt(this.object.position.x,this.object.position.y+1.5,this.object.position.z) ;
  }

  load(){
    // instantiate a loader
    var sc = this.scene ;
    var obj = this.object ;
    this.object.rotateY(Math.PI) ;


    var axesHelper = new THREE.AxesHelper( 0.2 );
    obj.add( axesHelper );

    var loader = new THREE.GLTFLoader();
    var model ;
    var skeleton ;
    var mixer ;
		var animm;
		var idleAction ;

		var instance = this ;
		var fct = function (gltf) {

  		model = gltf.scene;

  		model.traverse(function (object) {

  			object.castShadow = true;
				if(object.name == "RHand"){
					instance.hand = object ;
					object.children = [] ;
				}

  		});

      model.castShadow = true; //default is false
      model.receiveShadow = true; //default

      obj.add(model) ;

  		skeleton = new THREE.SkeletonHelper(model);
  		skeleton.visible = false;
  		obj.add(skeleton);

  		instance.animations_mixer = new THREE.AnimationMixer(model);

  		idleAction = instance.animations_mixer.clipAction(gltf.animations[0]);
			idleAction.loop = false ;
			idleAction.setLoop( THREE.LoopOnce );
	  	idleAction.clampWhenFinished = true;
			instance.animations.push(idleAction) ;

			document.getElementById("loading").style = "display:none;" ;
  	} ;

  	loader.load('/src/obj/tr.glb', fct);
  }

  getTorch(){
		//*
    if(this.hand.children.length != 0){
      console.info("vous avez deja une torche") ;
      return ;
    }
		//*/

		this.animations[0].play().reset() ;

    this.hand.add(new THREE.Object3D()) ;
    //this.object.add(this.hand.) ;
    //this.hand.position.set(-.62,1.4,0) ;
    var geometry = new THREE.CylinderGeometry( .01, .01, .1, 5 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cylinder = new THREE.Mesh( geometry, material );
    this.hand.add( cylinder );


    var pointLight = new THREE.PointLight( 0x00ff00, 1, 2 );
    pointLight.position.set( 0, 0, 0);
    pointLight.castShadow = true ;
    this.hand.add( pointLight );

    var instance = this ;

    var _timeout = function(){
      var tick = 30 ;
      var x = setInterval(function(){
        tick-- ;

        pointLight.intensity = Math.random() ;
        material.color.g = pointLight.intensity;

        if(tick==0){
          clearInterval(x) ;

					instance.hand.children=[];
        }
      },50) ;
    }

    setTimeout(_timeout, 28000);
  }
}

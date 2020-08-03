function createCube(){
  var geometry = new THREE.BoxGeometry( .1, .1, .1 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var cube = new THREE.Mesh( geometry, material );
  return cube ;
}

function moveTo(object, end, time){
  var animation = 0 ;
  var beg = new THREE.Vector3(object.position.x,object.position.y,object.position.z) ;
  var x = setInterval(function(){
    animation+=10 ;
    if(animation > time)
      animation = time ;

    var avancement = (animation/time) ;
    object.position.set(
      beg.x+((end.x-beg.x)*avancement),
      beg.y+((end.y-beg.y)*avancement),
      beg.z+((end.z-beg.z)*avancement),
    ) ;
    if(animation >= time){
      console.log("animation terminated") ;
      clearInterval(x) ;
    }
  }, 10);
}


function init(){
  edit.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 20 ) ;
  edit.camera.position.set(0,0,1) ;
  edit.camera.lookAt(0,0,0) ;
  edit.controls = new THREE.TransformControls(edit.camera, container) ;
  edit.orbit = new THREE.OrbitControls( edit.camera, container );
  edit.orbit.update();
  edit.update = function(){
    edit.orbit.update() ;
    edit.target_marker.position.set(edit.orbit.target.x,edit.orbit.target.y,edit.orbit.target.z) ;
  }

  edit.target_marker = new THREE.AxesHelper( 0.1 );


  cameras.push(edit.camera) ;
}

var scene;
var renderer ;
var edit = {} ;

var active_camera;
var cameras =[];

let container = document.getElementById( 'three_env' );

var map = new Map() ;

if(container == null){
  console.error("Pas d'élément nommé 'three_env' dans le html") ;
}else{
  var scene = new THREE.Scene();
  {
  	const color = 0x000000;  // white
    const near = 1;
    const far = 20;
    scene.fog = new THREE.Fog(color, near, far);
  }
  var clock = new THREE.Clock() ;


  init() ;
  scene.add(edit.target_marker) ;

  var active_camera = edit.camera ;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  var tr = new TR(scene) ;
  tr.load() ;

	var ambilight = new THREE.AmbientLight( 0xcccccc );
	scene.add(ambilight) ;

  var terrain = new Terrain(scene) ;
	//tr.object.position.set(terrain.width/2,0,terrain.length/2) ;

  edit.camera.position.set(terrain.width/2+1,1.5,terrain.length/2+1) ;
  edit.camera.lookAt(terrain.width/2,1,terrain.length/2) ;
  edit.orbit.target.set(terrain.width/2,1,terrain.length/2) ;
  edit.orbit.update();

  var axesHelper = new THREE.AxesHelper( 1 );
  //scene.add( axesHelper );

  var animate = function () {
    requestAnimationFrame( animate );
    tr.refresh() ;
    edit.update() ;

		var mixerUpdateDelta = clock.getDelta();
		if(tr.animations_mixer != undefined && tr.animations_mixer.length != 0)
			tr.animations_mixer.update(mixerUpdateDelta);

    renderer.render( scene, active_camera );
  };

  animate();
}

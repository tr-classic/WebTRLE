try{
  let acl = new Accelerometer({frequency: 35});

  acl.addEventListener('reading', () => {

    var cosx = Math.cos(act.x/10 * Math.PI) ;
    var sinx = Math.sin(act.x/10 * Math.PI) ;
    var cosy = Math.cos(act.y/10 * Math.PI) ;
    var siny = Math.sin(act.y/10 * Math.PI) ;
    var cosz = Math.cos(act.z/10 * Math.PI) ;
    var sinz = Math.sin(act.z/10 * Math.PI) ;

    document.getElementById("log").innerHTML = "x: " + (act.x/10 * Math.PI) + "</br>y: " + (act.y/10 * Math.PI) + " </br>cosx+siny: " + (cosx+siny) + " </br>cosy+sinx: " + (cosy+sinx) ;

    tr.view.position.set(
      ( cosx+sinz)*2,
      ( cosy+sinx)*2,
      (-cosz+siny)*2
    );
    tr.refresh() ;
  });

  acl.start();
}catch(ex){
  console.info("No accelerometer detected") ;
}


window.onbeforeunload = function()
{
  var r = confirm("Are you sure you want to reload the page.");
  if(r)
  {
    window.location.reload();
  }
  else
  {
    return "";
  }
};


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

/*
var cursorX = 0;
var cursorY = 0;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY - window.scrollY;
    tr.view.position.y = (cursorY / window.innerHeight -.5  ) *4;
    tr.view.position.x = (cursorX / window.innerWidth  -.5) *4;
}*/

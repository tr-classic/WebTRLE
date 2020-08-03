class Terrain{
  constructor(scene){
    this.scene = scene ;
    this.length = 15 ;
    this.width = 7 ;
    this.height = 3 ;
    this.unit = ["null"];
    //this.object = new BABYLON.Mesh("custom", this.scene);
    this.object = new THREE.Object3D() ;
    this.default() ;
    this.scene.add(this.object) ;


    noise.seed((Date.now()*Math.random())%100);
  }

  cave_terrain(){
    var tgeometry = new THREE.Geometry();

    for(let i =0 ; i<=this.width ; i++){
      for(let j =0 ;j<=this.length ; j++){
        if(i==this.width/2 && j==this.length/2){
            tgeometry.vertices.push(
              new THREE.Vector3(  i, 0, j )
            );
        }else{
          tgeometry.vertices.push(
            new THREE.Vector3(  i, (Math.random()-.5)*.5, j )
          );
        }
      }
    }
    for(let i =this.width ; i>=0 ; i--){
      for(let j =0 ;j<=this.length ; j++){
        tgeometry.vertices.push(
          new THREE.Vector3(  i, this.height + Math.random(), j )
        );
      }
    }

    for(let i =0 ; i<=this.width*2 ; i++){
      for(let j =0 ;j<this.length ; j++){
        tgeometry.faces.push( new THREE.Face3( (j)+(i)*(this.length+1) ,(j+1)+(i+1)*(this.length+1) ,(j)+(i+1)*(this.length+1) ) );
        tgeometry.faces.push( new THREE.Face3( (j)+(i)*(this.length+1) ,(j+1)+(i)*(this.length+1) ,(j+1)+(i+1)*(this.length+1) ) );
      }
    }

    return tgeometry;
  }

  smooth_terrain(){
    var tgeometry = new THREE.Geometry();

    for(let i =0 ; i<=this.width ; i++){
      for(let j =0 ;j<=this.length ; j++){
        tgeometry.vertices.push(
          new THREE.Vector3(  i, 0, j )
        );
      }
    }

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        tgeometry.faces.push( new THREE.Face3( (j)+(i)*(this.length+1) ,(j+1)+(i+1)*(this.length+1) ,(j)+(i+1)*(this.length+1) ) );
        tgeometry.faces.push( new THREE.Face3( (j)+(i)*(this.length+1) ,(j+1)+(i)*(this.length+1) ,(j+1)+(i+1)*(this.length+1) ) );
      }
    }

    return tgeometry;
  }

  square_terrain(){
    var tgeometry = new THREE.Geometry();
    this.unit = [] ;

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        var height = Math.cos(j/this.length*Math.PI*2 + (i/this.width*Math.PI*2))*.5 ;

        var v1 = new THREE.Vector3(  i  , height, j   ) ;
        var v2 = new THREE.Vector3(  i+1, height, j   ) ;
        var v3 = new THREE.Vector3(  i  , height, j+1 ) ;
        var v4 = new THREE.Vector3(  i+1, height, j+1 ) ;

        tgeometry.vertices.push(
          v1,
          v2,
          v3,
          v4,
        );
        this.unit.push([
            v1,
            v2,
            v3,
            v4,
          ]
        );
      }
    }

    for(let i =0 ; i<this.width ; i++){
      for(let j =0 ;j<this.length ; j++){
        if(j!=this.length-1 && i!=this.width-1){
          var pos = ((j)+(i)*this.length)*4 ;
          tgeometry.faces.push(
            new THREE.Face3( pos  ,pos+2,pos+3),
            new THREE.Face3( pos  ,pos+3,pos+1),
            new THREE.Face3( pos+2,pos+4,pos+3),
            new THREE.Face3( pos+3,pos+4,pos+5),
            new THREE.Face3( pos+3,((j)+(i+1)*this.length)*4,pos+1),
            new THREE.Face3( pos+3,((j)+(i+1)*this.length)*4+2,((j)+(i+1)*this.length)*4),
            //new THREE.Face3( pos+3,pos+5,((j)+(i+1)*this.length)*4),
            //new THREE.Face3( pos+3,((j)+(i+1)*this.length)*4,pos+1),
          );
        }
      }
    }

    return tgeometry;
  }

  default(){
    //var tgeometry = this.smooth_terrain() ;
    //var tgeometry = this.cave_terrain() ;
    var tgeometry = this.square_terrain() ;

    tgeometry.computeBoundingSphere();

    tgeometry.uvsNeedUpdate = true ;

    var material = new THREE.MeshBasicMaterial( {color: 0x333333} );
    //material.wireframe = true ;
    var terr = new THREE.Mesh( tgeometry, material );

    this.object.add( terr );


    // wireframe
    var geo = new THREE.EdgesGeometry( tgeometry ); // or WireframeGeometry
    var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
    var wireframe = new THREE.LineSegments( geo, mat );
    terr.add( wireframe );
  }
}

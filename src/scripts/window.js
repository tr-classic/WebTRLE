class InternalWindow{
  constructor(internalname, name, width = 500, height = 600, parent = "internal_window"){
    if(document.getElementById("win_" + internalname) != null){
      console.error("window '" + internalname + "' already exists") ;
      return ;
    }

    if(document.getElementById(parent) == null){
      console.error("parent '" + parent + "' dosen't exists") ;
      return ;
    }

    this.internalname = internalname ;
    this.name = name ;
    this.HTMLParent = parent ;
    this.html = null ;
    this.content = "" ;
    this.width = width ;
    this.height = height ;
    this.top = window.innerHeight/2 - this.height/2 ;
    this.left = window.innerWidth/2 - this.width/2 ;
  }

  load(json){
    this.content = json.window.content ;
    return this ;
  }

  show(){
    this.mouseposition = {x:0,y:0} ;
    let tmp_parent = document.getElementById(this.HTMLParent) ;
    tmp_parent.innerHTML += this.toHMTML() ;

    this.html = document.getElementById("win_" + this.internalname) ;

    var instance = this ;

    this.html.children[0].children[1].onclick = function(){
      instance.close() ;
    } ;

    this.html.children[0].children[0].onmousedown = function(p){
      instance.mouseposition = {x:p.layerX,y:p.layerY} ;
    } ;
    this.html.children[0].children[0].onmouseup = function(p){
      instance.mouseposition = {x:0,y:0} ;
    } ;
    this.html.children[0].children[0].onmousemove = function(p){
      if(p.buttons == 1){
        instance.top = p.clientY - instance.mouseposition.y ;
        instance.left = p.clientX - instance.mouseposition.x ;
        instance.applyStyle() ;
      }
    } ;

    this.html.ondrop = function(e){
      console.log(e) ;
      e.preventDefault();
    }

    this.html.ondragover = function(e){
      console.log(e) ;
    }

    return this ;
  }

  close(){
    this.destroy() ;
  }

  destroy(){
    this.html.outerHTML = "" ;
  }

  applyStyle(){
    this.html.style.top = this.top + "px" ;
    this.html.style.left = this.left + "px" ;
  }

  toHMTML(){
    return '<div id="win_' + this.internalname +'" class="internal_window" style="top:' + this.top + 'px; left:' + this.left + 'px; width: ' + this.width + 'px; height: ' + this.height + 'px;">\
              <div>\
                <span>' + this.name + '</span>\
                <span>X</span>\
              </div>' +
              this.content +
            '</div>' ;
  }
}
//*/

class Menu{
  constructor(name, img, desc, json=null){
    this.img = img;
    this.desc = desc;
    this.name = name ;
    this.action = json ;
    this.win = null ;
  }

  onclick(instance = this){
    instance.win = new InternalWindow(instance.name, instance.desc) ;
    instance.win.show() ;
  }

  toHTML(){
    return '<div id="menu_' + this.name + '">\
              <img src="' + this.img + '" alt="">\
            </div>' ;
  }
}

var menu_items = [
  new Menu("settings", "/src/img/settings.png","Settings"),
  new Menu("play", "/src/img/play.png","Play"),
  new Menu("debug", "/src/img/debug.png","Debug"),
  new Menu("laracroft", "/src/img/lc.png","Lara Settings"),
  new Menu("terrain","/src/img/terrain.png","Terrain"),
  new Menu("accelerometer", "/src/img/accelerometer.png","Accelerometer"),
  new Menu("brush", "/src/img/brush.png","Brush"),
  new Menu("object", "/src/img/object.png","Object")
] ;

var menu_menu = document.getElementById("menu_child") ;
menu_menu.innerHTML = "" ;

for (var i of menu_items) {
  menu_menu.innerHTML += i.toHTML() ;
}
for (var i of menu_items) {
  let instance = i ;
  document.getElementById("menu_" + i.name).onclick = function(){ i.onclick(instance); } ;
}

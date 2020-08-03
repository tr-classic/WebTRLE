class Menu{
  constructor(name, img, desc){
    this.img = img;
    this.desc = desc;
    this.name = name
  }

  toHTML(){
    return '<div id="menu_' + this.name + '">\
              <img src="' + this.img + '" alt="">\
            </div>' ;
  }
}

var menu_items = [
  new Menu("laracroft", "/src/img/lc.png","Place Lara"),
  new Menu("terrain","/src/img/terrain.png","Generate terrain")
] ;

var menu_menu = document.getElementById("menu_child") ;
menu_menu.innerHTML = "" ;

for (var i of menu_items) {
  menu_menu.innerHTML += i.toHTML() ;
}

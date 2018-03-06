Router.route("/", function  (){
  this.render("landingpage");
});

Router.route("/login", function  (){
  this.render("login");

});

Router.route("/register", function  (){
  this.render("register");
});

Router.route("/islandmap", function  (){
  if(Session.get("sessionUser")===undefined){
    Session.set("sessionLanguage",undefined);
    this.render("landingpage");
  } else {
    this.render("islandMap");
  }
});

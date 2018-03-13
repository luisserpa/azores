Router.route("/page", function() {
    this.render("page");
});

Router.route("/", function() {
    if(Session.get("admin")){
        this.render("admin");
    }else{
        this.render("landingpage");
    }
});

Router.route("/login", function() {
    this.render("login");
});

Router.route("/register", function() {
    this.render("register");
});

Router.route("/islandmap", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("islandmap");
    }
});

Router.route("/renderpage", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("renderpage");
    }
});

Router.route("/counter", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("counter");
    }
});

Router.route("/achievements", function (){
    if(Session.get("sessionUser")===undefined){
      Session.set("sessionLanguage",undefined);
      this.render("landingpage");
    } else {
      this.render("achievements");
    }
  });

Router.route("/islandmap/historicmonuments", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("listPlaces");
    }
});

Router.route("/islandmap/naturalmonuments", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("listPlaces");
    }
});

Router.route("/islandmap/accommodations", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("listPlaces");
    }
});

Router.route("/islandmap/restaurants", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("listPlaces");
    }
});

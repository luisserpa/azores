Router.route("/", function() {
    this.render("landingpage");
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

Router.route("/islandmap/historicmonuments", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("historicmonuments");
    }
});

Router.route("/islandmap/naturalmonuments", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("naturalmonuments");
    }
});

Router.route("/islandmap/accommodations", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("accommodations");
    }
});

Router.route("/islandmap/restaurants", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("restaurants");
    }
});

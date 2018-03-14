import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Router } from "meteor/iron:router";
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

Router.route("/registerPage", function() {
    this.render("registerPage");
});

Router.route("/islandmap", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        this.render("islandmap");
    }
});

Router.route("/renderpage/:_id", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
        this.render("landingpage");
    } else {
        Meteor.call(
            "findPlaceById",
            this.params._id,
            function(err, result) {
                if (err) {
                    throw new Error("place not found");
                }

                this.render("renderpage", {
                    data: function() {
                        return result;
                    }
                });
            }.bind(this)
        );
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

Router.route("/achievements", function() {
    if (Session.get("sessionUser") === undefined) {
        Session.set("sessionLanguage", undefined);
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

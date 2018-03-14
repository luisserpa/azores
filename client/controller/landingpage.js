import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { Router } from "meteor/iron:router";

Template.landingpage.events({
    "click .portuguese": function() {
        var language = "portuguese";
        Session.set("sessionLanguage", language);
        Router.go("/login");
    },

    "click .english": function() {
        var language = "english";
        Session.set("sessionLanguage", language);
        Router.go("/login");
    }
});

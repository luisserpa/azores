import { Template } from "meteor/templating";
import { Session } from "meteor/session";

Template.landingpage.events({
    "click .portuguese": function() {
        var language = "portuguese";
        Session.set("sessionLanguage", language);
    },

    "click .english": function() {
        var language = "english";
        Session.set("sessionLanguage", language);
    }
});

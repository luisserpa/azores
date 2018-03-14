/**
 * This module is for rendering the navigation bar of the app
 */

Template.header.events({
    "click .logout": function(event) {
        event.preventDefault();
        //To log out
        Session.set("sessionUser", undefined);
        Router.go("/");
    },

    "click .counter": function(event) {
        Router.go("/counter");
    },

    "click .achievements": function(event) {
        Router.go("/achievements");
    },

    "click .portuguese": function(event) {
        var language = "portuguese";
        Session.set("sessionLanguage", language);
        console.log("PT");
        Router.go("/islandmap");
    },

    "click .english": function(event) {
        var language = "english";
        Session.set("sessionLanguage", language);
        console.log("EN");
        Router.go("/islandmap");
    }
});

Template.displayUserName.helpers({
    showName() {
        return Session.get("sessionUser").displayName;
    }
});

Template.goCounter.helpers({
    showCounterNumber() {
        return Session.get("sessionUser").cows;
    }
});

Template.checks.helpers({
    showChecksNumber() {
        return Session.get("sessionUser").founds;
    }
});

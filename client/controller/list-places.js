import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Router } from "meteor/iron:router";
import { placePage, sortPlaces } from "../utils/render-pages.js";

Template.listPlaces.created = function() {
    var placeType = Session.get("placeType");

    Meteor.call("findAll", placeType, function(error, result) {
        if (!error) {
            var placesSorted = sortPlaces(result);
            Session.set("placesSortedByRate", placesSorted);
        }
    });
};

Template.listPlaces.helpers({
    placesList() {
        return Session.get("placesSortedByRate");
    }
});

Template.showStars.rendered = function() {
    $(".rating").each(function() {
        var rating = $(this).attr("rating");
        var i;
        console.log("RATING: ", rating);

        for (i = 0; i < rating; i++) {
            $(this)
                .find("span.star")
                .eq(i)
                .addClass("filled");
        }

        if (rating % 1 > 0)
            $(this)
                .find("span.star")
                .eq(i - 1)
                .addClass("half-filled");
    });
};

Template.listPlaces.events({
    "click .render": function() {
        placePage();
        Router.go("/renderpage");
    }
});

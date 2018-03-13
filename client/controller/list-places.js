import { placePage, sortPlaces } from "../utils/render-pages.js";

Template.listPlaces.rendered = function() {
    var placeType = Session.get("placeType");
    console.log("PLACETYPE: ", placeType);

    Meteor.call("findAll", placeType, function(error, result) {
        if (!error) {
            var test = sortPlaces(result);
            console.log("TEST: ", test);
            Session.set("placesSortedByRate", test);
        }
    });
};

Template.listPlaces.helpers({
    placesList() {
        console.log("SORTED PLACES: ", Session.get("placesSortedByRate"));

        return Session.get("placesSortedByRate");
    }
});

Template.showStars.rendered = function() {
    console.log("IN THE REMDER");
    $(".rating").each(function(event) {
        console.log("THIS: ", this);
        var rating = $(this).attr("rating");
        var i;
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
    "click .render": function(event) {
        placePage();
        Router.go("/renderpage");
    }
});
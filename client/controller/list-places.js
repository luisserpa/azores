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
    $(function() {
        console.log("IN THE RENDER");

        $("span.stars").stars();
    });
};

Template.listPlaces.events({
    "click .render": function(event) {
        console.log("IT'S IN THE CLICK");
        placePage();
        Router.go("/renderpage");
    }
});

$.fn.stars = function() {
    return $(this).each(function() {
        console.log("THIS: ", this);
        // Get the value
        var val = parseFloat($(this).html());
        console.log("VALUE: ", val);
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, Math.min(5, val)) * 16;
        // Create stars holder
        var $span = $("<span />").width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
};

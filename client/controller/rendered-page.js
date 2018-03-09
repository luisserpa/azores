import historicMonuments from "../../import/json/historic-monuments.json";
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

let hideCheckbox;

Template.renderpage.onCreated(function onReder() {
    hideCheckbox = new ReactiveVar(false);
    console.log("PASS BY HERE", hideCheckbox.get());
});

Template.title.helpers({
    title() {
        if (Session.get("sessionLanguage") === "portuguese") {
            return Session.get("placeToRender").pt.title;
        } else {
            return Session.get("placeToRender").en.title;
        }
    }
});

Template.description.helpers({
    description() {
        if (Session.get("sessionLanguage") === "portuguese") {
            return Session.get("placeToRender").pt.longDescription;
        } else {
            return Session.get("placeToRender").en.longDescription;
        }
    }
});

Template.images.helpers({
    images() {
        return Session.get("placeToRender");
    }
});

Template.visited.rendered = function() {
    var tempPlaces = Session.get("sessionUser").places[
        Session.get("indexOfPlace")
    ];
    console.log("USER PLACES: ", Session.get("sessionUser").places);
    console.log("IS UNDIFINED?", tempPlaces);
    console.log("INDEX OF PLACE: ", Session.get("indexOfPlace"));
    Object.keys(tempPlaces).forEach(function(key) {
        console.log("THE PLACE TO SEE: ", tempPlaces);
        if (
            tempPlaces[key].pt.title === Session.get("placeToRender").pt.title
        ) {
            if (tempPlaces[key].visited === true) {
                hideCheckbox.set(true);
            }
        }
    });
};

Template.visited.helpers({
    hideCheckbox() {
        console.log("IN THE HELPERS: ", hideCheckbox.get());
        return hideCheckbox.get();
    }
});

Template.visited.events({
    "click .visitedPlace": function(event) {
        //First we need to get the places of the user.

        var tempPlaces = Session.get("sessionUser").places[
            Session.get("indexOfPlace")
        ];

        console.log("USER PLACES: ", Session.get("sessionUser").places);

        //Then we need to find the place that we need to change
        var placeToChange = [];
        var indexPlace;

        Object.keys(tempPlaces).forEach(function(key, index) {
            if (placeToChange.length <= 0) {
                if (
                    tempPlaces[key].pt.title ===
                    Session.get("placeToRender").pt.title
                ) {
                    indexPlace = index;
                    placeToChange = tempPlaces[key];
                }
            }
        });

        //Now update the place marking the visible to true
        console.log("PLACE TO CHANGE: ", placeToChange);
        placeToChange.visited = true;
        Object.keys(tempPlaces).forEach(function(key, index) {
            if (tempPlaces[key].pt.title === placeToChange.pt.title) {
                console.log("IS IN THE CHANGE TO TRUE CHECKBOX?");
                tempPlaces[key].visited = true;
            }
        });

        //Increase the number of monuments founds
        console.log("FOUNDS: ", Session.get("sessionUser").founds);
        var increaseFounds = Session.get("sessionUser").founds + 1;

        console.log("ARRAY TO THE USER? ", tempPlaces);
        console.log("INDEX PLACE: ", indexPlace);

        console.log("HERE", Session.get("sessionUser").places);
        console.log("THE TEMP PLACES: ", tempPlaces);

        var updating = Session.get("sessionUser").places;
        console.log("PLACES OF USER  :", updating);
        updating.splice(Session.get("indexOfPlace"), 1);
        console.log("PLACES UPDATED AFTER 1ST SPLICE: ", updating);
        updating.splice(Session.get("indexOfPlace"), 0, tempPlaces);

        console.log("PLACES UPDATED: ", updating);

        //Now update this to the use
        Meteor.call(
            "updateUser",
            Session.get("sessionUser")._id,
            updating,
            increaseFounds,
            function(error, result) {
                if (!error) {
                    Meteor.call(
                        "findByEmail",
                        Session.get("sessionUser").email,
                        function(error, updatedUser) {
                            if (!error) {
                                Session.set("sessionUser", updatedUser);

                                hideCheckbox.set(true);
                            }
                        }
                    );
                }
            }
        );
    }
});

Template.rating.events({
    "click .rate": function(event) {
        var userRate = event.target.value;
        console.log("RATE: ", userRate);
        //Then it checks if the place is already in the database
        Meteor.call(
            "findByNamePt",
            Session.get("placeToRender").pt.title,
            function(error, place) {
                console.log("VALUE OF PLACE: ", place);
                if (place !== undefined) {
                    if (!error) {
                        //Makes the update to the place with the new rate
                        var updatePlace = place.rating;
                        updatePlace.push(userRate);
                        Meteor.call(
                            "updatePlace",
                            place._id,
                            updatePlace,
                            function(error, result) {
                                if (!error) {
                                    console.log(result);
                                }
                            }
                        );
                    }
                } else {
                    console.log("NOT IN THE DATABASE");
                }
            }
        );
    }
});

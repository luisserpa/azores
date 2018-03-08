import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import historicMonuments from "../json/historic-monuments.js";

var test;

Template.renderpage.onCreated(function bodyOnCreated() {
    test = new ReactiveVar(historicMonuments);
});

Template.title.helpers({
    title() {
        if (Session.get("language") === "portuguese") {
            return Session.get("placeToRender").titlePt;
        } else {
            return Session.get("placeToRender").titleEn;
        }
    }
});

Template.description.helpers({
    description() {
        if (Session.get("language") === "portuguese") {
            return Session.get("placeToRender").longDescriptionPt;
        } else {
            return Session.get("placeToRender").longDescriptionEn;
        }
    }
});

Template.checked.helpers({
    checkbox() {
        return Session.get("changeBox");
    }
});

Template.images.helpers({
    images() {
        return Session.get("placeToRender");
    }
});

Template.visited.rendered = function() {
    var tempPlace = Session.get("sessionUser").places[
        Session.get("indexOfPlace")
    ];
    tempPlace.filter(function(obj) {
        if (obj.titlePt === Session.get("placeToRender").titlePt) {
            var box;
            if (obj.visited === true) {
                box = true;
            } else {
                box = false;
            }
            Session.set("changeBox", box);
            console.log("THE BOX");
        }
    });
};

Template.visited.helpers({
    hideCheckbox() {
        console.log("CHANGEBOX: ", Session.get("changeBox"));
        return Session.get("changeBox");
    }
});

Template.visited.events({
    "click .visitedPlace": function(event) {
        //First we need to get the places of the user.
        console.log("HERE");
        var tempPlaces = Session.get("sessionUser").places;
        //Then we need to find the place that we need to change
        var placeToChange = [];
        var indexPlace;
        tempPlaces.forEach(function(place, index) {
            if (placeToChange.length <= 0) {
                placeToChange = place.filter(function(obj) {
                    indexPlace = index;
                    return obj.titlePt == Session.get("placeToRender").titlePt;
                });
            }
        });

        //Now update the place marking the visible to true
        placeToChange[0].visited = true;
        tempPlaces[indexPlace].forEach(function(element, index) {
            if (element.titlePt === placeToChange[0].titlePt) {
                tempPlaces[indexPlace].splice(index, 1, placeToChange[0]);
            }
        });

        //Increase the number of monuments founds
        console.log("FOUNDS: ", Session.get("sessionUser").founds);
        var increaseFounds = Session.get("sessionUser").founds + 1;

        //Now update this to the use
        Meteor.call(
            "updateUser",
            Session.get("sessionUser")._id,
            tempPlaces,
            increaseFounds,
            function(error, result) {
                if (!error) {
                    console.log("CHECK PLACSE: ", tempPlaces);
                    console.log(
                        "USER EMAIL: ",
                        Session.get("sessionUser").email
                    );
                    Meteor.call(
                        "findByEmail",
                        Session.get("sessionUser").email,
                        function(error, updatedUser) {
                            if (!error) {
                                console.log("NEW USER: ", updatedUser);
                                Session.set("sessionUser", updatedUser);

                                //Test the hidden
                                var hideCheckbox = document.getElementById(
                                    "hideCheckbox"
                                );
                                hideCheckbox.style.visibility = "hidden";
                                Session.set("changeBox", true);
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
            Session.get("placeToRender").titlePt,
            function(error, place) {
                if (!error) {
                    if (place === undefined) {
                        console.log("IN THE ERROR");
                        //if the place doesn't exist, then it creates a new one in the database
                        var placeData = {
                            name: Session.get("placeToRender").titlePt,
                            rating: [userRate]
                        };
                        Meteor.call("addPlace", placeData);
                    } else {
                        console.log("IN THE NOT ERRROR");
                        //Makes the update to the place with the new rate
                        var updatePlace = place.rating.push(userRate);
                        Meteor.call(
                            "updatePlace",
                            place._id,
                            updatePlace,
                            function(error, result) {
                                if (!error) {
                                    console.log("RESULT: ", result);
                                }
                            }
                        );
                    }
                }
            }
        );
    }
});

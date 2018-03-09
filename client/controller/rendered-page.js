import historicMonuments from "../json/historic-monuments.json";
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

let hideCheckbox;

Template.renderpage.onCreated(function onReder() {
    hideCheckbox = new ReactiveVar(false);
    console.log("PASS BY HERE", hideCheckbox.get());
});

Template.title.helpers({
    title() {
        return Session.get("placeToRender").title;
    }
});

Template.description.helpers({
    description() {
        return Session.get("placeToRender").longDescription;
    }
});

Template.images.helpers({
    images() {
        return Session.get("placeToRender");
    }
});

Template.visited.rendered = function() {
    console.log("INDEX: ", Session.get("indexOfPlace"));
    var tempPlace = Session.get("sessionUser").places[
        Session.get("indexOfPlace")
    ];
    console.log("TEMPPLACE: ", tempPlace);
    tempPlace.filter(function(obj) {
        console.log("OBJECT: ", obj);
        if (obj.titlePt === Session.get("placeToRender").titlePt) {
            if (obj.visited === true) {
                console.log("IT'S TRUE");
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
            Session.get("placeToRender").titlePt,
            function(error, place) {
                if (!error) {
                    if (place === undefined) {
                        //if the place doesn't exist, then it creates a new one in the database
                        var placeData = {
                            name: Session.get("placeToRender").titlePt,
                            rating: [userRate]
                        };
                        Meteor.call("addPlace", placeData);
                    } else {
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
                }
            }
        );
    }
});

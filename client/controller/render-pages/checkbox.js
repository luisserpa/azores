import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { ReactiveVar } from "meteor/reactive-var";

let hideCheckbox;

Template.visited.onCreated(function onRender() {
    hideCheckbox = new ReactiveVar(false);
});

Template.visited.rendered = function() {
    // TODO: visited logic should be persisted instead of save in session
    var data = this.data;
    var tempPlaces = Session.get("sessionUser").places;

    tempPlaces.forEach(function(place) {
        if (place !== undefined) {
            Object.keys(place).forEach(function(key) {
                if (place !== undefined) {
                    if (place[key].pt.title === data.pt.title) {
                        if (place[key].visited === true) {
                            hideCheckbox.set(true);
                        }
                    }
                }
            });
        }
    });
};

Template.visited.helpers({
    hideCheckbox() {
        return hideCheckbox.get();
    }
});

Template.visited.events({
    "click .visitedPlace": function() {
        //First we need to get the places of the user.

        var tempPlaces = Session.get("sessionUser").places;
        var data = this;

        //Then we need to find the place that we need to change
        var placeToChange = [];
        var indexPlace;

        tempPlaces.forEach(function(place) {
            if (place !== undefined) {
                Object.keys(place).forEach(function(key) {
                    if (placeToChange.length <= 0) {
                        if (place[key].pt.title === data.pt.title) {
                            placeToChange = place[key];
                        }
                    }
                });
            }
        });

        //Now update the place marking the visible to true
        placeToChange.visited = true;
        tempPlaces.forEach(function(place, index) {
            if (place !== undefined) {
                Object.keys(place).forEach(function(key) {
                    if (place[key].pt.title === placeToChange.pt.title) {
                        tempPlaces[index][key].visited = true;
                        indexPlace = index;
                    }
                });
            }
        });

        //Increase the number of monuments founds
        var increaseFounds = Session.get("sessionUser").founds + 1;

        var updating = Session.get("sessionUser").places;
        updating.splice(indexPlace, 1);

        updating.splice(indexPlace, 0, tempPlaces[indexPlace]);

        //Now update this to the use
        Meteor.call(
            "updateUser",
            Session.get("sessionUser")._id,
            updating,
            increaseFounds,
            function(error) {
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

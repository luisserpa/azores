import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { ReactiveVar } from "meteor/reactive-var";
import renderScore from "./score.js";
import languageSelect from "./language-select.js";

let starsRating;

Template.rating.onCreated(function onRender() {
    starsRating = new ReactiveVar(true);
});

Template.rating.rendered = function() {
    //Check if the user has already voted in this monument
    Meteor.call("findPlaceById", this.data._id, function(error, result) {
        if (!error) {
            result.usersVoted.forEach(function(userEmail) {
                if (userEmail === Session.get("sessionUser").email) {
                    starsRating.set(false);
                }
            });
        }
    });
};

Template.rating.helpers({
    showStars() {
        return starsRating.get();
    }
});

Template.rating.events({
    "click .rate": function(event) {
        var userRate = event.target.value;
        var data = this;

        //Then it checks if the place is already in the database
        Meteor.call("findPlaceById", data._id, function(error, place) {
            if (place !== undefined) {
                if (!error) {
                    //Makes the update to the place with the new rate
                    var updateRating = place.rating;
                    var voteFromUser = place.usersVoted;

                    updateRating.push(parseFloat(userRate));
                    voteFromUser.push(Session.get("sessionUser").email);
                    Meteor.call(
                        "updatePlace",
                        place._id,
                        updateRating,
                        voteFromUser,
                        function(error) {
                            if (!error) {
                                starsRating.set(false);
                                //Update the score in the view
                                renderScore(updateRating);
                            }
                        }
                    );
                }
            }
        });
    }
});

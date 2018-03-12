import historicMonuments from "../../import/json/historic-monuments.json";
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

let hideCheckbox;
let starsRating;
let placeComments;

Template.renderpage.onCreated(function onReder() {
    hideCheckbox = new ReactiveVar(false);
    starsRating = new ReactiveVar(true);
    placeCommnets = new ReactiveVar();
    Meteor.call("findByNamePt", Session.get("placeToRender").pt.title, function(
        error,
        place
    ) {
        if (!error) {
            placeComments.set(place);
            console.log(place);
        }
    });
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

    Object.keys(tempPlaces).forEach(function(key) {
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
        return hideCheckbox.get();
    }
});

Template.visited.events({
    "click .visitedPlace": function(event) {
        //First we need to get the places of the user.

        var tempPlaces = Session.get("sessionUser").places[
            Session.get("indexOfPlace")
        ];

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
        placeToChange.visited = true;
        Object.keys(tempPlaces).forEach(function(key, index) {
            if (tempPlaces[key].pt.title === placeToChange.pt.title) {
                console.log("IS IN THE CHANGE TO TRUE CHECKBOX?");
                tempPlaces[key].visited = true;
            }
        });

        //Increase the number of monuments founds
        var increaseFounds = Session.get("sessionUser").founds + 1;

        var updating = Session.get("sessionUser").places;
        updating.splice(Session.get("indexOfPlace"), 1);
        updating.splice(Session.get("indexOfPlace"), 0, tempPlaces);

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

Template.rating.rendered = function() {
    //Check if the user has already voted in this monument
    Meteor.call("findByNamePt", Session.get("placeToRender").pt.title, function(
        error,
        result
    ) {
        if (!error) {
            console.log("RESULT.usersVoted", result);
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
        console.log("RATE: ", userRate);
        //Then it checks if the place is already in the database
        Meteor.call(
            "findByNamePt",
            Session.get("placeToRender").pt.title,
            function(error, place) {
                console.log("VALUE OF PLACE: ", JSON.stringify(place));
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
                                }
                            }
                        );
                    }
                }
            }
        );
    }
});

Template.commentSection.helpers({
    showPlaceComments() {
        return placeComments.get().comments;
    }
});

Template.commentSection.events({
    "submit .addComment": function(event, template) {
        console.log("WHAT ");
        event.preventDefault();
        var newComment = event.target.userComment.value;

        //Add the new comment to the database
        Meteor.call(
            "findByNamePt",
            Session.get("placeToRender").pt.title,
            function(error, placeToUpdate) {
                if (error) {
                    return;
                }

                console.log("PLACE.COMMENTS: ", placeToUpdate);

                placeToUpdate.comments.splice(0, 0, newComment);

                console.log("THE NEW COMMENT: ", placeToUpdate);

                Meteor.call(
                    "addComment",
                    placeToUpdate._id,
                    placeToUpdate.comments,
                    function(error) {
                        if (error) {
                            return;
                        }

                        console.log("result");

                        Meteor.call(
                            "findByNamePt",
                            placeToUpdate.name,
                            function(error, commentPlace) {
                                if (error) {
                                    return;
                                }
                                template.find("form").reset();
                                placeComments.set(commentPlace);
                            }
                        );
                    }
                );
            }
        );
    }
});

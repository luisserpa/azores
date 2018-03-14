import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import languageSelect from "./language-select.js";

let placeComments;

Template.commentSection.onCreated(function onRender() {
    placeComments = new ReactiveVar(this.data.comments);
});

Template.commentSection.helpers({
    showPlaceComments() {
        return placeComments.get();
    },

    language() {
        return languageSelect();
    }
});

Template.commentSection.events({
    "submit .addComment": function(event, template) {
        event.preventDefault();
        var newComment = event.target.userComment.value;

        //Add the new comment to the database
        Meteor.call("findPlaceById", this._id, function(error, placeToUpdate) {
            if (error) {
                return;
            }

            placeToUpdate.comments.splice(
                0,
                0,
                Session.get("sessionUser").displayName + ": " + newComment
            );

            Meteor.call(
                "addComment",
                placeToUpdate._id,
                placeToUpdate.comments,
                function(error) {
                    if (error) {
                        return;
                    }

                    Meteor.call(
                        "findByNamePt",
                        placeToUpdate.pt.title,
                        function(error, commentPlace) {
                            console.log("COMMENT PLACE: ", commentPlace);
                            if (error) {
                                return;
                            }
                            template.find("form").reset();
                            placeComments.set(commentPlace.comments);
                        }
                    );
                }
            );
        });
    }
});

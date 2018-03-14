import { Meteor } from 'meteor/meteor';
import { Places } from "/import/lib/collections/database";
import { Template } from 'meteor/templating';
import { ReactiveVar } from "meteor/reactive-var";

let clickedAddPlace;

Template.admin.onCreated(function() {
    Meteor.subscribe('placesList');
    clickedAddPlace = new ReactiveVar(false);
});

Template.admin.helpers({
    places() {
    return Places.find({});
    },

    showAddPlace() {
    return clickedAddPlace.get();
    }
});

Template.place.onCreated(function() {
    console.log(this);
});

Template.admin.events({
    'click .addPlace'() {
        clickedAddPlace.set(true);
    }
});

Template.place.events({

    'click .del'(event) {
        var confirmDelete = confirm("You want to delete " + '\"' +
         Places.findOne({ _id: event.target.id }).en.title 
         + '\"' + " from database?");
        if (confirmDelete) {
            Meteor.call("deletePlace", event.target.id);
        }
    },

    'click .updt'(event) {
        console.log("BUTTON UP TARGET", event.target.id);
    }

});

Template.newPlace.events({
    'submit #createPlace'(event) {
        event.preventDefault();
        var placeData = {
            pt: {
                title: event.target.titlePt.value,
                description: event.target.summaryPt.value,
                visitHours: event.target.hoursPt.value,
                longDescription: event.target.descPt.value
            },
            en: {
                title: event.target.titleEn.value,
                description: event.target.summaryEn.value,
                visitHours: event.target.hoursEn.value,
                longDescription: event.target.descEn.value
            },
            type: event.target.category.value,
            rating: [],
            usersVoted: [],
            comments: [],
            lat: event.target.latitude.value,
            lng: event.target.longitude.value,
            image_1: event.target.img1.value,
            image_2: event.target.img2.value,
        };

        Meteor.call("findByNamePt", event.target.titlePt.value, function(err, result) {
            if (!result) {
                Meteor.call("addPlace", placeData);
                event.target.reset();
                clickedAddPlace.set(false);
            }
        });
    }
});
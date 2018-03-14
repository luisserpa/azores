import { Meteor } from 'meteor/meteor';
import { Places } from "/import/lib/collections/database";
import { Template } from 'meteor/templating';
import { ReactiveVar } from "meteor/reactive-var";

let clickedAddPlace;
let clickedUpdate;
let updateId;

Template.admin.onCreated(function() {
    Meteor.subscribe('placesList');
    clickedAddPlace = new ReactiveVar(false);
    clickedUpdate = new ReactiveVar(false);
    updateId = new ReactiveVar(undefined);
});

Template.admin.helpers({
    places() {
        return Places.find({});
    },

    showAddPlace() {
        return clickedAddPlace.get();
    },
    
    showEditPlace() {
        return clickedUpdate.get();
    }
});

Template.admin.events({
    'click .addPlace'() {
        if(clickedAddPlace.get()){
            clickedAddPlace.set(false);
            return;
        }
        
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
        clickedUpdate.set(true);
        updateId.set(event.target.id);
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
            lat: parseFloat(event.target.latitude.value),
            lng: parseFloat(event.target.longitude.value),
            image_1: event.target.img1.value,
            image_2: event.target.img2.value,
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
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

Template.editPlace.events({
    'submit .updatePlace'(event) {
        event.preventDefault();
        var placeEdit = {
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
            comments: event.target.comments.value,
            lat: event.target.latitude.value,
            lng: event.target.longitude.value,
            image_1: event.target.img1.value,
            image_2: event.target.img2.value,
        };

        Meteor.call("editPlace", updateId.get(), placeEdit.pt, placeEdit.en, placeEdit.type, placeEdit.comments, parseFloat(placeEdit.lat), parseFloat(placeEdit.lng), placeEdit.image_1, placeEdit.image_2);

        clickedUpdate.set(false);
    }
});

Template.editPlace.helpers({
    place() {
        var place = Places.findOne({ _id: updateId.get() });
        $('#' + place.type.split(" ")[0]).prop("checked", true);
        return place;
    }
});

Template.editPlace.rendered = function() {
    var place = Places.findOne({ _id: updateId.get() });
        $('#' + place.type.split(" ")[0]).prop("checked", true);
}
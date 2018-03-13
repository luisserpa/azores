import { Meteor } from 'meteor/meteor';
import { Places } from "/import/lib/collections/database";
import { Template } from 'meteor/templating';


Template.admin.onCreated(function() {
    Meteor.subscribe('placesList');
});

Template.admin.helpers({
    places() {
     return Places.find({});
    }
})

Template.place.onCreated(function() {
    console.log(this);
})

Template.place.events({
    'submit #delete'(event) {
        event.preventDefault();
        console.log(event);
        console.log(event.target.mongoId.value); 
    }
})
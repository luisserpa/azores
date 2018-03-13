import { Meteor } from 'meteor/meteor';
import { Places, Users} from '/lib/collections/database.js';

Meteor.publish("usersList", function() {
    return Users.find({});
});

Meteor.publish("placesList", function() {
    return Places.find({});
});

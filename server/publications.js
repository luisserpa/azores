import { Meteor } from "meteor/meteor";
import { Users, Places } from "../import/lib/collections/database.js";

Meteor.publish("usersList", function() {
    return Users.find({});
});

Meteor.publish("placesList", function() {
    return Places.find({});
});
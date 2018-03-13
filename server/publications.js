import { Meteor } from "meteor/meteor";
import { Users } from "../import/lib/collections/database.js";

Meteor.publish("usersList", function() {
    return Users.find({});
});
import { Meteor } from "meteor/meteor";
import { Users } from "/import/lib/collections/database";

Meteor.methods({
    addUser: function(userData) {
        var userId = Users.insert(userData);
        return userId;
    },
    findByEmail: function(userEmail) {
        var user = Users.findOne({ email: userEmail });
        return user;
    },
    updateUser: function(userId, visitedPlaces, increaseFounds) {
        Users.update(
            { _id: userId },
            { $set: { places: visitedPlaces, founds: increaseFounds } }
        );
    },
    updateCounter: function(userId, cowcounter) {
        Users.update({ _id: userId }, { $set: { cows: cowcounter } });
    }
});

Meteor.publish("usersList", function() {
    return Users.find({});
});

Meteor.publish("placesList", function() {
    return Places.find({});
});

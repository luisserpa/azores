import { Meteor } from "meteor/meteor";

Meteor.methods({
    addPlace: function(placeData) {
        var placeId = Places.insert(placeData);
        return placeId;
    }
});

Meteor.methods({
    findByNamePt: function(placeName) {
        var place = Places.findOne({ name: placeName });
        return place;
    }
});

Meteor.methods({
    updatePlace: function(placeId, newRate, usersVoted) {
        Places.update(
            { _id: placeId },
            { $set: { rating: newRate, usersVoted: usersVoted } }
        );
    }
});

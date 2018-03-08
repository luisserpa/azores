import { Meteor } from "meteor/meteor";

Meteor.methods({
    addPlace: function(placeData) {
        var placeId = Places.insert(placeData);
        console.log("PLACE TO INSERT: ", placeData);
        return placeId;
    }
});

Meteor.methods({
    findByNamePt: function(placeName) {
        var place = Places.findOne({ name: placeName });
        console.log("PLACE FOUND: ", place);
        return place;
    }
});

Meteor.methods({
    updatePlace: function(placeId, newRate) {
        Places.update({ _id: placeId }, { $set: { rating: newRate } });
    }
});
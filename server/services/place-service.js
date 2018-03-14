import { Meteor } from "meteor/meteor";
import { Places } from "/import/lib/collections/database";

if (Meteor.isServer) {
    Meteor.publish("places", function(placeId) {
        return Places.find({
            _id: placeId
        });
    });
}

Meteor.methods({
    addPlace: function(placeData) {
        var placeId = Places.insert(placeData);
        return placeId;
    },

    findByNamePt: function(placeName) {
        var place = Places.findOne({ "pt.title": placeName });
        return place;
    },

    findPlaceById: function(id) {
        return Places.findOne({ _id: id });
    },

    updatePlace: function(placeId, newRate, usersVoted) {
        Places.update(
            { _id: placeId },
            { $set: { rating: newRate, usersVoted: usersVoted } }
        );
    },

    addComment: function(placeId, comment) {
        Places.update({ _id: placeId }, { $set: { comments: comment } });
    },

    findAll: function(typeName) {
        return Places.find({ type: typeName }).fetch();
    },
    
    deletePlace: function(placeId) {
        return Places.remove( { _id : placeId} );
    }
});

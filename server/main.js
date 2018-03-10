import { Meteor } from "meteor/meteor";
import historicMonuments from "../import/json/historic-monuments.json";

Meteor.startup(function() {
    // code to run on server at startup
    Object.keys(historicMonuments).forEach(function(key) {
        var placeData = {
            name: historicMonuments[key].pt.title,
            rating: [],
            usersVoted: []
        };
        Meteor.call("addPlace", placeData);
    });
});

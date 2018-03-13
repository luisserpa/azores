import { Meteor } from "meteor/meteor";
import historicMonuments from "../import/json/historic-monuments.json";

Meteor.startup(function() {
    // code to run on server at startup
    var admin = {
        email: "admin@admin",
        displayName: "Admin",
        password: "admin"
    }

    Meteor.call("addUser", admin);

    Object.keys(historicMonuments).forEach(function(key) {
        var placeData = {
            name: historicMonuments[key].pt.title,
            type: "historicMonuments",
            rating: [],
            usersVoted: []
        };
        var isPlace = Meteor.call(
            "findByNamePt",
            historicMonuments[key].pt.title
        );
        console.log("IS PLACE?: ", isPlace);
        if (isPlace === undefined) {
            console.log("ENTERED HERE: ", historicMonuments[key].pt.title);
            Meteor.call("addPlace", placeData);
        }
    });
});

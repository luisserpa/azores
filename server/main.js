import { Meteor } from "meteor/meteor";
import historicMonuments from "../import/json/historic-monuments.json";

Meteor.startup(function() {
    // code to run on server at startup
    Object.keys(historicMonuments).forEach(function(key) {
        var placeData = {
            name: historicMonuments[key].pt.title,
            rating: 0
        };
        Meteor.call("addPlace", placeData);
    });

    Meteor.call("findByName", "Igreja da Sé", function(error, result) {
        if (!error) {
            console.log("THE RESULT: ", result);
        } else {
            console.log("OLA");
            console.log("THE RESULT: ", result);
        }
    });
});

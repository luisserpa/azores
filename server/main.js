import { Meteor } from "meteor/meteor";
import historicMonuments from "../import/json/historic-monuments.json";
import naturalMonuments from "../import/json/natural-monuments.json";
import food from "../import/json/food.json";
import hotels from "../import/json/hotels.json";
import { Places } from "../import/lib/collections/database.js";

Meteor.startup(function() {
    // code to run on server at startup
    var mapPlace = [historicMonuments, naturalMonuments, food, hotels];
    mapPlace.forEach(function(placeType, index) {
        var typeString;
        switch (index) {
        case 0:
            typeString = "Historic Monument";
            break;
        case 1:
            typeString = "Natural Monument";
            break;
        case 2:
            typeString = "Food";
            break;
        case 3:
            typeString = "Hotel";
            break;
        default:
            typeString = "Hotel";
        }
        Object.keys(placeType).forEach(function(key) {
            var placeData = {
                pt: {
                    title: placeType[key].pt.title,
                    description: placeType[key].pt.description,
                    longDescription: placeType[key].pt.longDescription
                },
                en: {
                    title: placeType[key].en.title,
                    description: placeType[key].en.description,
                    longDescription: placeType[key].en.longDescription
                },
                type: typeString,
                rating: [],
                usersVoted: [],
                comments: [],
                lat: placeType[key].lat,
                lng: placeType[key].lng,
                image_1: placeType[key].image_1,
                image_2: placeType[key].image_2
            };

            Meteor.call("findByNamePt", placeType[key].pt.title, function(
                err,
                result
            ) {
                if (!result) {
                    Meteor.call("addPlace", placeData);
                }
            });
        });
    });
});

import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";

var getClickedPlace = function(event, cb) {
    //Variable with the type of places we have
    var mapPlaces = ["Historic Monument", "Natural Monument", "Food", "Hotel"];

    mapPlaces.forEach(function(placeType) {
        Meteor.call("findAll", placeType, function(err, result) {
            if (err) {
                throw new Error("couldn't not find places with that category");
            }

            console.log("EHNTERED HERE");

            var id = result.find(function(place) {
                return place._id === event.target.id;
            });

            if (!id) {
                throw new Error("there's no such place");
            }

            cb(id);
        });
    });
};

var sortPlaces = function(listOfPlaces) {
    //first create an obejct with the name of the place and the average rating
    var tempPlace = [
        {
            name: null,
            averageScore: null,
            _id: null
        }
    ];
    listOfPlaces.forEach(function(place) {
        //Then comes the calc of the avarege rating
        var average = 0;
        place.rating.forEach(function(rate) {
            average += rate;
        });
        //Calculate the average
        if (place.rating.length === 0) {
            average = 0;
        } else {
            average = average / place.rating.length;
        }

        var nameOfPlace;

        if (Session.get("sessionLanguage") === "portuguese") {
            nameOfPlace = place.pt.title;
        } else {
            nameOfPlace = place.en.title;
        }
        console.log("NAME OF PLACE: ", nameOfPlace);

        //Update the tempPlace with the calculated average
        if (tempPlace[0].name === null) {
            //CHECK THIS FOR THE EN/PT
            tempPlace[0].name = nameOfPlace;
            tempPlace[0].averageScore = average;
            tempPlace[0]._id = place._id;
        } else {
            var objetToAdd = {
                name: nameOfPlace,
                averageScore: average,
                _id: place._id
            };
            tempPlace.push(objetToAdd);
        }
    });

    tempPlace.sort(sortList);
    return tempPlace;
};

function sortList(a, b) {
    if (a.averageScore < b.averageScore) {
        return 1;
    }
    if (a.averageScore > b.averageScore) {
        return -1;
    }
    return 0;
}

export { getClickedPlace, sortPlaces };

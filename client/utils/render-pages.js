import { Meteor } from "meteor/meteor";

var getClickedPlace = function(event, cb) {
    //Variable with the type of places we have
    var mapPlaces = ["Historic Monument", "Natural Monument", "Food", "Hotel"];

    mapPlaces.forEach(function(placeType) {
        Meteor.call("findAll", placeType, function(err, result) {
            if (err) {
                throw new Error("couldn't not find places with that category");
            }

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
    console.log("LIST OF PLACES: ", listOfPlaces);
    //first create an obejct with the name of the place and the average rating
    var tempPlace = [
        {
            name: null,
            averageScore: null
        }
    ];
    listOfPlaces.forEach(function(place) {
        //Then comes the calc of the avarege rating
        console.log("PLAC:", place);
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

        //Update the tempPlace with the calculated average
        console.log;
        console.log("TEMP PLACE: ", tempPlace[0].name);
        if (tempPlace[0].name === null) {
            console.log("TEMPPLACE NAME: ", tempPlace[0].name);
            //CHECK THIS FOR THE EN/PT
            tempPlace[0].name = place.pt.title;
            tempPlace[0].averageScore = average;
        } else {
            var objetToAdd = {
                name: place.pt.title,
                averageScore: average
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

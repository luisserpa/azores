var placePage = function() {
    var titleId = event.target.id;
    console.log("EVENT: ", event.target);
    console.log("TITLE ID: ", titleId);
    var placeToRender = [];
    Session.get("mapPlaces").forEach(function(element, index) {
        if (placeToRender.length <= 0) {
            Object.keys(element).forEach(function(key) {
                placeToRender = element[key];
                if (placeToRender.pt.title === titleId) {
                    Session.set("indexOfPlace", index);
                    console.log("INDEX OF PLACE: ", index);
                    Session.set("placeToRender", placeToRender);
                }
            });
        }
    });
};

var sortPlaces = function(listOfPlaces) {
    //first create an obejct with the name of the place and the average rating
    var tempPlace = [
        {
            name: null,
            averageScore: null
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

        //Update the tempPlace with the calculated average
        if (tempPlace[0].name === null) {
            console.log("TEMPPLACE NAME: ", tempPlace[0].name);
            tempPlace[0].name = place.name;
            tempPlace[0].averageScore = average;
        } else {
            var objetToAdd = {
                name: place.name,
                averageScore: average
            };
            tempPlace.push(objetToAdd);
        }
    });

    tempPlace.sort(sortList);
    console.log("TEMP PLACE: ", tempPlace);
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

export { placePage, sortPlaces };

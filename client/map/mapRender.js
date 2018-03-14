import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";

function startMap() {
    return function initMap() {
        var centerIsland = { lat: 38.715, lng: -27.22 };
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: Session.get("mapZoom"),
            center: centerIsland
        });

        /*function hello(isVisited, place) {
            console.log(">atjt");
            Object.keys(isVisited).forEach(function(key) {
                if (
                    isVisited[key].visited === true &&
                    isVisited[key].pt.title === place.pt.title
                ) {
                    console.log("TRUE: ", isVisited[key]);
                    return place.checkedIcon;
                } else {
                    console.log("FALSE: ", isVisited[key]);
                    return place.icon;
                }
            });
        }
        */

        // Variable with the type of places we have
        var mapPlaces = [
            "Historic Monument",
            "Natural Monument",
            "Food",
            "Hotel"
        ];

        mapPlaces.forEach(function(placeType, index) {
            Meteor.call("findAll", placeType, function(err, result) {
                if (err) {
                    throw new Error("no places found for this type");
                }
                console.log("result. ", result);
                var userPlaces = Session.get("sessionUser").places;
                var isVisited = userPlaces[index];

                result.forEach(function eachPlace(place) {
                    if (Session.get("filterMonuments")[index] === true) {
                        //Start the loop to show the icons in the map, that only are checked
                        // TODO: remember to put back the description in google marker
                        var title;
                        var description;
                        var visitHours;

                        //hello(isVisited, place);
                        console.log("HERE");
                        var icon;

                        Object.keys(isVisited).forEach(function(key) {
                            console.log("VISITED? ,", isVisited[key].visited);
                            console.log("KEY TITLE: ", isVisited[key].pt.title);
                            console.log("PLACE TITLE: ", place.pt.title);
                            if (
                                isVisited[key].visited === true &&
                                isVisited[key].pt.title === place.pt.title
                            ) {
                                console.log("TRUE: ", isVisited[key]);
                                console.log("PLACE: ", place.checkedIcon);
                                icon = place.checkedIcon;
                            } else {
                                if (
                                    icon !== "http://localhost:3000/visited.png"
                                ) {
                                    console.log("FALSE: ", isVisited[key]);
                                    icon = place.icon;
                                }
                            }
                        });

                        //Logic to select the marker in the map, according if tge user has visited the place

                        if (Session.get("sessionLanguage") === "portuguese") {
                            title = place.pt.title;
                            description = place.pt.description;
                            visitHours = place.pt.visitHours;
                        } else {
                            title = place.en.title;
                            description = place.en.description;
                            visitHours = place.en.visitHours;
                        }

                        var marker = new google.maps.Marker({
                            position: { lat: place.lat, lng: place.lng },
                            title: title,
                            icon: icon,
                            map: map
                        });
                        //console.log("MARKER ICON: ", marker);

                        google.maps.event.addListener(
                            marker,
                            "click",
                            function() {
                                var para = document.createElement("P");
                                var aTag = document.createElement("button");
                                var t = document.createTextNode(description);
                                var hours = document.createTextNode(visitHours);
                                //Carefull with the set of the href
                                aTag.setAttribute("href", "#");
                                aTag.setAttribute("class", "render");
                                aTag.setAttribute("id", place._id);
                                aTag.setAttribute("value", title);
                                aTag.innerHTML = title;
                                para.appendChild(aTag);
                                para.appendChild(document.createElement("P"));
                                para.appendChild(t);
                                para.appendChild(document.createElement("P"));
                                para.appendChild(hours);
                                var infowindow = new google.maps.InfoWindow({
                                    content: para
                                });
                                infowindow.open(map, marker);
                            }
                        );
                    }

                    google.maps.event.addListener(
                        map,
                        "zoom_changed",
                        function() {
                            Session.set("mapZoom", map.getZoom());
                        }
                    );
                });
            });
        });
    };

    //This starts with all the 4 type of places that the app has
    //Then it checks if the filter checkbox are selected
}

export default startMap;

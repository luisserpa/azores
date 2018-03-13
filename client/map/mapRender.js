import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";

var startMap = function() {
    return function initMap() {
        var centerIsland = { lat: 38.715, lng: -27.22 };
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: Session.get("mapZoom"),
            center: centerIsland
        });

        //Variable with the type of places we have
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
                result.forEach(function eachPlace(place) {
                    if (Session.get("filterMonuments")[index] === true) {
                        //Start the loop to show the icons in the map, that only are checked
                        $.each(place, function() {
                            // TODO: remember to put back the description in google marker
                            var title;
                            var description;

                            if (
                                Session.get("sessionLanguage") === "portuguese"
                            ) {
                                title = place.pt.title;
                                description = place.pt.description;
                            } else {
                                title = place.en.title;
                                description = place.en.description;
                            }

                            var marker = new google.maps.Marker({
                                position: { lat: place.lat, lng: place.lng },
                                title: title,
                                //icon: place.icon,
                                map: map
                            });

                            google.maps.event.addListener(
                                marker,
                                "click",
                                function() {
                                    var para = document.createElement("P");
                                    var aTag = document.createElement("button");
                                    var t = document.createTextNode(
                                        description
                                    );
                                    //Carefull with the set of the href
                                    aTag.setAttribute("href", "#");
                                    aTag.setAttribute("class", "render");
                                    aTag.setAttribute("id", place._id);
                                    aTag.setAttribute("value", title);
                                    aTag.innerHTML = title;
                                    para.appendChild(aTag);
                                    para.appendChild(
                                        document.createElement("P")
                                    );
                                    para.appendChild(t);
                                    var infowindow = new google.maps.InfoWindow(
                                        {
                                            content: para
                                        }
                                    );
                                    infowindow.open(map, marker);
                                }
                            );
                        });
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
};

export default startMap;

var startMap = function() {
<<<<<<< HEAD
  return function initMap() {
    var centerIsland = { lat: 38.663, lng: -27.22 };
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: Session.get("mapZoom"),
      center: centerIsland
    });

    //This starts with all the 4 type of places that the app has
    Session.get("mapPlaces").forEach(function(place, index) {
      //Then it checks if the filter checkbox are selected

      if (Session.get("filterMonuments")[index] === true) {
        //Start the loop to show the icons in the map, that only are checked
        place.forEach(function(element) {
          //Initial condition to choose language
          var title;
          var description;
          if (Session.get("sessionLanguage") === "portuguese") {
            title = element.titlePt;
            description = element.descriptionPt;
          } else {
            title = element.titleEn;
            description = element.descriptionEn;
          }

          var marker = new google.maps.Marker({
            position: { lat: element.lat, lng: element.lng },
            title: title,
            icon: element.icon,
            map: map
          });

          google.maps.event.addListener(marker, "click", function() {
            var para = document.createElement("P");
            var aTag = document.createElement("button");
            var t = document.createTextNode(description);
            //Carefull with the set of the href
            aTag.setAttribute("href", "#");
            aTag.setAttribute("class", "render");
            aTag.setAttribute("id", element.titlePt);
            aTag.setAttribute("value", element.titlePt);
            aTag.innerHTML = title;
            para.appendChild(aTag);
            para.appendChild(document.createElement("P"));
            para.appendChild(t);
            var infowindow = new google.maps.InfoWindow({
              content: para
            });
            infowindow.open(map, marker);
          });
          console.log("ELEMENT: ", element);
        });
      }

      google.maps.event.addListener(map, "zoom_changed", function() {
        Session.set("mapZoom", map.getZoom());
      });
    });
  };
=======
    return function initMap() {
        var centerIsland = { lat: 38.715, lng: -27.22 };
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: Session.get("mapZoom"),
            center: centerIsland
        });

        //This starts with all the 4 type of places that the app has
        Session.get("mapPlaces").forEach(function(place, index) {
            //Then it checks if the filter checkbox are selected
            if (Session.get("filterMonuments")[index] === true) {
                //Start the loop to show the icons in the map, that only are checked
                $.each(place, function(index, element) {
                    console.log("VALUE: ", element);
                    //Initial condition to choose language
                    var title;
                    var description;
                    if (Session.get("sessionLanguage") === "portuguese") {
                        title = element.pt.title;
                        description = element.pt.description;
                    } else {
                        title = element.en.title;
                        description = element.en.description;
                    }

                    var marker = new google.maps.Marker({
                        position: { lat: element.lat, lng: element.lng },
                        title: title,
                        icon: element.icon,
                        map: map
                    });

                    google.maps.event.addListener(marker, "click", function() {
                        var para = document.createElement("P");
                        var aTag = document.createElement("button");
                        var t = document.createTextNode(description);
                        //Carefull with the set of the href
                        aTag.setAttribute("href", "#");
                        aTag.setAttribute("class", "render");
                        aTag.setAttribute("id", element.pt.title);
                        aTag.setAttribute("value", element.pt.title);
                        aTag.innerHTML = title;
                        para.appendChild(aTag);
                        para.appendChild(document.createElement("P"));
                        para.appendChild(t);
                        var infowindow = new google.maps.InfoWindow({
                            content: para
                        });
                        infowindow.open(map, marker);
                    });
                });
            }

            google.maps.event.addListener(map, "zoom_changed", function() {
                Session.set("mapZoom", map.getZoom());
            });
        });
    };
>>>>>>> 047521134755037583689dfc16c3c4a21f555e21
};

export default startMap;

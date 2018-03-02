import json from "../json/historic-moments.js";

Template.islandMap.rendered=function(){
  Session.set("mapJSON",json);
}

Template.islandMap.helpers({

  markers(){
    return function initMap() {

          var uluru = {lat: 60.700, lng: 2.100};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: uluru
          });

          Session.get("mapJSON").forEach(function(element){
            var marker = new google.maps.Marker({
              position: {lat: element.lat, lng: element.lng},
              map: map
            });
            console.log("ELEMENT: ",element);
          });

        }
  }

});

import React, { Component } from "react";
import ReactDOM from "react-dom";
import historicMoments from "../json/historic-moments.js";

Template.islandMap.rendered=function(){
  Session.set("mapHistoricMoments",historicMoments);
}

Template.islandMap.helpers({

  markers(){
    return function initMap() {

          var uluru = {lat: 60.700, lng: 2.100};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: uluru
          });

          Session.get("mapHistoricMoments").forEach(function(element){
            var marker = new google.maps.Marker({
              position: {lat: element.lat, lng: element.lng},
              map: map
            });
            google.maps.event.addListener(marker,'click',function() {
              var para = document.createElement("P");
              var aTag = document.createElement("a");
              var t = document.createTextNode(element.description);
              aTag.setAttribute("href","Teste");
              aTag.innerHTML="HELLO";
              para.appendChild(aTag);
              para.appendChild(document.createElement("P"));
              para.appendChild(t);
              var infowindow = new google.maps.InfoWindow({
                content:para
              });
              infowindow.open(map,marker);
            });
            console.log("ELEMENT: ",element);
          });

        }
  }

});

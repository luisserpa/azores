import React, { Component } from "react";
import ReactDOM from "react-dom";
import historicMoments from "../json/historic-moments.js";
import naturalMoments from "../json/natural-monuments.js";

Template.islandMap.rendered=function(){
  var places = [historicMoments,naturalMoments];
  Session.set("mapPlaces",places);
}

Template.islandMap.helpers({

  markers(){
    return function initMap() {

          var centerIsland = {lat: 38.663, lng: -27.220};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: centerIsland
          });

          Session.get("mapPlaces").forEach(function(place){

            place.forEach(function(element){

              //Initial condition to choose language
              var title;
              var description;
              if(Session.get("sessionLanguage")==="portuguese"){
                title=element.titlePt;
                description=element.descriptionPt;
              }else{
                title=element.titleEn;
                description=element.descriptionEn;
              }


              var marker = new google.maps.Marker({
                position: {lat: element.lat, lng: element.lng},
                title:title,
                icon:element.icon,
                map: map
              });



              google.maps.event.addListener(marker,'click',function() {
                var para = document.createElement("P");
                var aTag = document.createElement("a");
                var t = document.createTextNode(description);
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

          });



        }
  }

});

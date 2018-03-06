import React, { Component } from "react";
import ReactDOM from "react-dom";
import historicMonuments from "../json/historic-monuments.js";
import naturalMonuments from "../json/natural-monuments.js";
import hotels from "../json/hotels.js";
import food from "../json/food.js";
import filterFunctions from "../utils/filter-functions.js";


Template.islandMap.rendered=function(){
  var filterMonuments =[true,true,true,true];
  Session.set("filterMonuments",filterMonuments);
  var places = [historicMonuments,naturalMonuments,hotels,food];
  var filterPlaces = ["historicMonuments","naturalMonuments","hotels","food"];
  Session.set("mapPlaces",places);
  Session.set("filterPlaces",filterPlaces);
}

Template.islandMap.helpers({

  markers(){
    return function initMap() {

          var centerIsland = {lat: 38.663, lng: -27.220};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: centerIsland
          });

            //This starts with all the 4 type of places that the app has
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
                  aTag.innerHTML=title;
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

Template.filter.events({

  "click .allChecked": function(event){
    var filterPlaces = Session.get("filterPlaces");
    filterPlaces.forEach(function(value,i){
      console.log("VALUE: ",value);
      filterFunctions.checkAll(value,i);
    });

  },

  "click .historicMonuments": function(event){
    filterFunctions.filterMonuments("historicMonuments",0);
  },

  "click .naturalMonuments": function(event){
    filterFunctions.filterMonuments("naturalMonuments",1);
  },

  "click .hotels": function(event){
    filterFunctions.filterMonuments("hotels",2);
  },

  "click .food": function(event){
    filterFunctions.filterMonuments("food",3);
  }

});

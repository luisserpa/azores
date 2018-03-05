import React, { Component } from "react";
import ReactDOM from "react-dom";
import historicMonuments from "../json/historic-monuments.js";
import naturalMonuments from "../json/natural-monuments.js";


Template.islandMap.rendered=function(){
  var filterMonuments =[false,false,false,false];
  Session.set("filterMonuments",filterMonuments);
  var places = [historicMonuments,naturalMonuments];
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
    $(".historicMonuments").prop("checked", false);
    filterMonuments("historicMonuments",0);
    var checkedValue = $('.allChecked:checked').val();
    var filter=Session.get("filterMonuments");
    if(checkedValue === "Yes"){
      filter[0]=true;
    }else{
      filter[0]=false;
    }

  },

  "click .historicMonuments": function(event){
    filterMonuments("historicMonuments",0);
  }

});

function filterMonuments(classFilter,index){
  console.log("ENTERED THE FILTER");
  var checkedValue = $('.'+classFilter+':checked').val();
  var filterMonuments=Session.get("filterMonuments");
  if (checkedValue === "Yes"){
    filterMonuments[index]=true;
  }else{
    filterMonuments[index]=false;
  }
  Session.set("filterMonuments",filterMonuments);
  console.log("MONUMENTS: ",Session.get("filterMonuments"));
}

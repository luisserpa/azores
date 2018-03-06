import React, { Component } from "react";
import ReactDOM from "react-dom";
import historicMonuments from "../json/historic-monuments.js";
import naturalMonuments from "../json/natural-monuments.js";
import hotels from "../json/hotels.js";
import food from "../json/food.js";
import filterFunctions from "../utils/filter-functions.js";
import startMap from "../map/mapRender.js";


Template.islandMap.rendered=function(){
  var filterMonuments =[true,true,true,true];
  Session.set("filterMonuments",filterMonuments);
  var places = [historicMonuments,naturalMonuments,hotels,food];
  var filterPlaces = ["historicMonuments","naturalMonuments","hotels","food"];
  Session.set("mapPlaces",places);
  Session.set("filterPlaces",filterPlaces);
  Session.set("mapZoom",13);
}

Template.islandMap.helpers({

  markers(){
     return startMap();

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

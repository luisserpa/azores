import React, { Component } from "react";
import ReactDOM from "react-dom";
import historicMonuments from "../json/historic-monuments.js";
import naturalMonuments from "../json/natural-monuments.js";
import hotels from "../json/hotels.js";
import food from "../json/food.js";
import filterFunctions from "../utils/filter-functions.js";
import startMap from "../map/mapRender.js";

Template.islandmap.rendered = function() {
    var filterMonuments = [true, true, true, true];
    Session.set("filterMonuments", filterMonuments);
    var places = [historicMonuments, naturalMonuments, hotels, food];
    var filterPlaces = [
        "historicMonuments",
        "naturalMonuments",
        "hotels",
        "food"
    ];
    Session.set("mapPlaces", places);
    Session.set("filterPlaces", filterPlaces);
    Session.set("mapZoom", 13);
};

Template.islandmap.helpers({
    mapMarker() {
        return startMap();
    }
});

Template.filter.events({
    "click .allChecked": function(event) {
        var filterPlaces = Session.get("filterPlaces");
        filterPlaces.forEach(function(value, i) {
            console.log("VALUE: ", value);
            filterFunctions.checkAll(value, i);
        });
    },

    "click .historicMonuments": function(event) {
        filterFunctions.filterMonuments("historicMonuments", 0);
    },

    "click .naturalMonuments": function(event) {
        filterFunctions.filterMonuments("naturalMonuments", 1);
    },

    "click .hotels": function(event) {
        filterFunctions.filterMonuments("hotels", 2);
    },

    "click .food": function(event) {
        filterFunctions.filterMonuments("food", 3);
    }
});

Template.islandmap.events({
    "click .render": function(event) {
        var titleId = event.target.id;
        console.log("VALUE ID: ", titleId);
        var placeToRender = [];
        Session.get("mapPlaces").forEach(function(element, index) {
            //console.log("ENTERED HERE");
            if (placeToRender.length <= 0) {
                placeToRender = element.filter(function(obj) {
                    Session.set("indexOfPlace", index);
                    return obj.titlePt == titleId;
                });
            }
        });

        Session.set("placeToRender", placeToRender[0]);
        Router.go("/renderpage");
    }
});

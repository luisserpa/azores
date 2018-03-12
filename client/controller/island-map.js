import React, { Component } from "react";
import ReactDOM from "react-dom";
import historicMonuments from "../../import/json/historic-monuments.json";
import naturalMonuments from "../../import/json/natural-monuments.json";
import hotels from "../../import/json/hotels.js";
import food from "../../import/json/food.json";
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
    Session.set("mapZoom", 11);
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
        var placeToRender = [];
        Session.get("mapPlaces").forEach(function(element, index) {
            if (placeToRender.length <= 0) {
                Object.keys(element).forEach(function(key) {
                    placeToRender = element[key];
                    if (placeToRender.pt.title === titleId) {
                        Session.set("indexOfPlace", index);
                        console.log("INDEX OF PLACE: ", index);
                        Session.set("placeToRender", placeToRender);
                    }
                });
            }
        });

        Router.go("/renderpage");
    }
});

import React, { Component } from "react";
import ReactDOM from "react-dom";
import historicMonuments from "../../import/json/historic-monuments.json";
import naturalMonuments from "../../import/json/natural-monuments.json";
import hotels from "../../import/json/hotels.js";
import food from "../../import/json/food.json";
import filterFunctions from "../utils/filter-functions.js";
import startMap from "../map/mapRender.js";
import listChosenMonuments from "../utils/select-monument-type.js";
import { placePage, sortPlaces } from "../utils/render-pages.js";

/**
 * This module is for rendering the map view of the app
 */

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
    },

    "click .listMonuments": function(event) {
        var chooseList = event.target.id;
        console.log("CHOOSE LIST: ", chooseList);
        listChosenMonuments(chooseList);
    }
});

Template.islandmap.events({
    "click .render": function(event) {
        placePage();
        Router.go("/renderpage");
    }
});

import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { Router } from "meteor/iron:router";

import filterFunctions from "../utils/filter-functions.js";
import startMap from "../map/mapRender.js";
import listChosenMonuments from "../utils/select-monument-type.js";
import { getClickedPlace } from "../utils/render-pages.js";
import islandMapLanguages from "../../import/json/html-fields/display-map.json";

var filterPlaces = ["historicMonuments", "naturalMonuments", "hotels", "food"];

/**
 * This module is for rendering the map view of the app
 */

Template.islandmap.rendered = function() {
    var filterMonuments = [true, true, true, true];
    Session.set("filterMonuments", filterMonuments);
    Session.set("mapZoom", 11);
};

Template.islandmap.helpers({
    mapMarker() {
        return startMap();
    }
});

Template.filter.helpers({
    language() {
        if (Session.get("sessionLanguage") === "portuguese") {
            return islandMapLanguages.pt;
        } else {
            return islandMapLanguages.en;
        }
    }
});

Template.filter.events({
    "click .allChecked": function() {
        filterPlaces.forEach(function(value, i) {
            filterFunctions.checkAll(value, i);
        });
    },

    "click .historicMonuments": function() {
        filterFunctions.filterMonuments("historicMonuments", 0);
    },

    "click .naturalMonuments": function() {
        filterFunctions.filterMonuments("naturalMonuments", 1);
    },

    "click .hotels": function() {
        filterFunctions.filterMonuments("hotels", 3);
    },

    "click .food": function() {
        filterFunctions.filterMonuments("food", 2);
    },

    "click .listMonuments": function(event) {
        var chooseList = event.target.id;
        listChosenMonuments(chooseList);
    }
});

Template.islandmap.events({
    "click .render": function(event) {
        getClickedPlace(event, function(place) {
            Router.go("/renderpage/" + place._id);
        });
    }
});

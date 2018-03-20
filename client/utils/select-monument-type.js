import {Session} from "meteor/session";
import {Router} from "meteor/iron:router";

var listChosenMonuments = function(monumentId) {
    switch (monumentId) {
    case "refHistoricMonuments":
        Session.set("placeType", "Historic Monument");
        Router.go("/islandmap/historicmonuments");
        break;
    case "refNaturalMonuments":
        Session.set("placeType", "Natural Monument");
        Router.go("/islandmap/naturalmonuments");
        break;
    case "refAccomodations":
        Session.set("placeType", "Hotel");
        Router.go("/islandmap/accommodations");
        break;
    case "refRestaurants":
        Session.set("placeType", "Food");
        Router.go("/islandmap/restaurants");
        break;
    default:
        Router.go("/islandmap");
        break;
    }
};

export default listChosenMonuments;

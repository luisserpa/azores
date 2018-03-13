var listChosenMonuments = function(monumentId) {
    switch (monumentId) {
    case "refHistoricMonuments":
        Session.set("placeType", "historicMonuments");
        Router.go("/islandmap/historicmonuments");
        break;
    case "refNaturalMonuments":
        Session.set("placeType", "naturalMonuments");
        Router.go("/islandmap/naturalmonuments");
        break;
    case "refAccomodations":
        Session.set("placeType", "hotels");
        Router.go("/islandmap/accommodations");
        break;
    case "refRestaurants":
        Session.set("placeType", "food");
        Router.go("/islandmap/restaurants");
        break;
    default:
        Router.go("/islandmap");
        break;
    }
};

export default listChosenMonuments;

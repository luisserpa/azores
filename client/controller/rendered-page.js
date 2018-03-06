import historicMonuments from "../json/historic-monuments.js";


Template.title.helpers({

  title(){
    console.log("PLACE ",Session.get("placeToRender"));
    if(Session.get("language") === "portuguese"){
      return Session.get("placeToRender").longDescriptionPt;
    }else{
      return Session.get("placeToRender").longDescriptionEn;
    }
  }

});

Template.images.helpers({
  images(){
    return Session.get("placeToRender");
  }
});

Template.visited.events({
  "click .visitedPlace":function(event){
    //First we need to get the places of the user.
    var tempPlaces = Session.get("sessionUser").places;
    console.log("TEMP PLACES: ",tempPlaces);
    //Then we need to find the place that we need to change
    var placeToChange = tempPlaces.filter(function( obj ) {
      return obj.titlePt == Session.get("placeToRender");
    });
    console.log("PLACE TO CHANGE: ",placeToChange);
  }
})

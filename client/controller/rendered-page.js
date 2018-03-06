import historicMonuments from "../json/historic-monuments.js";


Template.title.helpers({

  title(){
    console.log("PLACE ",Session.get("placeToRender"));
    //console.log("VALUE: ",$(event.currentTarget).val());
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
})

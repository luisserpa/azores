import json from "../json/historic-moments.js";

/*
Template.islandMap.rendered=function(){

  console.log("JSON FILE: ",json);

    json.forEach(function(element){
      console.log("ELEMENT: "+element);
      Session.set("jsonMarkers",element);
    });

}
*/

Template.islandMap.helpers({
  markers(){
    console.log("JSON FILE: ", json);
    return json;
  }

});

var startMap = function(){

  return function initMap () {

       var centerIsland = {lat: 38.663, lng: -27.220};
       var map = new google.maps.Map(document.getElementById('map'), {
         zoom: Session.get("mapZoom"),
         center: centerIsland
       });


         //This starts with all the 4 type of places that the app has
         Session.get("mapPlaces").forEach(function(place,index){
           //Then it checks if the filter checkbox are selected

             if(Session.get("filterMonuments")[index] === true){
               //Start the loop to show the icons in the map, that only are checked
               place.forEach(function(element){

                 //Initial condition to choose language
                 var title;
                 var description;
                 if(Session.get("sessionLanguage")==="portuguese"){
                   title=element.titlePt;
                   description=element.descriptionPt;
                 }else{
                   title=element.titleEn;
                   description=element.descriptionEn;
                 }


                 var marker = new google.maps.Marker({
                   position: {lat: element.lat, lng: element.lng},
                   title:title,
                   icon:element.icon,
                   map: map
                 });


                 google.maps.event.addListener(marker,'click',function() {
                   var para = document.createElement("P");
                   var aTag = document.createElement("a");
                   var t = document.createTextNode(description);
                   aTag.setAttribute("href","Teste");
                   aTag.innerHTML=title;
                   para.appendChild(aTag);
                   para.appendChild(document.createElement("P"));
                   para.appendChild(t);
                   var infowindow = new google.maps.InfoWindow({
                     content:para
                   });
                   infowindow.open(map,marker);
                 });
                 console.log("ELEMENT: ",element);
               });
             }

             google.maps.event.addListener(map, 'zoom_changed', function() {
               Session.set("mapZoom",map.getZoom());
              });

         });

     }

};

export default startMap;

import startMap from "../map/mapRender.js";

var filterFunctions = {

   checkAll: function(classFilter,index){
    $("."+classFilter).prop("checked", false);
    this.filterMonuments(classFilter,index);
    var checkedValue = $('.allChecked:checked').val();
    var filter=Session.get("filterMonuments");
    if(checkedValue === "Yes"){
      filter[index]=true;
      document.getElementById(classFilter).checked = false;
      this.filterMonuments(classFilter,index);
    }else{
      filter[index]=false;
      document.getElementById(classFilter).checked = true;
      this.filterMonuments(classFilter,index);
    }

  },

  filterMonuments: function(classFilter,index){
    var checkedValue = $('.'+classFilter+':checked').val();
    var filterMonuments=Session.get("filterMonuments");
    if (checkedValue === "Yes"){
      filterMonuments[index]=true;
    }else{
      filterMonuments[index]=false;
    }
    Session.set("filterMonuments",filterMonuments);
    initMap();
  }

}





export default filterFunctions;

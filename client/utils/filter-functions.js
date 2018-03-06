var filterFunctions = {

   checkAll: function(classFilter,index){
    $("."+classFilter).prop("checked", false);
    filterMonuments(classFilter,index);
    var checkedValue = $('.allChecked:checked').val();
    var filter=Session.get("filterMonuments");
    if(checkedValue === "Yes"){
      filter[index]=true;
      document.getElementById(classFilter).checked = false;
      filterMonuments(classFilter,index);
    }else{
      filter[index]=false;
      document.getElementById(classFilter).checked = true;
      filterMonuments(classFilter,index);
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
  }

}





export default filterFunctions;

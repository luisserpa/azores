Template.header.events({
  "click .logout": function (event){
      event.preventDefault();
      //To log out
      Session.set("sessionUser", undefined);
      Router.go("/login");
    },

    "click .portuguese":function(event){
      var language = "portuguese";
      Session.set("sessionLanguage", language);
      console.log("PT");
      Router.go("/islandmap");
    },

    "click .english":function(event){
      var language = "english";
      Session.set("sessionLanguage", language);
      console.log("EN");
      Router.go("/islandmap");
    }
});

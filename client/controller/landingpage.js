Template.landingpage.events({
    "click .portuguese": function(event) {
        var language = "portuguese";
        Session.set("sessionLanguage", language);
        Router.go("/login");
    },

    "click .english": function(event) {
        var language = "english";
        Session.set("sessionLanguage", language);
        Router.go("/login");
    }
});

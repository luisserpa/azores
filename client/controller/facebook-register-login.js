import historicMonuments from "../../import/json/historic-monuments.json";
import naturalMonuments from "../../import/json/natural-monuments.json";
import hotels from "../../import/json/hotels.js";
import food from "../../import/json/food.js";

Template.facebookButton.events({

    "click .facebookLogin": function() {
        
        FB.login(function(faceStatus) {
            console.log("STATUS: ", faceStatus);
            if (faceStatus.authResponse) {
                FB.api("/me", { fields: "name, email" }, function(response) {
                    console.log("RESPONSE: ", response);

                    if (response.email === undefined) {
                        return;
                    }

                    Meteor.call("findByEmail", response.email, function(error,user) {
                        if (!error) {
                            if (user === undefined) {
                                var newUser = {
                                    email: response.email,
                                    displayName: response.name.split(" ")[0],
                                    password: "",
                                    founds: 0,
                                    cows: 0,
                                    places: [
                                        historicMonuments,
                                        naturalMonuments,
                                        hotels,
                                        food
                                    ]
                                };

                                Meteor.call("addUser", newUser);

                                Meteor.call("findByEmail", newUser.email, function(error, userWithId) {
                                        if (!error) {
                                            
                                            console.log("FACE USER WITH ID ", userWithId);
                                            Session.set("sessionUser", userWithId);
                                            Router.go("/islandmap");
                                        }
                                    }
                                );
                            } else {
                                Session.set("sessionUser", user);
                                console.log("SESSION FACE USER", user);
                                Router.go("/islandmap");
                            }
                        }
                    });
                });
            }
        });
    }
});

Template.facebookButton.rendered = function() {

    window.fbAsyncInit = function () {
        FB.init({
          appId: '575816526107182',
          cookie: true,
          xfbml: true,
          version: 'v2.12'
        });
  
        FB.AppEvents.logPageView();
  
      };
  
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
};
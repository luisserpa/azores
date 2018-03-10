import loginMessages from "../utils/login-messages.js";
import loginLanguages from "../../import/json/html-fields/login.json";

Template.login.events({

  "click .facebookLogin": function() {

    FB.login(function(faceStatus) {
        console.log("STATUS: ",faceStatus);
        if (faceStatus.authResponse) {

            FB.api('/me', {fields: 'name, email'}, function(response) {
            console.log("RESPONSE: ", response);

                if (response.email === undefined) {
                return;
                }

                Meteor.call("findByEmail", response.email, function(error, user) {

                    if(!error){

                        if(user === undefined){

                            var newUser={
                                email: response.email,
                                displayName: response.name,
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

                            console.log("FACE USER: ", newUser);

                            Meteor.call("addUser", newUser);
                            user = newUser;
                        }

                        Session.set("sessionUser", user);
                        Router.go("/islandmap");
                    }
                }); 
            });
        } 
    }); 
   }, 

    "submit form": function(event) {
        event.preventDefault();
        var loginEmail = event.target.loginEmail.value;
        var loginPassword = event.target.loginPassword.value;

        if (
            loginPassword === "" ||
            loginPassword === undefined ||
            loginEmail === "" ||
            loginEmail === undefined
        ) {
            loginMessages();
            return;
        }

        Meteor.call("findByEmail", loginEmail, function(error, user) {

            if (!error) {
                if (user === undefined) {
                    loginMessages();
                    return;
                }

                if (user.password !== loginPassword) {
                    loginMessages();
                    return;
                }

                Session.set("sessionUser", user);
                Router.go("/islandmap");
            }
        });
    }

}); 

Template.login.helpers({
    language() {
        if (Session.get("sessionLanguage") === "portuguese") {
            return loginLanguages.pt;
        } else {
            return loginLanguages.en;
        }
    }
});

/*Template.login.onRendered(function () {

    FB.getLoginStatus(function(response) {
        console.log("FIRST CHECK FACE STATUS: ", response);
        if (response.status === "connected") {
            Router.go("/islandmap");
        }
    });

});*/

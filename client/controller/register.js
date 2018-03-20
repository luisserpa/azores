import registerMessages from "../utils/register-messages.js";
import historicMonuments from "../../import/json/historic-monuments.json";
import naturalMonuments from "../../import/json/natural-monuments.json";
import hotels from "../../import/json/hotels.json";
import food from "../../import/json/food.json";
import registerLanguages from "../../import/json/html-fields/register.json";
import landingPageLanguage from "../../import/json/html-fields/landing-page.json";

/**
 * This module is for managing the register process
 */

Template.register.events({
    "click .back": function() {
        Router.go("/");
    },

    "submit .add-user": function(event) {
        event.preventDefault();
        var registerEmail = event.target.registerEmail.value;
        var registerDisplayName = event.target.registerDisplayName.value;
        var registerPassword = event.target.registerPassword.value;
        var retypePassword = event.target.repeatPassword.value;

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if (
            registerEmail === "" ||
            registerEmail === undefined ||
            !validateEmail(registerEmail)
        ) {
            registerMessages.emptyEmail();
            return;
        }

        if (registerDisplayName === "" || registerDisplayName === undefined) {
            registerMessages.emptyFields();
            return;
        }

        if (registerDisplayName.length > 12) {
            registerMessages.nameCharacters();
            return;
        }

        if (registerPassword.length < 5) {
            registerMessages.passwordCharacters();
            return;
        }

        if (registerPassword !== retypePassword) {
            registerMessages.passwordEquality();
            return;
        }

        Meteor.call("findByEmail", registerEmail, function(error, user) {
            if (!error) {
                if (user !== undefined) {
                    registerMessages.userExists();
                    event.target.reset();
                    return;
                } else {
                    var newUser = {
                        email: registerEmail,
                        displayName: registerDisplayName,
                        password: registerPassword,
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
                    registerMessages.createSuccess();
                    Router.go("/");
                }
            }
        });
    }
});

Template.register.helpers({
    language() {
        if (Session.get("sessionLanguage") === "portuguese") {
            return registerLanguages.pt;
        } else {
            return registerLanguages.en;
        }
    }
});

Template.registerPage.helpers({
    language() {
        if (Session.get("sessionLanguage") === "portuguese") {
            return landingPageLanguage.pt;
        } else {
            return landingPageLanguage.en;
        }
    }
});

Template.registerPage.events({
    "click .portuguese": function() {
        Session.set("sessionLanguage", "portuguese");
    },

    "click .english": function() {
        Session.set("sessionLanguage", "english");
    }
});

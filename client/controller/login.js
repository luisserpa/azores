import loginMessages from "../utils/login-messages.js";
import loginLanguages from "../../import/json/html-fields/login.json";

/**
 * This module is for handling the login process
 */

Template.login.events({
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

                if (loginEmail === "admin@admin") {
                    Session.set("admin", user);
                    Router.go("/");
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

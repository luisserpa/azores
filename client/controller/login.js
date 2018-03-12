import loginMessages from "../utils/login-messages.js";
import loginLanguages from "../../import/json/html-fields/login.json";

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
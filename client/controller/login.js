import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Session } from "meteor/session";
import { Router } from "meteor/iron:router";

import loginMessages from "../utils/login-messages.js";
import loginLanguages from "../../import/json/html-fields/login.json";
import landingPageLanguage from "../../import/json/html-fields/landing-page.json";

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

Template.landingpage.helpers({
    language() {
        if (Session.get("sessionLanguage") === "portuguese") {
            return landingPageLanguage.pt;
        } else {
            return landingPageLanguage.en;
        }
    }
});

Template.landingpage.events({
    "click .portuguese": function() {
        Session.set("sessionLanguage", "portuguese");
        Router.go("/");
    },

    "click .english": function() {
        Session.set("sessionLanguage", "english");
        Router.go("/");
    }
});

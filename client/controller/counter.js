import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
import { Session } from "meteor/session";
import counterLanguages from "../../import/json/html-fields/cowcounter.json";

/**
 * This module is for the cow counter with persistence of data associated to a user
 */

let cowcounter;

Template.counter.onCreated(function onReder() {
    cowcounter = new ReactiveVar(Session.get("sessionUser").cows);
});

Template.counter.helpers({
    language() {
        return selectCounterLanguage();
    }
});

Template.cowcounter.helpers({
    counter: function() {
        return cowcounter.get();
    },

    language() {
        return selectCounterLanguage();
    }
});

Template.cowcounter.events({
    "click button": function() {
        cowcounter.set(cowcounter.get() + 1);
        var user = Session.get("sessionUser");
        user.cows = cowcounter.get();
        Session.set("sessionUser", user);
        Meteor.call("updateCounter", user._id, cowcounter.get());
    }
});

function selectCounterLanguage() {
    if (Session.get("sessionLanguage") === "portuguese") {
        return counterLanguages.pt;
    } else {
        return counterLanguages.en;
    }
}

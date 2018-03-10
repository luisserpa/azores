import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

let cowcounter;

Template.counter.onCreated(function onReder() {
    cowcounter = new ReactiveVar(Session.get("sessionUser").cows);
});

Template.cowcounter.helpers({
    counter: function() {
        return cowcounter.get();
    }
});

Template.cowcounter.events({
    "click button": function() {
        cowcounter.set(cowcounter.get() + 1);
        user = Session.get("sessionUser");
        user.cows = cowcounter.get();
        Session.set("sessionUser", user);
        Meteor.call("updateCounter",user._id,cowcounter.get());
    }
});





import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Session } from "meteor/session";
import languageSelect from "./language-select.js";

let updateScore;
Template.score.onCreated(function() {
    updateScore = new ReactiveVar();
    renderScore(this.data.rating);
});

Template.score.helpers({
    placeScore() {
        if (updateScore.get() === 0) {
            if (Session.get("sessionLanguage") === "portuguese") {
                return "Não votado";
            } else {
                return "Not voted";
            }
        } else {
            return updateScore.get();
        }
    },

    language() {
        return languageSelect();
    }
});

var renderScore = function(dataScore) {
    var averageScore = 0;
    console.log("DATA: ", dataScore);

    dataScore.forEach(function(score) {
        averageScore += parseFloat(score);
    });

    if (averageScore === 0) {
        updateScore.set(0);
    } else {
        console.log("UPDATED SCORE: ", updateScore.get());
        console.log("UPDATED: ", averageScore / dataScore.length);
        updateScore.set(averageScore / dataScore.length);
    }
};

export default renderScore;

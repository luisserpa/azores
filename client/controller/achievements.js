import achievementsLanguages from "../../import/json/html-fields/achievements.json";

/**
 * This module is for rendering the achievements view 
 * only shows the rewards when the user has visited a determined number of places
 */

Template.achievements.helpers({
    language() {
        if (Session.get("sessionLanguage") === "portuguese") {
            return achievementsLanguages.pt;
        } else {
            return achievementsLanguages.en;
        }
    },

    firstAchievement(){
        return Session.get("sessionUser").founds > 0;
    },

    secondAchievement(){
        return Session.get("sessionUser").founds > 4;
    },
    
    thirdAchievement(){
        return Session.get("sessionUser").founds > 9;
    },

    fourthAchievement(){
        return Session.get("sessionUser").founds > 19;
    },

    fifthAchievement(){
        return Session.get("sessionUser").founds > 39;
    },

    sixthAchievement(){
        return Session.get("sessionUser").founds > 79;
    }
});
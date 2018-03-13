import { Template } from "meteor/templating";
import { Session } from "meteor/session";

Template.description.helpers({
    description() {
        var description;
        if (Session.get("sessionLanguage") === "portuguese") {
            description = this.pt.longDescription;
        } else {
            description = this.en.longDescription;
        }
        return description;
    }
});

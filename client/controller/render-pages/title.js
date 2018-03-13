import { Template } from "meteor/templating";

Template.title.helpers({
    title() {
        return this.pt.title;
    }
});

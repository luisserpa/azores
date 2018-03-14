import renderedPageLanguage from "../../../import/json/html-fields/rendered-page.json";

var languadeSelect = function() {
    if (Session.get("sessionLanguage") === "portuguese") {
        return renderedPageLanguage.pt;
    } else {
        return renderedPageLanguage.en;
    }
};

export default languadeSelect;

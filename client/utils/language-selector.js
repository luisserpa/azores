//This function is used to select the language displayed in the html
function languageSelected(element, language) {
    var keys = {
        title: undefined,
        description: undefined
    };
    if (language === "portuguese") {
        keys.title = element.pt.title;
        keys.description = element.pt.description;
    } else {
        keys.title = element.en.title;
        keys.description = element.en.description;
    }

    return keys;
}

export default languageSelected;

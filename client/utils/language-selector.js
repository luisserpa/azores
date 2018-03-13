function languageSelected(element, language) {
    console.log("ELEMENT: ", element);
    console.log("LANGUAGE:", language);
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

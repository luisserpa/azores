function loginMessages() {
    if (Session.get("sessionLanguage") === "portuguese") {
        FlashMessages.sendError("Autenticação falhou");
    } else {
        FlashMessages.sendError("Authentication failed.");
    }
}

export default loginMessages;

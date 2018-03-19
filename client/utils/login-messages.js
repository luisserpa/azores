import { Session } from "meteor/session";

//Messages to show up in the log in view
function loginMessages() {
    if (Session.get("sessionLanguage") === "portuguese") {
        FlashMessages.sendError("Autenticação falhou");
    } else {
        FlashMessages.sendError("Authentication failed.");
    }
}

export default loginMessages;

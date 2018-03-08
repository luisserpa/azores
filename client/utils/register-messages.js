var registerMessages = {
    emptyEmail: function() {
        if (Session.get("sessionLanguage") === "portuguese") {
            FlashMessages.sendError("Deve colocar um email válido.");
        } else {
            FlashMessages.sendError("Email must be filled.");
        }
    },

    emptyFields: function() {
        if (Session.get("sessionLanguage") === "portuguese") {
            FlashMessages.sendError("Nome de utlizador deve estar preenchido.");
        } else {
            FlashMessages.sendError("Display name must be filled.");
        }
    },

    passwordCharacters: function() {
        if (Session.get("sessionLanguage") === "portuguese") {
            FlashMessages.sendError(
                "Palavra passe deve ter pelo menos 5 caracteres."
            );
        } else {
            FlashMessages.sendError(
                "Password must have at least 5 characters."
            );
        }
    },

    passwordEquality: function() {
        if (Session.get("sessionLanguage") === "portuguese") {
            FlashMessages.sendError("Palavras passes devem ser iguais.");
        } else {
            FlashMessages.sendError("Passwords must be equal.");
        }
    },

    userExists: function() {
        if (Session.get("sessionLanguage") === "portuguese") {
            FlashMessages.sendError("Este email já está registado.");
        } else {
            FlashMessages.sendError("This email is already registered.");
        }
    },

    createSuccess: function() {
        if (Session.get("sessionLanguage") === "portuguese") {
            FlashMessages.sendSuccess("Utilizador criado com sucesso.");
        } else {
            FlashMessages.sendSuccess("User created successfully.");
        }
    }
};

export default registerMessages;

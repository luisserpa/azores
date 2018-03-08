import loginMessages from "../utils/login-messages.js";

Template.login.events({
    "click .facebookLogin": function() {
        FB.login(function(faceStatus) {
            if (faceStatus.authResponse) {
                console.log("STATUS: ", faceStatus);
                console.log("Welcome!  Fetching your information.... ");

                FB.api("/me", { fields: "name, email" }, function(response) {
                    console.log("RESPONSE: ", response);
                    console.log("MAIL: ", response.email);
                    console.log("Good to see you, " + response.name + ".");

                    if (response.email === undefined) {
                        console.log("MAIL UNDEFINED");
                        return;
                    }

                    Meteor.call("findByEmail", response.email, function(
                        error,
                        user
                    ) {
                        if (!error) {
                            if (user === undefined) {
                                var newUser = {
                                    email: response.email,
                                    displayName: response.name,
                                    password: ""
                                };

                                console.log("FACE USER: ", newUser);

                                Meteor.call("addUser", newUser);
                            }

                            Session.set("sessionUser", user);
                            Router.go("/islandmap");
                        }
                    });
                });
            } else {
                console.log("User cancelled login or did not fully authorize.");
            }
        });
    },

    "submit form": function(event) {
        event.preventDefault();
        var loginEmail = event.target.loginEmail.value;
        var loginPassword = event.target.loginPassword.value;

        console.log("EMAIL: ", loginEmail);
        console.log("PASS: ", loginPassword);

        if (
            loginPassword === "" ||
            loginPassword === undefined ||
            loginEmail === "" ||
            loginEmail === undefined
        ) {
            loginMessages();
            return;
        }

        Meteor.call("findByEmail", loginEmail, function(error, user) {
            console.log("SEARCHING DB");
            if (!error) {
                if (user === undefined) {
                    loginMessages();
                    return;
                }

                if (user.password !== loginPassword) {
                    loginMessages();
                    return;
                }

                Session.set("sessionUser", user);
                Router.go("/islandmap");
            }
        });
    }
});

Template.login.helpers({
    language() {
        if (Session.get("sessionLanguage") === "portuguese") {
            return true;
        } else {
            return false;
        }
    }
});

Template.login.onRendered(function() {
    FB.getLoginStatus(function(response) {
        console.log("FIRST CHECK FACE STATUS: ", response);
        if (response.status === "connected") {
            Router.go("/islandmap");
        }
    });
});

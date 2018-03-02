import registerMessages from "../utils/register-messages.js";

Template.register.events({

  "click .backEn": function(event){
    Router.go("/login");
  },

  "click .backPt": function(event){
    Router.go("/login");
  },

  "submit .add-user": function(event){
    event.preventDefault();
    var registerEmail =  event.target.registerEmail.value;
    var registerDisplayName =  event.target.registerDisplayName.value;
    var registerPassword = event.target.registerPassword.value;
    var retypePassword = event.target.repeatPassword.value;

    if(registerEmail === "" || registerEmail === undefined){
      registerMessages.emptyEmail();
      return;
    }

    if(registerDisplayName === "" || registerDisplayName===undefined){
      registerMessages.emptyFields();
      return;
    }

    if(registerPassword<5){
      registerMessages.passwordCharacters();
      return;
    }

    if(registerPassword !== retypePassword){
      registerMessages.passwordEquality();
      return;
    }

    Meteor.call("findByEmail", registerEmail, function(error, user) {

      if(!error){

        if(user !== undefined){
          registerMessages.userExists();
          event.target.reset();
          return;

        } else {

          var newUser={
            email: registerEmail,
            displayName: registerDisplayName,
            password: registerPassword
          };
          Meteor.call("addUser", newUser);
          registerMessages.createSuccess();
          Router.go("/login");
        }
      }
    });

  }
});

Template.register.helpers({
  language(){
    if(Session.get("sessionLanguage") === "portuguese"){
      return true;
    }else{
      return false;
    }
  }
});

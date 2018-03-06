import loginMessages from "../utils/login-messages.js";

Template.login.events({

  'click .facebook': function(e) {
    console.log("ENTERED HERE");
     e.preventDefault();


//REVER ESTA PARTE
     Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
         if (err) {
             console.log('Handle errors here: ', err);
         }


     });
 },

  "submit form": function(event){
    event.preventDefault();
    var loginEmail = event.target.loginEmail.value;
    var loginPassword = event.target.loginPassword.value;

    console.log("EMAIL: ", loginEmail);

    Meteor.call("findByEmail", loginEmail, function(error, user) {
      if(!error){

        if(user === undefined){
          loginMessages();
          return;
        }

        if(user.password !== loginPassword){
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

  language(){
    if(Session.get("sessionLanguage") === "portuguese"){
      return true;
    }else{
      return false;
    };

  }
});

import {Meteor} from 'meteor/meteor';

Meteor.methods({
  addUser: function(userData){
    var userId = Users.insert(userData);
    return userId;
  }
});

Meteor.methods({
  findByEmail: function(userEmail){
    var user = Users.findOne({email:userEmail});
    return user;
  }
});

Accounts.onCreateUser(function (options, user) {
  console.log("SERVER SIDE");
    if (!user.services.facebook) {
      console.log("USER NOT: ", user);
        return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];
    console.log("USER: ",user);
    return user;
});

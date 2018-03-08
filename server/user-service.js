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

Meteor.methods({
  updateUser:function(userId, visitedPlaces,increaseFounds){
    Users.update({_id:userId}, {$set:{places:visitedPlaces,founds:increaseFounds}});
  }
});

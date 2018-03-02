Meteor.publish("usersList", function(){
  return Users.find({});
});

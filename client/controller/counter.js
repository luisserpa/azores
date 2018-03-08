if (Meteor.isClient) {
  Session.setDefault('counter', 0);

  Template.cowcounter.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.cowcounter.events({
    'click button': function () {
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}

var messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  Template.base.userLoggetIn = function() {
    return Meteor.user();
  };

  Template.base.creatingAccount = function () {
    return Session.get('creatingAccount');
  };

  Template.base.events({
    'click #toCreateAccountPage': function () {
      console.log('cap');
      Session.set('creatingAccount', true);
      console.log(Session.get('createAccount'));
    },

    'click #toSignInPage': function () {
      Session.set('creatingAccount', false);
    }
  });

  Template.chat.collection = function() {
    return messages.find().fetch().reverse();
  };

  Template.base.events({
    'click #submit' : function(e, t) {
      console.log(messages);
      var text = t.find('#text');
      if (text.value) {
        messages.insert({ name: Meteor.user().emails[0].address, message: text.value });
        text.value = '';
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

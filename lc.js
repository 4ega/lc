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
      Session.set('creatingAccount', true);
    },

    'click #toSignInPage': function () {
      Session.set('creatingAccount', false);
    },

    'click #createAccount': function(e, t) {
      Session.set('creatingAccount', false);
      Accounts.createUser({
        username: t.find("#name").value,
        password: t.find("#password").value,
        email: t.find("#email").value
      });
    },

    'click #logOut': function() {
      Meteor.logout();
    }
  });

  Template.chat.collection = function() {
    return messages.find().fetch().reverse();
  };

  Template.base.events({
    'click #submit' : function(e, t) {
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

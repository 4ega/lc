var messages = new Meteor.Collection('messages');


if (Meteor.isClient) {

  Template.signInBlock.creatingAccount = function () {
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
      var pass, conf;
      pass = t.find('#password').value;
      conf = t.find('#password-conf').value;
      if (pass === conf) {
        Session.set('creatingAccount', false);
        Accounts.createUser({
          username: t.find("#name").value,
          password: t.find("#password").value,
          email: t.find("#email").value
        });
      } else {
        alert('error');
      }
    },

    'click #logOut': function() {
      Meteor.logout();
    },

    'click #signIn': function(e, t) {
      Meteor.loginWithPassword(t.find('#name').value, t.find('#password').value);
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

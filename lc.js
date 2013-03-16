var messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  Template.base.userLoggetIn = function() {
    return Meteor.user();
  }

  Template.chat.collection = function() {
    return messages.find().fetch().reverse();
  }

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

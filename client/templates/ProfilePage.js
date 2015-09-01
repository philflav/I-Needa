/**
 * Created by Phil on 01/09/2015.
 */
Template.ProfilePage.helpers({
    userName: function() {
        return Meteor.user().username;
    },
    userId: function() {
        return Meteor.userId();
    }
});

Template.ProfilePage.events({
    'click .send': function(event,tmpl) {
        event.stopPropagation();
        event.preventDefault();
        console.log("Send button pressed");
        var content = $('[name="myContent"]').val();
        var recipientId = $('[name="recipientId"]').val();
        var senderId = $('[name="sentFromId"]').val();
        var recipientName = Profiles.findOne({createdBy: recipientId},{fields:{ProfileTitle: 1, _id:0}});
        var senderName = Profiles.findOne({createdBy: senderId},{fields:{ProfileTitle: 1, _id:0}});
        console.log("Sending to:" + (recipientName["ProfileTitle"])+ " from " + (senderName["ProfileTitle"]));
        var d = new Date();
        var n = d.toLocaleString();
        Messages.insert({
            sentToId: recipientId,
            sentToName: (recipientName["ProfileTitle"]),
            sentFromId: senderId,
            sentFromName: (senderName["ProfileTitle"]),
            content: content,
            createdOn: n
        });
    },
});
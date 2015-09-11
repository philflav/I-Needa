/**
 * Created by Phil on 01/09/2015.
 */
Template.post.helpers({
    userName: function() {
        return Meteor.user().username;
    },
    userId: function() {
        return Meteor.userId();
    }
});

Template.post.events({
    'submit form': function(event) {
        console.log("Send button pressed");
        var content = $('[name="content"]').val();
        var recipientId = $('[name="recipientId"]').val();
        var senderId = $('[name="fromId"]').val();
        var senderName = Profiles.findOne({
            createdBy: senderId
        });
        var recepientName = Profiles.findOne({
            createdBy: recipientId
        });

        console.log("Sending to:" + recipientId + " from" + senderId);
        var d = new Date();
        var n = d.toLocaleString();
        Messages.insert({
            sentToId: recipientId,
            sentToName: recepientName.ProfileTitle,
            sentFromId: senderId,
            sentFromName: senderName.ProfileTitle,
            content: content,
            "hideIn": "no",
            "hideOut": "no",
            createdOn: n
        });
        Router.go('/home');
    },
});
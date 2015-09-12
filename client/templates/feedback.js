/**
 * Created by Phil on 12/09/2015.
 */
Template.feedback.events({
    'submit form': function(event) {
        console.log("Send button pressed");
        var admin = Profiles.findOne({serviceName: "sysadmin"});
        console.log(admin);
        var content = $('[name="content"]').val();
        var recipientId = admin.createdBy;
        var senderId =  Meteor.userId();
        var senderName = Profiles.findOne({
            createdBy: senderId
        });
        var recepientName = admin.ProfileTitle;

        console.log("Sending to:" + recipientId + " from" + senderId);
        var d = new Date();
        var n = d.toLocaleString();
        Messages.insert({
            sentToId: recipientId,
            sentToName: recepientName.ProfileTitle,
            sentFromId: senderId,
            sentFromName: senderName.ProfileTitle,
            content: "<Feedback> "+content,
            "hideIn": "no",
            "hideOut": "no",
            createdOn: n
        });
        Router.go('/home');
        }
});
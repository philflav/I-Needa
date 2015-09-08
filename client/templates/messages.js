/**
 * Created by Phil on 01/09/2015.
 */
Template.messages.helpers({
    toMe: function () {
        console.log("Finding messages to the current user");
        return Messages.find({
            sentToId: Meteor.userId(), hideIn: 'no'
        }, {sort: {createdOn: -1}}); //add date order sort
    },
    fromMe: function () {
        console.log("Finding messages from the current user");
        return Messages.find({
            sentFromId: Meteor.userId(), hideOut: 'no'
        }, {sort: {createdOn: -1}}); //add date order sort
    },
    messagesReceived: function () {
        return Messages.find({
            sentToId: Meteor.userId(), hideIn: 'no'
        }).count();

    },
    messagesSent: function () {
        return Messages.find({
            sentFromId: Meteor.userId(), hideOut: 'no'
        }).count();

    }
});

Template.messages.events({
    'click .send': function (event, tmpl) {
        event.stopPropagation();
        event.preventDefault();
        console.log("Send button pressed");
        var content = $('[name="myContent"]').val();
        var recipientId = $('[name="recipientId"]').val();
        var senderId = $('[name="sentFromId"]').val();
        var recipientName = Profiles.findOne({createdBy: recipientId}, {fields: {ProfileTitle: 1, _id: 0}});
        var senderName = Profiles.findOne({createdBy: senderId}, {fields: {ProfileTitle: 1, _id: 0}});
        console.log("Sending to:" + (recipientName["ProfileTitle"]) + " from " + (senderName["ProfileTitle"]));
        var d = new Date();
        var n = d.toLocaleString();
        Messages.insert({
            sentToId: recipientId,
            sentToName: (recipientName["ProfileTitle"]),
            sentFromId: senderId,
            sentFromName: (senderName["ProfileTitle"]),
            content: content,
            "hideIn": "no",
            "hideOut": "no",
            createdOn: n
        });
    },

    "click button": function (event, template) {
        template.$("#myContent").toggle();
    },
    'click .deleteIn': function (event, tmpl) {
        Messages.update(this._id, {$set: {hideIn: 'yes'}});
        msg = Messages.findOne(this._id);
        if (msg.hideOut == "yes")  {
            Messages.remove(this._id);
        }
    },

    'click .deleteOut': function (event, tmpl) {
        Messages.update(this._id, {$set: {hideOut: 'yes'}});
        msg = Messages.findOne(this._id);
        if (msg.hideIn == "yes") {
            Messages.remove(this._id);
        }
    }
});
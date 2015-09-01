/**
 * Created by Phil on 01/09/2015.
 */
Template.user.helpers({
    userName: function() {
        return Meteor.user().username;
    },
    userId: function() {
        return Meteor.user()._id;
    }
});

/**
 * Created by Phil on 01/09/2015.
 */
Template.home.events({
    'click .logout': function(event) {
        console.log('Logout clicked');
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }

});

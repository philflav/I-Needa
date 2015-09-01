/**
 * Created by Phil on 01/09/2015.
 */
Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var username = $('[name=username]').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            username: username,
            email: email,
            password: password
        });
        Meteor.loginWithPassword(username, password, function(error) {
            if (error) {
                console.log(error.reason);
            } else {
                var d = new Date();
                var n = d.toLocaleString();
                Profiles.insert({
                    createdBy: Meteor.userId(),
                    ProfileTitle: username,
                    createdOn: n
                });
                /*Messages.insert(
                 {sentTo: Meteor.userId(),
                 sentToName: username,
                 senderName: "Dummy Admin",
                 sentFrom: "wMQnwHSTHokpePCid",
                 content: "Welcome to the machine " + username +"!",
                 createdOn: n
                 }); */
            }
        });
        Router.go('/editProfile');
    }
});
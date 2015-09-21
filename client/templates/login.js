/**
 * Created by Phil on 01/09/2015.
 */
Template.login.events({
    'submit form': function(event) {
        console.log('Login clicked');
        //Dialogs.browserType = 'alertify'
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                console.log(error.reason);
                Dialogs.alert(error.reason,null,"Login Error","Try Again");
            } else {
                var d = new Date();
                var n = d.toLocaleString();
                var profileDoc = Profiles.findOne({
                    "createdBy": Meteor.userId()
                });
                Profiles.update({
                    _id: profileDoc._id
                }, {
                    $set: {
                        "lastLogIn": n
                    }
                });
                Router.go("/search");
            }
        });
    },
    'click .facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
        Router.go("/search");
    }
});
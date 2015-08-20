Profiles = new Mongo.Collection("profiles");

//Routes

Router.route('/',{
  template: '/login'
});
Router.route('/register');
Router.route('/search');
Router.route('/home');
Router.route('/editProfile');
Router.route('/messages');
Router.route('/subscription');
Router.route('/favourites');
Router.route('/likesMe');
Router.route('/lookedAt');
Router.route('/lookedAtMe');
Router.route('/logout');
Router.route('/results' ,{
  template: 'profiles'
});
Router.route('/profile/:_id', {
    template: 'ProfilePage',
    data: function(){
        var currentProfile = this.params._id;
        console.log("This is a profile page for ", currentProfile);
        return Profiles.findOne({ _id: currentProfile});
    }

});


//Helpers
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.profiles.helpers({
    profiles: function () {
      console.log("This is a the profiles function.");
      return Profiles.find({});
    }
  });

//Events

  
Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username').val();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            username: username,
            email: email,
            password: password
        }); 
        Meteor.loginWithPassword(username,password,function(error){
          if(error){
            console.log(error.reason);
          }else{
            var d = new Date();
            var n = d.toLocaleString();
            Profiles.insert(
              {createdBy: Meteor.userId(),
              ProfileTitle: username, 
              createdOn: n
              });
          }       
        });        
        Router.go('/editProfile');
    }
});
Template.home.events({
    'click .logout': function(event){
      console.log('Logout clicked');
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }

});
Template.login.events({
    'submit form': function(event){
      console.log('Login clicked');
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
          if(error){
            console.log(error.reason);
          } else {
            var d = new Date();
            var n = d.toLocaleString();
            var profileDoc = Profiles.findOne({"createdBy" : Meteor.userId()});
            Profiles.update({_id: profileDoc._id},
              {$set:  {"lastLogIn" : n}}    
            );
          Router.go("/home");
          }
        }
        );
      }
    });
Template.user.helpers({
  userName: function() {
    return Meteor.user().username;
  }
});
Template.editProfile.events({
    'submit form': function(event){
      console.log('Profile save');
      //check that Profile belongs to current user.
        var title = $('[name="ProfileTitle"]').val();
        var gender = $('[name="gender"]').val();
        var age = $('[name="age"]').val();
        var location = $('[name="location"]').val();
        var aboutMe = $('[name="aboutMe"]').val();
        var exper=$('[name="experience"]').val();
        var fee=$('[name="fees"]').val();
        var profileDoc = Profiles.findOne({"createdBy" : Meteor.userId()});
        console.log("Found:", profileDoc._id);
        var d = new Date();
        var n = d.toTimeString();
        Profiles.update({_id: profileDoc._id},
        {$set:
        {
          "ProfileTitle": title,
          "gender": gender,
          "location" : location,
          "age": age,
          "aboutMe": aboutMe,
          "experience": exper,
          "fees": fee,
          "createdBy": Meteor.userId(),
          "lastUpdate": n
        }}
        );
        Router.go("/editProfile");
    }
});
Template.editProfile.helpers({
  'myProfile': function(){
    console.log('myProfile helper function', Meteor.userId());
        return Profiles.find({createdBy: Meteor.userId()});
  }
});
}
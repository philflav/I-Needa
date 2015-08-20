Profiles = new Mongo.Collection("profiles");
Messages = new Mongo.Collection("messages");

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
    }),

   Template.messages.helpers({
      to_me: function () {
        console.log("Finding messages to the current user");
        return Messages.find({sent_to: Meteor.userId()}); //add date order sort
      },
    from_me: function () {
        console.log("Finding messages from the current user");
        return Messages.find({sent_from: Meteor.userId()}); //add date order sort
     }
  });


  //Events
Template.messages.events({
  'submit form': function(event){
    console.log("Reply button pressed");
    var content = $('[name="content"]').val();
    var recipient =$('[name="recipient"]').val();
    var sender = Meteor.userId();
    var sender_name = Profiles.findOne({_id: sender},{fields:{ProfileTitle:1}});
    var d = new Date();
    var n = d.toLocaleString();
    Messages.insert(
              {sent_to: recipient,
              sent_from: sender,
              sender_name: sender_name,
              content: content, 
              createdOn: n
              });
    }

})
  
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
            Messages.insert(
              {sent_to: Meteor.userId(),
              sent_from: "admin",
              content: "Welcome to the machine " + username +"!", 
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
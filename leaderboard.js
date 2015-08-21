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
Router.route('/post/:_id' ,{
  template: 'post',
  name: 'postpage',
    data: function(){
        var recipientId = this.params._id;
        console.log(recipientId, Profiles.findOne({createdBy: recipientId}));
        return Profiles.findOne({createdBy: recipientId});
    }
});

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
        var recipientProfile = this.params._id;
        console.log("This is a profile page for ", recipientProfile);
        console.log(Profiles.findOne({_id: recipientProfile}));
        return Profiles.findOne({_id: recipientProfile});
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
      toMe: function () {
        console.log("Finding messages to the current user");
        return Messages.find({sentToId: Meteor.userId()}); //add date order sort
      },
    fromMe: function () {
        console.log("Finding messages from the current user");
        return Messages.find({sentFromId: Meteor.userId()}); //add date order sort
     }
  });


  //Events
Template.messages.events({
  'submit form': function(event){
    console.log("Reply button pressed");
    var content = $('[name="content"]').val();
    var recipientId =$('[name="recipientId"]').val();
    var senderId = $('[name="fromId"]').val();    
    console.log("Sending to:"+recipientId+" from "+senderId);
    var d = new Date();
    var n = d.toLocaleString();
    Messages.insert(
              {sentToId: recipientId,
              sentFromId: senderId,
              content: content, 
              createdOn: n
              });
    }

});
Template.post.events({
  'submit form': function(event){
    console.log("Send button pressed");
    var content = $('[name="content"]').val();
    var recipientId =$('[name="recipientId"]').val();
    var senderId = $('[name="fromId"]').val();
    var senderName = Profiles.findOne({createdBy: senderId},{fields: {ProfileTitle: 1}});
    var recepientName = Profiles.findOne({createdBy: recipientId},{fields: {ProfileTitle: 1}});
    
    console.log("Sending to:"+recipientId+" from"+senderId);
    var d = new Date();
    var n = d.toLocaleString();
    Messages.insert(
              {sentToId: recipientId,
              sentToName: recepientName.ProfileTitle,
              sentFromId: senderId,
              sentFromName: senderName.ProfileTitle,
              content: content, 
              createdOn: n
              });
    Router.go('/home');
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
  },
  userId: function() {
    return Meteor.user()._id;
  }
});
Template.post.helpers({
  userName: function() {
    return Meteor.user().username;
  },
  userId: function() {
    return Meteor.userId();
  }
});

Template.editProfile.events({
    'submit form': function(event){
      console.log('Profile save');
      //check that Profile belongs to current user.
        var title = $('[name="username"]').val();
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
          "username": title,
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
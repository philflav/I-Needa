Profiles = new Mongo.Collection("profiles");
Messages = new Mongo.Collection("messages");
Services = new Mongo.Collection("services");
Markers =  new Mongo.Collection('markers');
//Routes

Router.route('/', {
  template: '/login'
});
Router.route('/register');
Router.route('/search');
Router.route('/home');
Router.route('/editProfile');
Router.route('/mapit');
Router.route('/messages');
Router.route('/post/:_id', {
  template: 'post',
  name: 'postpage',
  data: function() {
    var recipientId = this.params._id;
    console.log(recipientId, Profiles.findOne({
      createdBy: recipientId
    }));
    return Profiles.findOne({
      createdBy: recipientId
    });
  }
});

Router.route('/subscription');
Router.route('/favourites');
Router.route('/likesMe');
Router.route('/lookedAt');
Router.route('/lookedAtMe');
Router.route('/logout');
Router.route('/results/:service', {
  template: 'profiles',
  data: function() {
     Session.set("service",this.params.service);
    return ;
  }
});
//Router.route('/results', {
  //template: 'profiles'
//});
Router.route('/profile/:_id', {
  template: 'ProfilePage',
  data: function() {
    var recipientProfile = this.params._id;
    console.log("This is a profile page for ", recipientProfile);
    console.log(Profiles.findOne({_id: recipientProfile}));
    return Profiles.findOne({_id: recipientProfile});
  }

});


//COde placed in individual files.

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.startup(function () {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
      Session.set('currentLat', crd.latitude);
      Session.set('currentLng', crd.longitude);
    }

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      navigator.geolocation.getCurrentPosition(success,error,options);

    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
    GoogleMaps.load();
  });


  //Events













}
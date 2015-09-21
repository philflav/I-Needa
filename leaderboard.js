Profiles = new Mongo.Collection("profiles");
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("profiles", function () {
        //--TODO-- Geographic filter on Profiles published to the client --//
        return Profiles.find();
    });
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("profiles");
}
Recommendations = new Mongo.Collection("recommendations");
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("recommendations", function () {

        return Recommendations.find();
    });
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("recommendations");
}

Messages = new Mongo.Collection("messages");
if (Meteor.isServer) {
    // This code only runs on the server
    // Ensures only message to or from the user are on the client device
    Meteor.publish("messages", function () {
        return Messages.find({
            $or: [
                { sentToId: this.userId },
                { sentFromId: this.userId }
            ]
        });
    });
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("messages");
}
Services = new Mongo.Collection("services");
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("services", function () {
        return Services.find();
    });
}
if (Meteor.isClient) {
    UI.registerHelper("getImageUser", function (userId) {
        var user = Meteor.users.findOne(userId);
        if (user.services) {
            if (user.services.facebook)
                return user.services.facebook.picture;
            if (user.services.twitter)
                return user.services.twitter.profile_image_url;
            if (user.services.google)
                return user.services.google.picture;
        }
        else {
            return "images/withOutPhoto.png";
        }
    });
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("services");
}
Avatars = new FS.Collection('avatars', {
    filter: {
        maxSize: 2000000, //bytes
        allow: {
            contentTypes: ['image/*']
        }
    },
    onInvalid: function (message) {
        if (Meteor.isClient) {
            alert(message);
        } else {
            console.log(message);
        }
    },
    stores: [new FS.Store.GridFS('avatars')]
});
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("avatars", function () {
        return Avatars.find();
    });
}

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("avatars");
}
//Routes

Router.route('/', {
    template: '/login'
});
Router.route('/register');
Router.route('/search');
Router.route('/home');
Router.route('/editProfile');
Router.route('/map');
Router.route('/messages');
Router.route('/recommend/:_id', {
    template: 'recommend',
    data: function () {
        var recipientProfile = this.params._id;
        console.log("This is a recommendation page for ", recipientProfile);
          console.log(Profiles.findOne({createdBy: recipientProfile}));
         return Profiles.findOne({createdBy: recipientProfile});
    }
});
Router.route('/feedback');
Router.route('/post/:_id', {
    template: 'post',
    name: 'postpage',
    data: function () {
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
Router.route('/likes');
//Router.route('/likesMe');
//Router.route('/lookedAt');
//Router.route('/lookedAtMe');
Router.route('/logout');
Router.route('/results/:service', {
    template: 'profiles',
    data: function () {
        Session.set("service", this.params.service);
    }
});
//Router.route('/results', {
//template: 'profiles'
//});
Router.route('/profile/:_id', {
    template: 'ProfilePage',
    data: function () {
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
            GoogleMaps.load();
            console.log('Your current position is:');
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            console.log('More or less ' + crd.accuracy + ' meters.');
            Session.set('currentLat', crd.latitude);
            Session.set('currentLng', crd.longitude);
        }

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
            Session.set('currentLat', 0);
            Session.set('currentLng', 0);
        }

        // check for Geolocation support
        if (navigator.geolocation) {
            console.log('Geolocation is supported!');
            navigator.geolocation.getCurrentPosition(success, error, options);

        }
        else {
            console.log('Geolocation is not supported for this Browser/OS version yet.');
            Session.set('currentLat', 0);
            Session.set('currentLng', 0);
        }

    });

    Template.registerHelper('ProfileName', function(profileId){
        return Profiles.findOne({createdBy: profileId}).ProfileTitle
    });
    //Events


}
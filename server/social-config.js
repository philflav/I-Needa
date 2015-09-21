/**
 * Created by Phil on 19/09/2015.
 */
/*
Add the following package to Meteor to enable this

meteor add service-configuration
meteor add accounts-facebook ... and any others that you want.
meteor add accounts-ui

*/


ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '989781917711153',
    secret: '4fd176d804deb628171e252b7a24fd85'
});
Accounts.onCreateUser(function(options, user) {
    //
    //Add a picture URL to facebook account into user profile
    if (typeof(user.services.facebook) != "undefined") {
        user.services.facebook.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    //--todo - POPULATE PRofile WITRH facebook DATa --/
    }
    return user;
});
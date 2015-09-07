/**
 * Created by Phil on 07/09/2015.
 */
Meteor.startup(function () {
    Profiles._ensureIndex({"loc": "2d"});
});
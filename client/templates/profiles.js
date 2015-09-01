/**
 * Created by Phil on 01/09/2015.
 */
Template.profiles.helpers({
    profiles: function() {
        console.log("This is a the profiles function for ",Session.get("service"),".");
        return Profiles.find({serviceName:Session.get("service")});
    },
    service: function () {
        return Session.get("service")
    }
})
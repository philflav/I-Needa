/**
 * Created by Phil on 01/09/2015.
 */
Template.profiles.helpers({
    profiles: function() {
        var currentLatitude = Session.get('currentLat');
        var currentLongitude = Session.get('currentLng');
        var serviceName = Session.get('service');
        console.log("This is a the profiles function for ",Session.get("service"),".");
        return Profiles.find({"serviceName": serviceName , "loc": {"$near":[currentLatitude,currentLongitude]}})
    },
    service: function () {
        return Session.get("service")
    }
})
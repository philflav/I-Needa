/**
 * Created by Phil on 01/09/2015.
 */
Template.editProfile.helpers({
    'myProfile': function () {
        console.log('myProfile helper function', Meteor.userId());
        return Profiles.find({
            createdBy: Meteor.userId()
        });
    }
});

Template.editProfile.events({
    'submit form': function (event) {
        console.log('Profile save');

        var ProfileTitle = $('[name="ProfileTitle"]').val();
        var gender = $('[name="gender"]').val();
        var age = $('[name="age"]').val();
        var location = $('[name="location"]').val();
        var distance = $('[name="distance"]').val();
        var serviceName = $('[name="service"]').val();
        var aboutMe = $('[name="aboutMe"]').val();
        var exper = $('[name="experience"]').val();
        var fee = $('[name="fees"]').val();
        var profileDoc = Profiles.findOne({
            "createdBy": Meteor.userId()
        });
        Session.set("profileDoc", profileDoc);
        console.log("Found:", profileDoc._id);
        var d = new Date();
        var n = d.toDateString();
        Profiles.update({_id: profileDoc._id},
            {
                $set: {
                    "ProfileTitle": ProfileTitle,
                    "gender": gender,
                    "serviceName": serviceName,
                    "age": age,
                    "aboutMe": aboutMe,
                    "experience": exper,
                    "fees": fee,
                    "createdBy": Meteor.userId(),
                    "lastUpdate": n
                }
            });
        //Router.go("/editProfile");
    }
});
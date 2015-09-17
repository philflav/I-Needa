/**
 * Created by Phil on 16/09/2015.
 */

Template.recommend.helpers({

    Reviewed: function() {
        var rec= Recommendations.find({$and: [{profileId: this.createdBy},{reviewerId: Meteor.userId()}]});
        console.log(this._id, rec.count());
        if (rec.count() === 0 ) {
            return false
        } else {
            return true
        }

    }
    });



Template.recommend.events({
    'click .save': function (e, t) {
        event.stopPropagation();
        event.preventDefault();
        console.log("Save Recommendation button pressed");
        var content = $('[name="content"]').val();
        var lastUsed = $('[name="lastUsed"]').val();
        var profileId = $('[name="profileId"]').val();

        var d = new Date();
        var n = d.toLocaleString();
        Recommendations.insert({
            profileId:  profileId,//who the recommendation applies to
            serviceName: this.serviceName,// which service is being reviewed
            reviewerId: Meteor.userId(), //who is doing the reviewing
            lastUsed: lastUsed, //when the reviewer last used the offered service
            content: content,
            createdOn: n //date of the review
        });
        Router.go('/search');
    }
});
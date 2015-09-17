/**
 * Created by Phil on 17/09/2015.
 */
Template.likes.helpers({
    myLikes: function () {
        return Recommendations.find({reviewerId: Meteor.userId()});
    },
    likeCount: function () {
        return Recommendations.find({reviewerId: Meteor.userId()}).count();
    }
});
Template.likes.events({
    'click .deleteRec': function (e, t) {
        console.log("deleting recommendation");
        Recommendations.remove({_id: this._id});

    },
    'click .editRec': function (e, t) {
        console.log("changing recommendation");
        Recommendations.remove({_id: this._id});
        Router.go('/recommend/'+ this.profileId)

    }
});
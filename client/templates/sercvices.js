/**
 * Created by Phil on 01/09/2015.
 */
Template.services.helpers({
    services: function(parent){
        console.log(Services.find({}));
        return Services.find({}, {sort: {serviceName: 1}});
    },
    selected: function(parentContext){
        return parentContext.serviceName==this.serviceName
    }
})
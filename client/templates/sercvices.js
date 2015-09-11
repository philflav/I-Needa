/* Created by Phil on 01/09/2015.
Dropdown helpers for services and genders in this file.*/

Template.services.helpers({
    services: function(parent){
        console.log(Services.find({}));
        return Services.find({}, {sort: {serviceName: 1}});
    },
    selected: function(parentContext){
        return parentContext.serviceName==this.serviceName
    }
})
Template.genders.helpers({
    gender: function(parent){
        return [{genderName:"Male"},{genderName:"Female"},{genderName:"other"}];
    },
    selected: function(parentContext){
        return parentContext.gender==this.genderName
    }
})
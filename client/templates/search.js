/**
 * Created by Phil on 01/09/2015.
 */
Template.search.events({
    'click .search': function(){
        var service=$('[name=service]').val();
        console.log('Seach clicked: '+service);
        Router.go("/results/"+service);
    }
});
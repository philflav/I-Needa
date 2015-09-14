/**
 * Created by Phil on 03/09/2015.
 */
// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
    id: 'com.ineeda',
    name: 'I-Needa',
    description: 'Find useful people locall',
    author: 'Martello Software',
    email: 'pflavin@gmail.com',
    website: 'http://flavin.no-ip.biz:3000'
});
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
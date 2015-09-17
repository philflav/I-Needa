/**
 * Created by Phil on 03/09/2015.
 */
// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
    id: 'com.ineeda',
    name: 'I-Needa',
    description: 'Find useful people locally',
    author: 'Martello Software',
    email: 'pflavin@gmail.com',
    website: 'http://flavin.no-ip.biz:3000'
});
App.icons({
    'android': 'public/resources/android-chrome-96x96.png',
    // ... more screen sizes and platforms ...
});

App.accessRule('https://*.googleapis.com/*');
App.accessRule('https://*.google.com/*');
App.accessRule('https://*.gstatic.com/*');
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
    'android_ldpi': '/public/resources/android-chrome-36x36.png',
    'android_mdpi':'/public/resources/android-chrome-48x48.png',
    'android_hdpi': '/public/resources/android-chrome-96x96.png',
    'android_xhdpi':'/public/resources/android-chrome-144x144.png'
    // ... more screen sizes and platforms ...
});
App.launchScreens({
    'android_ldpi_landscape': '/public/resources/android-chrome-36x36.png',
    'android_mdpi_landscape':'/public/resources/android-chrome-48x48.png',
    'android_hdpi_landscape': '/public/resources/android-chrome-96x96.png',
    'android_xhdpi_landscape':'/public/resources/android-chrome-144x144.png'
    // ... more screen sizes and platforms ...
    'android_ldpi_portrait': '/public/resources/android-chrome-36x36.png',
    'android_mdpi_portrait':'/public/resources/android-chrome-48x48.png',
    'android_hdpi_portrait': '/public/resources/android-chrome-96x96.png',
    'android_xhdpi_portrait':'/public/resources/android-chrome-144x144.png'
});

App.accessRule('https://*.googleapis.com/*');
App.accessRule('https://*.google.com/*');
App.accessRule('https://*.gstatic.com/*');
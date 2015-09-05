/**
 * Created by Phil on 03/09/2015.
 */
//Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
    //load api, create map options and get current user location
    Template.map.helpers({

        mapOptions: function () {
            if (GoogleMaps.loaded()) {
                var currentLatitude = Session.get('currentLat');
                var currentLongitude = Session.get('currentLng');
                var mapLat=currentLatitude;
                var mapLng=currentLongitude;
                var geo = Profiles.findOne({createdBy: Meteor.userId()}, {fields: { loc: 1}});
                if (geo.loc) {
                    mapLat = geo.loc[0];
                    mapLng = geo.loc[1]
                }
                console.log("Here: " + mapLat + " " + mapLng);
                GoogleMaps.load();
                return {
                    center: new google.maps.LatLng(mapLat, mapLng),
                    zoom: 8
                };

            }
        }

    });
    Template.map.helpers({
        location: function () {
            return Session.get('location');
        }
    });

    Template.map.onCreated(function () {

        GoogleMaps.ready('map', function (map) {
            console.log('map ready');

            google.maps.event.addListener(map.instance, 'click', function (event) {
            });
            //Get user location from profile
            //And put marker on map

            var geo = Profiles.findOne({createdBy: Meteor.userId()}, {fields: {location: 1, loc: 1}});
            Session.set("location",geo.location);
            var currentLatitude = Session.get('currentLat');
            var currentLongitude = Session.get('currentLng');
            var mapLat=currentLatitude;
            var mapLng=currentLongitude;
            if (geo.loc) {
                mapLat = geo.loc[0];
                mapLng = geo.loc[1]
            }
            var marker = new google.maps.Marker({
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(mapLat, mapLng),
                map: map.instance,
                // We store the document _id on the marker in order
                // to update the document within the 'dragend' event below.
                id: document._id
            });

            // This listener lets us drag markers on the map and update the current user Profile location
            google.maps.event.addListener(marker, 'dragend', function (event) {
                console.log("Finished dragging marker");

                var geocoder = new google.maps.Geocoder;
                var latlng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
                geocoder.geocode({'location': latlng}, function(results, status) {
                    addcomp={};
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var address_components = results[0].address_components;

                            jQuery.each(address_components, function(k,v1) {jQuery.each(v1.types, function(k2, v2){addcomp[v2]=v1.long_name});});
                            Session.set("location",addcomp.locality+","+addcomp.country);
                            alert("You are changing your location to " + addcomp.locality);
                            console.log(addcomp);
                            Profiles.update({_id: geo._id}, {
                                $set: {
                                    "loc": [event.latLng.lat(), event.latLng.lng()],
                                    "location": addcomp.locality
                                }

                            });
                        } else {
                            Session.set("location","no location found");
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }

                });


                });
            });
        });

    }




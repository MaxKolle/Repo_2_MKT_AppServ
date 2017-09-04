
//=======================================================================================================================
// Class Definition and Contruction Function
//=======================================================================================================================
function KCT_GoogleLocationClass() {


    //=======================================================================================================================
    // Private Class Attributes
    //=======================================================================================================================
    var Intern_Latitude;
    var Intern_Longitude;

    var Intern_LatTextElem;
    var Intern_LongTextElem;
    var Intern_GoogleMapDivElem;
    var Intern_PhysicalAddElem;
    var Intern_MarkerTitle;
    var Intern_CountryElem;
    var Intern_CityElem;
    var Intern_GoogleLocCountryNames;
    var Intern_LatLongDecimalPlaces;
    var Intern_IsPropertyAnnounce;
    //var Intern_DisplayOnMap = false
    var Intern_DisplayOnMap = true;
    var Intern_IsDraggable = false;
    var Intern_Map;
    

    //=======================================================================================================================
    // Public Class Attributes
    //=======================================================================================================================
    //this.LatestUpdateDate = LatestUpdateDate;
    //this.renewDataAfter_NumDays = renewDataAfter_NumDays;



    //=======================================================================================================================
    // Private Class Methods
    //=======================================================================================================================
    function DisplayLatLong(latLongPos) {
        var lat = "" + latLongPos.lat();
        var lng = "" + latLongPos.lng();

        //Intern_LatTextElem.value = RoundUpNumber(lat, Intern_LatLongDecimalPlaces);
        //Intern_LongTextElem.value = RoundUpNumber(lng, Intern_LatLongDecimalPlaces);

        //try{
        //    Intern_LatTextElem.val(RoundUpNumber(lat, Intern_LatLongDecimalPlaces));
        //    Intern_LongTextElem.val(RoundUpNumber(lng, Intern_LatLongDecimalPlaces));
        //}
        //catch (err) {

        //}

        if (Intern_LatTextElem !== undefined && Intern_LatTextElem !== null && Intern_LatTextElem !== "")
            Intern_LatTextElem.val(RoundUpNumber(lat, Intern_LatLongDecimalPlaces));
        if (Intern_LongTextElem !== undefined && Intern_LongTextElem !== null && Intern_LongTextElem !== "")
            Intern_LongTextElem.val(RoundUpNumber(lng, Intern_LatLongDecimalPlaces));

    }

    function show_map(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        ShowMap_LatLong(lat, lon, null, false);
    }
    
    // Obtain the Country, given a latitude and a longitude
    function codeLatLng(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {

            //debugger;

            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    //formatted address
                    var country = null;
                    DisplayLatLong(latlng);
                    if(Intern_PhysicalAddElem !== undefined && Intern_PhysicalAddElem !== null && Intern_PhysicalAddElem !== "")
                        Intern_PhysicalAddElem.val(results[0].formatted_address);
                    //find country name
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                            if (results[0].address_components[i].types[b] == "country") {
                                //this is the object you are looking for
                                country = results[0].address_components[i];
                                break;
                            }
                        }
                        if (country !== null) break;
                    }
                    //city data
                    if (Intern_CountryElem !== undefined && Intern_CountryElem !== null && Intern_CountryElem !== "") {
                        Intern_CountryElem.val(Utilities_StringInArrayIndex(country.long_name, Intern_GoogleLocCountryNames));
                        Intern_CountryElem.change();
                    }
                    //Intern_CityElem.removeAttr("disabled");
                    Intern_DisplayOnMap = true;
                } else {
                    alert("No results found");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }


    //=======================================================================================================================
    // Public Class Methods
    //=======================================================================================================================
    function setLatTextElem(element) {
        Intern_LatTextElem = element;
    }
    function setLongTextElem(element) {
        Intern_LongTextElem = element;
    }
    function setGoogleMapDivID(id) {
        Intern_GoogleMapDivElem = document.getElementById(id);
    }
    function setPhysicalAddressDivElem(element) {
        Intern_PhysicalAddElem = element;
    }
    function setPhysicalAddressDivID(id) {
        Intern_PhysicalAddElem = document.getElementById(id);
    }
    function setMarkerTitle(title) {
        if (title === undefined || title === null || title === "") Intern_MarkerTitle = "Advert Location";
        else Intern_MarkerTitle = title;
    }
    function setCountryElem(element) {
        Intern_CountryElem = element;
    }
    function setCityElem(element) {
        Intern_CityElem = element;
    }
    function setGoogleLocCountryNames(arr) {
        Intern_GoogleLocCountryNames = arr;
    }
    function setLatLongDecimalPlaces(num) {
        Intern_LatLongDecimalPlaces = num;
    }
    function setIsPropertyAnnounce(val) {
        Intern_IsPropertyAnnounce = val;
    }
    function setIsDraggable(val) {
        Intern_IsDraggable = val;
    }
    
    function getLatitude(){
        return Intern_Latitude;
    }
    function getLongitude() {
        return Intern_Longitude;
    }
    function getDisplayOnMap() {
        return Intern_DisplayOnMap;
    }
    
    function getGeoLocation() {
        try {
            if (!!navigator.geolocation) return navigator.geolocation;
            else return undefined;
        } catch (e) {
            return undefined;
        }
    }

    function geo_error(error) {
        switch (error.code) {
            case error.TIMEOUT:
                alert('Geolocation Timeout');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Geolocation Position unavailable');
                break;
            case error.PERMISSION_DENIED:
                alert('Geolocation Permission denied');
                break;
            default:
                alert('Geolocation returned an unknown error code: ' + error.code);
        }
    }
    
    function ShowMap_LatLong(lat, lon, zoom, posAlreadySpec) {
        var zoneInitZoom;
        if (zoom !== undefined && zoom !== null)
            zoneInitZoom = zoom;
        else
            zoneInitZoom = 18; //20;

        var latlng = new google.maps.LatLng(lat, lon);
        
        if (!posAlreadySpec) {
            //DisplayLatLong(latlng, document.getElementById("Latitude"), document.getElementById("Longitude"));
            codeLatLng(lat, lon);
        }

        if (Intern_Map) {
            Intern_Map.panTo(latlng);
            mapMarker.setPosition(latlng);
        }
        else {
            var myOptions = {
                zoom: zoneInitZoom,
                center: latlng,

                // mapTypeID --
                //  ROADMAP displays the default road map view
                //  SATELLITE displays Google Earth satellite images
                //  HYBRID displays a mixture of normal and satellite views
                //  TERRAIN displays a physical map based on terrain information.
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            Intern_Map = new google.maps.Map(Intern_GoogleMapDivElem, myOptions);
            Intern_Map.setTilt(0); // turns off the annoying default 45-deg view

            var mapMarker = new google.maps.Marker({
                position: latlng,
                title: posAlreadySpec ? Intern_MarkerTitle : "You are Here.",
                draggable: Intern_IsDraggable, //false, //true,
                animation: google.maps.Animation.DROP
            });
            mapMarker.setMap(Intern_Map);
        }
    }

    function ShowMap_LocationString(str, zoom) {

        var zoneInitZoom;
        if (zoom !== undefined && zoom !== null)
            zoneInitZoom = zoom;
        else
            zoneInitZoom = 20;
        
        //get correct latlng of region we want. variable: current region
        var request = {
            address: str
        };
        var ne;
        var sw;
        var geoCoder = new google.maps.Geocoder();
        geoCoder.geocode(request, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var count = 0;
                latlng = new google.maps.LatLng((results[count].geometry.location).lat(), (results[count].geometry.location).lng());

                //draw map with rectangle. variables: zoom
                var map = new google.maps.Map(Intern_GoogleMapDivElem, {
                    zoom: zoneInitZoom,
                    zoomControl: true,
                    center: latlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                });
                map.setTilt(0); // turns off the annoying default 45-deg view
                
                //Creating and Placing a Marker
                var marker = new google.maps.Marker({
                    position: latlng,
                    draggable: Intern_IsDraggable, //false, //true,
                    title: Intern_MarkerTitle,
                    animation: google.maps.Animation.DROP
                });
                marker.setMap(map);
            }
        });
    }

    // This function needs to be optimised further.
    function DrawGoogleMap(str, preStr, zm, locLevel) {

        var latlng;

        //get box of the previous region: variables: preRegion
        var requestPre = {
            address: preStr
        };
        var geoCoder = new google.maps.Geocoder();
        var preNE;
        var preSW;
        var preBox;
        //var requestPost;
        //getting box of previous zone
        geoCoder.geocode(requestPre, function (resultsPre, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                preNE = resultsPre[0].geometry.viewport.getNorthEast();
                preSW = resultsPre[0].geometry.viewport.getSouthWest();
                preBox = new google.maps.LatLngBounds(preSW, preNE);

                //get correct latlng of region we want. variable: current region
                var requestPost = {
                    address: str,
                    //location: preNE
                    //region: preStr
                    bounds: preBox
                };

                var ne;
                var sw;
                geoCoder.geocode(requestPost, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        var count = 0;
                        for (var i = 0; i < results.length; i++) {
                            ne = results[i].geometry.viewport.getNorthEast();
                            sw = results[i].geometry.viewport.getSouthWest();

                            if (preBox.contains(results[i].geometry.location)) {
                                count = i;
                                break;
                            }
                        }

                        latlng = new google.maps.LatLng((results[count].geometry.location).lat(), (results[count].geometry.location).lng());
                        //display gotten latlong in textboxes: variables: lat n lng names
                        if (Intern_IsPropertyAnnounce === "True" || Intern_IsPropertyAnnounce === "true" || Intern_IsPropertyAnnounce === "TRUE") {
                            DisplayLatLong(latlng);
                        }

                        //draw map with rectangle. variables: zoom
                        var map = new google.maps.Map(Intern_GoogleMapDivElem, {
                            //zoom: zm,
                            zoomControl: true,
                            center: latlng,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                        });
                        map.fitBounds(results[count].geometry.viewport);

                        //Creating and Placing a Bounding Box
                        if (locLevel !== "Zone") {
                            var boundingBoxPoints = [
                                ne, new google.maps.LatLng(ne.lat(), sw.lng()),
                                sw, new google.maps.LatLng(sw.lat(), ne.lng()), ne
                            ];
                            var boundingBox = new google.maps.Polyline({
                                path: boundingBoxPoints,
                                geodesic: true,
                                strokeColor: '#FF0000',
                                strokeOpacity: 2.0,
                                strokeWeight: 2

                            });
                            boundingBox.setMap(map);
                        }

                        //Creating and Placing a Marker
                        if (locLevel !== "Country") {
                            var marker = new google.maps.Marker({
                                position: latlng,
                                draggable: true,
                                title: Intern_MarkerTitle,
                                animation: google.maps.Animation.DROP
                            });
                            marker.setMap(map);
                            if (Intern_IsPropertyAnnounce === "True" || Intern_IsPropertyAnnounce === "true" || Intern_IsPropertyAnnounce === "TRUE") {
                                var markerPosition = null;
                                marker.addListener('drag', function () {
                                    markerPosition = marker.getPosition();
                                    DisplayLatLong(markerPosition);
                                });
                                marker.addListener('dragend', function () {
                                    GetAddressFromGoogle(markerPosition, Intern_PhysicalAddElem);
                                });
                            }
                        }
                    }
                });
            }
        });
    }

    function GetAddressFromGoogle(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        return GetAddressFromGoogle(latlng);
    }
    function GetAddressFromGoogle(latlng) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (/* results[1] */ results[0]) {
                    Intern_PhysicalAddElem.val(results[0].formatted_address);
                }
            }
        });
        return "";
    }

    function GeoLocationInit() {
        var geo;
        if ((geo = getGeoLocation())) {
            Intern_DisplayOnMap = false;
            geo.getCurrentPosition(show_map, geo_error);            
            return true;
        }
        else {
            alert('Geolocation not supported.');
            return false;
        }
    }

    this.setLatTextElem = setLatTextElem;
    this.setLongTextElem = setLongTextElem;
    this.setGoogleMapDivID = setGoogleMapDivID;
    this.setPhysicalAddressDivElem = setPhysicalAddressDivElem;
    this.setPhysicalAddressDivID = setPhysicalAddressDivID;
    this.setMarkerTitle = setMarkerTitle;
    this.setCountryElem = setCountryElem;
    this.setCityElem = setCityElem;
    this.setGoogleLocCountryNames = setGoogleLocCountryNames;
    this.setLatLongDecimalPlaces = setLatLongDecimalPlaces;
    this.setIsPropertyAnnounce = setIsPropertyAnnounce;
    this.setIsDraggable = setIsDraggable;
    this.getLatitude = getLatitude;
    this.getLongitude = getLongitude;
    this.getDisplayOnMap = getDisplayOnMap;
    
    this.getGeoLocation = getGeoLocation;
    this.geo_error = geo_error;
    this.ShowMap_LatLong = ShowMap_LatLong;
    this.ShowMap_LocationString = ShowMap_LocationString;
    this.DrawGoogleMap = DrawGoogleMap;
    this.GetAddressFromGoogle = GetAddressFromGoogle;
    this.GetAddressFromGoogle = GetAddressFromGoogle;
    this.GeoLocationInit = GeoLocationInit;

    
    //=======================================================================================================================
    // Call the constructor function
    //=======================================================================================================================
    //The Constructor Method or Function
    function InitializeFromLocalStore() {
        //if (_KCT_Utilities_String_Defined === undefined || _KCT_Utilities_String_Defined === null || _KCT_Utilities_String_Defined === false) {
        //    $.getScript("ajax/test.js")
        //        .done(function (script, textStatus) {
        //            //console.log(textStatus);
        //        })
        //        .fail(function (jqxhr, settings, exception) {
        //            //$("div.log").text("Triggered ajaxError handler.");
        //        });
        //}

        //try{            
        //    if (_KCT_Utilities_String_Defined === undefined || _KCT_Utilities_String_Defined === null || _KCT_Utilities_String_Defined === false) {

        //    }
        //}
        //catch(ex){
        //    $.getScript("_KCT_Utilities_StringArray.js")
        //        .done(function (script, textStatus) {
        //            //console.log(textStatus);
        //        })
        //        .fail(function (jqxhr, settings, exception) {
        //            //$("div.log").text("Triggered ajaxError handler.");
        //        });
        //}
    }
    InitializeFromLocalStore();

}
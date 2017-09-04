
//
// Class Definition and Contruction Function
//
function KCT_GoogleLocationClass() {


    //
    // Private Class Attributes
    //
    var Intern_Latitude;
    var Intern_Longitude;

    var Intern_LatTextElem;
    var Intern_LongTextElem;
    var Intern_GoogleMapDivElem;
    var Intern_PhysicalAddElem;
    var Intern_MarkerTitle;
    var Intern_CountryElem;
    var Intern_CityElem;
    var Intern_ZoneElem;
    var Intern_GoogleRegionNameElem;
    var Intern_GoogleLocCountryNames;
    var Intern_LatLongDecimalPlaces;
    var Intern_IsPropertyAnnounce;
    //var Intern_DisplayOnMap = false
    var Intern_DisplayOnMap = true;
    var Intern_IsDraggable = false;
    var Intern_SetDragDragEnd = true;
    var Intern_Map;
    var Intern_MapMarker;
    //var Intern_LocationStore;

    var Intern_ModifyLatLong = false;
    var Intern_ModifyPhysicalAdd = false;
    var Intern_ModifyCountryCityZone = false;

    var Intern_ExternObjPtr;

    var Const_NewCityId = "00000000-0000-0000-0000-000000000001";
    var Const_NewZoneId = "00000000-0000-0000-0000-000000000001";
    var Const_text_DDBox_ChooseCity = "Choose a City";
    var Const_text_DDBox_ChooseZone = "Choose a Zone";
    

    //
    // Public Class Attributes
    //
    //this.LatestUpdateDate = LatestUpdateDate;
    //this.renewDataAfter_NumDays = renewDataAfter_NumDays;



    //
    // Private Class Methods
    //

    // This function is used to display the latitude and longitude of the point.
    function DisplayLatLong(latLongPos) {
        /*
        if (Intern_ModifyLatLong === undefined || Intern_ModifyLatLong === null)
            var Intern_ModifyLatLong = false;  */
        if (Intern_ModifyLatLong) {
            var lat = "" + latLongPos.lat();
            var lng = "" + latLongPos.lng();
            if (Intern_LatTextElem !== undefined && Intern_LatTextElem !== null && Intern_LatTextElem !== "")
                Intern_LatTextElem.val(RoundUpNumber(lat, Intern_LatLongDecimalPlaces));
            if (Intern_LongTextElem !== undefined && Intern_LongTextElem !== null && Intern_LongTextElem !== "")
                Intern_LongTextElem.val(RoundUpNumber(lng, Intern_LatLongDecimalPlaces));
        }
        Intern_ModifyLatLong = true;
    }
    
    // This function is used to display the map with the specified position, that contains a latitude and longitude.
    function show_map(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        ShowMap_LatLong(lat, lon, null, false);
    }
    
    // This function is used to extract the Country, City, and Zone from a google maps results field.
    function GetCountryCityZoneAddress(results) {
        var country = null;
        var CityNamesArr = [];
        var ZoneNamesArr = [];

        //debugger;

        /*
        if (Intern_ModifyPhysicalAdd === undefined || Intern_ModifyPhysicalAdd === null)
            var Intern_ModifyPhysicalAdd = false;  */
        if(Intern_ModifyPhysicalAdd)
            Intern_PhysicalAddElem.val(results[0].formatted_address);
        Intern_ModifyPhysicalAdd = false;

        if (Intern_ModifyCountryCityZone) {
            var tempZone;

            // This loop here is used for those cases when the google map result is not very clear.
            if (results[1] !== undefined && results[1] !== null) {
                for (var i = 0; i < results[1].address_components.length; i++) {
                    for (var b = 0; b < results[1].address_components[i].types.length; b++) {
                        // There are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[1].address_components[i].types[b].indexOf("locality") > -1 || results[1].address_components[i].types[b].indexOf("neighborhood") > -1) {
                            tempZone = results[1].address_components[i].long_name;
                            ZoneNamesArr[ZoneNamesArr.length] = tempZone;
                            break;
                        }
                    }
                    if (ZoneNamesArr.length > 0) break;
                }
            }

            //debugger;

            for (var i = 0; i < results[0].address_components.length; i++) {
                for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                    // There are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                    if (results[0].address_components[i].types[b].indexOf("locality") > -1 || results[0].address_components[i].types[b].indexOf("neighborhood") > -1) {
                        tempZone = results[0].address_components[i].long_name;
                        if(tempZone !== ZoneNamesArr[ZoneNamesArr.length - 1])
                            ZoneNamesArr[ZoneNamesArr.length] = tempZone;

                        // In french speacking africa we need to eliminate the term "Quartier" from the neighborhood.
                        //if (tempZone.substring(0, 9) === "Quartier ") {
                        //    ZoneNamesArr[ZoneNamesArr.length] = tempZone.substring(9, tempZone.length);
                        //}
                        //else {
                        //    ZoneNamesArr[ZoneNamesArr.length] = tempZone;
                        //}
                        break;
                    }
                    else if (results[0].address_components[i].types[b].indexOf("administrative_area") > -1) {
                        CityNamesArr[CityNamesArr.length] = results[0].address_components[i].long_name;
                        break;
                    }
                    else if (results[0].address_components[i].types[b] === "country") {
                        //this is the object you are looking for
                        country = results[0].address_components[i];
                        break;
                    }
                }
                if (country !== null) break;
            }

            //debugger;

            //var selectedCountry = Intern_CountryElem.val();
            //var CityDropDownDict = Intern_ExternObjPtr.LocationStore.GetDataFromLocalStore("Country_" + selectedCountry);
            //delete CityDropDownDict[Const_NewCityId];   // This is necessary to remove the recently computer CityID
            if (Intern_CountryElem !== undefined && Intern_CountryElem !== null && Intern_CountryElem !== "") {
                Intern_ExternObjPtr.country_ReDrawMap = false;

                var selectedCountry = Intern_CountryElem.val();
                var CityDropDownDict = Intern_ExternObjPtr.LocationStore.GetDataFromLocalStore("CountryID_" + selectedCountry);
                delete CityDropDownDict[Const_NewCityId];   // This is necessary to remove the recently computer CityID

                Intern_CountryElem.val(Utilities_StringInArrayIndex(country.long_name, Intern_GoogleLocCountryNames));
                Intern_CountryElem.change();

                var cityId = null;
                var zoneIDUsed = ZoneNamesArr.length;
                $.each(CityDropDownDict, function (index, value) {

                    //debugger;

                    if (cityId === null)
                        if (ZoneNamesArr[ZoneNamesArr.length - 1].indexOf(value) > -1) {
                            cityId = index;
                            zoneIDUsed = ZoneNamesArr.length - 1;
                            return;
                        }
                    if(cityId === null)
                        for (var i = 0; i < CityNamesArr.length; i++)
                            if (CityNamesArr[i].indexOf(value) > -1) {
                                cityId = index;
                                return;
                            }                    
                });

                var ZoneDropDownDict = null;
                if (cityId !== null) {
                    Intern_ExternObjPtr.city_ReDrawMap = false;
                    city = CityDropDownDict[cityId];
                    Intern_CityElem.val(cityId);
                    Intern_CityElem.change();

                    var zoneId = null;
                    ZoneDropDownDict = Intern_ExternObjPtr.LocationStore.GetDataFromLocalStore("CityID_" + cityId);
                    $.each(ZoneDropDownDict, function (index, value) {
                        if (zoneId === null)
                            for (var i = 0; i < zoneIDUsed; i++)
                                if (ZoneNamesArr[i].indexOf(value) > -1) {
                                    zoneId = index;
                                    break;
                                }
                    });
                    if (zoneId !== null) {
                        Intern_ExternObjPtr.zone_ReDrawMap = false;
                        zone = ZoneDropDownDict[zoneId];
                        Intern_ZoneElem.val(zoneId);
                        Intern_ZoneElem.change();
                    }
                    else {

                        //debugger;

                        ZoneDropDownDict[Const_NewZoneId] = ZoneNamesArr[0];
                        Intern_ZoneElem.html(Utilities_DictionaryToSelectOpt(ZoneDropDownDict, "00000000-0000-0000-0000-000000000000", Const_text_DDBox_ChooseZone));
                        Intern_ZoneElem.val(Const_NewZoneId);
                        Intern_ExternObjPtr.LocationStore.SetDataToLocalStore("CityID_" + Const_NewZoneId, ZoneDropDownDict);
                        //Intern_ExternObjPtr.LocationStore.SetDataToLocalStore("City_" + Const_NewZoneId, ZoneDropDownDict);
                        //Intern_ZoneElem.change();
                    }
                }
                else {

                    //debugger;

                    var newCityName = ZoneNamesArr.length > 1 ? ZoneNamesArr[ZoneNamesArr.length - 1] : CityNamesArr[0];
                    
                    CityDropDownDict[Const_NewCityId] = newCityName; // CityNamesArr[0];
                    Intern_CityElem.html(Utilities_DictionaryToSelectOpt(CityDropDownDict, "00000000-0000-0000-0000-000000000000", Const_text_DDBox_ChooseCity));
                    Intern_CityElem.val(Const_NewCityId);
                    Intern_ExternObjPtr.LocationStore.SetDataToLocalStore("CountryID_" + Intern_CountryElem.val(), CityDropDownDict);
                    //Intern_ExternObjPtr.LocationStore.SetDataToLocalStore("Country_" + Intern_CountryElem.val(), CityDropDownDict);
                    Intern_GoogleRegionNameElem.val(CityNamesArr[CityNamesArr.length - 1]);
                    //Intern_CityElem.change();
                    
                    ZoneDropDownDict = {};
                    ZoneDropDownDict[Const_NewZoneId] = ZoneNamesArr[0];
                    Intern_ZoneElem.html(Utilities_DictionaryToSelectOpt(ZoneDropDownDict, "00000000-0000-0000-0000-000000000000", Const_text_DDBox_ChooseZone));
                    Intern_ZoneElem.val(Const_NewZoneId);
                    Intern_ExternObjPtr.LocationStore.SetDataToLocalStore("CityID_" + Const_NewZoneId, ZoneDropDownDict);
                    //Intern_ExternObjPtr.LocationStore.SetDataToLocalStore("City_" + Const_NewZoneId, ZoneDropDownDict);
                    //Intern_ZoneElem.change();
                }
                console.log("ZoneNamesArr : " + JSON.stringify(ZoneNamesArr));
                console.log("CityNamesArr : " + JSON.stringify(CityNamesArr));
            }
        }
        Intern_ModifyCountryCityZone = true;
    }

    // Obtain the Country, City, and Zone, given a latitude and a longitude
    function codeLatLng(lat, lng) {

        //debugger;

        var latlng = new google.maps.LatLng(lat, lng);
        DisplayLatLong(latlng);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    //DisplayLatLong(latlng);

                    //debugger;

                    GetCountryCityZoneAddress(results);                    
                    Intern_DisplayOnMap = true;
                }
                else {
                    alert("No results found");
                }
            }
            else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }


    //
    // Public Class Methods
    //
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
    function setZoneElem(element) {
        Intern_ZoneElem = element;
    }
    function setGoogleRegionNameElem(element) {
        Intern_GoogleRegionNameElem = element;
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
    //function setLocationStore(obj) {
    //    Intern_LocationStore = obj;
    //}
    function setModifyLatLong(val) {
        Intern_ModifyLatLong = val;
    }
    function setModifyPhysicalAdd(val) {
        Intern_ModifyPhysicalAdd = val;
    }
    function setModifyCountryCityZone(val) {
        Intern_ModifyCountryCityZone = val;
    }
    function setNewCityId(val) {
        Const_NewCityId = val;
    }
    function setNewZoneId(val) {
        Const_NewZoneId = val;
    }
    function setText_DDBox_ChooseCity(val) {
        Const_text_DDBox_ChooseCity = val;
    }
    function setText_DDBox_ChooseZone(val) {
        Const_text_DDBox_ChooseZone = val;
    }
    function setExternObjPtr(obj) {
        Intern_ExternObjPtr = obj
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
    function getModifyLatLong() {
        return Intern_ModifyLatLong;
    }
    function getModifyPhysicalAdd() {
        return Intern_ModifyPhysicalAdd;
    }
    function getModifyCountryCityZone() {
        return Intern_ModifyCountryCityZone;
    }
    
    // This function returns the GeoLocator object if the browser supports it.
    function getGeoLocation() {
        try {
            if (!!navigator.geolocation)
                return navigator.geolocation;
            else
                return undefined;
        }
        catch (e) {
            return undefined;
        }
    }
    // This function is used to display the various erors that can occur in working with the GeoLocator.
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
    
    // This function is used to display the Marker onto the map.
    function DisplayMapMarker(latlng, zoom, posAlreadySpec) {
        //*%* Note: We still need to sort out this section here.
        if (Intern_Map) {
            Intern_Map.panTo(latlng);
            Intern_MapMarker.setDraggable(Intern_IsDraggable);
            Intern_MapMarker.setPosition(latlng);
        }
        else {
            //alert("Drawing the map, trice in 'ShowMap_LatLong'");
            Intern_Map = new google.maps.Map(Intern_GoogleMapDivElem, {
                zoom: zoom,
                center: latlng,
                tilt: 0,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            Intern_MapMarker = new google.maps.Marker({
                position: latlng,
                title: posAlreadySpec ? Intern_MarkerTitle : "You are Here.",
                draggable: Intern_IsDraggable,
                animation: google.maps.Animation.DROP,
                map: Intern_Map
            });
        }
        SetDragDragEnd(Intern_MapMarker);
    }

    // This function is used to display the map with the specified latitude and longitude.
    function ShowMap_LatLong(lat, lon, zoom, posAlreadySpec) {
        //$.when(
        //    $.getScript("https://maps.google.com/maps/api/js?sensor=true"),
        //    $.Deferred(function (deferred) {
        //        $(deferred.resolve);
        //    })
        //).done(function () {

            //debugger;

            var zoneInitZoom;
            if (zoom !== undefined && zoom !== null)
                zoneInitZoom = zoom;
            else
                zoneInitZoom = 18; //20;

            var latlng = new google.maps.LatLng(lat, lon);
        
            if (!posAlreadySpec) {
                codeLatLng(lat, lon);
            }
            DisplayMapMarker(latlng, zoneInitZoom, posAlreadySpec);
        //});                
    }

    // This function is used to search for an address on the google map.
    function ShowMap_LocationString(str, zoom) {
        //$.when(
        //    $.getScript("https://maps.google.com/maps/api/js?sensor=true"),
        //    $.Deferred(function (deferred) {
        //        $(deferred.resolve);
        //    })
        //).done(function () {

            //debugger;

            var zoneInitZoom;
            if (zoom !== undefined && zoom !== null)
                zoneInitZoom = zoom;
            else
                zoneInitZoom = 18; // 20;
        
            //get correct latlng of region we want. variable: current region
            var request = {
                address: str
            };
            var geoCoder = new google.maps.Geocoder();
            geoCoder.geocode(request, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    latlng = new google.maps.LatLng((results[0].geometry.location).lat(), (results[0].geometry.location).lng());
                    DisplayLatLong(latlng);

                    //debugger;

                    GetCountryCityZoneAddress(results);
                    DisplayMapMarker(latlng, zoneInitZoom, false);
                }
            });
        //});                
    }

    // This function is used to define the listeners for the draging and droping of the map pointer.
    function SetDragDragEnd(marker) {
        if (Intern_SetDragDragEnd && (Intern_IsPropertyAnnounce === "True" || Intern_IsPropertyAnnounce === "true" || Intern_IsPropertyAnnounce === "TRUE")) {
            var markerPosition = null;
            marker.addListener('drag', function () {
                markerPosition = marker.getPosition();
                DisplayLatLong(markerPosition);
            });
            marker.addListener('dragend', function () {

                //debugger;

                Intern_ModifyPhysicalAdd = true;
                GetAddressFromGoogle(markerPosition, Intern_PhysicalAddElem);
            });
            Intern_SetDragDragEnd = true;
        }
    }

    // This function needs to be optimised further.
    function DrawGoogleMap(str, preStr, zm, locLevel) {

        //debugger;

        var requestPre = {
            address: preStr
        };
        //getting box of previous zone
        var geoCoder = new google.maps.Geocoder();
        geoCoder.geocode(requestPre, function (resultsPre, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                //get box of the previous region: variables: preRegion
                var preNE = resultsPre[0].geometry.viewport.getNorthEast();
                var preSW = resultsPre[0].geometry.viewport.getSouthWest();
                var preBox = new google.maps.LatLngBounds(preSW, preNE);

                //get correct latlng of region we want. variable: current region
                var requestPost = {
                    address: str,
                    //location: preNE
                    //region: preStr
                    bounds: preBox
                };

                geoCoder.geocode(requestPost, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        var ne;
                        var sw;
                        var count = 0;
                        for (var i = 0; i < results.length; i++) {
                            if (preBox.contains(results[i].geometry.location)) {
                                count = i;
                                ne = results[i].geometry.viewport.getNorthEast();
                                sw = results[i].geometry.viewport.getSouthWest();
                                break;
                            }
                        }
                        var latlng = new google.maps.LatLng((results[count].geometry.location).lat(), (results[count].geometry.location).lng());
                        //display gotten latlong in textboxes: variables: lat n lng names
                        if (Intern_IsPropertyAnnounce === "True" || Intern_IsPropertyAnnounce === "true" || Intern_IsPropertyAnnounce === "TRUE") {
                            if (Intern_ModifyLatLong)
                                DisplayLatLong(latlng);
                            else
                                locLevel = "Zone";
                            Intern_ModifyLatLong = true;
                        }

                        //draw map with rectangle. variables: zoom
                        //alert("Drawing the map, twice in 'DrawGoogleMap'");
                        Intern_Map = new google.maps.Map(Intern_GoogleMapDivElem, {
                            //zoom: zm,
                            zoomControl: true,
                            center: latlng,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                        });
                        Intern_Map.fitBounds(results[count].geometry.viewport);

                        //debugger;

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
                                strokeWeight: 2,
                                map: Intern_Map
                            });
                            //boundingBox.setMap(Intern_Map);
                        }
                        
                        //Creating and Placing a Marker
                        if (locLevel !== "Country") {
                            Intern_MapMarker = new google.maps.Marker({
                                position: latlng,
                                draggable: true,
                                title: Intern_MarkerTitle,
                                map: Intern_Map,
                                animation: google.maps.Animation.DROP
                            });                            
                            if (locLevel === "City") {
                                Intern_MapMarker.setDraggable(false);
                            }   
                            Intern_SetDragDragEnd = true;
                            SetDragDragEnd(Intern_MapMarker);

                            if (locLevel === "Zone") {  // Added in version 1.1.1

                                //debugger;

                                Intern_ModifyPhysicalAdd = true;
                                Intern_ModifyCountryCityZone = false;
                                GetAddressFromGoogle(latlng, Intern_PhysicalAddElem);
                            }
                        }
                    }
                });
            }
        });
    }

    // These functions are used to get the Country, City, Zone, and Physical Address from google given the latitude and the longitude. 
    function GetAddressFromGoogle(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        return GetAddressFromGoogle(latlng);
    }
    function GetAddressFromGoogle(latlng) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {

                    //debugger;

                    GetCountryCityZoneAddress(results);
                }
            }
        });
        return "";
    }

    // This function is used to perform the whole Geolocation Initialisation.
    function GeoLocationInit() {

        //debugger;

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
    this.setZoneElem = setZoneElem;
    this.setGoogleRegionNameElem = setGoogleRegionNameElem;
    this.setGoogleLocCountryNames = setGoogleLocCountryNames;
    this.setLatLongDecimalPlaces = setLatLongDecimalPlaces;
    this.setIsPropertyAnnounce = setIsPropertyAnnounce;
    this.setIsDraggable = setIsDraggable;
    //this.setLocationStore = setLocationStore;
    this.setModifyLatLong = setModifyLatLong;
    this.setModifyPhysicalAdd = setModifyPhysicalAdd;
    this.setModifyCountryCityZone = setModifyCountryCityZone;
    this.setNewCityId = setNewCityId;
    this.setNewZoneId = setNewZoneId;
    this.setText_DDBox_ChooseCity = setText_DDBox_ChooseCity;
    this.setText_DDBox_ChooseZone = setText_DDBox_ChooseZone;
    this.setExternObjPtr = setExternObjPtr;

    this.getLatitude = getLatitude;
    this.getLongitude = getLongitude;
    this.getDisplayOnMap = getDisplayOnMap;
    this.getModifyLatLong = getModifyLatLong;
    this.getModifyPhysicalAdd = getModifyPhysicalAdd;
    this.getModifyCountryCityZone = getModifyCountryCityZone;
    
    this.getGeoLocation = getGeoLocation;
    this.geo_error = geo_error;
    this.ShowMap_LatLong = ShowMap_LatLong;
    this.ShowMap_LocationString = ShowMap_LocationString;
    this.DrawGoogleMap = DrawGoogleMap;
    this.GetAddressFromGoogle = GetAddressFromGoogle;
    this.GeoLocationInit = GeoLocationInit;

    
    //
    // Call the constructor function
    //
    //The Constructor Method or Function
    function InitializeFromLocalStore() {

        //debugger;

        //if (Intern_ModifyLatLong === undefined || Intern_ModifyLatLong === null) 
        //    var Intern_ModifyLatLong = false;
        //if (Intern_ModifyPhysicalAdd === undefined || Intern_ModifyPhysicalAdd === null)
        //    var Intern_ModifyPhysicalAdd = false;
        //if (Intern_ModifyCountryCityZone === undefined || Intern_ModifyCountryCityZone === null)
        //    var Intern_ModifyCountryCityZone = false;
    }
    InitializeFromLocalStore();
}
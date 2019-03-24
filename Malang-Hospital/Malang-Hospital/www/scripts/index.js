// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', startup, false );

    //function startup() {
    //    //console.log("Aplikasi Siap...");
    //    var parentElement = document.getElementById('deviceready');
    //    var listeningElement = parentElement.querySelector('.listening');
    //    var receivedElement = parentElement.querySelector('.received');
    //    listeningElement.setAttribute('style', 'display:none;');
    //    receivedElement.setAttribute('style', 'display:block;');
    //}

    //function onDeviceReady() {
    //    // Handle the Cordova pause and resume events
    //    document.addEventListener( 'pause', onPause.bind( this ), false );
    //    document.addEventListener( 'resume', onResume.bind( this ), false );
        
    //    // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    //    var parentElement = document.getElementById('deviceready');
    //    var listeningElement = parentElement.querySelector('.listening');
    //    var receivedElement = parentElement.querySelector('.received');
    //    listeningElement.setAttribute('style', 'display:none;');
    //    receivedElement.setAttribute('style', 'display:block;');
    //};

    //function onPause() {
    //    // TODO: This application has been suspended. Save application state here.
    //};

    //function onResume() {
    //    // TODO: This application has been reactivated. Restore application state here.
    //};

    function init() {
        document.addEventListener("deviceready", startup, false);
    }

    function startup() {
        console.log("Aplikasi Siap...");
        document.addEventListener("backbutton", doClose, false);
    }

    function doClose() {
        if ($.mobile.activePage.attr("id") == "halamanutama") {

            navigator.notification.confirm(
                'Keluar dari Aplikasi ?',
                exitApp,
                'Malang Hospital',
                'Ok,Cancel'
            );
        }

        else { navigator.app.backHistory(); }
    }

    function exitApp(buttonIndex) {
        if (buttonIndex == 1) {
            navigator.app.exitApp();
        }
        else {
            window.close();
        }
    }

} )();


$(document).ready(function() {

$('#loading1').show();
$('#loading2').hide();
 $('#gagal').hide();
 var map;
 var geocoder= new google.maps.Geocoder ();
 var infowindow = new google.maps.InfoWindow();

 var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
 
  window.onload = initialize;

  function initialize() { 
   
    navigator.geolocation.getCurrentPosition(handle_geolocation_query);
  } 
 
  function handle_geolocation_query(position){  

    lat = parseInt(position.coords.latitude*10000,10)/10000;
    lon = parseInt(position.coords.longitude*10000,10)/10000;

  mulai = new google.maps.LatLng(lat, lon);
  var mapOptions = {
    zoom: 15,
      center: mulai,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);

   directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions_panel'));

    var marker = new google.maps.Marker({
        position: mulai,
        title: 'Your Location',
        map: map
    });


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
             
            var userLocation = new google.maps.LatLng(lat,lon);
             
            geocoder.geocode( { 'latLng': userLocation }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    document.getElementById('start').value = results[0].formatted_address;
                }
            });
             
        }, function() {
            alert('Geolocation is supported, but it failed');
        });
    }



 var id = getUrlVars()['id_kategori'];
      var AmbilData;


     
      $.ajax({
                  type : 'POST',
                  url : 'http://malanghospital.url.ph/php/locations.php',
                  data: { nomor:id },
                  
                  beforeSend: function(x){

                    if(x && x.overrideMimeType){

                      x.overrideMimeType('application/j-son;charset=UTF-8');
                    }
                  },dataType : 'json',
                  success : function(data){
                     var selectBox = document.getElementById('destination');
                          AmbilData = data.map;
                            
                            $('#loading1').hide();
                            $('#loading2').hide();
							 $('#gagal').hide();
                                $.each(AmbilData, function(index, marker) {
                          tambahkanPenanda(map,new google.maps.LatLng(marker.latitude, marker.longitude),marker.nama_lokasi,marker.alamat,marker.web,marker.no_telepon,marker.id_kategori);

                              addOption(selectBox,marker.nama_lokasi,new google.maps.LatLng(marker.latitude, marker.longitude));
                               $('#route').hide();

                                     $('#calculateRoute').click(function() {
                                       

                                         $('#calculateRoute').html("latmap1.html?id_kategori?"+marker.id_kategori);
                                          $('#calculateRoute').hide();  });                 
                                

                                });

                                

                              
                  },
                  error: function(jqXHR, exception) {
                      $('#loading1').hide();
                      $('#loading2').hide();
                      $('#gagal').show();
                  }
          }); return false;

  function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
   
 
 $('#route').hide();
  
}

 $('#route').hide();
function addOption(selectBox, text, value){

  var option= document.createElement("OPTION");
  option.text=text;
  option.value=value;
  selectBox.options.add(option);
}

      function tambahkanPenanda(map,lokasi,judul,alamat,web,no_telepon,id){

         
          if(id==1){

              marker = new google.maps.Marker({
               position: lokasi,
               title: judul,
               map: map,
               icon: 'images/rs.png',
               clickable: true


         });
            }

             else if(id==2){

              marker = new google.maps.Marker({
               position: lokasi,
               title: judul,
               map: map,
               icon: 'images/klinik.png',
               clickable: true


         });
            }

         else if(id==22){

              marker = new google.maps.Marker({
               position: lokasi,
               title: judul,
               map: map,
               icon: 'images/gigi.png',
               clickable: true


         });
            }



            else if(id==23){

              marker = new google.maps.Marker({
               position: lokasi,
               title: judul,
               map: map,
               icon: 'images/kecantikan.png',
               clickable: true


         });
            }


            else if(id==24){

              marker = new google.maps.Marker({
               position: lokasi,
               title: judul,
               map: map,
               icon: 'images/bersalin.jpg',
               clickable: true


         });
            }


         else if(id==25){

              marker = new google.maps.Marker({
               position: lokasi,
               title: judul,
               map: map,
               icon: 'images/rawatinap.jpg',
               clickable: true


         });
            }

         else if(id==31){

             marker = new google.maps.Marker({
              position: lokasi,
              title: judul,
              map: map,
              icon: 'images/praktek.PNG',
              clickable: true


        });
           }
          
         else if(id==4){

             marker = new google.maps.Marker({
              position: lokasi,
              title: judul,
              map: map,
              icon: 'images/puskesmas.png',
              clickable: true


        });
           }


           else if(id==5){

             marker = new google.maps.Marker({
              position: lokasi,
              title: judul,
              map: map,
              icon: 'images/apotik.jpg',
              clickable: true


        });
           }

            else if(id==6){

             marker = new google.maps.Marker({
              position: lokasi,
              title: judul,
              map: map,
              icon: 'images/labor.png',
              clickable: true


        });
           }




    var html= '<b>'+judul+'</b><br/><b>'+alamat+'</b><br/><a href="http://'+web+'">'+web+'</a></b></br>'+no_telepon;  

  var opsiDetail= {

    content: html,
    position: lokasi
  }



var infoDetail = new google.maps.InfoWindow(opsiDetail);
  google.maps.event.addListener(marker,"click", function(){

    infoDetail.open(map);
  });

}


 $('#calculateRoute').click(function() {
     $('#loading2').show();
	  $('#loading1').hide();
	    $('#gagal').hide();

    var start = document.getElementById('start').value;
    var destination = document.getElementById('destination').value;
     
    if (start == '') {
        start = mulai;
    }
     
    var request = {
        origin: start,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
         $('#loading1').hide();
          $('#loading2').show();
		   $('#gagal').hide();
            directionsDisplay.setDirections(response);
        }
    });

   
});

});
 


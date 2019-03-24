
$(document).ready(function() {
   

$('#loading').show();

   get_data();
   
   
  function get_data(){
       var id = getUrlVars()['id_pertanyaan'];
      var AmbilData;


     
      $.ajax({
                  type : 'POST',
                  url : 'http://malanghospital.url.ph/php/proses_diagnosa.php',
                  data: { nomor:id },
                  
                  beforeSend: function(x){

                    if(x && x.overrideMimeType){

                      x.overrideMimeType('application/j-son;charset=UTF-8');
                    }
                  },dataType : 'json',
                  success : function(data){

                   
                  
                          AmbilData = data.pertanyaan;

                           if(AmbilData.selesai==0){
                              $('#header').append('<h3>Form Diagnosis</h3>');
                               
                              $('#tanya').append('<center>'+AmbilData.solusi_pertanyaan+'</center><p></p>');
                               
                           

                        if(AmbilData.bukanyatidak==1){
                           

                             $('#pilihan1').append('<center>'+AmbilData.pilihan1+'</center><p></p>');
                             $('#pilihan2').append('<center>'+AmbilData.pilihan2+'</center><p></p>');

                             $("#pilihan1").click(function(){
                          document.location.href="diagnosa.html?id_pertanyaan="+AmbilData.jika_pilihan1});
                              $("#pilihan2").click(function(){
                          document.location.href="diagnosa.html?id_pertanyaan="+AmbilData.jika_pilihan2});
                               $("#pilihantidak").hide();
                                $("#pilihanya").hide();
                                $("#pilihan3").hide();


                          }

                         else  if(AmbilData.bukanyatidak==2){
                           

                             $('#pilihan1').append('<center><p>'+AmbilData.pilihan1+'</p></center><p></p>');
                            
                             $('#pilihan2').append('<center><p>'+AmbilData.pilihan2+'</p></center><p></p>');
                             
                              $('#pilihan3').append('<center><p>'+AmbilData.pilihan3+'</p></center><p></p>');
                             

                             $("#pilihan1").click(function(){
                          document.location.href="diagnosa.html?id_pertanyaan="+AmbilData.jika_pilihan1});
                              $("#pilihan2").click(function(){
                          document.location.href="diagnosa.html?id_pertanyaan="+AmbilData.jika_pilihan2});
                                  $("#pilihan3").click(function(){
                          document.location.href="diagnosa.html?id_pertanyaan="+AmbilData.jika_pilihan3});
                               $("#pilihantidak").hide();
                                $("#pilihanya").hide();


                          }


                            else  if(AmbilData.bukanyatidak==0){
                             $('#pilihanya').append('<center><p>Ya</p></center><p></p>');
                             
                             $('#pilihantidak').append('<center><p>Tidak</p></center>');


                            
                            $("#pilihantidak").click(function(){
                          document.location.href="diagnosa.html?id_pertanyaan="+AmbilData.jika_pilihan2});

                            $("#pilihanya").click(function(){
                          document.location.href="diagnosa.html?id_pertanyaan="+AmbilData.jika_pilihan1});
                              $("#pilihan1").hide();
                                $("#pilihan2").hide();
                                $("#pilihan3").hide();
                          }

                          
                             $('#loading').hide();

                     $('#rekomendasi').hide();
                              $('#ulangi').hide();
                        
                          $('#tampilData').hide();
                             $('#dataList').hide();
                              $('#diagnosa').hide();
                           $('#penjelasan').hide();
                           $('#lanjut').hide(); 
                            $('#menuutama').hide();

                             

                            
                        
              }
                                               


                      else if (AmbilData.selesai!=0) {
                         $('#pilihanya').hide();
                           $('#pilihantidak').hide();
                             $("#pilihan1").hide();
                                $("#pilihan2").hide();
                            $('#header').append('<h3>Fasilitas Penjelas</h3>');
                           $('#tanya').append('<h4>Gejala yang dialami:</h4><p></p>');

                           $('#tampilData').show();
                             $('#dataList').show();

                           $('#diagnosa1').append('<h4>Hasil Diagnosis Penyakit:</h4><p></p>');
                            $('#diagnosa').append(AmbilData.solusi_pertanyaan+'<p></p>');
							
                              $('#penanganan1').append('<h4>Penanganan Awal:</h4><p></p>');
                             $('#penanganan').append(AmbilData.penanganan_awal+'</center><p></p>');
                            
							if(AmbilData.penjelasan==""){
                              $('#penjelasan').hide();
                            }

                            else {
                            $('#penjelasan1').append('<h4>Penjelasan Penyakit:</h4><p></p>');
                             $('#penjelasan').append(AmbilData.penjelasan+'<p></p>');
                            }



            
                             if(AmbilData.id_rekomendasi==0){
                              $('#rekomendasi').hide();
                            }
                          else {

                             $('#rekomendasi').append('<center><p>Lihat Rekomendasi Tempat Pengobatan</p></center><p></p>');
                             
                            $('#rekomendasi').click(function(){
                          document.location.href="latmap2.html?id_rekomendasi="+AmbilData.id_rekomendasi});

                          }

                           $('#ulangi').append('<center><p>Ulangi diagnosis</p></center><p></p>');
                            
                            $('#ulangi').click(function(){
                          document.location.href="./index.html#diagnosa";

                        
                         });
                            
                            if(AmbilData.selanjutnya==0){
                               $('#lanjut').hide();
                            

                            }
                            if(AmbilData.selanjutnya!=0){
                               $('#lanjut').append('<center><p>Lanjut Diagnosis dengan gejala lain</p></center><p></p>');
                                
                           $('#lanjut').click(function(){
                          document.location.href="diagnosa.html?id_pertanyaan="+AmbilData.selanjutnya});
                           }
                            
                     }

                    
                    
                              
                  },
                  error: function(jqXHR, exception) {
                      $('#error').append('<center><p>Tidak Ada Koneksi Internet</p></center>');
                   
                  }
          }); return false;
  }


  
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
   
  });

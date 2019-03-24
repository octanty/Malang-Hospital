
	$(document).ready(function() {
	 


	 get_data();
	 
	 
	function get_data(){
			 var id = getUrlVars()['id_pertanyaan'];
	    var AmbilData;


	   
	    $.ajax({
	                type : 'POST',
	                url : 'http://malanghospital.url.ph/php/lihat_gejala.php',
	                data: { nomor:id },
	                
	                beforeSend: function(x){

	                	if(x && x.overrideMimeType){

	                		x.overrideMimeType('application/j-son;charset=UTF-8');
	                	}
	                },dataType : 'json',
	                success : function(data){
	                        AmbilData = data.gejala;
                            
                                $('#loading').hide();
                                $('#tampilData').show();
                                $.each(AmbilData, function(index, loaddata) {
                                $('#dataList').append(

                                
                                  '<li>'+loaddata.gejala+'</li>');

                                /*'<li><a href="#">
                                <h3 class="ui-li-heading">Biodata</h3><p class="ui-li-desc">Nama:'+ loaddata.nama +'<br>
                                Alamat:'+ loaddata.alamat_Domisili +'<br>Kota:'+ loaddata.kota +'<br></p></a></li>' */
                                }); $('#dataList').listview('refresh');

	                              

	                            
	                },
	                error: function(jqXHR, exception) {
	                    $('#loading').hide();
	                    $('#gagal').show();
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

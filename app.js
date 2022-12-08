//The URIs of the REST endpoint
IUPS = "https://prod-09.centralus.logic.azure.com:443/workflows/f5e09003612d493bb3422c72352c0361/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hgCmqEx4cilpUUpGzqHdloiHwpOc2xB-cAdCXdNl3RY";
RAI = "https://prod-13.centralus.logic.azure.com:443/workflows/2261e8aee8fa4d59999bf435f0da49e5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k1JH7ZIP7Qjj5hnDub3tHQ_K5jwD4f6i7B3ZjJkEwVc";

BLOB_ACCOUNT = "https://week9blobstorage.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retMedia").click(function(){

      //Run the get asset list function
      getMedia();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
 //Create a form data object
 submitData = new FormData();
 //Get form variables and append them to the form data object
 submitData.append('FileName', $('#FileName').val());
 submitData.append('userID', $('#userID').val());
 submitData.append('userName', $('#userName').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
 url: IUPS,
 data: submitData,
 cache: false,
 enctype: 'multipart/form-data',
 contentType: false,
 processData: false,
 type: 'POST',
 success: function(data){

 }
 });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getMedia(){

 
//Replace the current HTML in that div with a loading message
$('#MediaList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
$.getJSON(RAI, function( data ) {
//Create an array to hold all the retrieved assets
var items = [];

//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
$.each( data, function( key, val ) {
items.push( "<hr />");
items.push("<div> <video controls src='"+BLOB_ACCOUNT + val["filepath"] +"' width='400' type='video/mp4'/></div> <br />")
items.push( "File : " + val["fileName"] + "<br />");
items.push( "Uploaded by: " + val["userName"] + " (User ID: "+val["userID"]+")<br />");
items.push( "<hr />");
});
//Clear the assetlist div
$('#MediaList').empty();
//Append the contents of the items array to the MediaList Div
$( "<ul/>", {
"class": "my-new-list",
html: items.join( "" )
}).appendTo( "#MediaList" );
});
} 


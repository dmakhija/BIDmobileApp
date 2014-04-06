
var x=document.getElementById("map-canvas");

function getLocation()
  { 
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }

function showPosition(position)
  {
  lat=position.coords.latitude;
  lon=position.coords.longitude;
  latlon=new google.maps.LatLng(lat, lon);
  mapholder=document.getElementById('map');
  //mapholder.style.height='800px';   
  // mapholder.style.width='1000px';
   
   var locations = [
	['Guelph', 43.54, -80.24, 4],
  ['Cambridge', 43.36, -80.31, 5],
  ['Elmira', 43.60, -80.56, 3],
  ['Hamilton', 43.24, -79.89, 2],
  ['Waterloo', 43.47, -80.54, 1]	
];
   

  var myOptions={
  center:latlon,
  zoom:10,
  mapTypeId:google.maps.MapTypeId.ROADMAP,
  mapTypeControl:false,
  navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  };
  var map=new google.maps.Map(document.getElementById("map"),myOptions);
  var infowindow = new google.maps.InfoWindow();
var marker, i;
	for (i = 0; i <= locations.length; i++) 
	{  
		if(i==locations.length)
		{
			//first marker needs to point out user's current position
			marker = new google.maps.Marker({
		    position:latlon,
		    map: map,
		    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
		    title:"You are here!"
		  });
		}
		else
		{
			//rest of the marker needs to point out salon's position
			marker = new google.maps.Marker({
		    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		    map: map,
		    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
		    title: locations[i][0]
		  });
		}	
	}    
}

function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred.";
      break;
    }
  }
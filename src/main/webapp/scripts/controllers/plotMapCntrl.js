cams.controller('plotMapcntrl', function($scope,$rootScope,$http) {
	
	var reload;
	$scope.diaryViewClaims = [
        {
            "claimNumber": "TEST08201604050073",
            "cityState": "Atlanta, GA",
   		    "address" : "3475 Piedmont Rd NE, Atlanta, GA 30305",
            "supLastName": "JENNINGS",
            "supFirstName": "SHANNON",
            "dateReported": "17-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "17-Apr-16",
			"followUpCode": "TMC",
        }, 
		        {
            "claimNumber": "TEST08201604050072",
            "cityState": "Chicago, IL",
   		    "address" : "333 W Wacker Dr , Chicago, IL 60606",
            "supLastName": "MORANTE",
            "supFirstName": "EDWARD",
            "dateReported": "16-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "16-Apr-16",
			"followUpCode": "IPR",
        }, 
		        {
            "claimNumber": "TEST08201604050071",
            "cityState": "Fremont, CA",
   		    "address" : "4000 Shoreline Ct, South San Francisco, CA 94080",
            "supLastName": "GARCIA",
            "supFirstName": "STEVEN",
            "dateReported": "15-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "15-Apr-16",
			"followUpCode": "IIR",
        }, 
		        {
            "claimNumber": "TEST08201604050074",
            "cityState": "Atlanta, GA",
   		    "address" : "508 main st NE, Atlanta, GA-30324",
            "supLastName": "ALVAREZ",
            "supFirstName": "RAUL",
            "dateReported": "14-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "14-Apr-16",
			"followUpCode": "IMC",
        }, 
		        {
            "claimNumber": "TEST08201604050075",
            "cityState": "Atlanta, GA",
   		    "address" : "242 summer Dr, sandy spring, GA-30328",
            "supLastName": "PEREZ",
            "supFirstName": "DUANE",
            "dateReported": "13-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "13-Apr-16",
			"followUpCode": "ICF",
        }, 
		        {
            "claimNumber": "TEST08201604050076",
            "cityState": "New York, NY",
   		    "address" : "623 5th Ave #33, New York, NY 10022",
            "supLastName": "GARCIA",
            "supFirstName": "DERRECK",
            "dateReported": "12-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "12-Apr-16",
			"followUpCode": "IRJ",
        }, 
		        {
            "claimNumber": "TEST08201604050077",
            "cityState": "Seattle, WA",
   		    "address" : "6840 Southcenter Blvd, Seattle, WA 98168",
            "supLastName": "CANTU",
            "supFirstName": "LINO",
            "dateReported": "11-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "11-Apr-16",
			"followUpCode": "IWL",
        }, 
		        {
            "claimNumber": "TEST08201604050078",
            "cityState": "Phoenix, AZ",
   		    "address" : "4675 E Cotton Center Blvd 167, Phoenix, AZ 85040",
            "supLastName": "ALVAREZ",
            "supFirstName": "RAUL",
            "dateReported": "10-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "10-Apr-16",
			"followUpCode": "TMC",
        }, 
		        {
            "claimNumber": "TEST08201604050079",
            "cityState": "Austin, TX",
   		    "address" : "600 Center Ridge Dr, Austin, TX 78753",
            "supLastName": "MARTINEZ",
            "supFirstName": "JOSE",
            "dateReported": "09-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "09-Apr-16",
			"followUpCode": "TMC",
        }, 
		        {
            "claimNumber": "TEST08201604050080",
            "cityState": "Dallas, TX",
   		    "address" : "1601 Bryan St, Dallas, TX 75201",
            "supLastName": "GOMEZ",
            "supFirstName": "JOSE",
            "dateReported": "08-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "08-Apr-16",
			"followUpCode": "TMC",
        }, 
		        {
            "claimNumber": "TEST08201604050081",
            "cityState": "Houston, TX",
   		    "address" : "5051 Westheimer Rd 1800, Houston, TX 77056",
            "supLastName": "GWIN",
            "supFirstName": "MICHAEL",
            "dateReported": "07-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "07-Apr-16",
			"followUpCode": "TMC",
        }, 
		        {
            "claimNumber": "TEST08201604050082",
            "cityState": "Denver, CO",
   		    "address" : "4600 S Syracuse St 963, Denver, CO 80237",
            "supLastName": "HEINZ",
            "supFirstName": "MELANIE",
            "dateReported": "06-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "06-Apr-16",
			"followUpCode": "TMC",
        }, 
		        {
            "claimNumber": "TEST08201604050083",
            "cityState": "Southfield, MI",
   		    "address" : "25925 Telegraph Rd 101, Southfield, MI 48033",
            "supLastName": "SALAZAR",
            "supFirstName": "LARRY",
            "dateReported": "05-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "05-Apr-16",
			"followUpCode": "TMC",
        }, 
		        {
            "claimNumber": "TEST08201604050084",
            "cityState": "Cambridge, MA",
   		    "address" : "600 Memorial Dr, Cambridge, MA 02139",
            "supLastName": "SOECHTING",
            "supFirstName": "BLAKE",
            "dateReported": "04-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "04-Apr-16",
			"followUpCode": "TMC",
        }, 
		        {
            "claimNumber": "TEST08201604050085",
            "cityState": "Charlotte, NC",
   		    "address" : "201 S College St, Charlotte, NC 28244",
            "supLastName": "RODRIGUEZ",
            "supFirstName": "ROGELIO",
            "dateReported": "03-Apr-16",
            "billDescription": "BIL",
            "followUpDate": "03-Apr-16",
			"followUpCode": "TMC",
        } 
    ];
	
	var locations = $scope.diaryViewClaims;
	

/*	var getLatLng = function(loc){
		$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+locations[loc].address+'&key=AIzaSyCO5CBF2pd1U24cI7GTz6KP9gA-JlJI-0w')
		    .success(function(data) {
		      console.log(data.results[0].geometry.location);
			  locations[loc].lat=data.results[0].geometry.location.lat;
			  locations[loc].lng=data.results[0].geometry.location.lng;
		  }).error(function(data){console.log("The request isn't working");}); }

	for(var xy=0;xy<locations.length;xy++){
		getLatLng(xy);
	}*/
	
	$scope.createMap=function(){
		if(!reload){
			reload=true;
			
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      // center: new google.maps.LatLng(-33.92, 151.25),
      center: new google.maps.LatLng(37.0902, -95.7129),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;
   
    
    for (i = 0; i < locations.length; i++) {  
    	 var geocoder = new google.maps.Geocoder();
    	 var cl=locations[i];
    	 geocoder.geocode({
    	       'address': locations[i].address
    	    }, function(cl, i){
    	    return (function(results, status) {
    	        if(status == google.maps.GeocoderStatus.OK) {
    	        	marker=new google.maps.Marker({
    	              position: results[0].geometry.location,
    	              map: map
    	           });
    	        	google.maps.event.addListener(marker, 'click', (function(marker, i) {
    	                return function() {
    	                	var link="<a href='#/enterClaim/"+cl.claimNumber+"'>"+cl.claimNumber+"</a>";
    	                	map.setZoom(16);
    	                    map.setCenter(marker.getPosition());
    	                    map.panTo(marker.getPosition());
    	                  infowindow.setContent(link,cl.claimNumber);
    	                  infowindow.open(map, marker);
    	                }
    	              })(marker, i));
    	        }
    	     });
    	    }(cl, i));
    	 }
/*      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
        map: map
      });*/

      
    //}
		}
	}
});
var cams = angular
    .module('attRiskManagementApp', ['ngRoute', 'ui.bootstrap',
    								 'ngAnimate','ngSanitize','ngCookies',
    								 'ngAutocomplete','googlechart',
    								 'ui.grid', 'ui.grid.pagination',
    								 'ui.grid.selection', 'ui.grid.exporter',
    								 'ui.grid.resizeColumns','ui.grid.grouping', 
    								 'ui.grid.expandable','ui.grid.autoResize', 
    								 'ui.grid.moveColumns','btorfs.multiselect','ngMaterial']);  //,'uiGmapgoogle-maps'

/*cams.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
	  GoogleMapApi.configure({
	    key: 'AIzaSyCO5CBF2pd1U24cI7GTz6KP9gA-JlJI-0w',
	    v: '3.27',
	    libraries: 'weather,geometry,visualization'
	  });
	}]);*/
cams.controller('LoginCtrl', ['$scope','$location', '$rootScope',	function($scope, $location, $rootScope) {
		
		$rootScope.loggedIn = false;

		$scope.login = function() {
			console.log('$scope.username '+$scope.username);
			if($scope.username.toLowerCase() == 'technician'){
				$rootScope.loggedIn = true;
				$location.path('/technician');
			}else if($scope.username.toLowerCase() == 'admin'){
				$rootScope.loggedIn = true;
				$location.path('/admin');
			}else if($scope.username.toLowerCase() == 'superadmin'){
				$rootScope.loggedIn = true;
				$location.path('/superAdmin');
			}else{
				
			}
			$rootScope.username = $scope.username;
			
		}
	}]);

cams.controller('attRiskManagementController', [
		'$scope',
		'$route',
		'$routeParams',
		'$location',
		'$uibModal',
		'$rootScope',
		'$http',
		function($scope, $route, $routeParams, $location, $uibModal,
				$rootScope, $http, $timeout) {
			var scopeTabs=undefined;
			//$rootScope.dummyClaimId=undefined;
			$rootScope.claimIdCurrent =undefined;
		
			$scope.createClaimPopUp = function() {
				var popmodalInstance = $uibModal.open({
					animation : true,
					backdrop : 'static',
					keyboard : false,
					templateUrl : 'vehicleInvolved.html',
					controller : 'createClaimCtrl',
					resolve : {
						items : function() {
							$scope.inputTranscationReadOnly = false;
							return $scope.items;
						}
					}
				});
			}
			
			
			$scope.$on('scopeTabs', function (event, data) {
				scopeTabs=data;
			  });
			

			$scope.saveClaim = function() {
				
				var absUrl = $location.absUrl();
				

				 if (absUrl.indexOf("enterClaim") > -1){

					var claimjson = JSON.stringify(scopeTabs);

					var claimID = $rootScope.claimIdCurrent;

					var data = {
						"id" : claimID,
						"value" : claimjson
					};

					var res = $http.put('api/claims', data);
					res.success(function(data, status, headers, config) {
						$location.path('/technician');
						/* $scope.message = data; */

					});
				} else {
					$location.path('/technician');
				}
			}	
			
			
			$scope.today = function() {
				$scope.dt = new Date();
			};
			$scope.today();

			$scope.clear = function() {
				$scope.dt = null;
			};

			$scope.inlineOptions = {
				customClass : getDayClass,
				minDate : new Date(),
				showWeeks : true
			};

    	  $scope.inlineOptions = {
    	    customClass: getDayClass,
    	    minDate: new Date(),
    	    showWeeks: true
    	  };

    	  $scope.dateOptions = {
    	    formatYear: 'yyyy',
    	    showWeeks: false,
    	    todayHighlight:true
    	  };

    	  $scope.open1 = function() {
    	    $scope.popup1.opened = true;
    	  };
    	  $scope.open2 = function() {
      	    $scope.popup2.opened = true;
      	  };
    	  $scope.open3 = function() {
      	    $scope.popup3.opened = true;
      	  };
    	  $scope.open4 = function() {
      	    $scope.popup4.opened = true;
      	  };

    	  $scope.setDate = function(year, month, day) {
    	    $scope.dt = new Date(year, month, day);
    	  };

    	  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'MM/dd/yyyy', 'shortDate'];
    	  $scope.format = $scope.formats[2];

    	  $scope.popup1 = {
    	    opened: false
    	  };
    	  $scope.popup2 = {
    	    	    opened: false
    	    	  };
    	  $scope.popup3 = {
    	    	    opened: false
    	    	  };
    	  $scope.popup4 = {
    	    	    opened: false
    	    	  };

    	  function getDayClass(data) {
    	    var date = data.date,
    	      mode = data.mode;
    	    if (mode === 'day') {
    	      var dayToCheck = new Date(date).setHours(0,0,0,0);

    	      for (var i = 0; i < $scope.events.length; i++) {
    	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

    	        if (dayToCheck === currentDay) {
    	          return $scope.events[i].status;
    	        }
    	      }
    	    }

    	    return '';
    	  }
    	  
    }

]);

cams.controller('viewClaimController', [
		'$scope',
		'$routeParams',
		'$rootScope',
		'$http',
		'$location',
		function($scope, $routeParams, $rootScope, $http, $location) {

			$scope.show = 1;

			$rootScope.claimIdCurrent = $routeParams.claimId;

			$scope.tabs = {};

			$http.get('api/claims/' + $rootScope.claimIdCurrent).success(
					function(data) {
						$scope.tabs = data;
					});
			$http.get('api/upload/getPhoto/' + $rootScope.claimIdCurrent).success(
					function(data) {
						$scope.photos = [];
						
						for(var i=0;i<data.length;i++){
							imageData={};
				    		imageData.image="assets/uploadedFiles/"+$rootScope.claimIdCurrent+"/"+data[i];
				    		imageData.thumbnail="assets/uploadedFiles/"+$rootScope.claimIdCurrent+"/"+data[i];
				    		imageData.name=data[i];
				    		
				    		$scope.photos.push(imageData);
				    		
				    	}
						
					});
			
			$scope.printDiv = function(divName) {
				  var printContents = document.getElementById(divName).innerHTML;
				  var popupWin = window.open('', '_blank', 'width=600,height=600');
				  popupWin.document.open();
				  popupWin.document.write('<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></head><body onload="window.print()">' + printContents + '</body></html>');
				  popupWin.document.close();
				} 
			
			$scope.back = function() {
				console.log($rootScope.claimIdCurrent);
				$location.path('/enterClaim/'+$rootScope.claimIdCurrent);
				} 
			
		}

]);

cams.controller('newClaimController', [
    '$scope',
    '$route',
    '$routeParams',
    '$location',
    '$uibModal',
    '$rootScope',
    '$http',
    '$cookies',
    '$cookieStore',
    '$interval',
    '$timeout',
    function($scope, $route, $routeParams, $location, $uibModal,
             $rootScope, $http,$cookies,$cookieStore,$interval,$timeout) {
    		
    		$scope.show=1;
    		
    		$rootScope.claimIdCurrent=$routeParams.claimId;
    		
    		$scope.tabs={};
    		
    		 $scope.$watch('tabs', function (newValue, oldValue) {
    		        $scope.$emit('scopeTabs', $scope.tabs);
    		      }, true);
    		
    		 var intervalPromise;
             $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
             
              $http.get('api/claims/'+$rootScope.claimIdCurrent).success(function(data){
            	 
                   $scope.tabs=data;
                   $rootScope.submittedClaimId=$scope.tabs.submittedClaimID;
                  intervalPromise = $interval(function() {
                      $scope.newValueJSON=JSON.stringify($scope.tabs);
                      if($scope.newValueJSON!==$scope.oldValueJSON){
                             console.log('Data changed');
                             $scope.saving=true;
                             $scope.oldValueJSON=JSON.stringify($scope.tabs);
                              
                             var claimjson = JSON.stringify($scope.tabs);
                                   var claimID = $rootScope.claimIdCurrent;
                                   var data = {
                                               "id" : claimID,
                                               "value" : claimjson
                                   };
                              $http.put('api/claims', data).success(function(data, status,headers, config) {
                            	 // $scope.saving=false;
                            	  $timeout($scope.savingFalse, 1000);
                              });
                      }
                   }, 10000);

                  $scope.savingFalse=function(){
                	  $scope.saving=false;
                  }
                   if($scope.tabs.data1 != undefined){
                       if($scope.tabs.data1.damageDate != undefined){
                           $scope.tabs.data1.damageDate = new Date($scope.tabs.data1.damageDate);                     
                       }
                       if($scope.tabs.data1.estimatedDate != undefined){
                           $scope.tabs.data1.estimatedDate = new Date($scope.tabs.data1.estimatedDate);                         
                       }
                       if($scope.tabs.data1.discoveryDate != undefined){
                           $scope.tabs.data1.discoveryDate = new Date($scope.tabs.data1.discoveryDate);                         
                       }
                       if($scope.tabs.data1.estimatedDiscoveryDate != undefined){
                           $scope.tabs.data1.estimatedDiscoveryDate = new Date($scope.tabs.data1.estimatedDiscoveryDate);                       
                       }
                }
                   
                   $scope.$broadcast('parentTab1', $scope.tabs.data1);
                });
    		
    		//$scope.states = [ 'ALABAMA', 'ALASKA', 'AMERICAN SAMOA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA', 'COLORADO', 'CONNECTICUT', 'DELAWARE', 'DISTRICT OF COLUMBIA', 'FEDERATED STATES OF MICRONESIA', 'FLORIDA', 'GEORGIA', 'GUAM', 'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA', 'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARSHALL ISLANDS', 'MARYLAND', 'MASSACHUSETTS', 'MICHIGAN', 'MINNESOTA', 'MISSISSIPPI', 'MISSOURI', 'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW HAMPSHIRE', 'NEW JERSEY', 'NEW MEXICO', 'NEW YORK', 'NORTH CAROLINA', 'NORTH DAKOTA', 'NORTHERN MARIANA ISLANDS', 'OHIO', 'OKLAHOMA', 'OREGON', 'PALAU', 'PENNSYLVANIA', 'PUERTO RICO', 'RHODE ISLAND', 'SOUTH CAROLINA', 'SOUTH DAKOTA', 'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT', 'VIRGIN ISLANDS', 'VIRGINIA', 'WASHINGTON', 'WEST VIRGINIA', 'WISCONSIN', 'WYOMING'];
             $scope.states=["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL",
                 "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
                 "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA",
                 "WA", "WV", "WI", "WY"];
            $scope.click=function(val){
            	$scope.saveClaim('no-redirect');
            	if($scope.show==1){
            		 $rootScope.dmgLoad();
            	 }
            	else if($scope.show==2){
            		 $rootScope.bInfoLoad();
            	 }
            	if(val=='prev'){
            		if($scope.show>1){
            			$scope.show=$scope.show-1;
            		}
            	}
            	else if(val=='next'){
            		if($scope.show<11){
            			$scope.show=$scope.show+1;
            		}
            	}
            	else{
            		$scope.show=val;
            	}
            }
            
            
            
            $scope.saveClaim=function(value){

            		$scope.oldValueJSON=JSON.stringify($scope.tabs);
            		
            		var claimjson = JSON.stringify($scope.tabs);

            		var claimID = $rootScope.claimIdCurrent;

            		var data = {
            				"id" : claimID,
            				"value" : claimjson
            		};

            		var res = $http.put('api/claims', data);
            		res
            		.success(function(data, status,
            				headers, config) {
            			if(!value)
            			$location.path('/technician');
            			/* $scope.message = data; */

            		});
            	

            }	
            
            $scope.printClaim=function(){

        		var claimjson = JSON.stringify($scope.tabs);
        		var claimID = $rootScope.claimIdCurrent;
        		var data = {
        				"id" : claimID,
        				"value" : claimjson
        		};

        		var res = $http.put('api/claims', data);
        		res
        		.success(function(data, status,
        				headers, config) {
        			$location.path('/viewClaim/'+claimID);

        		});
        	

        }
            
            $scope.submitClaim=function(){


            	$scope.formValidate = false;
            	$scope.damageValidation = false;
            	$scope.bInfoValidation = false;
            	/*
            	 * if($rootScope.dummyClaimId!=undefined)
            	 * $scope.claimIdSelected=$rootScope.dummyClaimId;
            	 */

            	if ($scope.show == 1) {
            		$scope.$on('tab1', function(event, data) {
            			$scope.tabs.data1 = data;
            		});
            	} else if ($scope.show == 2) {
            		$scope.$on('tab2', function(event, data) {
            			$scope.tabs.data2 = data;
            		});
            	}

            	if (($scope.tabs.data1==undefined)|| ($scope.tabs.data1.desc == undefined || $scope.tabs.data1.desc == '')
                        || ($scope.tabs.data1.howOccur == undefined || $scope.tabs.data1.howOccur == '')
                        || ($scope.tabs.data1.damageDate == undefined || $scope.tabs.data1.damageDate == '')
                        || ($scope.tabs.data1.estimatedDate == undefined || $scope.tabs.data1.estimatedDate == '')
                        || ($scope.tabs.data1.addrs == undefined || $scope.tabs.data1.addrs == '')
                        || ($scope.tabs.data1.state == undefined || $scope.tabs.data1.state == '')
                        || ($scope.tabs.data1.city == undefined || $scope.tabs.data1.city == '')
                        || ($scope.tabs.data1.county == undefined || $scope.tabs.data1.county == '')
                        || ($scope.tabs.data1.areaCode == undefined || $scope.tabs.data1.areaCode == '')
                        || ($scope.tabs.data1.wireCenter == undefined || $scope.tabs.data1.wireCenter == '')
                        || ($scope.tabs.data1.wireCenterName == undefined || $scope.tabs.data1.wireCenterName == '')) {
                 $scope.damageValidation = true;
                 $scope.formValidate = true;
            	}

            	if (($scope.tabs.data2==undefined)||($scope.tabs.data2.municipalityInvolved == undefined || $scope.tabs.data2.municipalityInvolved == '')
                        || ($scope.tabs.data2.photos == undefined || $scope.tabs.data2.photos == '')
                        || ($scope.tabs.data2.areThereWitness == undefined || $scope.tabs.data2.areThereWitness == '')
                        || ($scope.tabs.data2.partyResponsible == undefined || $scope.tabs.data2.partyResponsible == '')) {
                 $scope.bInfoValidation = true;
                 $scope.formValidate = true;
            	}
            	
            	if ($scope.formValidate == false) {
            		$scope.tabs.isSubmitted=true;
            		$scope.oldValueJSON=JSON.stringify($scope.tabs);
            		var claimjson = JSON.stringify($scope.tabs);

            		var claimID = $rootScope.claimIdCurrent;

            		var data = {
            				"id" : claimID,
            				"value" : claimjson
            		};

            		var res = $http.put('api/claims', data);
            		res
            		.success(function(data, status,
            				headers, config) {
            			var popmodalInstance = $uibModal
            			.open({
            				animation : true,
            				backdrop : 'static',
            				keyboard : false,
            				templateUrl : 'submitClaim.html',
            				controller : 'submitClaimCtrl',
            				resolve : {
            					items : function() {
            						$scope.inputTranscationReadOnly = false;
            						return $scope.items;
            					}
            				}
            			})
            		});
            	}

            }				
        	
    }
]);

cams.controller('Tab1_cntrl', ['$scope', '$route', '$routeParams', '$location', '$uibModal','$rootScope','$filter',function($scope, $route, $routeParams, $location, $uibModal,$rootScope,$filter){
	
	$scope.$on('parentTab1', function (event, data) {
	    $scope.dmg=data;
	  });
	
	if(!$scope.tabs.data1){
          $scope.dmg=this;
    }
    else{
    	
          $scope.dmg=$scope.tabs.data1;
    }

	$scope.damageDescription = ['AERIAL CABLE DAMAGED',
		'AERIAL DROP',
		'BUILDING CABLE CUT OFF',
		'BURIED CABLE DAMAGE',
		'BURIED DROP DAMAGE',
		'BODILY INJURY TO NON EMPLOYEE',
		'BUILDING CABLE AND TERMINAL CUT OFF',
		'CABLE CUT',
		'CROSS CONNECT BOX',
		'CONDUIT DAMAGED',
		'COMPOSITE FIBER DAMAGE',
		'CO VEH DAMAGED',
		'DUCT RUN',
		'! DSL/ASI - REPORT OF DAMAGE',
		'FIBER DROP (BURIED / AERIAL)',
		'FIBER OPTIC CABLE DAMAGED',
		'AT&T MOBILITY CELL SITE DAMAGE',
		'AT&T MOBILITY OTHER',
		'MANHOLE CONTAMINATION',
		'MUNICIPALITY ORDINANCE VIOLATION',
		'AT&T MOBILITY RETAIL STORE DAMAGE',
		'AT&T MOBILITY SERVICE WARRANTY',
		'AT&T MOBILITY TOWER LOG',
		'OTHER-NOT LISTED',
		'PURCHASING CARD REIMBURSEMENT',
		'BROKEN POLE',
		'PEDESTAL RAN OVER BY MOWER',
		'PEDESTAL HIT BY MOTOR VEHICLE',
		'REARRANGEMENT',
		'RESTITUTION',
		'SAI (SERVICE AREA INTERFACE) HIT BY MTV',
		'SHEATH DAMAGE TO BURIED CABLE',
		'SWITCHING EQUIPMENT',
		'STOLEN CABLE',
		'UNDERGROUND CABLE DAMAGED',
		'UVERSE INSTALLATION DAMAGE',
		'VRAD CABINET',
		'WATER LINE']; 
    $rootScope.dmgLoad=function(){
    	
    	$scope.tabs.data1=$scope.dmg;
    }
    
    $scope.searchDmgDesc=function(searchTearm){
    	return $filter('filter')( $scope.damageDescription,function(desc){
            if ((!searchTearm) || desc.substring(0,searchTearm.length).toUpperCase()===searchTearm.toUpperCase()){
                return true;
            }
            else
                return false;
        });
    }
    $scope.$watch('dmg', function (newValue, oldValue) {
        $scope.tabs.data1=$scope.dmg;
      }, true);
    var autocomplete;
    var input;
    $scope.searchLocation=function(loc){
    	input = document.getElementById('autocomplete');
    	autocomplete= new google.maps.places.Autocomplete((document.getElementById('autocomplete')));
        autocomplete.addListener('place_changed', fillInAddress);
        console.log(autocomplete);
    }
    
    function fillInAddress() {
    	/*console.log(autocomplete.getPlace());
    	console.log(input);*/
    	console.log($scope.autofillLocation);
    	$scope.autofillLocation=$scope.autofillLocation.trim();
    	var places = $scope.autofillLocation.split(",");
    	var country=places[places.length-1].trim();
    	var state=places[places.length-2].trim();
    	var city=places[places.length-3].trim();
    	var place;
    	console.log("Address:"+place+" city:"+city+"  state:"+state+"  country:"+country);
    	for(var i=0;i<places.length-3;i++){
    		if(place){
    			console.log(places[i]);
    			places[i]=places[i].replace(/#/g , " ");
    			place=place.concat(","+places[i])
    		}
    		else{
    			console.log(places[i]);
    			places[i]=places[i].replace(/#/g , " ");
    			place=places[i];
    		}
    	}
    	$scope.dmg.addrs=place.toUpperCase();
    	$scope.dmg.state=state.toUpperCase();
    	$scope.dmg.city=city.toUpperCase();
    	console.log("Address:"+place+" city:"+city+"  state:"+state+"  country:"+country);
    	console.log($scope.dmg);
/*    	var place = autocomplete.getPlace();
    	console.log(place.address_components);
    	 for (var i = 0; i < place.address_components.length; i++) {
    		 console.log(place.address_components[i]);
    	 }*/
    }
    

    
}]);

cams.controller('Tab2_cntrl', ['$scope', '$route', '$routeParams', '$location', '$uibModal','$rootScope',function($scope, $route, $routeParams, $location, $uibModal,$rootScope){
    if(!$scope.tabs.data2){
          $scope.bInfo=this;
    }
    else{
          $scope.bInfo=$scope.tabs.data2;
    }
    
    $rootScope.bInfoLoad=function(){

    	$scope.tabs.data2=$scope.bInfo;
    }
    
    
    $scope.$watch('bInfo', function (newValue, oldValue) {
        $scope.tabs.data2=$scope.bInfo;
      }, true);
   
    
    
}]);


cams.controller('Tab3_cntrl', ['$scope', '$route', '$routeParams', '$location', '$uibModal','$rootScope',function($scope, $route, $routeParams, $location, $uibModal,$rootScope){

}]);

cams.controller('Tab10_cntrl', ['$scope', '$route', '$routeParams', '$location', '$uibModal','$rootScope','$http',function($scope, $route, $routeParams, $location, $uibModal,$rootScope,$http){
        
    
}]);


cams.controller('photoCtrl', ['$scope', '$route', '$routeParams', '$location', '$uibModal','$rootScope','$http','$timeout',function($scope, $route, $routeParams, $location, $uibModal,$rootScope,$http,$timeout){
    $scope.url = 'api/upload/getPhoto/';
    $scope.queue = [];
    $scope.uploadFiles=[];

    $scope.handleImagesLoaded = function (data, status) {
    	var imageData={};
    	var allImages=[];
    	for(var i=0;i<data.length;i++){
    		imageData.image="assets/uploadedFiles/"+$rootScope.claimIdCurrent+"/"+data[i];
    		imageData.thumbnail="assets/uploadedFiles/"+$rootScope.claimIdCurrent+"/"+data[i];
    		imageData.name=data[i];
    		
    		allImages.push(imageData);
    		imageData={};
    	}
        $scope.queue = allImages;
        $scope.loading = false;
    }

    $scope.fetch = function () {
    	$scope.loading = true;
        $http.get($scope.url+$rootScope.claimIdCurrent).success($scope.handleImagesLoaded);
    };

    // Defer fetch for 1 second to give everything an opportunity layout
    $timeout($scope.fetch, 1000);
    
    
    $scope.uploadedFile = function(element) {
        $scope.$apply(function($scope) {
        	$scope.uploadFiles = element.files;
        	$scope.loading = true;
        	$scope.addFile($scope.uploadFiles);
        	console.log($scope.uploadFiles);
        });
    }
    
/*    $scope.testCancle=function(file){
        var remove=$scope.queue.indexOf(file);
        $scope.queue.splice(remove,1);
    }    */
    
    $scope.deletePhoto=function(file){
        var remove=$scope.queue.indexOf(file);
        $scope.queue.splice(remove,1);
    }
    
    $scope.addFile = function(files) {
        var url = 'api/upload/sendPhoto';
        if(files.length>=1){
            for ( var i = 0; i < files.length; i++)
            {
                var fd = new FormData();
                console.log(files[i]);
                fd.append("file", files[i]);
                var data =$rootScope.claimIdCurrent;
                console.log(data);
                fd.append("data", JSON.stringify(data));
                fd.append("metadata", JSON.stringify(files[i].name));
                $http.post(url, fd, { 
                    withCredentials : false, 
                    headers : {
                        'Content-Type' : undefined
                    },
                    transformRequest : angular.identity
                })
                .success(function(data)
                {
                    
                })
                .error(function(data)
                {
                    
                });
            }
        }
        //$scope.uploadFiles=[];
        $timeout($scope.fetch, 1000); 
    }    
    
}]);

/*cams.controller('createViewCtrl', function($scope, $uibModalInstance,
		$uibModal, $http, items, $rootScope, $location) {
	
    $scope.close = function() {
    	$uibModalInstance.close();
    };
    
    $scope.createView = function() {
    	console.log('Creating a view.. '+$scope.viewName);
    	var viewJson = {};
    	
    	var selectedColArr = $scope.selectedColumns;
    	var selectedColCsv = '';
    	selectedColArr = (selectedColArr == null ? [] : selectedColArr);
    	//selectedColCsv = selectedColArr.toString();
    	
    	for(i=0;i<selectedColArr.length;i++){
    		selectedColCsv = selectedColCsv + selectedColArr[i].key + ',';
    	}
    	selectedColCsv = selectedColCsv.slice(0, -1);
    	
    	viewJson.fieldsToDisplay = selectedColCsv;
    	viewJson.id = $rootScope.viewId;
    	viewJson.name = $scope.viewName;
    	viewJson.visibility = $scope.visibility;
    	
    	console.log(JSON.stringify(viewJson));
    	
		$http.post('api/claims/views', viewJson).success(function(data) {
			console.log('ClaimsView successfully created..!!');
			$uibModalInstance.close();
			$http.get('api/claims/views').success(
					function(data) {
						$rootScope.views = data;
					});
		}).error(function(data) {
			console.log('ClaimsView creation failed..!!'+data);
		});
    	
    };
	
});*/

cams.controller('createClaimCtrl', function($scope, $uibModalInstance,
    $uibModal, items, $rootScope, $location,$http,$cookies,$cookieStore) {
    $scope.selectOptions = ["Yes", "No"];
    $scope.company = ['AFFILIATED NON-TELCO/MOBILITY','AT&T MIDWEST REGION','UVERSE/INTERNET SVC (HELPDESK)','ATT COM INC (LEGACY T)','AT&T SOUTHEAST (BELLSOUTH)','AT&T NEVADA','NEW MEDIA','AT&T CALIFORNIA	','PAYROLL OPERATIONS RECOVERIES','PURCHASING CARD REIMBURSEMENT','TELCOM--DO NOT SELECT','AT&T CONNECTICUT','AT&T SOUTHWEST REGION'];
    $scope.typeOfDamages =['AERIAL CABLE','AERIAL DROP','AERIAL FIBER','BURIED CABLE','BURIED DROP','CELL','CONDUIT','FIBER DROP','FIBER OPTIC','OTHER PROPERTY','POLE','PEDESTAL','UNDERGROUND CABLE'];
    $scope.next = function() {

        var vehicleInvolved = $scope.vehicleInvolved;
        var nonCompanyProperty = $scope.nonCompanyProperty;
        var CompanyProperty = $scope.CompanyProperty;

        if (vehicleInvolved == "No" && nonCompanyProperty == "No" && CompanyProperty == "Yes") {
        	
        	$rootScope.claimIdCurrent='pm897u'+Math.floor(Date.now());
        	$rootScope.submittedClaimId='DTV'+Math.floor(Date.now()/1000);
        	
        	var newClaimID=$rootScope.claimIdCurrent;
        	var submittedClaimID=$rootScope.submittedClaimId;
        	

    		var newClaimData = {
    				"id" : newClaimID,
    				"nonSubClaimID":newClaimID,
    				"submittedClaimID":submittedClaimID,
    				"isSubmitted":false
    		};	
    		
        	var postData = {
        			"id":newClaimData.id, 
        			"value":JSON.stringify(newClaimData) };
        	}
        	console.log(postData);
        
        	var res = $http.post('api/claims', postData);
    		res.success(function(data, status, headers, config) {
    			 $location.path('enterClaim/' + newClaimData.id);
                 $uibModalInstance.close();
    		});
    		
        }

    $scope.close = function() {
    	$uibModalInstance.close();
    };
});

cams.controller('submitClaimCtrl', function($scope, $uibModalInstance,
		$uibModal, items, $rootScope, $location) {

	$scope.submittedClaimId = $rootScope.submittedClaimId;

	$scope.submitNext = function() {
		$location.path('/technician');
		$uibModalInstance.close();

	}
	$scope.submitCancel = function() {
		$uibModalInstance.close();
	};
});

cams.config(function($routeProvider) {
    $routeProvider.when("/superAdmin", {
        templateUrl: "views/MasterAdminDashboard.html"
    }).when("/admin", {
        templateUrl: "views/adminDashboard.html"
    }).when("/technician", {
        templateUrl: "views/dashboard.html"
    }).when("/enterClaim/:claimId", {
        templateUrl: "views/enterClaim.html"
    }).when("/viewClaim/:claimId", {
        templateUrl: "views/viewClaim.html"
    }).when("/", {
        templateUrl: "views/login.html"
    }).otherwise({ redirectTo:'/technician' })
	 
});

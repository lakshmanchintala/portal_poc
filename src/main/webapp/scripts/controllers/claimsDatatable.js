cams.controller('NonSubmittedClaimsGridCtrl', function($scope, claimsService, $location,$rootScope,$filter, $uibModal,$http,$timeout) {
	
   init();

   function init() {
	   $scope.gridOptions={};
	   $scope.gridOptions.paginationPageSizes = [10,20,30];
	   $scope.gridOptions.enableFiltering = true;
	   $scope.gridOptions.enableSorting = true;
	   
	   $rootScope.nonSubmittedGridData = {};
	   
	   claimsService.getClaims().then(function (response) {

		   var jsonArr = response.data;
		   var jsonObj = [];
    	   for(i=0; i< jsonArr.length; i++){
    		   jsonObj.push(angular.fromJson(jsonArr[i]));
    	   }
    	   
    	   var nonSubmittedClaimsData=$filter('filter')( jsonObj,function(cPlanet){return (cPlanet.isSubmitted == false);});
    	   for(var i=0;i<nonSubmittedClaimsData.length;i++){
    		   if(nonSubmittedClaimsData[i].data1!=undefined && nonSubmittedClaimsData[i].data1.damageDate!=undefined){
    			   nonSubmittedClaimsData[i].data1.damageDate=$filter('date')(nonSubmittedClaimsData[i].data1.damageDate, 'dd-MMMM-yyyy')
    		   }
    		   if(nonSubmittedClaimsData[i].data1!=undefined && nonSubmittedClaimsData[i].data1.estimatedDate!=undefined){
    			   nonSubmittedClaimsData[i].data1.estimatedDate=$filter('date')(nonSubmittedClaimsData[i].data1.estimatedDate, 'dd-MMMM-yyyy')
    		   }
    	   }
    	   
    	   
    	   var nonSubmittedGridData=[];
    	   
    	   for(var i=0;i<nonSubmittedClaimsData.length;i++){
    		   var rowData={};
    		   rowData.addrs=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.addrs != undefined?nonSubmittedClaimsData[i].data1.addrs : '') :'');
    		   rowData.areaCode=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.areaCode != undefined?nonSubmittedClaimsData[i].data1.areaCode : '') :'');
    		   rowData.city=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.city != undefined?nonSubmittedClaimsData[i].data1.city : '') :'');
    		   rowData.county=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.county != undefined?nonSubmittedClaimsData[i].data1.county : '') :'');
    		   rowData.damageDate=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.damageDate != undefined?nonSubmittedClaimsData[i].data1.damageDate : '') :'');
    		   rowData.desc=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.desc != undefined?nonSubmittedClaimsData[i].data1.desc : '') :'');
    		   rowData.estimatedDate=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.estimatedDate != undefined?nonSubmittedClaimsData[i].data1.estimatedDate : '') :'');
    		   rowData.howOccur=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.howOccur != undefined?nonSubmittedClaimsData[i].data1.howOccur : '') :'');
    		   rowData.state=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.state != undefined?nonSubmittedClaimsData[i].data1.state : '') :'');
    		   rowData.wireCenter=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.wireCenter != undefined?nonSubmittedClaimsData[i].data1.wireCenter : '') :'');
    		   rowData.wireCenterName=(nonSubmittedClaimsData[i].data1 != undefined?(nonSubmittedClaimsData[i].data1.wireCenterName != undefined?nonSubmittedClaimsData[i].data1.wireCenterName : '') :'');
    		   
    		   rowData.areThereWitness=(nonSubmittedClaimsData[i].data2 != undefined?(nonSubmittedClaimsData[i].data2.areThereWitness != undefined?nonSubmittedClaimsData[i].data2.areThereWitness : '') :'');
    		   rowData.municipalityInvolved=(nonSubmittedClaimsData[i].data2 != undefined?(nonSubmittedClaimsData[i].data2.municipalityInvolved != undefined?nonSubmittedClaimsData[i].data2.municipalityInvolved : '') :'');
    		   rowData.partyResponsible=(nonSubmittedClaimsData[i].data2 != undefined?(nonSubmittedClaimsData[i].data2.partyResponsible != undefined?nonSubmittedClaimsData[i].data2.partyResponsible : '') :'');
    		   rowData.photos=(nonSubmittedClaimsData[i].data2 != undefined?(nonSubmittedClaimsData[i].data2.photos != undefined?nonSubmittedClaimsData[i].data2.photos : '') :'');
    		   
    		   rowData.isSubmitted=(nonSubmittedClaimsData[i].isSubmitted != undefined?nonSubmittedClaimsData[i].isSubmitted:'');
    		   rowData.id=(nonSubmittedClaimsData[i].id != undefined?nonSubmittedClaimsData[i].id:'');
    		   rowData.nonSubClaimID=(nonSubmittedClaimsData[i].nonSubClaimID != undefined?nonSubmittedClaimsData[i].nonSubClaimID:'');
//    		   rowData.submittedClaimID=(nonSubmittedClaimsData[i].submittedClaimID != undefined?nonSubmittedClaimsData[i].submittedClaimID:'');
    		   
    		   nonSubmittedGridData.push(rowData);
    	   }
    	   
    	   $rootScope.nonSubmittedGridData=nonSubmittedGridData;
    	   
    	   if(nonSubmittedGridData!=undefined){
    		   
    		    $scope.isFooterFixed=false;
    		    $scope.loading = true;
    		    $scope.gridOptions = {
    		            enableSorting: true,
    		            enableFiltering: true,
    		            exporterMenuCsv: false,
    				    exporterMenuPdf: false,
  /*  				    gridMenuCustomItems: [{
    				        title: 'Export to Excel',
    				        action: function() {
    				        exportUiGridService.exportToExcel('Preprocess', $scope.gridApi, 'all', 'visible');
    				        },
    				        order: 210
    				      }],*/
    		            resizable: true,
    		            enableColumnResize: true,
    		            enablePaging: true,
    		            paginationPageSizes: [5,10,20],
    		            paginationPageSize: 5,
    		            columnDefs : [
//    		            	{name : 'submittedClaimID' , displayName : 'Submitted Claim ID', visible : false },
    		            	{name : 'nonSubClaimID' , displayName : 'Non Submitted Claim Id', visible : true, sort: { direction: 'desc' }, 
    		            		cellTemplate:'<div class="ui-grid-cell-contents"><a style="cursor: pointer;" ng-click="grid.appScope.navigateClaim(COL_FIELD)">{{ COL_FIELD }}</a></div>'},
    		            	{name : 'desc' , displayName : 'Damage Description', visible : true },
    		            	{name : 'howOccur' , displayName : 'How Damage Occured', visible : false },
    		            	{name : 'damageDate' , displayName : 'Damage Date', visible : true },
    		            	{name : 'estimatedDate' , displayName : 'Estimated Damage Date', visible : false },
    		            	{name : 'addrs' , displayName : 'Damage Address', visible : true },
    		            	{name : 'state' , displayName : 'State', visible : true },
    		            	{name : 'city' , displayName : 'City', visible : true },
    		            	{name : 'county' , displayName : 'County', visible : false },
    		            	{name : 'areaCode' , displayName : 'Area Code', visible : false },
    		            	{name : 'wireCenter' , displayName : 'Wire Center', visible : false },
    		            	{name : 'wireCenterName' , displayName : 'Wire Center Name', visible : false },
    		            	{name : 'municipalityInvolved' , displayName : 'Muncipality Involved', visible : false },
    		            	{name : 'photos' , displayName : 'Photos', visible : false },
    		            	{name : 'areThereWitness' , displayName : 'Witness', visible : false },
    		            	{name : 'partyResponsible' , displayName : 'Party Responsible', visible : false },
    		            	{name : 'delete' , displayName : '', visible : true ,enableFiltering: false, enableSorting:false,
    		                    cellTemplate:'<div style="text-align: center;"><span style="cursor:pointer;" data-ng-click="grid.appScope.removeClaim(row.entity.nonSubClaimID)"><i class="fa fa-times" aria-hidden="true"></i></span></div>'}
    		            	]
    		            };
    		        
    		    $scope.gridOptions.enableFiltering=true;
    		    $scope.gridOptions.enableRowHeaderSelection = false;
    		    $scope.gridOptions.multiSelect = false;
    		    $scope.gridOptions.modifierKeysToMultiSelect = false;
    		    $scope.gridOptions.noUnselect = true;
    		    $scope.gridOptions.enableSorting= false;
    		    $scope.gridOptions.enableGridMenu=true;
    		    $scope.gridOptions.enableColumnResizing = true;
    		    $scope.gridOptions.rowHeight= 5;
    		    $scope.gridOptions.onRegisterApi = function( gridApi ) {
    		    	$scope.gridApi = gridApi;
    		    }
    		        
    		    $scope.gridOptions.data=$rootScope.nonSubmittedGridData;
    		    
    	   }
    	   
    	   // watch for any change in the data and update the grid.
    	   $rootScope.filteredGridData = $rootScope.nonSubmittedGridData;
    	   $scope.$watchCollection(function() {
    		   return $rootScope.filteredGridData;
    		 }, function() {
    			 $scope.gridOptions.data=$rootScope.filteredGridData;
    		 }, true);
    	   
       }, function (error) {
           $scope.status = 'Unable to load claims data: ' + error.message;
       });
   }
	
	// START - Claims Table Views
	$scope.gridNonSubmitted = true;
	$scope.viewData = {};
	$rootScope.availableColumns = [
/*		{
	        "key": "submittedClaimID",
	        "value": "Submitted Claim Id"
	    },*/
	    {
	        "key": "nonSubClaimID",
	        "value": "Non Submitted Claim Id"
	    },
	    {
	        "key": "desc",
	        "value": "Damage Description"
	    },
	    {
	        "key": "howOccur",
	        "value": "How Damage Occured"
	    },
	    {
	        "key": "damageDate",
	        "value": "Damage Date"
	    },
	    {
	        "key": "estimatedDate",
	        "value": "Estimated Damage Date"
	    },
		{
	        "key": "addrs",
	        "value": "Damage Address"
	    },
	    {
	        "key": "state",
	        "value": "State"
	    },
	    {
	        "key": "city",
	        "value": "City"
	    },
	    {
	        "key": "county",
	        "value": "County"
	    },
	    {
	        "key": "areaCode",
	        "value": "Area Code"
	    },
	    {
	        "key": "wireCenter",
	        "value": "Wire Center"
	    },
	    {
	        "key": "wireCenterName",
	        "value": "Wire Center Name"
	    },
	    {
	        "key": "municipalityInvolved",
	        "value": "Muncipality Involved"
	    },
	    {
	        "key": "photos",
	        "value": "Photos"
	    },
	    {
	        "key": "areThereWitness",
	        "value": "Witness"
	    },
	    {
	        "key": "partyResponsible",
	        "value": "Party Responsible"
	    }
	    
	];
	
	
    $scope.advancedSearchModal = function() {
     	var popmodalInstance = $uibModal.open({
         	animation : true,
         	backdrop : 'static',
         	keyboard : false,
         	templateUrl : 'advancedSearchModal.html',
         	controller : 'advancedSearchPopupCtrl',
         	size: 'lg',
         	resolve : {
         	items : function() {
	         	$scope.inputTranscationReadOnly = false;
	         	return $scope.items;
         	}
         	}
     	});
    }
	
	$http.get('api/claims/views').success(
			function(data) {
				$rootScope.views = data;
			});
	
	$scope.loadView = function() {
		
		if($scope.viewData.viewSelected == undefined){
			return;
		}
		
		var viewId = $scope.viewData.viewSelected.id;
		console.log('View id selected :: '+viewId);

		$http.get('api/claims/views/'+viewId).success(
				function(data) {
					var fieldsToDisplayArr = [];
					if(data != null && data.fieldsToDisplay != null){
						fieldsToDisplayArr = data.fieldsToDisplay.split(',');
					}
					fieldsToDisplayArr.push('nonSubClaimID');
					fieldsToDisplayArr.push('delete');
					// reset all the columns
					for(j=0;j<$scope.gridOptions.columnDefs.length; j++){
						$scope.gridOptions.columnDefs[j].visible = false;
					}
					
					// display only the selected columns
					for(i=0;i < fieldsToDisplayArr.length; i++){
						for(j=0;j<$scope.gridOptions.columnDefs.length; j++){
							if($scope.gridOptions.columnDefs[j].name == fieldsToDisplayArr[i]){
								$scope.gridOptions.columnDefs[j].visible = true;
								break;
							}
						}
					}
					
					console.log('Columns to be displayed :: '+ fieldsToDisplayArr);

					$scope.gridNonSubmitted = false;
					$timeout(function(){$scope.gridNonSubmitted = true;}, 1000);
				});
	}
	
	$scope.createViewPopUp = function() {
		//reset the data
		$rootScope.viewNameData = '';
		$rootScope.viewId = null;
		$rootScope.visibility = 'self';
		
		var popmodalInstance = $uibModal.open({
			animation : true,
			backdrop : 'static',
			keyboard : false,
			size: 'lg',
			templateUrl : 'views/editViewClaimConfig.html',
			controller: 'EditViewClaimsController',
			resolve : {
				items : function() {
					return $scope.items;
				}
			}
		});
		};
		
	$scope.editViewPopUp = function() {
			if($scope.viewData.viewSelected == undefined){
				return;
			}
			
			var popmodalInstance = $uibModal.open({
				animation : true,
				backdrop : 'static',
				keyboard : false,
				size: 'lg',
				templateUrl : 'views/editViewClaimConfig.html',
				controller: 'EditViewClaimsController',
				resolve : {
					items : function() {
						return $scope.items;
					}
				}
			});
			
			var viewId = $scope.viewData.viewSelected.id;
			// get the view details and set it to model.
			$http.get('api/claims/views/'+viewId).success(
					function(data) {
						var fieldsToDisplayArr = [];
						if(data != null && data.fieldsToDisplay != null){
							fieldsToDisplayArr = data.fieldsToDisplay.split(',');
							$rootScope.viewId = data.id;
							$rootScope.viewNameData = data.name;
							$rootScope.visibility = data.visibility;
							
							var avlFields = $('#multiselect option');
							var fieldsto = $('#multiselect_to');
					        $(avlFields).each(function(index, field){
					        	if(fieldsToDisplayArr.indexOf(field.value) > -1){
					        		fieldsto.append(field);
					        	}
					        });
							
						}
					});
		};
	
/*	$scope.createViewPopUp = function() {
		//reset the data
		$rootScope.viewName = '';
		$rootScope.viewId = null;
		$rootScope.visibility = 'self';
		$rootScope.selectedColumns = undefined;
		
		var popmodalInstance = $uibModal.open({
			animation : true,
			backdrop : 'static',
			keyboard : false,
			templateUrl : 'createView.html',
			controller : 'createViewCtrl',
			size: 'lg',
			resolve : {
				items : function() {
					$scope.inputTranscationReadOnly = false;
					return $scope.items;
				}
			}
		});
	}
	
	$scope.editViewPopUp = function() {
   	
		var popmodalInstance = $uibModal.open({
			animation : true,
			backdrop : 'static',
			keyboard : false,
			templateUrl : 'createView.html',
			controller : 'createViewCtrl',
			size: 'lg',
			resolve : {
				items : function() {
					$scope.inputTranscationReadOnly = false;
					return $scope.items;
				}
			}
		});
		
		var viewId = $rootScope.viewData.viewSelected.id;
		// get the view details and set it to model.
		$http.get('api/claims/views/'+viewId).success(
				function(data) {
					var fieldsToDisplayArr = [];
					if(data != null && data.fieldsToDisplay != null){
						fieldsToDisplayArr = data.fieldsToDisplay.split(',');
						$rootScope.viewId = data.id;
						$rootScope.viewName = data.name;
						$rootScope.visibility = data.visibility;
						$rootScope.selectedColumns = fieldsToDisplayArr;
					}
				});
	}*/
	
	$scope.clearAdvSearch = function() {
		console.log('Clear Advanced Search..!!');
		$scope.gridOptions.data=$rootScope.nonSubmittedGridData;
	}

	
	
	// END - Claims Table Views	
   
   
	$scope.navigateClaim=function(id){
    	$rootScope.claimIdCurrent = id;
    	$location.path('enterClaim/'+id);
    }
	
	
	$scope.removeClaim = function(id){
    	$rootScope.claimTobeRemoved = id;
    	
		var popmodalInstance = $uibModal.open({
			animation : true,
			backdrop : 'static',
			keyboard : false,
			templateUrl : 'removeClaimConfirmation.html',
			controller : 'removeClaimCtrl',
			resolve : {
				items : function() {
					$scope.inputTranscationReadOnly = false;
					return $scope.items;
				}
			}
		});
    }

});


cams.controller('advancedSearchPopupCtrl', function($scope, $uibModalInstance,
		$uibModal, items, $rootScope, $location,$http,$filter) {
	
	$scope.$on('parent', function (event, data) {
	    console.log(data); // 'Some data'
	  });
	console.log('$rootScope.nonSubmittedGridData  : '+$rootScope.nonSubmittedGridData);
	 //$scope.$broadcast('nonSubmittedGridDataChanged', { gridData: $scope.nonSubmittedGridData });
	$scope.queryFields={};
    $scope.addField={};
    $scope.queryFields.fields=[];
    $scope.queryFields.match='all';

	$scope.ddOptions=["Not Equals To","Equals To","Is Not Blank","Is Blank", "Greater Than","Greater Than Or Equals To","Less Than","Less Than Or Equals To"];
    $scope.ddBillerOptions=["Not Equals To","Equals To","Is Not Blank","Is Blank", "Contains","Not Contains","Starts With","Ends With"];
    $scope.ddDateOptions=["Not Equals To","Equals To","Is Not Blank","Is Blank", "On Or After","On Or Before","After","Before","Between","Not Between"];
//    $scope.billers=["1NET","ACUS","AGNS","ANA","ANP","APS","ARPS","ATBAR","ATBS","AU","BAC","BAR","BNDC","BNMS","BNWA","CBIA","CBIC","CBID","CBIN","CBIS","CBIX","COBRA","CSS","DCS","DCSA","DL1N","DLIB","DLSB","DLSD","DLUT","DLVT","DLWE","DMMY3","EPALS","EPLS","ESPI","EUR","FBS","FTS","HNS1","HWYM","ICCS","INPH","ISB","ISS","ISS2","JNKY1","LCKY","LION","LL","LSDN","LSS","MIBS","MQ","MQBP","MRTN","NESB","ORAR","PL01","PL02","PPC","PPCS","RCAM","RXXX","SAND","SBS","SDN","SITS","THRF","TLGN","UBLR","UCBS","VTNS","WATS","WNET","WPBS","test1"];
//    $scope.status=["ABEND","ABEND BLDNG VWS","ABND BLDNG TBLS","ARCHIVE COMPLETE","ARCHIVE ERROR","ARCHIVED","ARCHIVING DATA","BACKED OUT","BACKOUT ABENDED","BACKOUT ALL","BACKOUT OVERWR","BACKOUT PENDING","BACKOUT RESTART","BACKUP ERROR","BKOUT PROCSSING","CKP-RESTART","CMPLT,NOT BKDUP","COMPLETE","CREATING INDEXES","DATA XFER COMPLETE","DATA XFER ERROR","DELETED","EMPTY FILE","FILE ARCHIVE ERROR","HOLD","INVALID ARGUMNT","NOT IN LIBRARY","PENDING","PROCESSING","RECALL","RELOAD","REMERGE","RESTART","RESTORE PROCESSING","SUBMITTED","SYSTEM OUTAGE","TAR CMPRS COMPLETE","TAR CMPRS ERROR","TAR CMPRS STRTNG","TAR uncompress error","TERM BY REQUEST","TOTAL_ERROR","WAITING","XFERING DATA","XTRACT COMPLETE","XTRACT ERROR","XTRACTING DATA","ZIP CREATED","ZIP CREATION ERROR","ZIP XFER COMPLETE","ZIP XTRACT COMPLETE","ZIP XTRACT ERROR"];

    $scope.advancedSearchFieldsList = [
//        {"name": "submittedClaimID","displayName": "Submitted Claim Id","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "nonSubClaimID","displayName": "Non Submitted Claim Id","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "desc","displayName": "Damage Description","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "howOccur","displayName": "How Damage Occured","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "damageDate","displayName": "Damage Date","criteriaType":3,"fieldType":3,"dropDownJson":""},
        {"name": "estimatedDate","displayName": "Estimated Damage Date","criteriaType":3,"fieldType":3,"dropDownJson":""},
        {"name": "addrs","displayName": "Damage Address","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "state","displayName": "State","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "city","displayName": "City","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "county","displayName": "County","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "areaCode","displayName": "Area Code","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "wireCenter","displayName": "Wire Center","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "wireCenterName","displayName": "Wire Center Name","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "municipalityInvolved","displayName": "Muncipality Involved","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "photos","displayName": "Photos","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "areThereWitness","displayName": "Witness","criteriaType":2,"fieldType":1,"dropDownJson":""},
        {"name": "partyResponsible","displayName": "Party Responsible","criteriaType":2,"fieldType":1,"dropDownJson":""}
    ];

    $scope.defaultFields=["nonSubClaimID","state","city","damageDate"];
    $scope.multiValueFields=["Between","Not Between"];

    for(var i=0; i<$scope.advancedSearchFieldsList.length;i++){

    	if($scope.defaultFields.indexOf($scope.advancedSearchFieldsList[i].name)>-1){
    		$scope.queryFields.fields[i]=[];
    		addFieldMetaData(i,0,1);
    		//console.log($scope.queryFields.fields[i][0].fieldName);
    	} else {
    		$scope.queryFields.fields[i]=[];
    	}
    }

    function addFieldMetaData(row,col,isDefault){
    	$scope.queryFields.fields[row].push('');
		$scope.queryFields.fields[row][col]={};
		$scope.queryFields.fields[row][col].fieldName=$scope.advancedSearchFieldsList[row].name;
		$scope.queryFields.fields[row][col].displayName=$scope.advancedSearchFieldsList[row].displayName;
		if($scope.advancedSearchFieldsList[row].criteriaType==1){
			$scope.queryFields.fields[row][col].criteriaType=$scope.ddOptions;
		}else if($scope.advancedSearchFieldsList[row].criteriaType==2){
			$scope.queryFields.fields[row][col].criteriaType=$scope.ddBillerOptions;
		}else if($scope.advancedSearchFieldsList[row].criteriaType==3){
			$scope.queryFields.fields[row][col].criteriaType=$scope.ddDateOptions;
		}

		$scope.queryFields.fields[row][col].fieldType=$scope.advancedSearchFieldsList[row].fieldType;

/*		if($scope.advancedSearchFieldsList[row].fieldType==2){
			if($scope.advancedSearchFieldsList[row].dropDownJson=="billers"){
				$scope.queryFields.fields[row][col].multiSelect=$scope.billers;
			}else if($scope.advancedSearchFieldsList[row].dropDownJson=="status"){
				$scope.queryFields.fields[row][col].multiSelect=$scope.status;
			}
		}*/

		$scope.queryFields.fields[row][col].isDefault=isDefault;
    }

    console.log($scope.queryFields.fields);


/*    var d = new Date();
    var yesterday = d.setDate(d.getDate() - 2);

    $scope.queryFields.fields[0][0].value1 = new Date(yesterday);*/


    $scope.addFieldToForm= function() {
    	var ind=$scope.advancedSearchFieldsList.indexOf($scope.addField.selection);

    	var column=$scope.queryFields.fields[ind].length;
    	addFieldMetaData(ind,column,0);

    	$scope.addField.selection='';
    };

    $scope.remove=function(ind,rowInd){
    	$scope.queryFields.fields[rowInd].splice(ind, 1);
    }

     $scope.clickQuery=function(){
         $rootScope.loading = true;
    	 console.log($scope.queryFields);
    	 var queryObj=[];
    	 var index=0;
    	 for(var i=0;i<$scope.queryFields.fields.length;i++){
    		 for(var j=0;j<$scope.queryFields.fields[i].length;j++){
    			 if($scope.queryFields.fields[i][j].criteria!=undefined && $scope.queryFields.fields[i][j].criteria!=null && $scope.queryFields.fields[i][j].criteria!=""){
    				 queryObj[index]={};
    					 queryObj[index].criteria=$scope.queryFields.fields[i][j].criteria;
    					 queryObj[index].fieldName=$scope.queryFields.fields[i][j].fieldName;
    					 queryObj[index].value1=$scope.queryFields.fields[i][j].value1;
    				 index++;
    			 }
    		 }
    	 }
    	 var tempData1=$rootScope.nonSubmittedGridData;
    	 var tempData2=tempData1;
    	 var subData=tempData1;
    	 console.log('Query Obj : '+queryObj);
    	 for(var i=0;i<queryObj.length;i++){
    		 
    		 if(queryObj[i].criteria=="Not Equals To"){
    			 
    			 if(queryObj[i].fieldName=="nonSubClaimID"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.nonSubClaimID != queryObj[i].value1);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="city"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.city != queryObj[i].value1);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="state"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.state != queryObj[i].value1);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 
    		 }else if(queryObj[i].criteria=="Equals To"){
    			 
    			 if(queryObj[i].fieldName=="nonSubClaimID"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.nonSubClaimID == queryObj[i].value1);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="city"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.city == queryObj[i].value1);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="state"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.state == queryObj[i].value1);});
    		    	 
    		    	 tempData2=subData;
    			 }   			 
    		 }else if(queryObj[i].criteria=="Is Not Blank"){
    			 
    			 if(queryObj[i].fieldName=="nonSubClaimID"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.nonSubClaimID!=undefined && tData.nonSubClaimID!="");});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="city"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.city!=undefined && tData.city!="");});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="state"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.state!=undefined && tData.state!="");});
    		    	 
    		    	 tempData2=subData;
    			 }    			 
    		 }else if(queryObj[i].criteria=="Is Blank"){
    			 
    			 if(queryObj[i].fieldName=="nonSubClaimID"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.nonSubClaimID==undefined || tData.nonSubClaimID=="");});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="city"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.city==undefined || tData.city=="");});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="state"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.state==undefined || tData.state=="");});
    		    	 
    		    	 tempData2=subData;
    			 }    			 
    		 }else if(queryObj[i].criteria=="Contains"){
    			 
    			 if(queryObj[i].fieldName=="nonSubClaimID"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.nonSubClaimID.indexOf(queryObj[i].value1)>=0);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="city"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.city.indexOf(queryObj[i].value1)>=0);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="state"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.state.indexOf(queryObj[i].value1)>=0);});
    		    	 
    		    	 tempData2=subData;
    			 }    			 
    		 }else if(queryObj[i].criteria=="Not Contains"){
    			 
    			 if(queryObj[i].fieldName=="nonSubClaimID"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.nonSubClaimID.indexOf(queryObj[i].value1)<0);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="city"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.city.indexOf(queryObj[i].value1)<0);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="state"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.state.indexOf(queryObj[i].value1)<0);});
    		    	 
    		    	 tempData2=subData;
    			 }    			 
    		 }else if(queryObj[i].criteria=="Starts With"){
    			 
    			 if(queryObj[i].fieldName=="nonSubClaimID"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.nonSubClaimID.indexOf(queryObj[i].value1)==0);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="city"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.city.indexOf(queryObj[i].value1)==0);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="state"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.state.indexOf(queryObj[i].value1)==0);});
    		    	 
    		    	 tempData2=subData;
    			 }    			 
    		 }else if(queryObj[i].criteria=="Ends With"){
    			 
    			 if(queryObj[i].fieldName=="nonSubClaimID"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.nonSubClaimID.indexOf(queryObj[i].value1)!=0);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="city"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.city.indexOf(queryObj[i].value1)!=0);});
    		    	 
    		    	 tempData2=subData;
    			 }
    			 else if(queryObj[i].fieldName=="state"){
    				 
    		    	 subData=$filter('filter')( tempData2,function(tData){
    		    		 return (tData.state.indexOf(queryObj[i].value1)!=0);});
    		    	 
    		    	 tempData2=subData;
    			 }    			 
    		 }
    		 
    	 }
    	 
    	 console.log('temp data 2 : '+tempData2);
    	 
    	 $rootScope.filteredGridData = tempData2;
    	 $uibModalInstance.close();
     }

		$scope.close = function() {
		$uibModalInstance.close();
		};
		
});


cams.controller('NonSubmittedClaimsCtrl', function($scope, claimsService, $location,$rootScope,$filter, $uibModal) {
	
	$scope.nonSubmittedClaims = [];
	$scope.filteredRT = [];
	
   init();

   function init() {
	   claimsService.getClaims().then(function (response) {
		   $scope.nonSubmittedClaims.length = 0;
		   $scope.filteredRT.length = 0;

		   var jsonArr = response.data;
		   var jsonObj = [];
    	   for(i=0; i< jsonArr.length; i++){
    		   jsonObj.push(angular.fromJson(jsonArr[i]));
    	   }
    	   
    	   var nonSubmittedClaimsData=$filter('filter')( jsonObj,function(cPlanet){return (cPlanet.isSubmitted == false);});
    	   for(var i=0;i<nonSubmittedClaimsData.length;i++){
    		   if(nonSubmittedClaimsData[i].data1!=undefined && nonSubmittedClaimsData[i].data1.damageDate!=undefined){
    			   nonSubmittedClaimsData[i].data1.damageDate=$filter('date')(nonSubmittedClaimsData[i].data1.damageDate, 'dd-MMMM-yyyy')
    		   }
    		   if(nonSubmittedClaimsData[i].data1!=undefined && nonSubmittedClaimsData[i].data1.estimatedDate!=undefined){
    			   nonSubmittedClaimsData[i].data1.estimatedDate=$filter('date')(nonSubmittedClaimsData[i].data1.estimatedDate, 'dd-MMMM-yyyy')
    		   }
    	   }
    	   
    	   angular.extend($scope.nonSubmittedClaims, nonSubmittedClaimsData);
    	   angular.extend($scope.filteredRT, nonSubmittedClaimsData);
    	   $scope.totalItems = $scope.nonSubmittedClaims.length;
    	   
       }, function (error) {
           $scope.status = 'Unable to load claims data: ' + error.message;
       });
   }
	
	$scope.navigateClaim=function(id){
    	$rootScope.claimIdCurrent = id;
    	$location.path('enterClaim/'+id);
    }
	
	  this.openAddress = function (address) {
		    window.open('https://www.google.com/maps/search/usa');
		  };
	
	$scope.removeClaim = function(id){
    	$rootScope.claimTobeRemoved = id;
    	
		var popmodalInstance = $uibModal.open({
			animation : true,
			backdrop : 'static',
			keyboard : false,
			templateUrl : 'removeClaimConfirmation.html',
			controller : 'removeClaimCtrl',
			resolve : {
				items : function() {
					$scope.inputTranscationReadOnly = false;
					return $scope.items;
				}
			}
		});
    }

    
  $scope.sortType = 'nonSubClaimID';
  $scope.sortDescending = false;

//  $scope.filteredRT = angular.copy($scope.nonSubmittedClaims);
  angular.extend($scope.filteredRT, $scope.nonSubmittedClaims);
  $scope.searchText = '';

//  $scope.maxSize = 3;
  $scope.totalItems = $scope.nonSubmittedClaims.length;
  $scope.currentPage = 1;
  $scope.numPerPage = 4;
  $scope.paginationOptions = [5,10,20,50];
  
  $scope.paginate = function (value) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.numPerPage;
    end = begin + $scope.numPerPage;
    index = $scope.filteredRT.indexOf(value);
    return (begin <= index && index < end);
  };

  $scope.filter = function(){
    var results = $scope.filteredRT;
    results.length = 0;
    var searchText = $scope.searchText;
    var nonSubmittedClaims = $scope.nonSubmittedClaims;

    for(var i = 0; i < nonSubmittedClaims.length; ++i){
      if(searchText.length > 0){
    	  
    	  if(nonSubmittedClaims[i].nonSubClaimID.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
    		  results.push(nonSubmittedClaims[i]);
    	  }else if(nonSubmittedClaims[i].data1 != undefined){
    	        if((nonSubmittedClaims[i].data1.damageDate != undefined && nonSubmittedClaims[i].data1.damageDate.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
    	        		(nonSubmittedClaims[i].data1.desc != undefined && nonSubmittedClaims[i].data1.desc.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
    	        		(nonSubmittedClaims[i].data1.city != undefined && nonSubmittedClaims[i].data1.city.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
    	        		(nonSubmittedClaims[i].data1.state != undefined && nonSubmittedClaims[i].data1.state.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ){
    	          results.push(nonSubmittedClaims[i]);
    	       }
    	  }  
      } else {
        results.push(nonSubmittedClaims[i]);
      }
    }
    results.sort(function(a,b){
      var sortType = $scope.sortType;
      var nameA = '';
      var nameB = '';
      if(sortType.indexOf('.') > -1){
    	  var sortTypeArr = sortType.split('.');
    	  var dataA = a[sortTypeArr[0]];
    	  var dataB = b[sortTypeArr[0]];
    	  
    	  if(dataA != undefined && dataA[sortTypeArr[1]] != undefined){
    		  nameA = dataA[sortTypeArr[1]].toUpperCase();// ignore upper and lowercase
    	  }
    	  
    	  if(dataB != undefined && dataB[sortTypeArr[1]] != undefined){
    		  nameB = dataB[sortTypeArr[1]].toUpperCase();// ignore upper and lowercase
    	  }
    	  
      }else{
          nameA = a[sortType].toUpperCase(); // ignore upper and lowercase
          nameB = b[sortType].toUpperCase(); // ignore upper and lowercase
      }

      
      if ($scope.sortDescending) {
    	    if (nameA > nameB) return 1;
    	    if( nameA < nameB) return -1;
      } else {
    	    if (nameA > nameB) return -1;
    	    if( nameA < nameB) return 1;
      }
    
      // names must be equal
      return 0;
    });
    $scope.totalItems = results.length;

  }
});

cams.controller('removeClaimCtrl', function($scope, claimsService, $uibModalInstance, $uibModal,  $rootScope, $location,$http) {
	
	$scope.removeConfirm=function(){
		var claimTobeRemoved = $rootScope.claimTobeRemoved;
		
		claimsService.deleteClaim(claimTobeRemoved).then(function (response) {
			$uibModalInstance.close();
			$location.path('#/');
	       }, function (error) {
	           $scope.status = 'Unable to delete claim : '+claimTobeRemoved +'. Error Message:' + error.message;
	       });
    }
	
	$scope.removeCancel=function(){
		$uibModalInstance.close();
	}
});

cams.controller('SubmittedClaimsCtrl', function($scope, claimsService, $location,$rootScope,$filter) {

	$scope.submittedClaims = [];
	$scope.filteredRT = [];
	
   init();

   function init() {
	   
	   claimsService.getClaims().then(function (response) {
		   $scope.submittedClaims.length = 0;
		   $scope.filteredRT.length = 0;
		  
		   var jsonArr = response.data;
		   var jsonObj = [];
    	   for(i=0; i< jsonArr.length; i++){
    		   jsonObj.push(angular.fromJson(jsonArr[i]));
    	   }
    	   
    	   var submittedClaimsData=$filter('filter')( jsonObj,function(cPlanet){return (cPlanet.isSubmitted == true);});
    	   
    	   angular.extend($scope.submittedClaims, submittedClaimsData);
    	   angular.extend($scope.filteredRT, submittedClaimsData);
    	   $scope.totalItems = $scope.submittedClaims.length;
    	   
       }, function (error) {
           $scope.status = 'Unable to load claims data: ' + error.message;
       });
   }
	
	$scope.navigateClaim=function(id){
    	$rootScope.claimIdCurrent = id;
    	$location.path('viewClaim/'+id);
    }
    
  $scope.sortType = 'submittedClaimID';
  $scope.sortDescending = false;

//  $scope.filteredRT = angular.copy($scope.nonSubmittedClaims);
  angular.extend($scope.filteredRT, $scope.submittedClaims);
  $scope.searchText = '';

//  $scope.maxSize = 3;
  $scope.totalItems = $scope.submittedClaims.length;
  $scope.currentPage = 1;
  $scope.numPerPage = 4;
  $scope.paginationOptions = [5,10,20,50];
  
  $scope.paginate = function (value) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.numPerPage;
    end = begin + $scope.numPerPage;
    index = $scope.filteredRT.indexOf(value);
    return (begin <= index && index < end);
  };

  $scope.filter = function(){
    var results = $scope.filteredRT;
    results.length = 0;
    var searchText = $scope.searchText;
    var submittedClaims = $scope.submittedClaims;

    for(var i = 0; i < submittedClaims.length; ++i){
    	
      if(searchText.length > 0){
      	  if(submittedClaims[i].submittedClaimID.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
    		  results.push(submittedClaims[i]);
    	  }else if(submittedClaims[i].data1 != undefined){
    	        if((submittedClaims[i].data1.damageDate != undefined && submittedClaims[i].data1.damageDate.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
    	        		(submittedClaims[i].data1.desc != undefined && submittedClaims[i].data1.desc.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
    	        		(submittedClaims[i].data1.city != undefined && submittedClaims[i].data1.city.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ||
    	        		(submittedClaims[i].data1.state != undefined && submittedClaims[i].data1.state.toLowerCase().indexOf(searchText.toLowerCase()) > -1) ){
    	          results.push(submittedClaims[i]);
    	       }
    	  }
      } else {
        results.push(submittedClaims[i]);
      }
    }
    results.sort(function(a,b){
      var sortType = $scope.sortType;
      var nameA = '';
      var nameB = '';
      if(sortType.indexOf('.') > -1){
    	  var sortTypeArr = sortType.split('.');
    	  var dataA = a[sortTypeArr[0]];
    	  var dataB = b[sortTypeArr[0]];
    	  
    	  if(dataA != undefined && dataA[sortTypeArr[1]] != undefined){
    		  nameA = dataA[sortTypeArr[1]].toUpperCase();// ignore upper and lowercase
    	  }
    	  
    	  if(dataB != undefined && dataB[sortTypeArr[1]] != undefined){
    		  nameB = dataB[sortTypeArr[1]].toUpperCase();// ignore upper and lowercase
    	  }
    	  
      }else{
          nameA = a[sortType].toUpperCase(); // ignore upper and lowercase
          nameB = b[sortType].toUpperCase(); // ignore upper and lowercase
      }

      
      if ($scope.sortDescending) {
    	    if (nameA > nameB) return 1;
    	    if( nameA < nameB) return -1;
      } else {
    	    if (nameA > nameB) return -1;
    	    if( nameA < nameB) return 1;
      }
    
      // names must be equal
      return 0;
    });
    $scope.totalItems = results.length;

  }
});

cams.controller('DiaryViewCtrl', function($scope, $sce) {
	
	  var trusted = {};
	  //$scope.loading=true;
	  $scope.getPopoverContent = function(address) {
		 var temp =  '<a href="https://maps.google.com/maps?q='+address+'&z=11" target="new"><img border=0 src="https://maps.google.com/maps/api/staticmap?key=AIzaSyCO5CBF2pd1U24cI7GTz6KP9gA-JlJI-0w&center='+address+'&zoom=10&size=160x160&scale=1&sensor=false&format=png&markers=color:blue|'+address+'"></a> </div>'
	    return trusted[temp] || (trusted[temp] = $sce.trustAsHtml(temp)); 
	  }
	
	$scope.columnNames = {
		 "all": "All",
		 "claimNumber": "Claim Number",
		 "cityState": "City, State",
		 "address" : "Address",
         "supLastName": "Supervisor Last Name",
         "supFirstName": "Supervisor First Name",
         "dateReported": "Date Reported",
         "billDescription": "Bill Description",
         "followUpDate": "Follow Up Date",
		 "followUpCode": "Follow Up Code"
	};
	

	$scope.diaryViewClaims = [
        {
            "claimNumber": "attuid1489008468922",
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
            "claimNumber": "attuid1489006903439",
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
            "claimNumber": "attuid1489006662607",
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

$scope.sortType = 'claimNumber';
$scope.sortDescending = false;

$scope.filteredRT = angular.copy($scope.diaryViewClaims);

$scope.searchText = '';

//$scope.maxSize = 3;
$scope.totalItems = $scope.diaryViewClaims.length;
$scope.currentPage = 1;
$scope.numPerPage = 4;
$scope.paginationOptions = [5,10,20,50];

$scope.paginate = function (value) {
var begin, end, index;
begin = ($scope.currentPage - 1) * $scope.numPerPage;
end = begin + $scope.numPerPage;
index = $scope.filteredRT.indexOf(value);
return (begin <= index && index < end);
};

$scope.filter = function(){
var results = $scope.filteredRT;
results.length = 0;
var searchField = $scope.searchField;
var searchText = $scope.searchText;
var diaryViewClaims = $scope.diaryViewClaims;

for(var i = 0; i < diaryViewClaims.length; ++i){
		if(searchField == 'all'){
			  if(searchText.length > 0){
				    if(diaryViewClaims[i].claimNumber.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
				    		diaryViewClaims[i].supLastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
				    		diaryViewClaims[i].supFirstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
				    		diaryViewClaims[i].dateReported.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
				    		diaryViewClaims[i].billDescription.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
				    		diaryViewClaims[i].followUpCode.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
				    		diaryViewClaims[i].cityState.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
				    		diaryViewClaims[i].followUpDate.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
				      results.push(diaryViewClaims[i]);
				    }
				  } else {
				    results.push(diaryViewClaims[i]);
				  }
		}else{
			  if(searchText.length > 0){
				  if(searchField == 'claimNumber' && diaryViewClaims[i].claimNumber.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
					  results.push(diaryViewClaims[i]);
				  }else if(searchField == 'supLastName' && diaryViewClaims[i].supLastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
					  results.push(diaryViewClaims[i]);
				  }else if(searchField == 'supFirstName' && diaryViewClaims[i].supFirstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
					  results.push(diaryViewClaims[i]);
				  }else if(searchField == 'dateReported' && diaryViewClaims[i].dateReported.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
					  results.push(diaryViewClaims[i]);
				  }else if(searchField == 'billDescription' && diaryViewClaims[i].billDescription.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
					  results.push(diaryViewClaims[i]);
				  }else if(searchField == 'followUpCode' && diaryViewClaims[i].followUpCode.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
					  results.push(diaryViewClaims[i]);
				  }else if(searchField == 'followUpDate' && diaryViewClaims[i].followUpDate.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
					  results.push(diaryViewClaims[i]);
				  }else if(searchField == 'cityState' && diaryViewClaims[i].cityState.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
					  results.push(diaryViewClaims[i]);
				  }
				  
			  }else{
				    results.push(diaryViewClaims[i]);
			  }
		}
}
results.sort(function(a,b){
  var sortType = $scope.sortType;
  var nameA = a[sortType].toUpperCase(); // ignore upper and lowercase
  var nameB = b[sortType].toUpperCase(); // ignore upper and lowercase
  
  if ($scope.sortDescending) {
	    if (nameA > nameB) return 1;
	    if( nameA < nameB) return -1;
  } else {
	    if (nameA > nameB) return -1;
	    if( nameA < nameB) return 1;
  }

  // names must be equal
  return 0;
});
$scope.totalItems = results.length;

}
});

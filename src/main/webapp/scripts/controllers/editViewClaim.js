var camsMod = angular.module('attRiskManagementApp');
/*
camsMod.controller('EditViewModelController',['$scope','$rootScope','$uibModal','$http', ($scope, $rootScope, $uibModal, $http) => {
	
	$http.get('api/claims/views').success(
			function(data) {
				$scope.views = data;
			});
	
	$scope.createViewEditClaimPopUp = function() { 
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
	};
	
}]);
*/

camsMod.controller('EditViewClaimsController', function ($scope, $rootScope,$uibModal, $uibModalInstance, $http ) {
	$scope.creatorName = 'Firstname Lastname';
	$scope.createdDateTime = '08/08/2017 04:45 AM';
	$scope.modifierName = 'Firstname Lastname';
	$scope.modDateTime = '08/09/2017 05:55 PM';
	$scope.queueData = '-- None --';

	$scope.moveToRight = function() {
		var avlFields = $('#multiselect option:selected');
		var fieldsto = $('#multiselect_to');
		
        $(avlFields).each(function(index, field){
            fieldsto.append(field);
        });
        $("#multiselect_to").focus();
	};
	
	$scope.moveAllToRight = function() {
		var avlFields = $('#multiselect option');
		var fieldsto = $('#multiselect_to');
		fieldsto.append(avlFields);
		$("#multiselect_to").focus();
	}
	
	$scope.moveToLeft = function() {
		var selFields = $('#multiselect_to option:selected');
		var fieldFrom = $('#multiselect');
		
        $(selFields).each(function(index, option){
            fieldFrom.append(option);
        });
        $("#multiselect").focus();
	};
	
	$scope.moveAllToLeft = function() {
		var avlFields = $('#multiselect_to option');
		var fieldsto = $('#multiselect');
		fieldsto.append(avlFields);
		$("#multiselect").focus();
	}
	
	$scope.moveUp = function() {
		var selectedToOption = $('#multiselect_to option:selected');
		if(selectedToOption.size() != 1) {
			return false;
		}
		var selectVal = $(selectedToOption).val();
		var selectText = $(selectedToOption).text();
		
		var multToOptions = $('#multiselect_to option');
		var prevOption = null;
		var currOption = null;
		$(multToOptions).each(function(index, option){
			if(null != prevOption){
				if(selectVal == $(this).val()) {
					$(this).val($(prevOption).val());
					$(this).text($(prevOption).text());
					$(prevOption).val(selectVal);
					$(prevOption).text(selectText);
					currOption = option;
					return false;
				}
			}
			prevOption = option;
		});
		if(currOption){
			$(prevOption).attr('selected', true);
			$(currOption).attr('selected', false)
		}
		$("#multiselect_to").focus();
	};
	
	$scope.moveDown = function() {
		var selectedToOption = $('#multiselect_to option:selected');
		if(selectedToOption.size() != 1) {
			return false;
		}
		var selectVal = $(selectedToOption).val();
		var selectText = $(selectedToOption).text();
		var multToOptions = $('#multiselect_to option');
		var prevOption = null;
		var currOption = null;
		$(multToOptions).each(function(index, option){
			if(null != prevOption){
				if(selectVal == $(prevOption).val()) {
					$(prevOption).val($(this).val());
					$(prevOption).text($(this).text());
					$(this).val(selectVal);
					$(this).text(selectText);
					currOption = option;
					return false;
				}
			}
			
			prevOption = option;
		});
		if(currOption) {
			$(currOption).attr('selected', true);
			$(prevOption).attr('selected', false)
		}
		$("#multiselect_to").focus();
	};
	
	$scope.moveTop = function() {
		var selectedToOption = $('#multiselect_to option:selected');
		var multSel = $('#multiselect_to');
		multSel.prepend(selectedToOption);
		$("#multiselect_to").focus();
	};
	
	$scope.moveBottom = function() {
		var selectedToOption = $('#multiselect_to option:selected');
		var multSel = $('#multiselect_to');
		multSel.append(selectedToOption);
		$("#multiselect_to").focus();
	};
	
	$scope.step = 1;
	$scope.isFirstPanel = 'disabled';
	$scope.isLastPanel ='';
	
	$scope.next = function() {
		$scope.step = $scope.step + 1;
		if($scope.step != 1) {
			$scope.isFirstPanel = '';
		}
		if($scope.step == 4) {
			$scope.isLastPanel = 'disabled';
		}
	};
	$scope.previous = function() {
		$scope.step = $scope.step - 1;
		if($scope.step == 1) {
			$scope.isFirstPanel = 'disabled';
		} else {
			$scope.isFirstPanel = '';
		}
		if($scope.step < 4) {
			$scope.isLastPanel = '';
		}
		
	};
	
	$scope.save = function() {
	    
    	console.log('Creating a view : '+$scope.viewNameData);
    	var viewJson = {};
    	
		var selectedFields = $('#multiselect_to option');
//    	var selectedColArr = $scope.selectedFields;
    	var selectedColArr = selectedFields;
    	var selectedColCsv = '';
    	selectedColArr = (selectedColArr == null ? [] : selectedColArr);
//    	selectedColCsv = selectedColArr.toString();
    	
    	for(i=0;i<selectedColArr.length;i++){
    		selectedColCsv = selectedColCsv + selectedColArr[i].value + ',';
    	}
    	selectedColCsv = selectedColCsv.slice(0, -1);
    	
    	console.log('Selected fields : '+selectedColCsv);
    	viewJson.fieldsToDisplay = selectedColCsv;
    	viewJson.id = $rootScope.viewId;
    	viewJson.name = $scope.viewNameData;
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
	
	$scope.doSaveAs = function() {
		alert('Save As implementation in progress....');	
	};

	$scope.doDelete = function() {
		alert('Delete implementation in progress....');	
	};
	
	$scope.cancel = function() {
		$uibModalInstance.close()
	};
	
	
	var availableColumns = [{
		"key": "addrs",
		"value": "Damage Address"
		},
		{
		"key": "areaCode",
		"value": "Area Code"
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
		"key": "damageDate",
		"value": "Damage Date"
		},
		{
		"key": "desc",
		"value": "Damage Description"
		},
		{
		"key": "estimatedDate",
		"value": "Estimated Damage Date"
		},
		{
		"key": "estimatedDiscoveryDate",
		"value": "Estimated Discovery Date"
		},
		{
		"key": "howOccur",
		"value": "How Damage Occured"
		},
		{
		"key": "state",
		"value": "State"
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
		"key": "areThereWitness",
		"value": "Witness"
		},
		{
		"key": "municipalityInvolved",
		"value": "Muncipality Involved"
		},
		{
		"key": "partyResponsible",
		"value": "Party Responsible"
		},
		{
		"key": "photos",
		"value": "Photos"
		},
		{
		"key": "id",
		"value": "Id"
		},
		{
		"key": "nonSubClaimID",
		"value": "Non Submitted Claim Id"
		}/*,
		{
		"key": "submittedClaimID",
		"value": "Submitted Claim Id"
		}*/
		];
	$scope.avlFields = availableColumns;
	
	var queueOpt = ["Option-1","Option-2","Option-3","Option-4","Option-5"];
	$scope.queueOptions = queueOpt;
	
	$scope.fieldOptions = availableColumns;
	var operatorOpotions = [
		{
			"key":"contains",
			"value":"Contains"
		},
		{
			"key":"eq",
			"value":"Equal"
		},
		{
			"key":"ne",
			"value":"Not Equal"
		}
	];
	$scope.operatorOpotions = operatorOpotions;
	
	var languageOptions = [
		{
			"key":"english",
			"value":"English"
		},
		{
			"key":"french",
			"value":"French"
		},
		{
			"key":"ukEnglish",
			"value":"UK English"
		}
	];
	
	$scope.languageOptions = languageOptions;
	
});


/*$(document).ready(function(){
	$('#multiselect').multiselect();
});*/




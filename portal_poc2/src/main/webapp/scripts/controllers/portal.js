portal.controller('MainController', ['$scope', '$route', '$routeParams', '$location', '$uibModal','$rootScope', '$translate','$http',function($scope, $route, $routeParams, $location, $uibModal,$rootScope, $translate,$http) {
    
$scope.fr=true;

$scope.changeLanguage = function (langKey) {
	  if(langKey == 'fr'){
		  $scope.fr=false;
	  }
	  else{
		  $scope.fr=true;
	  }
    $translate.use(langKey);
  };
  
		
// get translations using AngularJS AJAX API  
$http.get('/rmc-portal/api/configuration/translations').success(function(data){

	for(i=0; i < data.length; i++){
		if(data[i].locale == 'English'){
			$rootScope.English = data[i].text;
		}else if (data[i].locale == 'French'){
			$rootScope.French = data[i].text;
		}
	}
});
		  
$scope.inputTranscationReadOnly = true;

$scope.phoneNumberTextFieldArr = [{fieldName: 'phone1', saved: true, phoneNumber: '+1 469-789-7894', verified: true} ,
                                  {fieldName: 'phone2', saved: true, phoneNumber: '+1 592-987-4879', verified: false}, 
                                  {fieldName: 'phone3', saved: false, phoneNumber:'', verified: false}];
$scope.emailTextFieldArr = [{fieldName: 'email1', saved: true, email: 'robert.names@rogers.com'} , {fieldName: 'email2', saved: false, email: '' }];

$scope.phoneTextFieldCounter = 4;
$scope.emailTextFieldCounter = 4;

$scope.addPhoneNumberTextfield = function(){
	var counter = $scope.phoneTextFieldCounter;
	counter = counter+1;
	var fieldNamevar = 'field'+counter;
	$scope.phoneTextFieldCounter = counter;
	$scope.phoneNumberTextFieldArr.push({fieldName: fieldNamevar, saved: false, phoneNumber: '', verified: true});
}
$scope.deletePhoneNumber = function(phoneNumber){
	for(i=0; i < $scope.phoneNumberTextFieldArr.length; i++){
		if($scope.phoneNumberTextFieldArr[i].phoneNumber == phoneNumber){
			$scope.phoneNumberTextFieldArr.splice(i, 1);
		}
	}
}
$scope.savePhoneNumber = function(fieldName, phoneNumber){
	if(phoneNumber == null || phoneNumber == undefined || phoneNumber == ''){
		return;
	}
	for(i=0; i < $scope.phoneNumberTextFieldArr.length; i++){
		if($scope.phoneNumberTextFieldArr[i].fieldName == fieldName){
			$scope.phoneNumberTextFieldArr[i].phoneNumber = phoneNumber;
			$scope.phoneNumberTextFieldArr[i].saved = true;
			break;
		}
	}
}

$scope.addEmailTextfield = function(){
	var counter = $scope.emailTextFieldCounter;
	counter = counter+1;
	var fieldNamevar = 'field'+counter;
	$scope.emailTextFieldCounter = counter;
	
	$scope.emailTextFieldArr.push({fieldName: fieldNamevar, saved: false, email: ''});
}

$scope.deleteEmailAddress = function(email){
	for(i=0; i < $scope.emailTextFieldArr.length; i++){
		if($scope.emailTextFieldArr[i].email == email){
			$scope.emailTextFieldArr.splice(i, 1);
		}
	}
}
$scope.saveEmailAddress = function(fieldName, email){
	if(phoneNumber == null || phoneNumber == undefined || phoneNumber == ''){
		return;
	}
	for(i=0; i < $scope.emailTextFieldArr.length; i++){
		if($scope.emailTextFieldArr[i].fieldName == fieldName){
			$scope.emailTextFieldArr[i].email = email;
			$scope.emailTextFieldArr[i].saved = true;
			break;
		}
	}
}

$scope.emailAccounts = [
                        {name: 'Wendy Cortez', email : 'K.Salazar@Gmail.com'},
                        {name: 'Evelyn Parker', email : 'E.Parker@Gmail.com'},
                        {name: 'Grant Warren', email : 'G.Warren@Gmail.com'},
                        {name: 'Devin Spencer', email : 'DevinSpencer23@Gmail.com'}
						];

$scope.editEmail = function(index){
	var popmodalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'deletePopup.html',
        controller: 'deletePasswordCtrl',
        resolve: {
          account: function () {
            return $scope.emailAccounts[index];
          }
        }
   });
};

$scope.deleteEmail = function(index){
	if(index)
	$scope.emailAccounts.splice(index,1);
};

$rootScope.countries = [ 
                    {name: 'Afghanistan', lettercode: 'AF', digitcode: '+93'},
                    {name: 'Åland Islands', lettercode: 'AX', digitcode: '+355'},
                    {name: 'Albania', lettercode: 'AL', digitcode: '+213'},
                    {name: 'Algeria', lettercode: 'DZ', digitcode: '+93'},
                    {name: 'Canada', lettercode: 'CAN', digitcode: '+1'},
                    {name: 'France', lettercode: 'FR', digitcode: '+33'},
                    {name: 'United States', lettercode: 'US', digitcode: '+1'},
                    {name: 'India', lettercode: 'IN', digitcode: '+91'},
                    {name: 'United Kingdom', lettercode: 'UK', digitcode: '+93'}
                ];
$rootScope.countryCode = '+1';
$rootScope.selectCountry = function(thisObj, code){
	$scope.countryCode = code;
};
$rootScope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
};


$scope.months = [
					{name: 'JAN'},
					{name: 'FEB'},
					{name: 'MAR'},
					{name: 'APR'},
					{name: 'MAY'},
					{name: 'JUN'},
					{name: 'JUL'},
					{name: 'AUG'},
					{name: 'SEP'},
					{name: 'OCT'},
					{name: 'NOV'},
					{name: 'DEC'},
					
];

$scope.dates= [
					{date: '01'},
					{date: '02'},
					{date: '03'},
					{date: '04'},
					{date: '05'},
					{date: '06'},
					{date: '07'},
					{date: '08'},
					{date: '09'},
					{date: '10'},
					{date: '11'},
					{date: '12'},
					{date: '13'},
					{date: '14'},
					{date: '15'},
					{date: '16'},
					{date: '17'},
					{date: '18'},
					{date: '19'},
					{date: '20'},
					{date: '21'},
					{date: '22'},
					{date: '23'},
					{date: '24'},
					{date: '25'},
					{date: '26'},
					{date: '27'},
					{date: '28'},
					{date: '29'},
					{date: '30'},
					{date: '31'},
					
];

$scope.years =[
					{name: '1980'},
					{name: '1981'},
					{name: '1982'},
					{name: '1983'},
					{name: '1984'},
					{name: '1985'},
					{name: '1986'},
					{name: '1987'},
					{name: '1988'},
					{name: '1989'},
					{name: '1990'},
					{name: '1991'},
					{name: '1992'},
					{name: '1993'},
					{name: '1994'},
					{name: '1995'},
					{name: '1996'},
					{name: '1997'},
					{name: '1998'},
					{name: '1999'},
					{name: '2000'},
					{name: '2001'},
					{name: '2002'},
					{name: '2003'},
					{name: '2004'},
					{name: '2005'},
					{name: '2006'},
					{name: '2007'},
					{name: '2008'},
					{name: '2009'},
					{name: '2010'},
					{name: '2011'},
					{name: '2012'},
					{name: '2013'},
					{name: '2014'},
					{name: '2015'},
					{name: '2016'},
					{name: '2017'}
	
];

$rootScope.authorizedAppTextFieldArr = [{fieldName: 'authApp1', appName: 'Calendar on my Mac', generated: true} , {fieldName: 'authApp2',appName: '', generated: false}, {fieldName: 'authApp3',appName: '',generated: false}];

$scope.addAuthorizedAppTextfield = function(){
	$rootScope.authorizedAppTextFieldArr.push({fieldName: 'authApp4', appName: '', generated: false});
}

$scope.deleteAppPassword = function(appName){
	alert('Deleting "'+appName+'" now');
	for(i=0; i < $rootScope.authorizedAppTextFieldArr.length; i++){
		if($rootScope.authorizedAppTextFieldArr[i].appName == appName){
			$rootScope.authorizedAppTextFieldArr.splice(i, 1);
		}
	}
}


  $scope.altInputFormats = ['M!/d!/yyyy'];


     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;

     $scope.title = 'Member Center Portal';

     $rootScope.loggedIn = false;

     $scope.login = function(){
    	 $rootScope.loggedIn = true;
        var popmodalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'emailAlternateContact.html',
            controller: 'emailAlternateContact',
            resolve: {
              items: function () {
                $scope.inputTranscationReadOnly = false;
                return $scope.items;
              }
            }
       });
     };

     $scope.logout = function(){
    	 $rootScope.loggedIn = false;
     }

$scope.deleteAppPassword1 = function(){
	var popmodalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'deletePopup.html',
        controller: 'deletePasswordCtrl',
        resolve: {
          items: function () {
            $scope.inputTranscationReadOnly = false;
            return $scope.items;
          }
        }
   });
}
$scope.generatePassword = function(){
	var popmodalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'generatePassword.html',
        controller: 'generatePasswordCtrl',
        resolve: {
          items: function () {
            $scope.inputTranscationReadOnly = false;
            return $scope.items;
          }
        }
   });
}

      $scope.registerLookupPopUp = function(){
    	  var popmodalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'registerLookup.html',
              controller: 'registerLookupPopUpInstanceCtrl',
              resolve: {
                items: function () {
                  return $scope.items;
                }
              }
         });
    	  
    	  
      }
      $scope.passwordRecoveryMainPopup = function () {
          var popmodalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'passwordRecoveryMain.html',
            controller: 'passwordRecoveryCtrl',
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
       });
     }
      
      $scope.generatedAppPassword = function () {
          var popmodalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'generatedAppPassword.html',
            controller: 'generatedAppPwdCtrl',
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
       });
     }
}]);

portal.controller('deletePasswordCtrl', function ($scope, $uibModalInstance, items, $rootScope) {

    $scope.ok = function () {
    	//remove from array
    	$rootScope.authorizedAppTextFieldArr.splice(0, 1);
       $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

});
portal.controller('generatePasswordCtrl', function ($scope, $uibModalInstance, items, $rootScope) {

    $scope.ok = function () {
       $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

});


portal.controller('generatedAppPwdCtrl', function ($scope, $uibModalInstance, items, $rootScope) {
	$scope.password = 'd@rc5e3_anxxbbjk';// call the service to generate the password and assign it here.
	
    $scope.closeGenAppPwdPopup = function () {
      $uibModalInstance.dismiss('cancel');
    };

});


portal.controller('emailAlternateContact', function ($scope, $uibModalInstance, items, $rootScope) {	
    $scope.closePopup = function () {
      $uibModalInstance.dismiss('cancel');
    };

});
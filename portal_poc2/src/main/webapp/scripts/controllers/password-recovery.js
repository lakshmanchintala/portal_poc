portal.controller('passwordRecoveryCtrl', function ($scope, $uibModalInstance, items, $rootScope, $uibModal, $location) {

    $scope.nextMain = function () {
    	
    	if($scope.passwordRecovery == undefined || $scope.passwordRecovery.userInput == undefined){
    		//user input cannot be empty.
    		return;
    	}
    	
       var userInput = $scope.passwordRecovery.userInput;
       //check if the user input is mobile number or email and display the appropriate pop up.
       var mobileNumberRegexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
       var emailRegexp = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
       
       if(mobileNumberRegexp.test(userInput)){ // && call the service to check if the number exists.
    	   // show the password recovery verification code pop up
           var popmodalInstance1 = $uibModal.open({
               animation: true,
               templateUrl: 'passwordRecoveryVerificationCodeMobile.html',
               controller: 'passwordRecoveryCtrl',
               resolve: {
                 items: function () {
                   return $scope.items;
                 }
               }
          });
       }else if (emailRegexp.test(userInput)){ // && call the service to check if the email exists.
    	   // show the password recovery verification code pop up(email)
           var popmodalInstance1 = $uibModal.open({
               animation: true,
               templateUrl: 'passwordRecoveryVerificationCodeLaptop.html',
               controller: 'passwordRecoveryCtrl',
               resolve: {
                 items: function () {
                   return $scope.items;
                 }
               }
          });
       }else{
    	   // show the password recovery verification code pop up
           var popmodalInstance1 = $uibModal.open({
               animation: true,
               templateUrl: 'passwordRecoveryIncorrectInfo.html',
               controller: 'passwordRecoveryCtrl',
               resolve: {
                 items: function () {
                   return $scope.items;
                 }
               }
          });
       }
       
       $uibModalInstance.close();
    };
    
    $scope.nextIncorrectInfo = function () {
    	var retryInput = $scope.passwordRecovery.retryInput;
     	if($scope.passwordRecovery == undefined || $scope.passwordRecovery.retryInput == undefined){
    		//user input cannot be empty.
    		return;
    	}
    	
     	var retryInput = $scope.passwordRecovery.retryInput;
       //check if the user input is mobile number or email and display the appropriate pop up.
       var mobileNumberRegexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
       var emailRegexp = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
       
       if(mobileNumberRegexp.test(retryInput)){ // && call the service to check if the number exists.
    	   // show the password recovery verification code pop up
           var popmodalInstance1 = $uibModal.open({
               animation: true,
               templateUrl: 'passwordRecoveryVerificationCodeMobile.html',
               controller: 'passwordRecoveryCtrl',
               resolve: {
                 items: function () {
                   return $scope.items;
                 }
               }
          });
           
           $uibModalInstance.close();
           
       }else if (emailRegexp.test(retryInput)){ // && call the service to check if the email exists.
    	   // show the password recovery verification code pop up(email)
           var popmodalInstance1 = $uibModal.open({
               animation: true,
               templateUrl: 'passwordRecoveryVerificationCodeLaptop.html',
               controller: 'passwordRecoveryCtrl',
               resolve: {
                 items: function () {
                   return $scope.items;
                 }
               }
          });
          
           $uibModalInstance.close();
       }
       
    };
    
    $scope.nextVerificationCode = function () {
    	if($scope.passwordRecovery == undefined || $scope.passwordRecovery.verificationCode == undefined){
    		//verification code cannot be empty.
    		return;
    	}
    	
    	var verificationCodeRegexp = /^\d{6}$/;
    	var code = $scope.passwordRecovery.verificationCode;
    	if(verificationCodeRegexp.test(code)){ // && call the service to check if the verification code matches.
    		$rootScope.loggedIn = true;
    		alert($rootScope.loggedIn);
    		$location.path('/account/personalInformation');
    		$uibModalInstance.close();
    	}else{
    		// show the error message on the same pop up without closeing it.
    		alert(' code doesnot macthe');
    	}
    };
    
    $scope.nextVerificationCodeLaptop = function () {
    	
    	if($scope.passwordRecovery == undefined || $scope.passwordRecovery.verificationCode == undefined){
    		//verification code cannot be empty.
    		return;
    	}
    	var verificationCodeRegexp = /^\(?(\d{6})\)$/;
    	var code = $scope.passwordRecovery.verificationCodeLaptop;
    	if(verificationCodeRegexp.test(code)){ // && call the service to check if the verification code matches.
    		$location.path('/account/personalInformation');
    		$uibModalInstance.close();
    	}else{
    		// show the error message on the same pop up without closeing it.
    		alert(' Sorry, its not macthed. Please try again.');
    	}
    };
    
    $scope.cancel = function () {
    	// send the user back to sign in page.
      $location.path('/');
      $uibModalInstance.dismiss('cancel');
    };
    
});
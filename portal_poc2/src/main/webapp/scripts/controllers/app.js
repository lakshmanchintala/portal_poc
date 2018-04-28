var portal = angular.module('portal', [ 'ngRoute', 'ui.bootstrap','pascalprecht.translate', 'ngSanitize', 'ngclipboard' ]);

portal.config(function($routeProvider, $locationProvider, $translateProvider,English, French) {
	$routeProvider.when(
			'/:module/:action',
			{
				controller : 'RouteCtrl',
				templateUrl : function(params) {
					if (params.action === 'logout') {
						return 'views/account/landing.html';
					} else {
						return 'views' + '/' + params.module + '/'
								+ params.action + '.html'
					}
				}
			}).otherwise({
		templateUrl : 'views/account/landing.html'
	});

	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);

	// add translation tables
	$translateProvider.translations('en', English);
	$translateProvider.translations('fr', French);
	$translateProvider.preferredLanguage('en');
	$translateProvider.fallbackLanguage('en');
	//$translateProvider.useSanitizeValueStrategy(null); 
});

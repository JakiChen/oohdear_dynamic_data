// 'oohDear App' 1.0.0
// 'oohDear' is the name of this angular module example (also set in a <html> attribute in index.html)
// 'oohDear.services' is found in services.js
// 'oohDear.controllers' is found in controllers.js
angular.module('oohDear', [
							'ionic', 
							'oohDear.controllers', 
							'oohDear.services'
						  ])
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

})
.directive('noScroll', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  };
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
   //Cover template
	.state('oohdear', {
      url: "/oohdear/:boxID",
      templateUrl: "templates/oohdear.html",
      controller: 'oohdearCtrl'
    })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/oohdear');
});
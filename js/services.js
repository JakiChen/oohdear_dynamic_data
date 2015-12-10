var BaseURL = "http://JakiChen.github.io/oohdear_dynamic_data"; 

angular.module('oohDear.services', [])
.factory('productsService', function($http, $stateParams, $state) {
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	return {
		GetProductsList: function() {
			  return $http.get(BaseURL + '/shop/'+ $stateParams.boxID +'/products.json')
			  .success(function(data, status, headers, config){
				  	console.log($stateParams.boxID);
					console.log(data)
					return data;
			  })
			  .error(function(data, status, headers,config){
					 console.log('data error');
					 $state.go("/blank");
			  });
		},
		GetBoxInfo: function(){
			  return $http.get(BaseURL + '/shop/'+ $stateParams.boxID +'/info.json')
			  			  .success(function(data, status, headers, config){
					return data;
			  })
			  .error(function(data, status, headers,config){
					 console.log('data error');
			  });
		}
	}
})


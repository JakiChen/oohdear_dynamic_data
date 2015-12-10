angular.module('oohDear.controllers', [])

.controller('oohdearCtrl', function($scope, $stateParams, $http, $interval, $state) {
	//初始化页面结构
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	// box info
	$http.get(	BaseURL + '/shop/'+ $stateParams.boxID +'/info.json'	)
		 .success(function(data, status, headers, config){
			$scope.boxinfo = data;
	});
	//box products
	$http.get(	BaseURL + '/shop/'+ $stateParams.boxID +'/products.json'	)
		 .success(function(data, status, headers, config){
			$scope.productsList = data;
	});
	
	
	//Global var
	var totalPage = 3;
	var index = 1;
	var i=0;
	//init z-index
	for (i = totalPage; i>=0 ;i--){
		$(".page-cont").children().eq(i).css("z-index",500-i);
	}
	/*------------------------------------------------------------------
	*
	*fn initPage(), clear all css animation
	*
	*/
	function initPage(){     
			for (var i = 0; i<=totalPage ;i++){
			$(".page-cont").children().eq(i).removeClass("slide-up");
			$(".page-cont").children().eq(i).removeClass("slide-up-out");
			$(".page-cont").children().eq(i).removeClass("slide-up-back");
			$(".page-cont").children().eq(i).removeClass("slide-down");
			$(".page-cont").children().eq(i).removeClass("slide-down-out");
		}
	}
	/*-------------------------------------------------------------------
	*
	*fn swapLink(), Swap the products link to JD.com
	*
	*/
	function swapLink(){
		var currentUrl = $(".page-cont").children().eq(index-1).attr("href");
		$(".menu-icon-jd").attr("href",currentUrl);
	}
	/*-------------------------------------------------------------------
	*
	*fn openCover()
	*
	*/
	function openCover(){
		
		$(".cover-page").removeClass("off");
		$(".cover-page").addClass("on");
		$(".page-cont").children(".page").first().addClass("slide-up");
		/*alert("大屏请求list－item: " + index + " ID") ;*/
		swapLink();
		setTimeout(function(){
			$(".page-cont").children(".page").first().removeClass("slide-up");
		},500);
	
	}
	/*-------------------------------------------------------------------
	*
	*fn closeCover()
	*
	*/
	function closeCover(){
		$(".cover-page").removeClass("on");
		$(".cover-page").addClass("off");
		setTimeout(function(){
			$(".cover-page").removeClass("off");
		},500);
	}
	/*
	*
	*fn slideUp()
	*Page slide up animation emulate
	*
	*/
	
	function slideUp(){
		if(index>=1 && index<totalPage){
			//Slide up one by one
			$(".page-cont").children().eq(index-1).addClass("slide-up-out");
			$(".page-cont").children().eq(index-1).css("bottom","100%");
			$(".page-cont").children().eq(index-1).next().css("bottom","0");
			$(".page-cont").children().eq(index-1).next().addClass("slide-up");
			//
			index = index+1;
			/*alert("大屏请求list－item: " + index + " ID") ;*/
			swapLink();
			setTimeout(function(){
				$(".page-cont").children().eq(index-2).removeClass("slide-up-out");
				$(".page-cont").children().eq(index-2).next().removeClass("slide-up");
			},500);
		}else{
			$(".page-cont").children().eq(index-1).addClass("slide-up-back");
			//reinit z-index
			for (var i = 0; i<=totalPage ;i++){
				$(".page-cont").children().eq(totalPage-i).css("z-index",501-i);
			}
			//init class name
			setTimeout(initPage(),100);
		}
		return index;
	}
	
	/*-------------------------------------------------------------------
	*
	*fn slideDown()
	*
	*/
	function slideDown(){
		if(index>1){
			$(".page-cont").children().eq(index-1).addClass("slide-down-out");
			$(".page-cont").children().eq(index-1).css("bottom","-100%");
			$(".page-cont").children().eq(index-1).prev().css("bottom","0");
			$(".page-cont").children().eq(index-1).prev().addClass("slide-down");
			//
			index = index-1;
			/*alert("大屏请求产品: " + index + "唯一ID") ;*/
			swapLink();
			setTimeout(function(){
				$(".page-cont").children().eq(index).removeClass("slide-down-out");
				$(".page-cont").children().eq(index).prev().removeClass("slide-down");
			},500);
		}else{
			//close cover
			closeCover();
			//reinit z-index
			for (i = 0; i<=totalPage ;i++){
				$(".page-cont").children().eq(i).css("z-index",500-i);
			}
			//init class name
			setTimeout(initPage(),100);
		}
		return index;
	}
	//open the cover
	$("#button-start").click(function(){
		openCover();
	});
	//Button Swap event
	$(".button-swap").click(function(){
		slideUp();
	});
	//
	$(".page-logo").click(function(){
		slideDown();
	});
	//show or hide menu
	$("#icon-cart").click(function(){
		$("#menu").toggleClass("on");
		$(".button-swap").toggleClass("button-swap-on");
	});
	//fn swipe up switch products 
	$scope.ngSwipeUp = function(){
		slideUp();
	};
	//fn swipe up switch products 
	$scope.ngSwipeDown = function(){
		slideDown();
	};
	
});


/*ionic.DomUtil.ready(function(){
  
});

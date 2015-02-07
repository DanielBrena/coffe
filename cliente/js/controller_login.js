module.controller('Login',function($scope,$http,$window){

	$scope.login = function(){
		page.pushPage('admin.html',{animation:'slide'});
	}
});
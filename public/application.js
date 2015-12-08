var mainApplicationModuleName = "mean";

var mainApplicationModule = angular.module(mainApplicationModuleName, ['example', 'users']);

mainApplicationModule.config(['$locationProvider', function($locationProvider){
	$locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function(){
	angular.bootstrap(document, [mainApplicationModuleName]);
});
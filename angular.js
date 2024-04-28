var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.isDarkTheme = false;

    $scope.toggleTheme = function() {
        $scope.isDarkTheme = !$scope.isDarkTheme;
    };
});
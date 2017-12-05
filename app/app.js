const myFirstApp = angular.module('appName', []);

myFirstApp.controller('groceryList', function($scope) {

  $scope.owner = "Iris";
  $scope.notice = "Things to buy:";
  $scope.groceryList = ["Apples", "Oranges", "Bananas"];


  $scope.addItem = function(newItem) {
    if (newItem) {
        $scope.groceryList.push(newItem);
    }
    $scope.groceryItem = null;
  }

  $scope.removeItem = function(item) {
    for (index in $scope.groceryList) {
      if ($scope.groceryList[index] === item) {
        $scope.groceryList.splice(index, 1);
      }
    }
  }

});

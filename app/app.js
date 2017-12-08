const myFirstApp = angular.module('starterApp', []);

myFirstApp.controller('groceryList', ['$scope', function($scope) {

  // Application's data array (the "Pseudo Model")
  $scope.groceryList = ["Granny Smith Apples", "Naval Oranges", "Dole Hawaiian Gold Pineapple"];


  $scope.title = "Iris's Grocery List";
  $scope.icon = "fa fa-shopping-cart";

  $scope.addItem = function(newItem) {
    if (newItem) {
        $scope.groceryList.push(newItem);
    }
    $scope.groceryItem = undefined;
  };

  $scope.removeItem = function(item) {
    for (index in $scope.groceryList) {
      if ($scope.groceryList[index] === item) {
        $scope.groceryList.splice(index, 1);
      }
    }
  };
}]);

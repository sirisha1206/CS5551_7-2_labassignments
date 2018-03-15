describe("Validatelogin", function() {
  var scope;

  beforeEach(angular.mock.module("Validlogin"));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('Validatelogin', {$scope: scope});
  }));

  it("check if username and password is empty", function() {

    scope.Valid('','');
    expect(scope.temp).toEqual("username and password can not be empty");
  });


  it("check if username is empty", function() {

    scope.Valid('','sirisha');
    expect(scope.temp).toEqual("username can not be empty");
  });
  it("check if  password is empty", function() {

    scope.Valid('sirisha','');
    expect(scope.temp).toEqual("password can not be empty");
  });

});


angular.module('Validlogin', ['ionic']).controller('Validatelogin', function ($scope,$http) {
  $scope.temp = "";

  $scope.Valid = function (username,password) {

    $scope.uname = username;
    $scope.pwd = password;

    if($scope.uname == '' && $scope.pwd == '' )
    {

      $scope.temp = "username and password can not be empty";
    }

    else if($scope.uname == '')
    {

      $scope.temp = "username can not be empty";
    }

    else
    {

      $scope.temp = "password can not be empty";
    }

  }
});



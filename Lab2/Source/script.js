var myApp = angular.module("myApp",[]);
myApp.controller('myController',['$scope',function($scope){
    // noinspection JSAnnotator
    $scope.gmail = {
        username : "",
        email:""
    };
    $scope.onGoogleLogin = function(){
        var params = {
            'clientid':'323689101436-a6qrrf9df8amcnh5g05sicek534f329u.apps.googleusercontent.com',
            'cookiepolicy':'single_host_origin',
            'callback':function(result){
                if(result['status']['signed_in']){
                     var request = gapi.client.plus.people.get(
                                    {
                                        'userId':'me'
                                     }
                             );
                    request.execute(function(resp){
                        $scope.$apply(function(){
                            $scope.gmail.username = resp.displayName;
                            $scope.gmail.email = resp.emails[0].value;
                        })
                    })
                }
            },
            'approvalprompt':'force',
            'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
        };
        gapi.auth.signIn(params);
        //$window.location.href="test.html";
    }
}]);
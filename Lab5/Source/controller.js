var app = angular.module('myApp',[]);

app.controller('myController', function($scope, $http,$window) {

    $scope.data = [];
    $scope.resData = [];
    $scope.items = [];
    $scope.drugs = [];
    $scope.getdata = function(drugname){
        $scope.drug = drugname;
        $http({
            method: 'GET',
            url:'https://api.fda.gov/drug/event.json?api_key=1ynHtj6cjqyH3G8V2wK4xOJH07hgZvik1RYirw4I&search='+$scope.drug+'&limit=5'
         }).then(function (success){
             for (var i=0;i< success.data.results.length;i++){
                  $scope.resData.push(success.data.results[i].patient.reaction[0].reactionmeddrapt) ;
             }
            $http({
                method: 'POST',
                url: '/sideeffects',
                data: {'drugname':$scope.drug,'sideeffects':$scope.resData},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
             }).then(function (success){
                 console.log(success);
                 $window.alert("Drug and its side effects are saved to the database");
             },function (error){
                console.log('Error: ' + error);
             });
         },function (error){
            console.log('Error: ' + error);
         });
    }
    $scope.register = function(formData){
        console.log(formData);
        $scope.data = [];
        $http({
            method: 'POST',
            url: '/register',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: formData
         }).then(function (success){
            console.log(success);
            $scope.data = success;
            $window.alert(success.data.message);
         },function (error){
            console.log('Error: ' + error);
         });
    }
    $scope.drugssideeffects = function(){
        $http({
            method: 'GET',
            url: '/drugseffectslist',
         }).then(function (result){
            console.log(result);
            $scope.items = result.data;
         },function (error){
            console.log('Error: ' + error);
         });
    }
    $scope.drugs = function(){
        $http({
            method: 'GET',
            url: '/drugslist',
         }).then(function (result){
            console.log(result);
            $scope.drugs = result.data;
         },function (error){
            console.log('Error: ' + error);
         });
    }
    $scope.deleteData = function(delData){
        console.log(delData)
        $http({
            method: 'DELETE',
            url: '/deleteData',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: delData
         }).then(function (result){
            console.log(result);
            $scope.items = result.data;
            $window.alert("Deleted "+delData.drugname+" from the database successfully");
         },function (error){
            console.log('Error: ' + error);
         });
    }
    $scope.updateData = function(upData){
        console.log(upData);
        $http({
            method: 'POST',
            url: '/updateData',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: upData
         }).then(function (result){
            console.log(result);
            $scope.items = result.data;
            $window.alert("updated "+upData.drugname+" in the database successfully");
         },function (error){
            console.log('Error: ' + error);
         });
    }

});
//Will put these modules under namespace cw

(function (angular){
  angular.module('cw-basic-nav', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('home');
    $stateProvider
      .state('home', {
        url: '/home',
        template:'<h1>Hello @Home</h1>'
      })
      .state('projects', {
        url: '/projects',
        template:'<h1>Hello @Projects</h1>'
      })
     .state('blog', {
        url: '/blog',
        template:'<h1>Hello @My blog</h1>'
      });
  })
  .controller('MainCtrl', ['$scope', function(scope){
    scope.nav = [
      {name:'home', title:'Home'},
      {name:'projects', title:'Projects'},
      {name:'blog', title:'My Blog'}
    ];
  }])
  .directive('cwBasicnav', function(){
    return {
      restrict:'EA',
      template:'<nav><a ng-repeat="item in nav" ui-sref="{{ item.name }}"> {{ item.title }} </a></nav>'
    };
  });  
})(angular);
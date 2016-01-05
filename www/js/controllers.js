angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('DashboardController', function ($scope) {                          
  $scope.dashboard = {swiper: false, slider: false, activeIndexView: 0};
              
  $scope.$watch('dashboard.slider', function (swiper) {
      if (swiper) {
          $scope.swiper = swiper;
          
          swiper.on('onSlideChangeStart', function (swiper) {
              if(!$scope.$$phase) {
                  $scope.$apply(function () {
                       $scope.dashboard.activeIndexView = swiper.snapIndex;   
                  }); 
              } else {
                  $scope.dashboard.activeIndexView = swiper.snapIndex;
              }
          });
      }
  });

  $scope.dashboard.slideTo = function (indexSlide) {
    $scope.swiper.slideTo(indexSlide);
  };
});

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
    var that = this;

    this.dashboard = {swiper: false, slider: false, activeIndexView: 0};
    $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
        if (!data || !data.slider) {
            return;
        }

        that.swiper = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        if (!data || !data.slider || !data.slider.snapIndex < 0) {
            return;
        }

        if(!$scope.$$phase) {
            $scope.$apply(function () {
                that.dashboard.activeIndexView = data.slider.snapIndex;
            });
        } else {
            that.dashboard.activeIndexView = data.slider.snapIndex;
        }
    });

    this.dashboard.slideTo = function (indexSlide) {
        that.swiper.slideTo(indexSlide);
    };
});

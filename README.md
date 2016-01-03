# slide-tabs-ionic (simple slide tabs for ionic)

[DEMO](https://cdn.rawgit.com/rodrigo-fonseca/slide-tabs-ionic/master/www/index.html#/dashboard)

I made this based on Ionic Starter App (ionic start myApp tabs) from here: http://ionicframework.com/getting-started/
 <br> All you have to do is get this example and change this files like below:
  - js/app.js
  - js/controllers.js
  - css/style.cs
 <br>
 
And add this:
  - templates/dashboard.html
 
<br>
- Insert slide for every section (templates/dashboard.html)

```html
<ion-view view-title="Dashboard">
  
  <!-- Here is where you put your tabs-->
  <div class="tabs tabs-icon-only">
      <a class="tab-item" 
         data-ng-class="{active: dashboard.activeIndexView === 0}" 
         data-ng-click="dashboard.slideTo(0)">
          <i class="icon ion-ios-pulse-strong" data-ng-show="dashboard.activeIndexView === 0"></i>
          <i class="icon ion-ios-pulse" data-ng-show="dashboard.activeIndexView !== 0"></i>
      </a>
      <a class="tab-item" 
         data-ng-class="{active: dashboard.activeIndexView === 1}"
         data-ng-click="dashboard.slideTo(1)">
          <i class="icon ion-ios-chatboxes" data-ng-show="dashboard.activeIndexView === 1"></i>
          <i class="icon ion-ios-chatboxes-outline" data-ng-show="dashboard.activeIndexView !== 1"></i>
      </a>
      <a class="tab-item" 
         data-ng-class="{active: dashboard.activeIndexView === 2}"
         data-ng-click="dashboard.slideTo(2)">
          <i class="icon ion-ios-gear" data-ng-show="dashboard.activeIndexView === 2"></i>
          <i class="icon ion-ios-gear-outline" data-ng-show="dashboard.activeIndexView !== 2"></i>
      </a>
  </div>  

  <ion-content class="padding">
    <ion-slides options="{keyboardControl: true, initialSlide: 0}" slider="dashboard.slider">
      
      <!-- status view -->
      <ion-slide-page>
        <div class="list card" data-ng-controller="DashCtrl">
          <div class="item item-divider">Recent Updates</div>
          <div class="item item-body">
            <div>
              There is a fire in <b>sector 3</b>
            </div>
          </div>
        </div>
        <div class="list card">
          <div class="item item-divider">Health</div>
          <div class="item item-body">
            <div>
              You ate an apple today!
            </div>
          </div>
        </div>
        <div class="list card">
          <div class="item item-divider">Upcoming</div>
          <div class="item item-body">
            <div>
              You have <b>29</b> meetings on your calendar tomorrow.
            </div>
          </div>
        </div>
      </ion-slide-page>

      <!-- chat view -->
      <ion-slide-page>
        <ion-list data-ng-controller="ChatsCtrl">
          <ion-item class="item-remove-animate item-avatar item-icon-right" ng-repeat="chat in chats" type="item-text-wrap" href="#/chats/{{chat.id}}">
            <img ng-src="{{chat.face}}">
            <h2>{{chat.name}}</h2>
            <p>{{chat.lastText}}</p>
            <i class="icon ion-chevron-right icon-accessory"></i>

            <ion-option-button class="button-assertive" ng-click="remove(chat)">
              Delete
            </ion-option-button>
          </ion-item>
        </ion-list>
      </ion-slide-page>

      <!-- account view -->
      <ion-slide-page>
        <ion-list data-ng-controller="AccountCtrl">
          <ion-toggle  ng-model="settings.enableFriends">
              Enable Friends
          </ion-toggle>
        </ion-list>
      </ion-slide-page>

    </ion-slides>
  </ion-content>
</ion-view>
```

- Controllers (js/controllers.js)
```javascript
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
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

.controller('DashboardController', function ($scope, $timeout) {                          
  $scope.dashboard = {swiper: false, slider: false, activeIndexView: 0};
  $scope.dashboard.slideTo = function (indexSlide) {
      $scope.slideTo(indexSlide);
  };

  $scope.slideTo = function (indexSlide) {
      $scope.swiper.slideTo(indexSlide);
  }
              
  $scope.$watch('dashboard.slider', function (swiper) {
      if (swiper) {
          $scope.swiper = swiper;
          
          swiper.on('onSlideChangeStart', function (swiper) {
              $scope.dashboard.activeIndexView = swiper.snapIndex;
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
});
```

- Modules (js/app.js)

```javascript
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // Each tab has its own nav history stack:
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'DashboardController'
  })
  .state('chat-detail', {
    url: '/chats/:chatId',
    templateUrl: 'templates/chat-detail.html',
    controller: 'ChatDetailCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dashboard');

});
```

- Stye (css/style.css)

```css
.scroll{
	height:100%;
}
.swiper-pagination {
	display: none;
}
.swiper-container {
	overflow-x:hidden;
	overflow-y:scroll;
}
.scroll-content {
	margin-bottom: 42px;
}
```

# slide-tabs-ionic (simple slide tabs for ionic)
Ionic version >= 1.2.0 (tested with ionic 1.3.2);

[DEMO](https://cdn.rawgit.com/rodrigo-fonseca/slide-tabs-ionic/master/www/index.html#/dashboard)

I made this using [Swiper API](http://www.idangero.us/swiper/#.Vomtkry0mOM) based on Ionic Starter App (ionic start myApp tabs) from here: http://ionicframework.com/getting-started/
 <br>
 All you have to do is get this example and change these files below:
  - js/app.js
  - js/controllers.js
  - css/style.cs
 <br>

And add this:
  - templates/dashboard.html

<br>
- Insert slide for every section (status, chat and account view) (templates/dashboard.html)

```html
<ion-view view-title="Dashboard">

  <!-- Here is where you put your tabs-->
  <div class="tabs tabs-icon-only">
      <a class="tab-item"
        ng-class="{active: vm.dashboard.activeIndexView === 0}"
        ng-click="vm.dashboard.slideTo(0)">
          <i class="icon ion-ios-pulse"></i>
      </a>
      <a class="tab-item"
         ng-class="{active: vm.dashboard.activeIndexView === 1}"
         ng-click="vm.dashboard.slideTo(1)">
          <i class="icon ion-ios-chatboxes-outline"></i>
      </a>
      <a class="tab-item"
         ng-class="{active: vm.dashboard.activeIndexView === 2}"
         ng-click="vm.dashboard.slideTo(2)">
          <i class="icon ion-ios-gear-outline"></i>
      </a>
  </div>

  <ion-content class="padding">
    <ion-slides options="{keyboardControl: true, initialSlide: 0}" slider="dashboard.slider">

      <!-- status view -->
      <ion-slide-page>
        <div class="list card" ng-controller="DashCtrl">
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
        <ion-list ng-controller="ChatsCtrl">
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
        <ion-list ng-controller="AccountCtrl">
          <ion-toggle  ng-model="settings.enableFriends">
              Enable Friends
          </ion-toggle>
        </ion-list>
      </ion-slide-page>

    </ion-slides>
  </ion-content>
</ion-view>
```

- Insert DashboardController (js/controllers.js)
```javascript
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
```

- Change your states like this below (js/app.js)

```javascript
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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
    controller: 'DashboardController as vm'
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

- And add this to your style (css/style.css)

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

.tab-item {
	opacity:0.5;
	-moz-opacity: 0.5;
	filter: alpha(opacity=0.5);
}
.tab-item.tab-item-active i, .tab-item.active i, .tab-item.activated i {
    color: #444444 !important;
}
```

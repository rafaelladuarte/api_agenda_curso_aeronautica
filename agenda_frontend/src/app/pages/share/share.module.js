(function () {
  'use strict';

  angular.module('BlurAdmin.pages.share', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('share', {
          url: '/share',
          templateUrl: 'app/pages/share/share.html',
          title: 'Login',
          
        });
  }

})();
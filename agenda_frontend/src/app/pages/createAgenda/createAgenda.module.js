(function () {
  'use strict';

  angular.module('BlurAdmin.pages.createAgenda', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('createAgenda', {
          url: '/createAgenda',
          templateUrl: 'app/pages/createAgenda/createAgenda.html',
          title: 'Login',
          
        });
  }

})();
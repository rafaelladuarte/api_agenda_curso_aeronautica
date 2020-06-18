(function () {
  'use strict';

  angular.module('BlurAdmin.pages.deleteAgenda', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('deleteAgenda', {
          url: '/deleteAgenda',
          templateUrl: 'app/pages/deleteAgenda/deleteAgenda.html',
          title: 'Login',
          
        });
  }

})();
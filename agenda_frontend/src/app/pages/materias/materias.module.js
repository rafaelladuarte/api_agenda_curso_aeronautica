(function () {
  'use strict';

  angular.module('BlurAdmin.pages.materias', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('materias', {
          url: '/materias',
          templateUrl: 'app/pages/materias/materias.html',
          title: 'Matérias Feitas',
          controller: 'materiasController',
          sidebarMeta: {
            icon: 'ion-android-checkbox-outline',
            order: 2,
          },
        });
  }

})();


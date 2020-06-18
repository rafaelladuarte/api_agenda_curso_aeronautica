(function () {
  'use strict';

  angular.module('BlurAdmin.pages.agenda', [])

 
  .config(routeConfig);
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('agenda', {
          url: '/agenda/:id',
          templateUrl: 'app/pages/agenda/agenda.html',
          controller: 'agendaController',
          title: 'agenda',
        //  data: {
    //          requireLogin: true // this property will apply to all children of 'app'
     //     },
         
          // data: {
          //   requireLogin: true // this property will apply to all children of 'app'
          // }
        });
  }




})();


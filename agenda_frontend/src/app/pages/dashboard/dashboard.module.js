/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [])

  .controller('dashController', ['$scope', 'agendasFactory', 'ngDialog','deleteAgendaFactory','$state','criarAgendaFactory', function ($scope,agendasFactory,ngDialog,deleteAgendaFactory, $state, criarAgendaFactory) {
  
    $scope.agendas = {};

    $scope.putaria = "putariaa"

    $scope.CreateAgenda = function () {
          ngDialog.open({ 
            template: 'app/pages/createAgenda/createAgenda.html', 
            scope: $scope, 
            className: 'ngdialog-theme-default', 
            controller:"dashController"
          });
      };

      $scope.DeleteAgenda = function (agenda) {
          
          $scope.nomeDaAgenda = agenda.nome;
           $scope.idDaAgenda = agenda._id;

          ngDialog.open({ 
            template: 'app/pages/deleteAgenda/deleteAgenda.html', 
            scope: $scope, 
            className: 'ngdialog-theme-default', 
            controller:"dashController"
          });


      };

      $scope.doDeleteAgenda = function(agendaid) {
          
          deleteAgendaFactory.delete({id: agendaid})
          .$promise.then(
             function (response) {
                 $state.go($state.current, {}, {reload: true});
               },
               function (response) {
  //                 $console.log("error");
               });
    
          ngDialog.close();

      };

       $scope.ShareAgenda = function (agenda) {
          ngDialog.open({ 
            template: 'app/pages/share/share.html', 
            scope: $scope, 
            className: 'ngdialog-theme-default', 
            controller:"dashController"
          });

          $scope.nomeDoShare = agenda.nome;

      };

      // $scope.DeleteAgenda = function (agendaid) {

      //       if (confirm("Tem certeza que quer deletar essa agenda?") == true) {
      //           deleteAgendaFactory.delete({id: agendaid})
      //           .$promise.then(
      //             function (response) {
      //                 $state.go($state.current, {}, {reload: true});
      //               },
      //               function (response) {
      //                   $sconsole.log("error");
      //               });

      //           console.log('Delete favorites', agendaid);
      //           console.log("deletado");

      //       } else {
      //           console.log("cancelado a delecao");
      //       }
     
         
      //  };

    agendasFactory.query(
        function (response) {
             $scope.agendas = response;
 //            console.log(response)
 //            console.log(response.length)
             $scope.numeroAgendas = response.length;
            
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
   
      $scope.novaAgenda;
  
       $scope.doCreateAgenda = function() {
//          console.log('Doing registration', $scope.novaAgenda);

          criarAgendaFactory.criar($scope.novaAgenda);
          
          ngDialog.close();

      };

      $scope.checkNumber = function(){
        if($scope.numeroAgendas < 7){
          $scope.podeCriar= true;
        }else{
          $scope.podeCriar = false;
        }
      }

  }])

  .controller('deleteAgendaController', ['$scope', 'ngDialog', 'agendasFactory', 'deleteAgendaFactory', function ($scope, ngDialog, agendasFactory, deleteAgendaFactory) {


       
  }])

 
  .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          title: 'Início',
          controller: 'dashController',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();

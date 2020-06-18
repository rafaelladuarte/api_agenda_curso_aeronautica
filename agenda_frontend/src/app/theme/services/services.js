(function () {
  'use strict';

angular.module('BlurAdmin.theme')

  .constant("baseURL", "")

  .factory('aulasFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

          return $resource(baseURL + "classes", null, {
            'query':  {method:'GET', isArray: true}
          });

  }])

  .factory('agendasFactory', ['$resource', 'baseURL','$http','$localStorage', function ($resource, baseURL,$http,$localStorage) {
         
         var credentials = $localStorage.getObject('Token','{}');
          $http.defaults.headers.common['x-access-token'] = credentials.token;
            return $resource(baseURL + "agendas/:id", null, {
              'query':  {method:'GET', isArray: true}
            });

 }])

.factory('criarAgendaFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog','$state', function( $resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog,$state) {

    var criarAgenda = {}

    criarAgenda.criar = function (dado) {
             $resource(baseURL + "agendas")
              .save(dado,
                  function(response) {
                    $rootScope.$broadcast('registration:Successful');
                    $state.go($state.current, {}, {reload: true});
                  },
                  function(response) {
                    var message = '\
                        <div class="ngdialog-message">\
                        <div><h3>Registration Unsuccessful</h3></div>';
                    ngDialog.openConfirm({ template: message, plain: 'true'});

                  }
              )
          }

    return criarAgenda;

}])

 .factory('deleteAgendaFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog','$state', function( $resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog,$state) {


   return $resource(baseURL + "agendas/:id/remove" , null, {
              'query':  {
                method:'GET', isArray: true
              },

              
            });

}])

  .factory('editNomeAgendaFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog','$state', function( $resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog,$state) {

      var editNome = {}

      editNome.mudar = function (dado, idd) {
               $resource(baseURL + "agendas/:id/editNome", { id: idd })
                .save(dado,
                    function(response) {
                      $state.go($state.current, {}, {reload: true});
                    },
                    function(response) {
                      var message = '\
                          <div class="ngdialog-message">\
                          <div><h3>Registration Unsuccessful</h3></div>';
                      ngDialog.openConfirm({ template: message, plain: 'true'});

                    }
                )
            }

      return editNome;

}])

 .factory('saveClassFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog','$state', function( $resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog,$state) {

  // return $resource(baseURL + "agendas/:id", {id:"@Id"}, {
  //           'update': {
  //               method: 'PUT'
  //           }
  //       });
  

      var saveClass = {};

      saveClass.salvar = function(dado, idd){
        // console.log("dado eh");
        // console.log(dado);


        $resource(baseURL + "agendas/" + idd)
          .save(dado,
            function(response) {
  //            console.log("salvo");
//              console.log(response);
              },
              function(response){
  //              console.log("erro");
   //             console.log(response)
              }
            )
        }
      

      return saveClass;

}])

  .factory('deleteClassFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog','$state', function( $resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog,$state) {

  return $resource(baseURL + "agendas/:id/:aulaId", {id:"@Id", aulaId:"@aulaid"}, {
            'update': {
                method: 'PUT'
            }
        });
  

}])


.factory('selecionadasFactory', ['$resource', 'baseURL','$http','$localStorage', function ($resource, baseURL,$http,$localStorage) {

    var credentials = $localStorage.getObject('Token','{}');
    $http.defaults.headers.common['x-access-token'] = credentials.token;
    return $resource(baseURL + "selecionadas/:id", null, {
            'update': {
                method: 'PUT'
            },
            'query':  {method:'GET', isArray:true}
        });

}])

})();
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.materias')

  .controller('materiasController', ['$scope','aulasFactory','selecionadasFactory', '$state', '$stateParams','ngDialog','saveClassFactory','deleteClassFactory', function ($scope, aulasFactory,selecionadasFactory,$state,$stateParams,ngDialog,saveClassFactory,deleteClassFactory) {

           $scope.dynamicPopover = {
            content: '',
            templateUrl: 'myPopoverTemplate.html',
            title: 'fds'
          };

        //dropdown

        $scope.nomeDoCurso= "escolha um curso";

        $scope.mudaCurso = function(e){
            $scope.nomeDoCurso = e;
            $scope.chamarMaterias(e);
             $scope.mudaView();
        }

        $scope.mudaView = function(){
          if( $scope.nomeDoCurso == "escolha um curso"){
            $scope.mostraPagina = false;
          }else{
            $scope.mostraPagina = true;
          }
        }
        $scope.status = {
          isopen: false
        };

        $scope.toggled = function(open) {
          $log.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));


        $scope.items = [

          { curso:"Engenharia Aeronáutica",   logo:"assets/img/icones-curso/aeronautica.png"},
          // { curso:'Engenharia Ambiental',     logo:'assets/img/icones-curso/ambiental.png'}, 
          { curso:'Engenharia de Controle e Automação',  logo:'assets/img/icones-curso/automacao.png'},
          { curso:'Engenharia Biomédica',     logo:'assets/img/icones-curso/biomedica.png'},  
          // { curso:'Engenharia Civíl',         logo:'assets/img/icones-curso/civil.png'}, 
          { curso:'Engenharia de Computação', logo:'assets/img/icones-curso/computacao.png'}, 
          { curso:'Engenharia Elétrica',      logo:'assets/img/icones-curso/eletrica.png'}, 
          { curso:'Engenharia Mecânica',      logo:'assets/img/icones-curso/mecanica.png'}, 
          { curso:'Engenharia Mecatrônica',   logo:'assets/img/icones-curso/mecatronica.png'}, 
          { curso:'Engenharia Química',       logo:'assets/img/icones-curso/quimica.png'} 

        ];

        $scope.itemPaths = [
          
        ];

        //fim dropdown          



        $scope.aulas= {};
        $scope.selecionadas = [];
        $scope.periodoOptSeleciondads = [];
  
        $scope.agenda = selecionadasFactory.query({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                
          //    console.log(response)
              if (response.length > 0){
                for(var i=0; i<response[0].aulas.length; i++ ){
                    $scope.selecionadas.push(response[0].aulas[i]) 
                }
                
             //   console.log($scope.selecionadas);
             }
                  
                
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        $scope.chamarMaterias = function(e){
          aulasFactory.query(
            function (response) {

            $scope.aulas = response;

            $scope.cursoSelecionado = [];

     //       console.log("aulas ofertadas");
       //     console.log($scope.aulas);
            
             for(var i=0; i<$scope.aulas.length; i++){

              if($scope.aulas[i].curso == e){
               $scope.cursoSelecionado.push($scope.aulas[i]);
              }

            }

            $scope.nomes1 = [];
            $scope.periodo1 = [];
            $scope.periodo2 = [];
            $scope.periodo3 = [];
            $scope.periodo4 = [];
            $scope.periodo5 = [];
            $scope.periodo6 = [];
            $scope.periodo7 = [];
            $scope.periodo8 = [];
            $scope.periodo9 = [];
            $scope.periodo10 = [];
            $scope.periodoOpt = [];


             for(var i=0; i<$scope.cursoSelecionado.length; i++){
                 
                if($scope.cursoSelecionado[i].periodo == "1"){
                   $scope.periodo1.push($scope.cursoSelecionado[i]);
            
                }
                else if($scope.cursoSelecionado[i].periodo == "2"){
                   $scope.periodo2.push($scope.cursoSelecionado[i]);

                }
                else if($scope.cursoSelecionado[i].periodo == "3"){
                   $scope.periodo3.push($scope.cursoSelecionado[i]);

                }
                else if($scope.cursoSelecionado[i].periodo == "4"){
                   $scope.periodo4.push($scope.cursoSelecionado[i]);

                }
                else if($scope.cursoSelecionado[i].periodo == "5"){
                   $scope.periodo5.push($scope.cursoSelecionado[i]);

                }
                else if($scope.cursoSelecionado[i].periodo == "6"){
                   $scope.periodo6.push($scope.cursoSelecionado[i]);

                }
                else if($scope.cursoSelecionado[i].periodo == "7"){
                   $scope.periodo7.push($scope.cursoSelecionado[i]);

                }
                else if($scope.cursoSelecionado[i].periodo == "8"){
                   $scope.periodo8.push($scope.cursoSelecionado[i]);

                }
                else if($scope.cursoSelecionado[i].periodo == "9"){
                   $scope.periodo9.push($scope.cursoSelecionado[i]);

                }
                else if($scope.cursoSelecionado[i].periodo == "10"){
                   $scope.periodo10.push($scope.cursoSelecionado[i]);

                }
                else if($scope.cursoSelecionado[i].periodo == "Opt"){
                   $scope.periodoOpt.push($scope.cursoSelecionado[i]);

                }
              }

        $scope.vazio;

        $scope.tabs = [
          { title:'1° Semestre',  content: $scope.periodo1},
          { title:'2° Semestre',  content: $scope.periodo2},
          { title:'3° Semestre',  content: $scope.periodo3},
          { title:'4° Semestre',  content: $scope.periodo4},
          { title:'5° Semestre',  content: $scope.periodo5},
          { title:'6° Semestre',  content: $scope.periodo6},
          { title:'7° Semestre',  content: $scope.periodo7},
          { title:'8° Semestre',  content: $scope.periodo8},
          { title:'9° Semestre',  content: $scope.periodo9},
          { title:'10° Semestre', content: $scope.periodo10},
          { title:'Optativas',    content: $scope.periodoOpt}


        ];

       $scope.preparaEstatistica(e);


       

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
        }


        $scope.preparaEstatistica = function(cursoAtual){

         $scope.selecionadasDoCurso = []; //quais materias de um certo curso foram selecionadas
         $scope.periodoOptSeleciondads = []; //quais materias de um certo curso foram selecionadas e sao Optativas
        
        if ($scope.selecionadas !== null){ 
          
          for(var i=0; i<$scope.selecionadas.length; i++ ){ // todas as materias que foram selecionadas pelo user
            if($scope.selecionadas[i].curso == cursoAtual){
              $scope.selecionadasDoCurso.push($scope.selecionadas[i]); //quais materias de um certo curso foram selecionadas
            }                  
          }        

          for(var i=0; i<$scope.selecionadasDoCurso.length; i++ ){
            if($scope.selecionadasDoCurso[i].periodo == "Opt"){
              $scope.periodoOptSeleciondads.push($scope.selecionadasDoCurso[i]); //materias do curso que selecionadas e sao optativas
            }
          }
          
        }

        //estatistica
        $scope.calcula();

        }

                 
      $scope.calcula = function(){
        $scope.feitas = 0;

        $scope.total = $scope.cursoSelecionado.length - $scope.periodoOpt.length;  // total de materias obrigatorios
        $scope.feitas = $scope.selecionadasDoCurso.length - $scope.periodoOptSeleciondads.length; //total de materias obrigatorias feitas

        //horas totais

         $scope.horastotais = 0
         $scope.horasselecionadas = 0;
         $scope.horastotaisOpt = 0;

        for(var i=0; i<$scope.cursoSelecionado.length; i++){
            $scope.horastotais =   $scope.horastotais + $scope.cursoSelecionado[i].cargaHorariaTeorica + $scope.cursoSelecionado[i].cargaHorariaPratica 
        }

        for(var i=0; i<$scope.selecionadasDoCurso.length; i++){
            $scope.horasselecionadas =   $scope.horasselecionadas + $scope.selecionadasDoCurso[i].cargaHorariaTeorica + $scope.selecionadasDoCurso[i].cargaHorariaPratica 
        }

        for(var i=0; i<$scope.periodoOptSeleciondads.length; i++){
            $scope.horastotaisOpt =   $scope.horastotaisOpt + $scope.periodoOptSeleciondads[i].cargaHorariaTeorica + $scope.periodoOptSeleciondads[i].cargaHorariaPratica 
        }


        $scope.percentualMateriasFeitas = $scope.feitas/$scope.total * 100;
        $scope.percentualHorasFeitas = $scope.horasselecionadas/$scope.horastotais * 100;
        $scope.percentualHorasOptativasFeitas = $scope.horastotaisOpt/180 * 100;

 //       console.log("percentualMateriasFeitas " + $scope.percentualMateriasFeitas);
 //       console.log("percentualHorasFeitas " + $scope.percentualHorasFeitas);
 //       console.log("percentualHorasOptativasFeitas " + $scope.percentualHorasOptativasFeitas);
      }


      
      $scope.adiciona = function(e){

      var flag = false;
      $scope.itera = -1;

      for($scope.itera=0; $scope.itera< $scope.selecionadas.length; $scope.itera++ ){
        if ($scope.selecionadas[$scope.itera]._id === e._id){
          flag = true;
          break;
        }
      }

      if (!flag){
        $scope.selecionadas.push(e);
   //     console.log("adicionando");
        selecionadasFactory.save({aula: e._id});
        $scope.preparaEstatistica($scope.nomeDoCurso);

      }
      else{
        $scope.deleta(e)

  
      }

 //     console.log($scope.selecionadas);
    };


    $scope.deleta = function(materia){

//      console.log("materia deleta")
//      console.log(materia._id);

      // if(materia.periodo == "Opt"){
      //   for(var i=0; i< $scope.periodoOptSeleciondads.length; i++){
      //     console.log("entrei");
      //     if(materia._id ===  $scope.periodoOptSeleciondads[i]._id){

      //       $scope.periodoOptSeleciondads.splice(i,1);
      //       break;
      //       console.log('on delete periodo opt selecionadas');
      //       console.log($scope.periodoOptSeleciondads);
      //     }

      //   }
           
       
      //  }

      for(var i=0; i< $scope.selecionadas.length; i++ ){
        if ($scope.selecionadas[i]._id === materia._id){
  //        console.log("vou deletar " + materia.nome)
          $scope.selecionadas.splice(i, 1);
          selecionadasFactory.delete({id: materia._id});
          break;
        }
      }

    

//      console.log("deletando");
      
      $scope.preparaEstatistica($scope.nomeDoCurso)

      
      };

    $scope.functionThatReturnsStyle = function(e) {
      var style1 = {'background-color':'#64ff53'}
      var style2 = {'background-color':'white'}
      
      var flag = false;
      
      for(var i=0; i< $scope.selecionadas.length; i++ ){
        if ($scope.selecionadas[i]._id === e._id){
          flag = true;
          break;
        }
      }

      if(flag){
    
        return style1;
      }else{

        return style2;
      }


    }



 }])

})();

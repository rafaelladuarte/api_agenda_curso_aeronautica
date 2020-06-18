/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.agenda')

      .controller('editNameController', ['$scope','agendasFactory', '$state', '$stateParams','editNomeAgendaFactory','ngDialog', function ($scope,agendasFactory,$state,$stateParams,editNomeAgendaFactory,ngDialog){


          $scope.agenda = {};

          $scope.agenda = agendasFactory.query({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
 //             console.log("entrei1");
 //              console.log(response);
               $scope.agenda = response[0];
                
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );


        $scope.doEditName = function() {
          
//            console.log($scope.novaAgenda.novoNome);
//            console.log($scope.agenda._id);

            editNomeAgendaFactory.mudar($scope.novaAgenda.novoNome, $scope.agenda._id);
            
            ngDialog.close();

      };


      }])






      .controller('agendaController', ['$scope','aulasFactory','agendasFactory', '$state', '$stateParams','ngDialog','saveClassFactory','deleteClassFactory', function ($scope, aulasFactory,agendasFactory,$state,$stateParams,ngDialog,saveClassFactory,deleteClassFactory) {

          $scope.dynamicPopover = {
            content: '',
            templateUrl: 'myPopoverTemplate.html',
            title: 'fds'
          };


        //dropdown

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
         $scope.agenda = {};
         $scope.message = "Loading ...";

        $scope.materiasEscolhidas = [];
        $scope.tgPreenchidoNome = [];
        $scope.tgPreenchidoNumero = [];
        $scope.tgComErro = []
        $scope.voltarACor = []


        $scope.agenda = agendasFactory.query({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
 //              console.log(response);

                $scope.nomeDaAgenda = response[0].nome;

                if (response.length > 0){

                  for(var i=0; i<response[0].aulas.length; i++ ){
                      $scope.materiasEscolhidas.push(response[0].aulas[i])
                  }

                  $scope.mostrach();
                  $scope.printa();

//                  console.log('primeira materias');
 //                 console.log($scope.materiasEscolhidas) ;

                  for(var i=0; i< $scope.materiasEscolhidas.length; i++ ){
                     for(var j=0; j<$scope.materiasEscolhidas[i].labs.length; j++) {
                        if($scope.materiasEscolhidas[i].labs[j].selected === true){

                          $scope.materiasEscolhidas[i].labs[j].selectedId = $scope.materiasEscolhidas[i].labs[j]._id; 

                        }else{
                          $scope.materiasEscolhidas[i].labs[j].selectedId = "";
                        }
                     }
                  }
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

//                console.log("todas as aulas");
//                console.log($scope.aulas);

                $scope.cursoSelecionado = [];

                for(var i=0; i<$scope.aulas.length; i++){

                  if($scope.aulas[i].curso == e){
                   $scope.cursoSelecionado.push($scope.aulas[i]);
                  }

                }
                
 //               console.log("aulas do curso selecionado");
 //               console.log($scope.cursoSelecionado);

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


                  
                     for(var j=0; j<$scope.cursoSelecionado[i].labs.length; j++) {
                          $scope.cursoSelecionado[i].labs[j].selectedId = "";
                        
                     }
                  

                   for(var k=0; k< $scope.materiasEscolhidas.length; k++ ){
                     for(var l=0; l<$scope.materiasEscolhidas[k].labs.length; l++) {
                        if($scope.materiasEscolhidas[k].labs[l].selected === true){

                          $scope.materiasEscolhidas[k].labs[l].selectedId = $scope.materiasEscolhidas[k].labs[l]._id; 

                        }else{
                          $scope.materiasEscolhidas[k].labs[l].selectedId = "";
                        }
                     }
                  }
                 
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
              { title:'1', content: $scope.periodo1},
              { title:'2', content: $scope.periodo2},
              { title:'3', content: $scope.periodo3},
              { title:'4', content: $scope.periodo4},
              { title:'5', content: $scope.periodo5},
              { title:'6', content: $scope.periodo6},
              { title:'7', content: $scope.periodo7},
              { title:'8', content: $scope.periodo8},
              { title:'9', content: $scope.periodo9},
              { title:'10', content: $scope.periodo10},
              { title:'Opt', content: $scope.periodoOpt},
              { title:'X', content: $scope.vazio}

            ];


            // for(i=0; i<$scope.agenda.aulas.length; i++){
            //   $scope.materiasEscolhidas.push($scope.agenda.aulas[i])
            // }



            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });
            }
   

    $scope.colorirMateriaSelecionada = function(e) {
      var style1 = {'background-color':'#DDDDDD'}
      var style2 = {'background-color':'white'}
      
      var flag = false;
      
      for(var i=0; i< $scope.materiasEscolhidas.length; i++ ){
        if ($scope.materiasEscolhidas[i]._id === e._id){
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




        $scope.editName = function(){
          ngDialog.open({ 
            template: './editName.html', 
            scope: $scope, 
            className: 'ngdialog-theme-default', 
            controller:"editNameController"
          });
        }

        $scope.nomeDoCurso= "Escolha um Curso.";

        $scope.mudaCurso = function(e){
            $scope.nomeDoCurso = e;
            $scope.chamarMaterias(e);
        }


        $scope.save = function(e){
            var aula = e;
           // saveClassFactory.save({id: $stateParams.id}, aula);
             saveClassFactory.salvar(aula, $stateParams.id);
        }
    
      

        $scope.deletar = function(e){
            var aula = e._id;
            deleteClassFactory.delete({id: $stateParams.id}, {aulaid: aula})
          //  console.log(aula);

        }
 


$scope.adiciona = function(e){

  var flag = false;
  $scope.itera = -1;


  for($scope.itera=0; $scope.itera< $scope.materiasEscolhidas.length; $scope.itera++ ){
    if ($scope.materiasEscolhidas[$scope.itera]._id === e._id){
      flag = true;
      $scope.deleta(e);
      break;
    }
  }

  if (!flag){
 //   console.log("entrei pra add");
    $scope.materiasEscolhidas.push(e);
    $scope.materiasEscolhidas[$scope.materiasEscolhidas.length-1].selected = true;
 //   console.log($scope.materiasEscolhidas);

    $scope.mostrach();
    $scope.printa();

    $scope.save($scope.materiasEscolhidas[$scope.materiasEscolhidas.length-1]);
  }  
};

$scope.deleta = function(materia){


  // materia.selected = false;
  // for(var i=0;i<materia.labs.length;i++){
  //   e.labs[i].selected = false
  // }
  
  for(var posicao=0; posicao< $scope.materiasEscolhidas.length; posicao++ ){
    if ($scope.materiasEscolhidas[posicao]._id === materia._id){

      $scope.materiasEscolhidas.splice(posicao, 1);
      break;
    }
  }

  $scope.mostrach();
  $scope.printa();

  $scope.deletar(materia)

};



$scope.atribuiCor = function(materia,e){
  

   for(var posicao=0; posicao< $scope.materiasEscolhidas.length; posicao++ ){
    if ($scope.materiasEscolhidas[posicao]._id === materia._id){

      $scope.materiasEscolhidas[posicao].color = e;
           
      break;
    }
  }
    
  

 // console.log("materias escolhidas");
//  console.log($scope.materiasEscolhidas);
  $scope.printa();
  
}






$scope.printa = function(){
  for(var i=1;i<=102;i++){
    if (i != 37 && i!= 38 && i != 39 && i!= 40 && i != 41 && i!= 42 );
      document.getElementById('td' + i).innerHTML =  " ";
  
  }
  for(var i=1;i<=102;i++){
    if (i != 37 && i!= 38 && i != 39 && i!= 40 && i != 41 && i!= 42)
    document.getElementById('td' + i).style.backgroundColor = "#fff";
  
  }

  for(var j=0;j<$scope.materiasEscolhidas.length;j++){
  
    for(i=0;i<$scope.materiasEscolhidas[j].horarios.length;i++){
      
      document.getElementById('td' + $scope.materiasEscolhidas[j].horarios[i]).innerHTML +=  $scope.materiasEscolhidas[j].nome + ".  ";
      document.getElementById('td' + $scope.materiasEscolhidas[j].horarios[i]).style.backgroundColor = $scope.materiasEscolhidas[j].color;
    } 
      
    
    for(var k=0; k< $scope.materiasEscolhidas[j].labs.length; k++){

      if ($scope.materiasEscolhidas[j].labs[k].selected === true ){

        for(var l=0;l<$scope.materiasEscolhidas[j].labs[k].horarios.length;l++){
          var naoPrinteiPratica = false;  
          //console.log($scope.materiasEscolhidas[j].labs[k].horarios[l])
          document.getElementById('td' + $scope.materiasEscolhidas[j].labs[k].horarios[l]).innerHTML +=  $scope.materiasEscolhidas[j].nome +" " + $scope.materiasEscolhidas[j].labs[k].nome + ".  ";
          document.getElementById('td' + $scope.materiasEscolhidas[j].labs[k].horarios[l]).style.backgroundColor = $scope.materiasEscolhidas[j].color;
          
        }
      }
    }
      
  }
  
  $scope.batehorario();
  $scope.erros();
  $scope.erros_pratica();
};


$scope.mostrach = function(){

  $scope.chTeoricaFinal = 0;
  for (var i=0;i<$scope.materiasEscolhidas.length;i++){
    $scope.chTeoricaFinal += $scope.materiasEscolhidas[i].cargaHorariaTeorica;
  }

  $scope.chPraticaFinal = 0;
  for (var i=0;i<$scope.materiasEscolhidas.length;i++){
    $scope.chPraticaFinal += $scope.materiasEscolhidas[i].cargaHorariaPratica;
  }

  document.getElementById("printaChTeorica").innerHTML = $scope.chTeoricaFinal;
  document.getElementById("printaChPratica").innerHTML = $scope.chPraticaFinal;
};


$scope.batehorario = function(){

//  for (var i = 0; i < 98; i++) $scope.tgPreenchidoNome[i] = "";
  for (var i = 0; i < 98; i++) $scope.tgPreenchidoNumero[i] = 0;

  for(var j=0;j<$scope.materiasEscolhidas.length;j++){
  
    for (var i=0; i< $scope.materiasEscolhidas[j].horarios.length;i++){
      
//      $scope.tgPreenchidoNome[$scope.materiasEscolhidas[j].horarios[i]] += $scope.materiasEscolhidas[j].nome + " " ;
      $scope.tgPreenchidoNumero[$scope.materiasEscolhidas[j].horarios[i]] += 1;
    } 

      
    for(var k=0; k< $scope.materiasEscolhidas[j].labs.length; k++){

      if ($scope.materiasEscolhidas[j].labs[k].selected === true ){

        for(var l=0;l<$scope.materiasEscolhidas[j].labs[k].horarios.length;l++){
          var naoPrinteiPratica = false;  
          $scope.tgPreenchidoNumero[$scope.materiasEscolhidas[j].labs[k].horarios[l]] += 1;
        }
      }
    }
      

    


  }   

//  console.log($scope.tgPreenchidoNome);
//  console.log($scope.tgPreenchidoNumero);

  
}


$scope.erros = function(){
  
 $scope.flag = false;
  for(var i=1; i<$scope.tgPreenchidoNumero.length;i++){
    if($scope.tgPreenchidoNumero[i] > 1){
      document.getElementById('td' + i ).style.color="red"
      $scope.flag = true;
    } 
    else if($scope.tgPreenchidoNumero[i] == 1)
      document.getElementById('td' + i ).style.color="#66667D"
  }
  return $scope.flag;

}

$scope.erros_pratica = function(){
  $scope.flagDeErro = false
  if ($scope.materiasEscolhidas.length == 0) { return false};

  for(var j=0;j<$scope.materiasEscolhidas.length;j++){
    $scope.flagDeErro = true
    if  ($scope.materiasEscolhidas[j].labs.length == 0)
      $scope.flagDeErro = false
    else{ 
      for(var k=0; k< $scope.materiasEscolhidas[j].labs.length; k++){
        

        if ($scope.materiasEscolhidas[j].labs[k].selected === true ){
            $scope.flagDeErro = false
                    
        }
      }
    }
    if($scope.flagDeErro)
      return true
  }
  return false
}

$scope.$on('colorpicker-closed', function(event, colorObject){
//     console.log(colorObject);
//     console.log("malandramente");
     var corAComparar = colorObject.value;
//     console.log(corAComparar);

    for(var posicao=0; posicao< $scope.materiasEscolhidas.length; posicao++ ){
      if ($scope.materiasEscolhidas[posicao].color === corAComparar){
      $scope.deletar($scope.materiasEscolhidas[posicao]);
      $scope.save($scope.materiasEscolhidas[posicao]);     
      break; 
    }
  }


});


$scope.printapratica = function(valor,pai){

  $scope.deletar(pai);
  // coloca todas as praticas como falsa
  for(var posicao=0; posicao< $scope.materiasEscolhidas.length; posicao++ ){

    if ($scope.materiasEscolhidas[posicao]._id === pai._id){
     for(var j=0; j<$scope.materiasEscolhidas[posicao].labs.length; j++){

         $scope.materiasEscolhidas[posicao].labs[j].selected = false;
         $scope.materiasEscolhidas[posicao].labs[j].selectedId = "";
     }
      
     break; 
    }
  }

  //coloca uma unica pratica como verdadeira
  for(var posicao=0; posicao< $scope.materiasEscolhidas.length; posicao++ ){

    if ($scope.materiasEscolhidas[posicao]._id === pai._id){

     for(var j=0; j<$scope.materiasEscolhidas[posicao].labs.length; j++){

        if($scope.materiasEscolhidas[posicao].labs[j].nome === valor.nome){
            $scope.materiasEscolhidas[posicao].labs[j].selected = true;
            $scope.materiasEscolhidas[posicao].labs[j].selectedId = valor._id;
            $scope.save($scope.materiasEscolhidas[posicao]);
            break;
        }
     }
           
     break; 
    }
  }

//  console.log("apos pratica");
//  console.log($scope.materiasEscolhidas);

  $scope.printa();
  $scope.erros_pratica();

}
 
function printData()
{
   var divToPrint=document.getElementById("printTable");
   newWin= window.open("");
   newWin.document.write(divToPrint.outerHTML);
   newWin.print();
   newWin.close();
}

$('button').on('click',function(){
printData();
})


$scope.materias1 = [
  
  {
    nome: "Introdução a Eng. Aeronáutica",
    codigo: 'FEMEC43011',
    periodo: "1",
    obrigatoria: true,
    horarios: [16,22,28],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false,
    color: []
  },

   {
    nome: "Desenho Técnico",
    codigo: 'FEMEC41011',
    periodo: "1",
    obrigatoria: true,
    horarios: [13,19,25],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false,
    color: []
  },  

  {
    nome: "Algorítmos e Prog. de Computadores",
    codigo: 'FACOM49010',
    periodo: "1",
    obrigatoria: true,
    horarios: [45,51,57],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA",
      horarios: [52,58],
      selected : false
    }],
    preRequisitos: [],
    coRequisitos: [],
    selected: false,
    color: []
  },

  {
    nome: "Cálculo Diferencial e Integral 1",
    codigo: 'FAMAT49010',
    periodo: "1",
    obrigatoria: true,
    horarios: [1,2,3,7,8,9],
    cargaHorariaTeorica: 90,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false,
    color: []
  },

   {
    nome: "Química Básica",
    codigo: 'IQUFU49011',
    periodo: "1",
    obrigatoria: true,
    horarios: [15,21,27],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "VA/VB",
      horarios: [44,50],
      selected: false
    },
    {
      nome: "VC/VD",
      horarios: [56,62],
      selected: false
    },
    {
      nome: "VE",
      horarios: [68,74],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false,
    color: []
  },

  
  {
    nome: "Geometria Analítica",
    codigo: 'FAMAT49011',
    periodo: "1",
    obrigatoria: true,
    horarios: [4,5,10,11,17],
    cargaHorariaTeorica: 75,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false,
    color: []
  },

  {
    nome: "Fundamentos de Aeronáutica 1",
    codigo: 'FEMEC43012',
    periodo: "1",
    obrigatoria: true,
    horarios: [14,20],
    cargaHorariaTeorica: 75,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false,
    color: []
  }
];


$scope.materias2 = [

  {
    nome: "Estatística",
    codigo: 'FAMAT49021',
    periodo: "2",
    obrigatoria: true,
    horarios: [58, 64, 47, 53],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false,
    color: []
  },  
  {
    nome: "Programação Aplicada a Eng.",
    codigo: 'FEMEC41020',
    periodo: "2",
    obrigatoria: true,
    horarios: [],
    cargaHorariaTeorica: 0,
    cargaHorariaPratica: 30,
    labs: [{
      nome: "WA",
      horarios: [15,21],
      selected: false
    },
    {
      nome: "VA",
      horarios: [17, 23],
      selected: false
    },
    {
      nome: "UA",
      horarios: [4, 10],
      selected: false
    },
    {
      nome: "UB",
      horarios: [16, 22],
      selected: false
    }
    ],

    preRequisitos: "Algoritmos e Prog. de Computadores",
    coRequisitos: [],
    selected: false,
    color: []
  },
  {
    nome: "Cálculo Diferencial e Integral 2",
    codigo: 'FAMAT49020',
    periodo: "2",
    obrigatoria: true,
    horarios: [55, 61, 44, 50, 45, 51],
    cargaHorariaTeorica: 90,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: "Cálculo Diferencial e Integral 1",
    coRequisitos: [],
    selected: false,
    color: []
  },  
  {
    nome: "Álgebra Linear",
    codigo: 'FAMAT49022',
    periodo: "2",
    obrigatoria: true,
    horarios: [56, 62, 68],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: "Cálculo Diferencial e Integral 1",
    coRequisitos: [],
    selected: false,
    color: []
  },
  {
    nome: "Física Geral 1",
    codigo: 'INFIS49020',
    periodo: "2",
    obrigatoria: true,
    horarios: [43, 49, 46, 52],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: ["Física Experimental 1"],
    selected: false,
    color: []
  },    
    {
    nome: "Física Experimental 1",
    codigo: 'INFIS49021',
    periodo: "2",
    obrigatoria: true,
    horarios: [],
    cargaHorariaTeorica: 0,
    cargaHorariaPratica: 30,
    labs: [{
      nome: "VA",
      horarios: [16, 22]
    },
    {
      nome: "VB",
      horarios: [28, 34]
    } 
    ],

    preRequisitos: [],
    coRequisitos: ["Física Geral 1"],
    selected: false,
    color: []
  },
  {
    nome: "Desenho de Máquinas",
    codigo: 'FEMEC41021',
    periodo: "2",
    obrigatoria: true,
    horarios: [57, 63],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 30,
    labs: [{
      nome: "VA",
      horarios: [26, 32]
    },
    {
      nome: "VB",
      horarios: [27, 33]
    } 
    ],
    preRequisitos: ["Desenho Técnico"],
    coRequisitos: [],
    selected: false,
    color: []
  },
  {
    nome: "Fundamentos de Aeronáutica 2",
    codigo: 'FEMEC43021',
    periodo: "2",
    obrigatoria: true,
    horarios: [59, 65],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["Fundamentos de Aeronáutica 1"],
    coRequisitos: [],
    selected: false,
    color: []
  } 


];

$scope.materias3 = [
  {
    nome: "Cálculo Diferencial e Integral 3",
    codigo: 'FAMAT49030',
    periodo: "3",
    obrigatoria: true,
    horarios: [1, 7, 14, 20, 3, 9],
    cargaHorariaTeorica: 90,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: "Cálculo Diferencial e Integral 2",
    coRequisitos: [],
    selected: false
  },
  {
    nome: "Cinemática",
    codigo: 'FEMEC41030',
    periodo: "3",
    obrigatoria: true,
    horarios: [44, 50, 56],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
  },
  {
    nome: "Física Geral 2",
    codigo: 'INFIS49030',
    periodo: "3",
    obrigatoria: true,
    horarios: [25, 31, 2, 8, 15, 21],
    cargaHorariaTeorica: 90,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["Cálculo Diferencial e Integral 2"],
    coRequisitos: ["Física Experimental 2"],
    selected: false
     },   
   {
    nome: "Física Experimental 2",
    codigo: 'INFIS49031',
    periodo: "3",
    obrigatoria: true,
    horarios: [],
    cargaHorariaTeorica: 0,
    cargaHorariaPratica: 30,
    labs: [{
      nome: "UA",
      horarios: [70, 76],
      selected: false
    },
    {
      nome: "UB",
      horarios: [45, 51],
      selected: false
    },
    {
      nome: "UC",
      horarios: [46, 52],
      selected: false
    },
    {
      nome: "UD",
      horarios: [58, 64],
      selected: false
    },
    {
      nome: "UE",
      horarios: [59, 65],
      selected: false
    } 
    ],  
    preRequisitos: ["Cálculo Diferencial e Integral 2"],
    coRequisitos: ["Física Geral 1"],
    selected: false
    },    
    {
      nome: "Estática",
    codigo: 'INFIS49032',
    periodo: "3",
    obrigatoria: true,
    horarios: [13, 19, 16, 22],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["Física Geral 1"],
    coRequisitos: [],
    selected: false

      },    
    {
      nome: "Introdução à Ciência dos Materiais",
    codigo: 'FEMEC42031',
    periodo: "3",
    obrigatoria: true,
    horarios: [11, 17, 23],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "VA",
      horarios: [46, 52],
      selected: false
    },
    {
      nome: "VB",
      horarios: [58, 64],
      selected: false
    },
    {
      nome: "VC",
      horarios: [70, 76],
      selected: false
    },
    {
      nome: "VD",
      horarios: [71, 77],
      selected: false
    },
    {
      nome: "VE",
      horarios: [47, 53],
      selected: false
    }
    ],
      preRequisitos: ["Química Básica"],
    coRequisitos: [],
    selected: false
  },    
  {
      nome: "Educação para o Meio Ambiente",
    codigo: 'IGUFU49010',
    periodo: "3",
    obrigatoria: true,
    horarios: [28, 34],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false 
     
    }
 ];

$scope.materias4 = [    
    {
      nome: "Mecânica dos Sólidos",
    codigo: 'INFIS49040',
    periodo: "4",
    obrigatoria: true,
    horarios: [57, 63, 59, 65, 71],
    cargaHorariaTeorica: 75,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "VA",
      horarios: [1],
      selected: false
    },
    {
      nome: "VB",
      horarios: [7],
      selected: false
    },
    {
      nome: "VC",
      horarios: [13],
      selected: false
    },
    {
      nome: "VD",
      horarios: [19],
      selected: false
    },
    {
      nome: "VE",
      horarios: [25],
      selected: false
    },
    {
      nome: "VF",
      horarios: [31],
      selected: false
    }
    ],
      preRequisitos: ["Estática"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Materiais de Construção Aeronáutica",
    codigo: 'FEMEC43040',
    periodo: "4",
    obrigatoria: true,
    horarios: [61, 67, 73],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA",
      horarios: [16, 22],
      selected: false
    },
    {
      nome: "WB",
      horarios: [28, 34],
      selected: false
    }
    ],
    preRequisitos: ["Introdução à Ciência dos Materiais"],
    coRequisitos: [],
    selected: false

    },    
      {
      nome: "Dinâmica",
    codigo: 'FEMEC41040',
    periodo: "4",
    obrigatoria: true,
    horarios: [45, 51, 47, 53],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["Cinemática"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Processos de Fabricação Mecânica",
    codigo: 'FEMEC42073',
    periodo: "4",
    obrigatoria: true,
    horarios: [15, 21, 4, 10],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "VC/VD",
      horarios: [58, 64],
      selected: false
    },
    {
      nome: "VE/VF",
      horarios: [46, 52],
      selected: false
    },
    {
      nome: "VG",
      horarios: [70, 76],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Metrologia",
    codigo: 'FEMEC41041',
    periodo: "4",
    obrigatoria: true,
    horarios: [56, 62],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 30,
    labs: [{
      nome: "VA",
      horarios: [3, 9],
      selected: false
    },
    {
      nome: "VI",
      horarios: [29, 35],
      selected: false
    },
    {
      nome: "VH",
      horarios: [5, 11],
      selected: false
    }
    ],
    preRequisitos: ["Estatística"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Métodos Matemáticos Aplicados à Engenharia",
    codigo: 'FAMAT49040',
    periodo: "4",
    obrigatoria: true,
    horarios: [43, 49, 55, 68, 74],
    cargaHorariaTeorica: 75,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["Cálculo Diferencial e Integral 3"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Projeto Aeronáutico Assistido por Computador",
    codigo: 'FEMEC43041',
    periodo: "4",
    obrigatoria: true,
    horarios: [44, 50],
    cargaHorariaTeorica: 15,
    cargaHorariaPratica: 30,
    labs: [{
      nome: "WA",
      horarios: [14, 20],
      selected: false
    }
    ],
    preRequisitos: ["Desenho de Máquinas"],
    coRequisitos: [],
    selected: false
    }
    ];


$scope.materias5 = [  
      {
      nome: "Cálculo Numérico",
    codigo: 'FAMAT49050',
    periodo: "5",
    obrigatoria: true,
    horarios: [4, 10, 5, 11, 17],
    cargaHorariaTeorica: 75,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["Métodos Matemáticos Aplicados à Engenharia"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Estruturas de Aeronaves I",
    codigo: 'FEMEC43050',
    periodo: "5",
    obrigatoria: true,
    horarios: [27, 33, 16, 22],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA",
      horarios: [47, 53],
      selected: false
    },
    {
      nome: "WB",
      horarios: [59, 65],
      selected: false
    }
    ],
    preRequisitos: ["Mecânica dos Sólidos"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Termodinâmica Aplicada",
    codigo: 'FEMEC41051',
    periodo: "5",
    obrigatoria: true,
    horarios: [15, 21, 23, 29],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "VA/VC",
      horarios: [44, 50],
      selected: false
    },
    {
      nome: "VB/VD",
      horarios: [56, 62],
      selected: false
    },
    {
      nome: "VE",
      horarios: [68, 74],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Mecânica dos Fluidos",
    codigo: 'FEMEC41050',
    periodo: "5",
    obrigatoria: true,
    horarios: [19, 25, 26, 32],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "VA",
      horarios: [57, 63],
      selected: false
    },
    {
      nome: "VB",
      horarios: [69, 75],
      selected: false
    },
    {
      nome: "VC",
      horarios: [45, 51],
      selected: false
    },
    {
      nome: "VD",
      horarios: [71, 77],
      selected: false
    }

    ],
    preRequisitos: ["Métodos Matemáticos Aplicados à Engenharia"],
    coRequisitos: [],
    selected: false 
    },    
      {
      nome: "Vibração de Sistemas Mecânicos",
    codigo: 'FEMEC41072',
    periodo: "5",
    obrigatoria: true,
    horarios: [2, 8, 3, 9],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA",
      horarios: [55, 61],
      selected: false
    },
    {
      nome: "WB",
      horarios: [67, 73],
      selected: false
    }
    ],
    preRequisitos: ["Dinâmica"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Eletrotécnica de Aeronaves",
    codigo: 'FEMEC33051',
    periodo: "5",
    obrigatoria: true,
    horarios: [43, 49, 14, 20],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA/WB",
      horarios: [70, 76],
      selected: false
    }
    ],
    preRequisitos: ["Física Geral 2"],
    coRequisitos: [],
    selected: false
    }
    ];


    $scope.materias6 = [
    {
    nome: "Estruturas de Aeronaves 2",
    codigo: 'FEMEC43060',
    periodo: "6",
    obrigatoria: true,
    horarios: [56, 62, 57, 63],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA/WB",
      horarios: [28, 34]
    }
    ],
    preRequisitos: ["Estruturas de Aeronaves 1"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Sistemas Térmicos",
    codigo: 'FEMEC41063',
    periodo: "6",
    obrigatoria: true,
    horarios: [46, 52, 59, 65],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["Termodinâmica Aplicada"],
    coRequisitos: [],
    selected: false 
    },    
      {
      nome: "Controle de Sistemas Lineares",
    codigo: 'FEMEC42060',
    periodo: "6",
    obrigatoria: true,
    horarios: [2, 8, 4, 10],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "VA/VB",
      horarios: [14, 20],
      selected: false
    },
    {
      nome: "VC/VD",
      horarios: [26, 32],
      selected: false
    },
    { nome: "VE/VF",
      horarios: [47, 53],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },  

      {
      nome: "Transferência de Calor 1",
    codigo: 'FEMEC41060',
    periodo: "6",
    obrigatoria: true,
    horarios: [67, 73, 69, 75],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "VA/VB",
      horarios: [1, 7]
    },
    {
      nome: "VC/VD",
      horarios: [13, 19],
      selected: false
    },
    {
      nome: "VE/VF",
      horarios: [25, 31],
      selected: false
    }
    ],
    preRequisitos: ["Mecânica dos Fluidos 1"],
    coRequisitos: [],
    selected: false
    },

    {
    nome: "Processos de Fabricação Aeronáutica",
    codigo: 'FEMEC43062',
    periodo: "6",
    obrigatoria: true,
    horarios: [64, 70, 76],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA",
      horarios: [15, 21],
      selected: false
    },
    {
      nome: "WB",
      horarios: [27, 33],
      selected: false
    }
    ],
    preRequisitos: ["Processos de Fabricação Mecânica"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Mecânica dos Fluidos 2",
    codigo: 'FEMEC41062',
    periodo: "6",
    obrigatoria: true,
    horarios: [68, 74, 80],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["Mecânica dos Fluidos 1"],
    coRequisitos: [],
    selected: false
    },
    {
    nome: "Dinâmica de Estruturas Aeronáuticas",
    codigo: 'FEMEC43061',
    periodo: "6",
    obrigatoria: true,
    horarios: [43, 49, 55],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA/WB",
      horarios: [44, 50],
      selected: false
    }
    ],
    preRequisitos: ["Vibração de Sistemas Mecânicos"],
    coRequisitos: [],
    selected: false
    }
    ];

    $scope.materias7 = [
    {
    nome: "Eletrônica de Aeronaves",
    codigo: 'FEMEC33071',
    periodo: "7",
    obrigatoria: true,
    horarios: [27, 33, 52, 58],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
          nome: "WA/WB",
          horarios: [11, 17],
          selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: ["Instrumentação"],
    selected: false
    },    
      {
      nome: "Aerodinâmica Aplicada",
    codigo: 'FEMEC43071',
    periodo: "7",
    obrigatoria: true,
    horarios: [15, 21, 23, 29],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA/WB",
      horarios: [64, 70],
      selected: false
    }
    ],
    preRequisitos: ["Mecânica dos Fluidos 2"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Sistemas de Aeronaves",
    codigo: 'FEMEC43072',
    periodo: "7",
    obrigatoria: true,
    horarios: [14, 20, 45, 51],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Transferência de Calor 2",
    codigo: 'FEMEC41071',
    periodo: "7",
    obrigatoria: true,
    horarios: [26, 32, 4, 10],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["Transferêcia de Calor 1"],
    coRequisitos: [],
    selected: false 
    },    
      {
      nome: "Método de Elementos Finitos",
    codigo: 'FEMEC43073',
    periodo: "7",
    obrigatoria: true,
    horarios: [57, 63],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 30,
    labs: [{
      nome: "WA/WB",
      horarios: [69, 75],
      selected: false
    }
    ],
    preRequisitos: ["Estruturas de Aeronaves 2"],
    coRequisitos: [],
    selected: false
    },    
    {
    nome: "Instrumentação",
    codigo: 'FEMEC41070',
    periodo: "7",
    obrigatoria: true,
    horarios: [53, 59, 65],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "VA",
      horarios: [55, 61],
      selected: false
    },
    {
      nome: "VB",
      horarios: [67, 73],
      selected: false
    },
    { nome: "VE",
      horarios: [44, 50],
      selected: false
    },
    { nome: "VF",
      horarios: [43, 49],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: ["Eletrônica de Aeronaves"],
    selected: false
    }
    ];


    $scope.materias8 = [
    {
    nome: "Cargas em Aeronaves e Aeroelasticidade",
    codigo: 'FEMEC43080',
    periodo: "8",
    obrigatoria: true,
    horarios: [49, 55, 57, 63],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA/WB",
      horarios: [61, 67],
      selected: false
    }
    ],
    preRequisitos: ["Dinâmica de Estruturas Aeronáuticas"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Mecânica do Voo e Controle de Aeronaves",
    codigo: 'FEMEC43081',
    periodo: "8",
    obrigatoria: true,
    horarios: [28, 34,17,23],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "WA/WB",
      horarios: [5, 11],
      selected: false
    }
    ],
    preRequisitos: ["Controle de Sistemas Lineares"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Homologação de Aeronaves",
    codigo: 'FEMEC43082',
    periodo: "8",
    obrigatoria: true,
    horarios: [50, 56],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Aerodinâmica Computacional",
    codigo: 'FEMEC43083',
    periodo: "8",
    obrigatoria: true,
    horarios: [21, 27, 33],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "WA",
      horarios: [46, 52],
      selected: false
    }
    ],
    preRequisitos: ["Aerodinâmica Aplicada"],
    coRequisitos: [],
    selected: false 
    },    
      {
      nome: "Fadiga e Mecânica da Fratura",
    codigo: 'FEMEC43084',
    periodo: "8",
    obrigatoria: true,
    horarios: [62, 68, 74],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA/WB",
      horarios: [26, 32],
      selected: false
    }
    ],
    preRequisitos: ["Estruturas de Aeronaves 2"],
    coRequisitos: [],
    selected: false
    },    
    {
    nome: "Projeto de Aeronaves 1",
    codigo: 'FEMEC43085',
    periodo: "8",
    obrigatoria: true,
    horarios: [47, 53],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 30,
    labs: [{
      nome: "WA/WB",
      horarios: [59, 65],
      selected: false
    }
    ],
    preRequisitos: ["2200 h"],
    coRequisitos: [],
    selected: false
    },
    {
    nome: "Propulsão de Aeronaves",
    codigo: 'FEMEC43086',
    periodo: "8",
    obrigatoria: true,
    horarios: [58, 64, 70],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [{
      nome: "WA/WB",
      horarios: [9, 15],
      selected: false
    }
    ],
    preRequisitos: ["Sistemas Térmicos"],
    coRequisitos: [],
    selected: false
    }
    ];

    $scope.materias9 = [
    {
    nome: "Projeto de Aeronaves 2",
    codigo: 'FEMEC43090',
    periodo: "9",
    obrigatoria: true,
    horarios: [16, 22],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 30,
    labs: [{
          nome: "WA/WB",
          horarios: [28, 34],
      selected: false
    }
    ],
    preRequisitos: ["Projeto de Aeronaves 1"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Manutenção de Aeronaves",
    codigo: 'FEMEC43091',
    periodo: "9",
    obrigatoria: true,
    horarios: [15, 21, 27],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "WA/WB",
      horarios: [44, 50],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Aeroacústica",
    codigo: 'FEMEC43092',
    periodo: "9",
    obrigatoria: true,
    horarios: [56, 62, 68],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "WA",
      horarios: [74],
      selected: false
    }
    ],
    preRequisitos: ["Mecânica dos Fluidos 2"],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Desempenho de Aeronaves",
    codigo: 'FEMEC43093',
    periodo: "9",
    obrigatoria: true,
    horarios: [63, 69, 75],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false 
    },    
      {
      nome: "Administração",
    codigo: 'FAGEN49090',
    periodo: "9",
    obrigatoria: true,
    horarios: [13, 19, 3, 9],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["1500 h"],
    coRequisitos: [],
    selected: false
    },    
    {
    nome: "Economia",
    codigo: 'IEUFU49090',
    periodo: "9",
    obrigatoria: true,
    horarios: [1, 7, 2, 8],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["1500 h"],
    coRequisitos: [],
    selected: false
    },
    {
    nome: "Humanidades",
    codigo: 'HUMAN12345',
    periodo: "9",
    obrigatoria: true,
    horarios: [],
    cargaHorariaTeorica: 0,
    cargaHorariaPratica: 30,
    labs: [
    {
      nome: "Direito",
      horarios: [81, 87],
      selected: false
    },
    {
      nome: "Psicologia",
      horarios: [26, 32],
      selected: false
    }
    ],
    preRequisitos: ["1500 h"],
    coRequisitos: [],
    selected: false
    }
    ];

    $scope.materias10 = [
    {
    nome: "Projeto de Conclusão de Curso",
    codigo: 'FEMEC43100',
    periodo: "10",
    obrigatoria: true,
    horarios: [79, 85],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: ["2800 h"],
    coRequisitos: [],
    selected: false
    }
    ];  

    $scope.materiasOPTATIVAS = [
    {
    nome: "Tópicos 3 - Din. Maq. Rotativas",
    codigo: 'FEMEC43915',
    periodo: "X",
    obrigatoria: false,
    horarios: [7, 13, 19, 25],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Óptica",
    codigo: 'INFIS49061',
    periodo: "X",
    obrigatoria: false,
    horarios: [44, 50],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Laboratório de Óptica VA/VB",
    codigo: 'INFIS49061',
    periodo: "X",
    obrigatoria: false,
    horarios: [14, 20],
    cargaHorariaTeorica: 30,
    cargaHorariaPratica: 0,
    labs: [],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },    
      {
      nome: "Banco de Dados",
    codigo: 'FACOM49080',
    periodo: "X",
    obrigatoria: false,
    horarios: [44, 45, 50],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "VA",
      horarios: [51],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false 
    },    
      {
      nome: "Robótica",
    codigo: 'FAGEN42094',
    periodo: "X",
    obrigatoria: false,
    horarios: [4, 10, 5, 11],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "VA",
      horarios: [6, 12],
      selected: false
    },
    {
      nome: "VB",
      horarios: [57, 63],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },    
    {
    nome: "Turbulência nos Fluidos",
    codigo: 'FEMEC43912',
    periodo: "X",
    obrigatoria: false,
    horarios: [11, 17, 23, 29],
    cargaHorariaTeorica: 60,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "WA",
      horarios: [18, 24],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },
    {
    nome: "Acústica Básica",
    codigo: 'FEMEC41054',
    periodo: "X",
    obrigatoria: false,
    horarios: [56, 62, 58],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "UA",
      horarios: [64],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },
    {
    nome: "Monitoramento de Int. Est. de Aeronaves",
    codigo: 'FEMEC43902',
    periodo: "X",
    obrigatoria: false,
    horarios: [53, 59, 65],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "WA",
      horarios: [47],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    },
    {
    nome: "Estruturas Inteligentes",
    codigo: 'FEMEC43910',
    periodo: "X",
    obrigatoria: false,
    horarios: [11, 17, 23],
    cargaHorariaTeorica: 45,
    cargaHorariaPratica: 15,
    labs: [
    {
      nome: "WA",
      horarios: [29],
      selected: false
    }
    ],
    preRequisitos: [],
    coRequisitos: [],
    selected: false
    }
    ];
    
    
























   
  }])

})();

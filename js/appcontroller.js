
var app = angular.module('myAppCrud', ['oitozero.ngSweetAlert', 'angularUtils.directives.dirPagination', 'googleChartWrap']);

app.controller('customersCtrl', function ($scope, $http, SweetAlert) {

    $scope.names = [];

    
    $scope.resetChart = function () {
        $http.get("/api/valueschart")
            .then(function (data) {
                $scope.valuechart = data.data;

                if ($scope.valuechart != null) {
                    var retorno = $scope.valuechart;

                    var valor1 = null;
                    var valor2 = null;
                    var valor3 = null;
                    var valor4 = null;
                    var valor5 = null;

                    var valor6 = null;
                    var valor7 = null;

                    valor1 = retorno.substring(25, retorno.indexOf("}", 25));
                    valor2 = retorno.substring(retorno.indexOf(":", 65) + 1, retorno.indexOf("}", 65));
                    valor3 = retorno.substring(retorno.indexOf(":", 115) + 1, retorno.indexOf("}", 115));
                    valor4 = retorno.substring(retorno.indexOf(":", 160) + 1, retorno.indexOf("}", 160));
                    valor5 = retorno.substring(retorno.indexOf(":", 215) + 1, retorno.indexOf("}", 215));

                    valor6 = retorno.substring(retorno.indexOf("qtdm", 260) + 6, retorno.indexOf("qtdf", 260) - 2);
                    valor7 = retorno.substring(retorno.indexOf("qtdf", 260) + 6, retorno.indexOf("}", 260));


                    var dataArray = [['name', 'votes']];
                    var bardataArray = [['name', 'votes', { role: 'style' }]];

                    dataArray.push(['De 0 a 9', parseInt(valor1)]);
                    dataArray.push(['De 10 a 19', parseInt(valor2)]);
                    dataArray.push(['De 20 a 29', parseInt(valor3)]);
                    dataArray.push(['De 30 a 39', parseInt(valor4)]);
                    dataArray.push(['Acima de 40', parseInt(valor5)]);

                    bardataArray.push(['Homens', parseInt(valor6), 'b847ac']);
                    bardataArray.push(['Mulheres', parseInt(valor7), '#b847ac']);


                    var piedata = new google.visualization.arrayToDataTable(dataArray);
                    var bardata = new google.visualization.arrayToDataTable(bardataArray);

                    var options = {
                        title: 'Quantidade de pessoas por faixa etária',
                        pieHole: 0.4
                    };

                    var baroptions = {
                        title: 'Quantidade de pessoas por sexo',
                        legend: { position: "none" }
                    };

                    

                    var bchart = new google.visualization.BarChart(document.getElementById('barchartapp'));
                    bchart.draw(bardata, baroptions);

                    var chart = new google.visualization.PieChart(document.getElementById('donutchartapp'));
                    chart.draw(piedata, options);

                 //   $scope.valorr = valor7;

                }
            });
    };


    $scope.reset = function () {

        $http.get("/api/values")
            .then(function (data) { $scope.names = data.data; });

        $scope.resetChart();
    };

    $scope.reset();

    // deletar o registro
    $scope.removePerson = function (index) {
        //$scope.names.splice(index, 1);

        SweetAlert.swal({
            title: "Você tem certeza?",                 
            text: "O registro será apagado do sistema!", 
            type: "warning",                             
            showCancelButton: true,                     
            confirmButtonColor: "#b968b0",
            confirmButtonText: "Sim, tenho certeza!",
            closeOnConfirm: false,                       
            closeOnCancel: false
        },
            function (isConfirm) {                       
                if (isConfirm) {

                    $http.delete("/api/values/" + index) //$scope.names[index].id)
                        .success(function (data, status, headers, config) {
                            $scope.serverResponse = data;
                            $scope.reset();
                            SweetAlert.swal("Excluído!", "O registro foi excluído com sucesso.", "success");
                        })
                        .error(function (data, status, header, config) {
                            alert(status);
                        });


                } else {
                    SweetAlert.swal("Cancelado", "O registro está seguro :)", "error");
                }
            });

    };

    // busca o registro para editar 
    $scope.editPerson = function (index) {
        $http.get("/api/values/" + "0" + index) //$scope.names[index].id)
            .then(function (data) { $scope.dados = data.data; });
    };


    // altera o registro da pessoa
    $scope.sendJSonData = function () {

        var pessoas = {
            id: document.getElementById("InputId").value,
            nome: document.getElementById("InputName").value,
            data_nascimento: document.getElementById("InputDataNascimento").value,
            documento: document.getElementById("InputDoc").value,
            endereco: document.getElementById("InputEndereco").value,
            sexo:  document.getElementById("InputSexo").value
        };

        $http.put("/api/values/0", pessoas)
            .success(function (data, status, headers, config) {
                $scope.serverResponse = data;
                SweetAlert.swal("Registro alterado!", "Registro alterado com sucesso.", "success");
                $scope.reset();
            })
            .error(function (data, status, header, config) {
                alert(status);
                SweetAlert.swal("Cancelado", "O registro nao foi alterado :)", "error");
            });


        $('#myModal').modal('hide');

    };

    // inserir novo cadastro
    $scope.sendJSonDataNew = function () {

        var pessoas = {
            id: "0",
            nome: document.getElementById("InputNameN").value,
            data_nascimento: document.getElementById("InputDataNascimentoN").value,
            documento: document.getElementById("InputDocN").value,
            endereco: document.getElementById("InputEnderecoN").value,
            sexo: document.getElementById("InputSexoN").value
        };

        $http.put("/api/values/0", pessoas)
            .success(function (data, status, headers, config) {
                $scope.serverResponse = data;
                SweetAlert.swal("Registro incluído!", "Registro incluído com sucesso.", "success");
                $scope.reset();
               
            })
            .error(function (data, status, header, config) {
                alert(status);
                SweetAlert.swal("Cancelado", "O registro nao foi incluído :)", "error");
            });

        // $scope.reset();
        $('#myModalCadastro').modal('hide');
    };

    // puxa os campos limpos para novo registro
    $scope.novoPerson = function (index) {
        $scope.dados = [];
        $scope.dados = {
            id: "0",
            nome: "",
            data_nascimento: "",
            documento: "",
            endereco: "",
            sexo: "M"
        };

        document.getElementById("InputNameN").value = "";
        document.getElementById("InputDataNascimentoN").value = "";
        document.getElementById("InputDocN").value = "";
        document.getElementById("InputEnderecoN").value = "";
        document.getElementById("InputSexoN").value = "";
    };

    var vm = this;
    vm.alert = function () {

        SweetAlert.swal({
            title: "Projeto Web!",
            text: "Projeto simples de cadastro de pessoas utilizando WebApi Restful.",

            confirmButtonColor: "#b847ac" 
        }); //simple alert
    }


    $scope.example = {
        value: new Date(Date)
    };


    $scope.ValidationError = function (item) {
        if (item.$dirty && item.$error.required) {
            return "error !";
        }
        else {
            return "";
        }
    };

    


});







var table = $('#example2').DataTable({

    "searching": false,
    "lengthChange": false,
    "ordering": false,
    "paging": true,
    "oLanguage": {
        "sProcessing": "Processando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "Não foram encontrados resultados",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
        "sInfoFiltered": "",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "oPaginate": {
            "sFirst": "Primeiro",
            "sPrevious": "Anterior",
            "sNext": "Seguinte",
            "sLast": "Último"
        }
    }

});

var table = $('#example1').DataTable({


    "oLanguage": {
        "sProcessing": "Processando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "Não foram encontrados resultados",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
        "sInfoFiltered": "",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "oPaginate": {
            "sFirst": "Primeiro",
            "sPrevious": "Anterior",
            "sNext": "Seguinte",
            "sLast": "Último"
        }
    }

});




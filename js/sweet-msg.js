angular.module('alertDemo', ['oitozero.ngSweetAlert'])
.controller('demoCtrl',['SweetAlert', function(SweetAlert){
    var vm = this;
    vm.alert = function(){
        SweetAlert.swal("I'm a fancy Alert"); //simple alert
    }
    vm.confirm = function(){
        SweetAlert.swal({
            title: "Are you sure?", //Bold text
            text: "Your will not be able to recover this imaginary file!", //light text
            type: "warning", //type -- adds appropiriate icon
            showCancelButton: true, // displays cancel btton
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false, //do not close popup after click on confirm, usefull when you want to display a subsequent popup
            closeOnCancel: false
        }, 
        function(isConfirm){ //Function that triggers on user action.
            if(isConfirm){
                SweetAlert.swal("Deleted!");
            } else {
                SweetAlert.swal("Your file is safe!");
            }
        });
    }


    vm.confirm2 = function () {
        SweetAlert.swal({
            title: "Are you sure?", //Bold text
            text: "Your will not be able to recover this imaginary file!", //light text
            type: "warning", //type -- adds appropiriate icon
            showCancelButton: true, // displays cancel btton
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false, //do not close popup after click on confirm, usefull when you want to display a subsequent popup
            closeOnCancel: false
        },
        function (isConfirm) { //Function that triggers on user action.
            if (isConfirm) {
              
                SweetAlert.swal("Deleted!", "Your imaginary file has been deleted.", "success");
            } else {
                SweetAlert.swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });
    }




}]);
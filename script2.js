var app = angular.module('influx', [ 'ngAnimate', 'ui.grid', 'ui.grid.moveColumns', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.bootstrap', 'ui.grid.edit' ])

app.controller('MainCtrl', MainCtrl);
app.controller('RowEditCtrl', RowEditCtrl);
app.service('RowEditor', RowEditor);

var assetClass =  '$' + 'class';

MainCtrl.$inject = [ '$scope', '$http', '$modal', 'RowEditor', 'uiGridConstants' ];
function MainCtrl($scope, $http, $modal, RowEditor, uiGridConstants) {
	var vm = this;

	var propertyAddress;

	vm.editRow = RowEditor.editRow;

	vm.serviceGrid = {
		enableRowSelection : true,
		enableRowHeaderSelection : false,
		multiSelect : false,
		enableSorting : true,
		enableFiltering : true,
		enableGridMenu : true,
		rowTemplate : "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
	};

	vm.serviceGrid.columnDefs = [ {
		field : 'loanId',
		displayName : 'Loan Number',
		enableSorting : true,
		type : 'number',
		enableCellEdit : false,
		width : 140,
		sort : {
			direction : uiGridConstants.ASC,
			priority : 1,
		},
    },
    {
        field :'street',
        displayName : 'Property Address',
		enableSorting : true,
        enableCellEdit : false,
        width : 170
	},
    {
        field : 'loanAmount',
        displayName : 'Loan Amount',
		enableSorting : true,
        enableCellEdit : false,
        width : 140,
	}, {
        field : 'interestRate',
        displayName : 'Interest Rate',
		enableSorting : true,
        enableCellEdit : false,
        width : 120,
	}, {
        field : 'upb',
        displayName : 'UPB',
		width : 120,
		enableSorting : true,
		enableCellEdit : false
	}, {
        field : 'liquidated',
        displayName : 'Liquidated',
		enableSorting : true,
        enableCellEdit : false,
        width : 100,
	}, {
        field : 'monthlyPaymentAmount',
        displayName : 'Monthly Payment',
		enableSorting : true,
        enableCellEdit : false,
        width : 170,
	}, {
        field : 'loanDuration',
        displayName : 'Loan Duration',
		enableSorting : true,
        enableCellEdit : false,
        width : 170
    }, {
        field : 'firstName',
        displayName : 'Borrowers Name',
		enableSorting : true,
        enableCellEdit : false,
        width : 170
    }, {
        field : 'borrowerId',
        displayName : 'Borrowers ID',
		enableSorting : true,
        enableCellEdit : false,
        width : 170
    }
];

	$http.get('http://localhost:3000/api/CreateLoan').success(function(response) {
		vm.serviceGrid.data = response;
	});

	$scope.addRow = function() {
        var newService = {
			loanId : "0",																																																																																																																																																																																																																																																																																																																																																																																												
			loanAmount : "",
			loanDuration : 0,
			interestRate : "",
			street : "",
			city : "",
			zipCode : 0,
			state : "",
			upb : "",
			monthlyPaymentAmount : "",
			firstName : "",
			borrowerId : "",
			participantKey : "",
			liquidated : false,
			propertyAddress : ""
		};
		var rowTmp = {};
		rowTmp.entity = newService;
        vm.editRow($scope.vm.serviceGrid, rowTmp);
    };

}

RowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function RowEditor($http, $rootScope, $modal) {
    var service = {};
    
    service.editRow = editRow;
    
    function editRow(grid, row) {

		if(row.entity.loanId != '0'){
			$modal.open({
				templateUrl : 'service-edit2.html',
				controller : [ '$http', '$modalInstance', 'grid', 'row', RowEditCtrl ],
				controllerAs : 'vm',
				resolve : {
					grid : function() {
						return grid;
					},
					row : function() {
						return row;
					}
				}
			});
		}
		else{
			$modal.open({
				templateUrl : 'service-add2.html',
				controller : [ '$http', '$modalInstance', 'grid', 'row', RowEditCtrl ],
				controllerAs : 'vm',
				resolve : {
					grid : function() {
						return grid;
					},
					row : function() {
						return row;
					}
				}
			});
		}
    
	}

	return service;
}

function RowEditCtrl($http, $modalInstance, grid, row) {
	var vm = this;
	vm.entity = angular.copy(row.entity);
	vm.save = save;
	function save() {

		      
		/* alert('Loan Id ' + vm.entity.loanId);
		 alert('Loan Amount ' + vm.entity.loanAmount);
		 alert('Prop Address ' + row.entity.propertyAddress);alert('Interesst rate ' + row.entity.interestRate);
		 alert('UPB ' + row.entity.upb);alert('Liquidated ' + row.entity.liquidated);
         alert('Monthly Payment ' + row.entity.monthlyPaymentAmt);alert('Loan Duration ' + row.entity.loanDuration);*/
         
		var tempLiquidated = false;
		var method = "POST";
		var url = "http://localhost:3000/api/CreateLoan";
		var data = {};
		
		if(row.entity.loanId!='0'){

			row.entity = angular.extend(row.entity, vm.entity);
			url = "http://localhost:3000/api/UpdateLoan";

			if(row.entity.liquidated == 1){
				tempLiquidated = true;
			}

			/*data = {
				assetClass : "org.acme.biznet.ChangeLoanDetails",
				"relatedLoanAsset": "resource:org.acme.biznet.LoanAsset#" + row.entity.loanId,
				"newSystem": "resource:org.acme.biznet.System#A",
				"newInterestRate": row.entity.interestRate,
				"newUpb": row.entity.upb,
				"newLiquidated": tempLiquidated,
				"newMonthlyPaymentAmt": row.entity.monthlyPaymentAmt,
				"newLoanDuration": row.entity.loanDuration
			}*/
			    
            data = {
				assetClass : "org.audit.loan.UpdateLoan",
				"relatedLoanAsset": "resource:org.audit.loan.Loan#" + row.entity.loanId,
				"newParticipantKey": "3",
				"newInterestRate": row.entity.interestRate,
				"newUpb": row.entity.upb,
				"newLiquidated": tempLiquidated,
				"newMonthlyPaymentAmount": row.entity.monthlyPaymentAmount,
				"newLoanDuration": row.entity.loanDuration
			}


			$http.post(url, JSON.stringify(data))
			.success(function(response) { 
				$modalInstance.close(row.entity); 
			})
			.error(function(response) {
				 alert('Cannot edit row (error in console)'); 
				 console.dir(response); 
			}); 
		}
		else{
			row.entity = angular.extend(row.entity, vm.entity);
			/*data = {
				assetClass : "org.acme.biznet.LoanAsset",
				loanId : vm.entity.loanId,
				loanAmount : vm.entity.loanAmount,
				propertyAddress : vm.entity.propertyAddress,
				interestRate : vm.entity.interestRate,
				upb : vm.entity.upb,
				liquidated : tempLiquidated,
				monthlyPaymentAmt : vm.entity.monthlyPaymentAmt,
				loanDuration : vm.entity.loanDuration
			};*/
			data = {
				assetClass : "org.audit.loan.CreateLoan",
				loanId : vm.entity.loanId,
                loanAmount : vm.entity.loanAmount,
                loanDuration : vm.entity.loanDuration,
                interestRate : vm.entity.interestRate,
                street : vm.entity.street,
                city : vm.entity.city,
                zipCode : vm.entity.zipCode,
                state : vm.entity.state,
				propertyAddress : vm.entity.propertyAddress,
				monthlyPaymentAmount : vm.entity.monthlyPaymentAmount,
                upb : vm.entity.upb,
                firstName : vm.entity.firstName,
                borrowerId : vm.entity.borrowerId,
                participantKey : "1",
				liquidated : tempLiquidated
			};
			
			$http.post(url, JSON.stringify(data))
			.success(function(response) { 
				$modalInstance.close(row.entity); 
			})
			.error(function(response) {
				 alert('Cannot edit row (error in console)'); 
				 console.dir(response); 
			}); 
			//propertyAddress = vm.entity.street + " ," + vm.entity.city + " ," + vm.entity.state + ", " + vm.entity.zipCpde;
			grid.data.push(row.entity); 


		}
		
        
	}

	vm.remove = remove;
	function remove() {
		console.dir(row)
		if (row.entity.id != '0') {
			row.entity = angular.extend(row.entity, vm.entity);
			var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
			grid.appScope.vm.serviceGrid.data.splice(index, 1);
			/*
			 * $http.delete('http://localhost:8080/service/delete/'+row.entity.id).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot delete row (error in console)'); console.dir(response); });
			 */
		}
		$modalInstance.close(row.entity);
	}

}

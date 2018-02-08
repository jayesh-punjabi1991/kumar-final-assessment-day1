(function() {
	"use strict";

	angular
		.module("app.shared-services")
		.factory("mockRestService", mockRestService);

	mockRestService.$inject = ["$http", "$q"];

	function mockRestService($http, $q) {

		var service = {
			getListItems: getListItems,
			designQueryParams: designQueryParams
		};

		return service;

		function getListItems(listTitle, queryParams) {
            var dfd = $q.defer();
            $http.defaults.headers.post['X-HTTP-Method'] = "";
            var restUrl = "../_api/web/lists/getbytitle('" + listTitle + "')/items?" + designQueryParams(queryParams).join("&");
            $http.get(restUrl).success(function(data) {
                dfd.resolve(data.d.results);
            }).error(function(data) {
                dfd.reject("error, cannot get items"); 
            });
            return dfd.promise;
		}

		function designQueryParams(params) {
			var queryObjects = [];

			if (params.filter) {
				queryObjects.push("$filter=" + params.filter);
			}

			if (params.expand) {
				queryObjects.push("$expand=" + params.expand);
			}

			if (params.select) {
				queryObjects.push("$select=" + params.select);
			}

			if (params.top) {
				queryObjects.push("$top=" + params.top);
			}

			return queryObjects;
		}

	}
})();


/* ************** PART II EXERCISE**************  */

/*Example Rest Call to get all items from the WorkPlan List*/

/* 
	INSERT FUNCTION HERE:
	function getAllItems() {

		var queryParams = {
			Select: *
		}
		mockRestService.getListItems('WorkPlan', queryParams).then(function(response) {
			return response;
		})
	}

	ANTICIPATED DATA FORMAT: 
	{
		DATA: FORMAT,
		INSERT: HERE
	}
*/

/*************** INSERT ANSWERS BELOW IN THE COMMENTED AREA**************/
function getWorkPlanItems() {
	var queryParams = {
		select: "Id,Owner/Title,Function/Title,WorkPlanTaskType,WorkPlanTaskStatus/Title",
		expand: "Owner,Function,WorkPlanTaskStatus",
		orderby: "TaskDueDate",
		top: 2000
	};
	mockRestService.getListItems('WorkPlan', queryParams).then(function(response) {
		return response;
	})
}

function getRisksAndIssuesItems() {
	var queryParams = {
		select: "Id,Title,Function/Title,Description,ItemOwner/Title",
		expand: "Function,ItemOwner",
		filter: "RiskImpact eq 'High'",
		top: 500
	};
	mockRestService.getListItems('Risks and Issues', queryParams).then(function(response) {
		return response;
	})
}
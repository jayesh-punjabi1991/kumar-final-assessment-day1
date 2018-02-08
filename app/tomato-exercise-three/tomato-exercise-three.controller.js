(function() {
    'use strict';

    angular
        .module('app')
        .controller('TomatoExerciseThreeController', TomatoExerciseThreeController);
    
    TomatoExerciseThreeController.$inject = [
        '$scope', 'restService', '$q'
    ];

    function TomatoExerciseThreeController($scope, restService, $q) {
        var vm = this;
        vm.ordersByCountryDetails = ordersByCountryDetails;
        vm.totalTomatoesOrderedByCountry = totalTomatoesOrderedByCountry;

        activate();

        function activate() {
            $q.all([
                getExerciseThreeData()
            ]).then(activateComplete);

            function activateComplete(results) {
                vm.data = results[0];
                vm.ordersByCountries = ordersByCountryDetails(vm.data);
                console.log('FORMAT ONE: ' + vm.ordersByCountries);
                
                vm.tomatoesByCountry = totalTomatoesOrderedByCountry(vm.data);
                console.log('FORMAT TWO: ' + vm.tomatoesByCountry);
            }
        }

        function getExerciseThreeData() {
            return restService.getExerciseThreeData().then(function(response) {
                return response;
            });
        }

        //Add your code below.
        function ordersByCountryDetails(responseData) {
            var aggregateData = _(responseData[3].orders).groupBy('Countries.ID').map(function(item, itemId) {
                var obj = [];
                var countryName = _(responseData[0].countries).filter({ID: parseInt(itemId)}).value()[0].Title;
                _.forEach(item, function(element) {
                    element['Countries'] = _(responseData[0].countries).filter({ID: parseInt(itemId)}).value();
                    element['Tomato'] = _(responseData[1].tomatoes).filter({ID: parseInt(element.Tomato.ID)}).value();
                    element['Status'] = _(responseData[2].statuses).filter({ID: parseInt(element.Status.ID)}).value();
                });
                obj.push(countryName, item);
                return obj;
            }).fromPairs().value();
            return aggregateData;
        }

        function totalTomatoesOrderedByCountry(responseData) {
            var aggregateData = _(responseData[3].orders).groupBy('Countries.ID').map(function(item, itemId) {
                var obj = [];
                var countryName = _(responseData[0].countries).filter({ID: parseInt(itemId)}).value()[0].Title;
                obj.push(countryName, _(item).reduce(function(sum, n) { return sum + parseInt(n.Qty)}, 0));
                return obj;
            }).fromPairs().value();
            return aggregateData;
        }

    }
})();

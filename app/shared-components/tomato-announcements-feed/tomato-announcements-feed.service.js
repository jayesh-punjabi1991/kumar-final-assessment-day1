//Add your code here.
(function() {
    'use strict';

    angular
        .module('app')
        .factory('tomatoAnnouncementsFeedService', tomatoAnnouncementsFeedService);

    tomatoAnnouncementsFeedService.$inject = [];

    function tomatoAnnouncementsFeedService() {
        var service = {
            getOwnerInfo: getOwnerInfo,
            filterDataByType: filterDataByType
        };

        return service; 

        function getOwnerInfo(announcementsData, ownersData) {
            _(announcementsData).map(function(item, itemId) {
                item['Owner'] = _(ownersData).filter({ID: item.OwnerID}).value()[0].Title;
            }).value();
            
            return announcementsData;
        }

        function filterDataByType(itemTitle, filteredData, completeData) {
            if(itemTitle == 'All') {
                filteredData = completeData;
            }
            else {
                filteredData = completeData;
                filteredData = _(filteredData).filter({ Type: { Title: itemTitle } }).value();
            }            
            return filteredData;
        }
    }
})();

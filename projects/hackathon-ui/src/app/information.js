angular
  .module('app')
  .component('recentInformation', {
    templateUrl: 'app/information.html'
  });

angular
  .module('app')
  .controller('InformationController', ['$scope', function ($scope) {
    angular.extend($scope, {
      location: {
        title: 'London',
        type: 'Restaurant'
      },
      listconfig: {
        selectItems: false,
        multiSelect: false,
        showSelectBox: false
      },
      listitems: [
        {
          name: 'Event One',
          typeIcon: 'fa fa-plane ',
          hostCount: 8,
          clusterCount: 6,
          nodeCount: 10,
          imageCount: 8
        },
        {
          name: 'Event Two',
          typeIcon: 'fa fa-magic ',
          hostCount: 8,
          clusterCount: 6,
          nodeCount: 10,
          imageCount: 8
        }
      ]
    });
  }]);

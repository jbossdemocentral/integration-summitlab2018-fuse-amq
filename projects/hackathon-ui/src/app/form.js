angular
  .module('app')
  .component('inputForm', {
    templateUrl: 'app/form.html'
  });

angular
  .module('app')
  .controller('FormController', ['$scope', '$timeout', function ($scope, $timeout) {
    angular.extend($scope, {
      location: {
        title: 'London',
        type: 'Restaurant'
      },
      save: save,
      cancel: cancel
    });

    var vm = this;

    function save(item) {
      $timeout(function () {
        item.text = '';
        vm.working = false;
      }, 1000);
    }

    function cancel() {
    }
  }]);

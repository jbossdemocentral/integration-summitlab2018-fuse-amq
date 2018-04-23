angular
  .module('app')
  .component('inputForm', {
    templateUrl: 'app/form.html'
  });

angular
  .module('app')
  .directive('selectpicker', [function() {
    return {
       restrict: 'A',
       link: function(scope, elem, attrs) {
          $(elem).selectpicker();
       }
    };
 }]);

angular
  .module('app')
  .controller('FormController', ['$scope', '$timeout', '$window', 'Locations', function ($scope, $timeout, $window, Locations) {
    var vm = this;
    vm.item = {
      title: 'teste',
      description: 'teste',
      status: 'Not yet Saved'
    };

    vm.working = false;
    vm.sender = {};

    vm.save = save;
    vm.cancel = cancel;

    var connection = $window.connection;

    initAMQ(connection);

    function initAMQ(connection) {
      vm.sender = connection.open_sender('inputs');
    }

    function save() {
      vm.working = true;

      vm.item.status = 'saved';
      var location = Locations.selected;

      var comment = {
        type: vm.item.type,
        title: vm.item.title,
        typeIcon: 'fa fa-plane ',
        description: vm.item.description
      };

      location.comments.push(comment);

      vm.sender.send({
        body: comment
      });

      $timeout(function () {
        vm.working = false;
      }, 1000);
    }

    function cancel() {
      vm.item.status = 'cancelled';
      vm.input = null;
    }
  }]);

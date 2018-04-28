angular
  .module('app')
  .component('mainNotificationList', {
    templateUrl: 'app/notification.html'
  });

angular
  .module('app')
  .controller('NotificationListController', ['$window', '$scope', '$rootScope', 'Notifications', function ($window, $scope, $rootScope, Notifications) {
    var vm = this;
    vm.showClose = true;
    vm.htmlContent = true;
    vm.persistent = false;
    vm.showMenu = false;

    vm.message = 'Default Message.';

    var typeMap = {
      Info: 'info',
      Success: 'success',
      Warning: 'warning',
      Danger: 'danger'
    };

    vm.types = Object.keys(typeMap);

    vm.type = vm.types[0];
    vm.header = 'User:';
    vm.message = 'Default <strong>notification</strong> message.';

    vm.handleClose = handleClose;
    vm.updateViewing = updateViewing;

    vm.notifications = Notifications.data;

    var connection = $window.connection;

    initAMQ(connection);

    function initAMQ(connection) {
      var receiver = connection.open_receiver(config.mq_notifications);

      receiver.on('message', function (context) {
        var notification = context.message.body;
        Notifications.message(
          typeMap[notification.type] ? typeMap[notification.type] : typeMap[vm.type],
          notification.header ? notification.header + ':' : vm.header,
          notification.message ? notification.message : vm.message,
          vm.persistent,
          handleClose,
          undefined,
          undefined,
          undefined
        );
        $scope.$apply();
      });
    }

    function handleClose(data) {
      Notifications.remove(data);
    }

    function updateViewing(viewing, data) {
      Notifications.setViewing(data, viewing);
    }
  }]);

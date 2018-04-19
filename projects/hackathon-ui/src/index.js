angular
  .module('app', [
    'ui.router',
    'patternfly.navigation',
    'patternfly.notification',
    'leaflet-directive']);

angular
  .module('app')
  .config(['NotificationsProvider', function (NotificationsProvider) {
    NotificationsProvider
      .setDelay(3000)
      .setVerbose(false)
      .setPersist({
        error: true,
        httpError: true,
        warn: true
      });
  }]);

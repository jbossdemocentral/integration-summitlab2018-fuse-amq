angular
  .module('app')
  .component('app', {
    templateUrl: 'app/main.html'
  });

angular
  .module('app').controller('LeafletController', ['$window', '$scope', function ($window, $scope) {
    var mainMarker = {
      lat: 51,
      lng: 0,
      focus: true,
      message: 'Hey, drag me if you want',
      draggable: true
    };

    angular.extend($scope, {
      london: {
        lat: 51.505,
        lng: -0.09,
        zoom: 8
      },
      markers: {
        mainMarker: angular.copy(mainMarker)
      },
      position: {
        lat: 51,
        lng: 0
      },
      events: { // or just {} //all events
        markers: {
          enable: ['click']
          // logic: 'emit'
        }
      }
    });

    var connection = $window.connection;

    initAMQ(connection);

    function initAMQ(connection) {
      var receiver = connection.open_receiver('locations');

      receiver.on('message', function (context) {
        var locations = context.message.body;
        angular.extend($scope, {
          markers: locations
        });
      });
    }
  }]);

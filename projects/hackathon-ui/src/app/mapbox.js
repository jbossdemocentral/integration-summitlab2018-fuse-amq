angular
  .module('app')
  .component('mapbox', {
    templateUrl: 'app/mapbox.html'
  });

angular
  .module('app').controller('LeafletController', ['$window', '$scope', '$log', 'Locations', function ($window, $scope, $log, Locations) {
    var mainMarker = {
      lat: 51,
      lng: 0,
      focus: true,
      title: 'London',
      message: 'Hey, drag me if you want',
      draggable: false,
      riseOnHover: true
    };

    angular.extend($scope, {
      london: {
        lat: 51.505,
        lng: -0.09,
        zoom: 8
      },
      markers: {
        '0': angular.copy(mainMarker)
      },
      position: {
        lat: 51,
        lng: 0
      },
      events: {
        markers: {
          enable: ['click']
        }
      }
    });

    var vm = this;

    $scope.$on('leafletDirectiveMarker.canvasMap.click', function (event, args) {
      Locations.selected = Locations.locations[args.modelName];
      $log.info('marker:' + Locations.selected.message);
    });

    var connection = $window.connection;

    initAMQ(connection);

    function initAMQ(connection) {
      var receiver = connection.open_receiver('locations');

      receiver.on('message', function (context) {
        Locations.locations = context.message.body;
        angular.extend($scope, {
          markers: Locations.locations.map(a => a.location)
        });
      });
    }
  }]);

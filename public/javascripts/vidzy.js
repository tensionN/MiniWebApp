const app = angular.module('Vidzy', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-video', {
            templateUrl: '/partials/video-form.html',
            controller: 'AddVideoCtrl'
        })
        .when('/video/:id', {
            templateUrl: '/partials/video-form.html',
            controller: 'EditVideoCtrl'
        })
        .when('/video/delete/:id', {
            templateUrl: '/partials/video-delete.html',
            controller: 'DeleteVideoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource',
    ($scope, $resource) => {
    const Videos = $resource('/api/videos');
    Videos.query((videos) => {
        $scope.videos = videos;
    });
}]);

app.controller('AddVideoCtrl', ['$scope', '$resource', '$location',
    ($scope, $resource, $location) => {
    $scope.save = function() {
        const Videos = $resource('/api/videos');
        Videos.save($scope.video, () => {
            $location.path('/');
        });
    };
}]);

app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    ($scope, $resource, $location, $routeParams) => {
    const Videos = $resource('/api/videos/:id', {id: '@_id'}, {
        update: {method: 'PUT'}
    });

    Videos.get({id: $routeParams.id }, (video) => {
        $scope.video = video;
    });

    $scope.save = () => {
        Videos.update($scope.video, () => {
            $location.path('/');
        });
    }
}]);

app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    ($scope, $resource, $location, $routeParams) => {
    const Videos = $resource('/api/videos/:id');

    Videos.get({id: $routeParams.id}, (video) => {
        $scope.video = video
    });

    $scope.delete = () => {
        Videos.delete({id: $routeParams.id}, () => {
            $location.path('/');
        });
    }
}]);
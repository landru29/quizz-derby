angular.module('App').service('Resource', function($resource){
    return $resource('/noopy-api/public/quizz');
});

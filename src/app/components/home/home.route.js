angular.module('App').config(
	function($stateProvider) {
		'use strict';
		$stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        controllerAs: 'Home',
        templateUrl: 'app/components/home/home.view.html',
        translations: [
            'components/home'
        ]
    });
	}
);

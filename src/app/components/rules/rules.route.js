angular.module('App').config(
	function($stateProvider) {
		'use strict';
		$stateProvider.state('rules', {
        url: '/rules/:year/:subtitle',
        controller: 'RulesCtrl',
        controllerAs: 'Rules',
        templateUrl: 'app/components/rules/rules.view.html',
        translations: [
            'components/rules'
        ]
    });
	}
);

angular.module('App').controller('HomeCtrl',
	function(Resource, toaster, $translate) {
		'use strict';

		var self = this;
		this.text = "hello world";

		function loadQuizz() {
			self.questions = [];
			self.loading = true;
			Resource.get({count:1, level: 10}).$promise.then(function(resp){
				self.questions = resp.data;
			}, function(err) {
				toaster.pop('error', $translate.instant('error_occured'), err && err.data ? err.data : '');
			}).finally(function() {
				self.loading = false;
			});

		}

		function init() {
			loadQuizz();
		}

		init();
	}
);

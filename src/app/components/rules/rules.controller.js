angular.module('App').controller('RulesCtrl',
	function($stateParams, $resource, $sce, $timeout, $location, $anchorScroll, $q) {
		'use strict';

		var self = this;

        var res = $resource(
            '/assets/rules/:year/:page',
            {},
            {
                get:{
					url: '/assets/rules/:year/:page',
                    isArray: false,
                    interceptor: {
                        response: function(resp) {
                            return $sce.trustAsHtml(resp.data);
                        }
                    }
                },
				index: {
					url: '/assets/rules/:year/content.json',
                    isArray: false
				}
            }
        );

        function loadPage(year, subtitle, section, sub) {
			return $q.all([
				res.get({
	                year: year,
	                page: subtitle + '.html'
	            }).$promise,
				res.index({
	                year: year
	            }).$promise
			]).then(function(data) {
				self.html = data[0];
				self.content = data[1];
				self.h1 = self.content[sub[0]];
				if (self.h1) {
					self.h2 = self.h1.sub[sub[1]];
				}
				$timeout(function() {
					$location.hash(section);
            		$anchorScroll();
				});
			});
        }

		function init() {
            self.year = $stateParams.year.replace(/[^\d]/g, '');
			var subtitles = $stateParams.subtitle.split(/[^\d]/);
			var t1 = ('00' + subtitles[0]).substr(-2);
			var t2 = ('00' + subtitles[1]).substr(-2);
            return loadPage(self.year, t1 + '_' + t2, 'section_' + subtitles.join('_'), subtitles);
		}

		init();
	}
);

angular.module('App').controller('RulesCtrl',
	function($stateParams, $resource, $sce) {
		'use strict';

		var self = this;

        var res = $resource(
            "/assets/rules/:year/:page",
            {},
            {
                get:{
                    isArray: false,
                    interceptor: {
                        response: function(resp) {
                            return $sce.trustAsHtml(resp.data);
                        }
                    }
                }
            }
        );

        function loadPage(year, subtitle) {
            return res.get({
                year: year,
                page: subtitle + ".html"
            }).$promise.then(function(dataHtml) {
                self.html = dataHtml;
            });
        }

		function init() {
            self.year = $stateParams.year.replace(/[^\d]/g, '');
            var matcher = $stateParams.subtitle.match(/^(\d*)[^\d](\d*)/);
            var subtitle;
            if (matcher) {
                var t1 = '00' + matcher[1];
                var t2 = '00' + matcher[2];
                subtitle = t1.substr(-2) + '_' + t2.substr(-2);
                self.subtitle = subtitle.replace(/_/, '.');
            }
            return loadPage(self.year, subtitle);
		}

		init();
	}
);

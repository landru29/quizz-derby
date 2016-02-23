angular.module('App')
    .directive('ngReallyClick', function (dialogs) {
      'use strict';
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {

                element.bind('click', function (e) {

                    e.preventDefault();

                    var dlg = dialogs.confirm(attrs.ngReallyTitle ? attrs.ngReallyTitle : 'Confirm D, message', attrs.ngReallyMessage ? attrs.ngReallyMessage : 'confirm messages...');

                    // Use Apply $Dialog Service Method.
                    dlg.result.then(function () {

                        $scope.$eval(attrs.ngReallyClick);

                    }, function () {

                        $scope.$eval(attrs.ngReallyCancle);

                    });

                });

            }
        };
    })
    .directive('ngReallyHref', function (dialogs) {
      'use strict';
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {

                element.bind('click', function (e) {

                    e.preventDefault();
                    var dlg = dialogs.confirm('Confirm Dialog', attrs.ngReallyMessage ? attrs.ngReallyMessage : 'really href?');
                    dlg.result.then(function () {
                        window.location = attrs.href;
                    });


                });

            }
        };

    });

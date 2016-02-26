angular.module('App')
    .service('markdown', function () {

        var Markdown = function(source) {
            var markdown = marked(source ? source : '');
            if (!markdown) {
                return source;
            }

            return markdown.replace(/<a[^>]*>/, function (capture) {
                var attrs = capture.match(/<a([^>]*)>/);
                if (attrs[1]) {
                    return '<a target="_blank"' + attrs[1] + '>';
                } else {
                    return capture;
                }
            });
        };

        return Markdown;

    }
);

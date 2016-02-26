angular.module('App').component('mcqAnswer', {
    bindings: {
        model: "=?",
        next: "&",
        serie: "=?"
    },
    controllerAs: 'McqAnswer',
    templateUrl: 'app/components/mcq/mcq-answer/mcq-answer.html',
    controller: function(markdown) {
        'use strict';

        var self = this;

        this.done = function() {
            self.next({RESULT:self.model.scoring});
        };

        function init() {
            self.model.html = markdown(self.model.text);
            self.model.choices.forEach(function(choice) {
                choice.html = markdown(choice.text);
            });
            self.model.explainationHtml = markdown(self.model.explaination);
        }

        init();

    }
});

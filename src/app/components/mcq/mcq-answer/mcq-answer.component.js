angular.module('App').component('mcqAnswer', {
    bindings: {
        model: "=?",
        next: "&",
        serie: "=?"
    },
    controllerAs: 'McqAnswer',
    templateUrl: 'app/components/mcq/mcq-answer/mcq-answer.html',
    controller: function() {
        'use strict';

        var self = this;

        this.done = function() {
            self.next({RESULT:self.model.scoring});
        };

    }
});

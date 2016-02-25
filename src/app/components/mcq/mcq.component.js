angular.module('App').component('mcq', {
    bindings: {
        model: "=?"
    },
    controllerAs: 'Mcq',
    templateUrl: 'app/components/mcq/mcq.html',
    controller: function() {
        'use strict';

        var self = this;

        this.computeAnswers = function() {
                self.model.choices.forEach(function(choice) {
                    choice.checked = false;
                });
                if (self.answer) {
                    if (self.answer.single) {
                        self.model.choices[self.answer.single].checked = true;
                    }
                    if (self.answer.multi) {
                        Object.keys(self.answer.multi).forEach(function(index) {
                            self.model.choices[index].checked = self.answer.multi[index];
                        });
                    }
                }
                self.model.done = true;
        };
    }
});

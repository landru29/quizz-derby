angular.module('App').component('mcqQuestion', {
    bindings: {
        model: "=?",
        result: "&"
    },
    controllerAs: 'McqQuestion',
    templateUrl: 'app/components/mcq/mcq-question/mcq-question.html',
    controller: function() {
        'use strict';

        var self = this;

        function reformatAnswer(question, answer) {
                question.choices.forEach(function(choice) {
                    choice.checked = false;
                });
                if (answer) {
                    if (answer.single) {
                        question.choices[answer.single].checked = true;
                    }
                    if (answer.multi) {
                        Object.keys(answer.multi).forEach(function(index) {
                            question.choices[index].checked = answer.multi[index];
                        });
                    }
                }
                question.scoring = {
                    isOk: question.choices.reduce(function(total, choice) {
                        var result = ((choice.checked) && (choice.scoring > 0)) ||  ((!choice.checked) && (choice.scoring <= 0));
                        return total && result;
                    }, true),
                    value: question.choices.reduce(function(total, choice) {
                        var result = choice.checked ? choice.scoring : 0 ;
                        return total + result;
                    }, 0),
                    total: question.choices.reduce(function(total, choice) {
                        var result =  choice.scoring > 0 ? choice.scoring : 0 ;
                        return total + result;
                    }, 0)
                };
                question.done = true;
        }

        this.computeAnswers = function() {
            reformatAnswer(self.model, self.answer);
            self.result({RESULT:self.model.scoring});
        };
    }
});

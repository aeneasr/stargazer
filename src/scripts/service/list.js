/*global define */
define(['underscore'], function (_) {
    var List;

    List = function (data) {
        var current = 0,
            weights = [],
            items = [];
        _.each(data, function (v) {
            items.push(v);
            weights.push(v.weight);
        });
        this.totalWeight = eval(weights.join("+"));
        this.weightedItems = [];

        while (current < items.length) {
            for (var i = 0; i < weights[current]; i++) {
                this.weightedItems.push(items[current]);
            }
            current++;
        }
    };

    List.prototype.get = function () {
        var key = Math.floor(Math.random() * this.totalWeight);
        return this.weightedItems[key];

    };

    return List;
});
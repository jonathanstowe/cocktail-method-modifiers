var cocktail = require("cocktail");

var Util = function() {
    var stages = [ "before", "after", "around" ];
    var builders = {
        before: function(target, modifier) {
            return function() {
                modifier.apply(this, arguments);
                return target.apply(this, arguments);
            };
        },
        after: function(target, modifier) {
            return function() {
                var ret = target.apply(this, arguments);
                modifier.apply(this, arguments);
                return ret;
            };
        },
        around: function(target, modifier) {
            return function() {
                return modifier.apply(this, target, arguments);
            };
        }
    };
    return {
        setParameter: function(param) {
            var self = this;
            stages.forEach(function(stage) {
                var modifiers = param[stage];
                for (var p in modifiers) {
                    if (typeof modifiers[p] !== "function") {
                        throw new Error("before modifier " + p + " is not a function");
                    }
                }
                self["_" + stage] = modifiers;
            });
        },
        process: function(subject, options) {
            var self = this;
            var host = subject.prototype || subject;
            stages.forEach(function(stage) {
                var modifiers = self["_" + stage];
                for (var p in modifiers) {
                    if (host[p] && typeof host[p] === "function") {
                        var t = host[p];
                        var m = modifiers[p];
                        host[p] = builders[p](t, m);
                    } else {
                        throw new Error("modify target " + p + " does not exist or is not a function");
                    }
                }
            });
        }
    };
}();

cocktail.mix({
    "@exports": module,
    "@annotation": "modifiers",
    setParameter: Util.setParameter,
    process: Util.process
});

'use strict';

var cocktail  = require("cocktail"),
    Advisable = require("cocktail-trait-advisable");

var stages = [ "before", "after", "around" ];

cocktail.mix({
    "@annotation": "modifiers",
    "@exports"   : module,
    "as"         : "class",


    setParameter: function(param) {
        var self = this;
        stages.forEach(function(stage) {
            var modifiers = param[stage];
            for (var p in modifiers) {
                if (typeof modifiers[p] !== "function") {
                    throw new Error(stage + " modifier " + p + " is not a function");
                }
            }
            self["_" + stage] = modifiers;
        });
    },

    process: function(subject /*, options*/) {
        var self = this;
        var host = subject.prototype || subject;
        
        cocktail.mix(host, {
            "@traits": [ Advisable ]
        });
        
        stages.forEach(function(stage) {
            var modifiers = self["_" + stage];
            for (var p in modifiers) {
                if (host[p] && typeof host[p] === "function") {
                    var m = modifiers[p];
                    host[stage].apply(host, [ p, m ]);
                } else {
                    throw new Error("modify target " + p + " does not exist or is not a function");
                }
            }
        });
    }


});

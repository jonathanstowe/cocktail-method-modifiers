var cocktail = require('cocktail');

cocktail.mix({
	"@exports": module,
   "@annotation": "before",
   setParameter:	function(param) {
		for (var p in param ) {
			if ( typeof param[p] !== 'function' ) {
				throw new Error("before modifier " + p + " is not a function");
			}
		}
		this._before = param;
	},
	process:	function(subject, options ) {
		host   = subject.prototype || subject;
		for ( var p in this._before ) {
			if ( host[p] && typeof host[p] === 'function' ) {
				var t = host[p];
				var m = this._before[p];
				host[p] = function() {
					m.apply(this, arguments );
					return t.apply(this, arguments);
				};
			}
			else {
				throw new Error("modify target " + p + " does not exist or is not a function");
			}
		}
	},
});

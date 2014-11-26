var cocktail = require('cocktail');

var Test = function() {
	this.before_val = [];
   this.after_val = [];
   this.around_val = [];
};

Test.prototype.before_meth = function(arg) {
	this.before_val.push(arg);
   return this.before_val;
};
Test.prototype.after_meth = function(arg) {
	this.after_val.push(arg);
   return this.after_val;
};
Test.prototype.around_meth = function(arg) {
	this.around_val.push(arg);
   return this.around_val;
};

var Modifiers = require('../lib/method-modifiers');

cocktail.use(Modifiers);

cocktail.mix(Test, {
	"@exports": module,
	"@modifiers": {
		before: {
			before_meth:	function() {
				this.before_val.push('TEST_BEFORE');
			}
		},
		after: {
			after_meth:	function() {
				this.after_val.push('TEST_AFTER');
			}
		},
		around:	{
			around_meth:	function(orig) {
            var args = Array.prototype.slice.call(arguments, 1);
				this.around_val.push('TEST_AROUND_FIRST');
            orig.apply(this, args);
            this.around_val.push('TEST_AROUND_LAST');
            return this.around_val;
			}
		}
	}
});

QUnit.module("Modifier with Arguments");

test("before modifier", function() {
    var obj;
    ok(obj = new ModifierWithArgs(), "new object with before modifier");
    var ret;
    ok(ret = obj.before_meth("BEFORE"), "method with modifier");
    ok(typeof ret === "object", "got an array ");
    ok(ret.length == 2, "got an array with two items");
    ok(ret[0] == "TEST_BEFORE", "our modified thing is first");
    ok(ret[1] == "BEFORE", "original item is second");
});

test("after modifier", function() {
    var obj;
    ok(obj = new ModifierWithArgs(), "new object with after modifier");
    var ret;
    ok(ret = obj.after_meth("AFTER"), "method with modifier");
    ok(typeof ret === "object", "got an array ");
    ok(ret.length == 2, "got an array with two items");
    ok(ret[1] == "TEST_AFTER", "our modified thing is second");
    ok(ret[0] == "AFTER", "original item is second");
});

test("around modifier", function() {
    var obj;
    ok(obj = new ModifierWithArgs(), "new object with around modifier");
    var ret;
    ok(ret = obj.around_meth("AROUND"), "method with modifier");
    ok(typeof ret === "object", "got an array ");
    ok(ret.length == 3, "got an array with two items");
    ok(ret[0] == "TEST_AROUND_FIRST", "our first modified thing is second");
    ok(ret[1] == "AROUND", "original item is second");
    ok(ret[2] == "TEST_AROUND_LAST", "our second modified thing is last");
});

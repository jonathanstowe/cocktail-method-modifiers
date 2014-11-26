var testrunner = require("qunit");

testrunner.run({
    code: {
        path: __dirname + "/testcode_no_args.js",
        namespace: "ModifierNoArgs"
    },
    tests: __dirname + "/tests_no_args.js"
});

testrunner.run({
    code: {
        path: __dirname + "/testcode_args.js",
        namespace: "ModifierWithArgs"
    },
    tests: __dirname + "/tests_args.js"
});

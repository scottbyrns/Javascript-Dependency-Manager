

com.scottbyrns.JavascriptUnit.TestCase({
	setup: function () {},
	constructor: function (configuration) {
	        this.name = configuration.name || false;
	        this.unit = configuration.unit || false;
        
	        this.setup = configuration.setup || function () { console.log("No setup required."); };
	        this.teardown = configuration.teardown || function () { console.log("No teardown required."); };
        
	        this.setup.bind(this);
	        this.teardown.bind(this);
        
	        if (this.name === false || this.unit === false) {
	                throw new com.scottbyrns.JavascriptUnit.ConfigurationError();
	        }
        
	        this.tests = [];
	        for (var test in configuration.tests) {

	                if (configuration.tests.hasOwnProperty(test)) {

	                        var testMethod = configuration.tests[test];

                        
                                
	                        this.tests.push(function (test, testMethod) {
	                                console.log("Adding test method: " + test);
	                                return function () {
                                        
	                                        // Foundation.MessageController.sendMessage("test-executing", test);
	                                        // try {
	                                        //         console.log("Test Will Run");
	                                        //         Foundation.MessageController.sendMessage("test-results", testMethod.bind(this)());
	                                        //         console.log("Test Did Run");
	                                        // }
	                                        // catch (e) {
	                                        //         console.log("Test Did Fail");
	                                        //         console.error(e);
	                                        //         Foundation.MessageController.sendMessage("test-error", e);
	                                        // }
                                        
	                                }.bind(this);
	                        }.bind(this)(test, testMethod));
	                }
                
	        }
        
	},
	
	prototype: {
	        runTests : function () {
	                this.setup();
	                for (var i = 0; i < this.tests.length; i += 1) {
	                        try {
	                                console.log("Running test #" + (i + 1));
	                                this.tests[i]();
	                        }
	                        catch (e) {
	                                console.error(e);
	                        }
	                }
	                this.teardown();
	        }
	}
	
});


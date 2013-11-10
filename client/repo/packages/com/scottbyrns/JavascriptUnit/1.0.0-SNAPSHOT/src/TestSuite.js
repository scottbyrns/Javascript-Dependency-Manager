com.scottbyrns.JavascriptUnit.TestSuite({
	setup: function () {},
	constructor: function (configuration) {
	        this.name = configuration.name || false;
	        if (this.name === false) {
	                throw new com.scottbyrns.JavascriptUnit.ConfigurationError();
	        }
        
	        this.setup = configuration.setup || function () { console.log("No setup required."); };
	        this.teardown = configuration.teardown || function () { console.log("No teardown required."); };
        
	        this.setup.bind(this);
	        this.teardown.bind(this);
        
	        this.testCases = [];
        
	        if (configuration.testCases) {
	                for (var i = 0; i < configuration.testCases.length; i += 1) {
	                        this.testCases.push(configuration.testCases[i]);
                        
	                        // this.testCases[i]
	                }
	                console.log("TestSuite initial test cases loaded.", this);
	                // TODO find reference to each constructor and prepare it for lifecycle management.
	        }
	},
	prototype: {
	        runTestSuite: function () {
	                this.setup();
	                for (var i = 0; i < this.testCases.length; i += 1) {
	                        try {
	                                this.testCases[i].runTests();
	                        }
	                        catch (e) {
	                                console.error(e);
	                        }
	                }
	                this.teardown();
	        }
	}
});








com.scottbyrns.JavascriptUnit.Assert = {
	        /**
	         *  Assert that the input values are the same instances and values.
	         */
	        assertEquals: function () {
	                var lastArg = argument[0];
	                for (var i = 0; i < arguments.length; i += 1) {
	                        if (lastArg !== arguments[i]) {
	                                throw new com.scottbyrns.JavascriptUnit.Assert.AssertionError(arguments);
	                        }
	                }
	        },
	        /**
	         * Assert that the entries in two arrays are equal.
	         */
	        assertArraysEqual: function () {
                
	        },
	        /**
	         * Assert that the entries in two arrays are the same.
	         */
	        assertArraysSame: function () {
                
	        },
	        /**
	         * Assert that the entries in two arrays are not equal.
	         */
	        assertArraysNotEqual: function () {
                
	        },
	        /**
	         * Assert that the entries in two arrays are not the same.
	         */
	        assertArraysNotSame: function () {
                
	        },
	        /**
	         * Assert that the input objects are not the same in value.
	         */
	        assertNotSame: function () {
                
	        },
	        /**
	         * Assert the input value is undefined.
	         */
	        assertUndefined: function () {
                
	        },
	        /**
	         * Assert the input value is not undefined.
	         */
	        assertNotUndefined: function () {
	                for (var i = 0; i < arguments.length; i += 1) {
	                        if (arguments[i] === undefined) {
	                                throw new com.scottbyrns.JavascriptUnit.Assert.AssertionError(arguments);
	                        }
	                }
	        },
	        AssertionError: function () {
	                this.error = arguments;
	        },
	        /**
	         *        Assert that the input objects are the same in type and value.
	         */
	        assertSame: function () {
                
	        },
	        /**
	         *        Fail checks automatically. An error condition was met.
	         */
	        fail: function () {
                
	        }

};

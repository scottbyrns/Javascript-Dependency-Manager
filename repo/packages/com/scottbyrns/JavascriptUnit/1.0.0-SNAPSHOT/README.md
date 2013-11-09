JavascriptUnit
==============

Pub/Sub backed lifecycle management for simple javascript unit testing.

This library is a stub at the moment.

###Key Concepts

Unit tests are tests of indavidual units of software that function more or less independently. Each unit being tested is encapsulated in a test case. Each TestCase has one to many tests. Each test examines a unique vector of the test case on a unit. 

#####Example TestCase:

```javascript
var alertDialogTestCase = new TestCase({
	name: "Test Alert Dialog",
	unit: alert,
	tests: {
		"test that alert is available for use": function () {
			Assert.assertNotUndefined(this.unit);
		},
		"test displaying alert dialog box": function () {
			// Now I know alert doesn't return a bool here but I couldn't think of a better example at the moment so I fudged the api.
			Assert.assertTrue(alert("test"));
		}
	},
	// Setup the test.
	setup: function () {
		
	},
	// Tear any resources down that are no longer needed.
	teardown: function () {
		
	}
});
```


Once you have constructed a TestCase we add it to a TestSuite which is simply a grouping of related TestCases that are run together to validate related units of software.

#####TestSuite Example:

```javascript
var dialogsTestSuite = new TestSuite({
	name: "Dialogs Test Suite",
	// Keep appending your test cases to this array.
	testCases: [alertDialogTestCase],
	setup: function () {
		
	},
	teardown: function () {
		
	}
});
```


#####Running Tests

```javascript

myTestSuite.runTestSuite()

```
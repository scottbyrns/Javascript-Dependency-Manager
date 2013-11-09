// jobs who build targets

com.scottbyrns.BuildSystem.Job({
	setup: function () {},
	constructor: function (build) {
		this.build = build;
	},
	prototype: {
		start: function () {},
		cancel: function () {},
		report: function () {}
	}
})
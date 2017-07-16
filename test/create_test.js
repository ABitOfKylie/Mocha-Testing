const assert = require("assert");
const User = require("../src/user");

describe ("Creating records", () => {
	it("saves a user", (done) => {
		const joe = new User ({name: "Joe"});

		joe.save ()
			.then(() => {
				//has joe been saved successfully?
				//.isNew = flag on the instance if instance NOT saved result:=true
				// we are saying if joe is NOT! not saved we will get true which means he's been saved to the db
			assert (!joe.isNew);
			done();
			});
	});
});
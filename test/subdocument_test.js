const assert = require("assert");
const User = require("../src/user");

describe ("Subdocuments", () => {
	it("can create a subdocument", (done) => {
		const joe = new User ({
			name: "Joe",
			posts: [{title: "PostTitle"}]
		});

		joe.save()
			.then(() => User.findOne ({ name: "Joe"}))
			.then((user) => {
				assert(user.posts[0].title === "PostTitle");
				done();
			});
	});
	it("can add subdocuments to an existing record", (done) => {
		const joe = new User ({
			name: "Joe",
			posts: []
		});

		joe.save()
			.then(() => User.findOne({ name: "Joe"}))
			// note no curly braces cuz fat arrow 'returns' the promise so .then can work
			.then((user) => {
				user.posts.push({title: "NewPost"});
				return user .save(); // return is necessary to return the promise then can add on another .then
			})
			.then(() => User.findOne ({ name: "Joe"}))
			.then((user) => {
				assert (user.posts[0].title === "NewPost");
				done();		
			});
	});	
	it("can remove subdocuments to an existing record", (done) => {
		const joe = new User ({
			name: "Joe",
			posts: [{title: "NewTitle"}]
		});

		joe.save()
			.then(() => User.findOne({ name: "Joe"}))
			// note no curly braces cuz fat arrow 'returns' the promise so .then can work
			.then((user) => {
				user.posts[0].remove();
				// above same as const post = user.posts[0]; post.remove();
				return user.save(); // return is necessary to return the promise then can add on another .then
			})
			.then(() => User.findOne ({ name: "Joe"}))
			.then((user) => {
				assert (user.posts.length === 0);
				done();		
			});
	});	
});
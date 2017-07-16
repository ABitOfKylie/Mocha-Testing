const assert = require("assert");
const User = require("../src/user");

describe ("Reading users out of the db", () => {
	let joe, maria, alex, zach;

	beforeEach((done) => {
		alex = new User({name: "Alex"});
		joe = new User({name: "Joe"});
		maria = new User({name: "Maria"});
		zach = new User({name: "Zach"});

		Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
			.then(() => done());
	});

	it("finds all users with name of joe", (done) => {
		User.find({ name: "Joe"})
			.then((users) => {
				console.log(users);
				// necessary to .toString so it takes out id string from the ObjectId wrapper that Mongoose creates automatically
				//_id is actually an ObjectId and not just a raw string
				assert(users[0]._id.toString() === joe._id.toString());
					// console.log(users._id.toString() + "users second string");
					console.log( "this is just the string" + joe._id.toString());

				done();
			});
	});

	it("find a user with particular id", (done) => {
		User.findOne({ _id: joe._id})
			.then ((user) => {
				assert (user.name === "Joe");
				done();
			});

	it("can skip and limit the result set", (done) => {
		// slip Alex, limit two so no Zach
		User.find({})
			.sort({name: 1}) //name = key, 1= ascending, -1 = descendig
			.skip(1)
			.limit(2)
			.then((users) => {
				assert(users.length === 2);
				assert(users[0] === "Joe");
				assert(users[1] === "Maria");
				

				done();
			})
	});
	});
});
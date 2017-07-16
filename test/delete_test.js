const assert = require("assert");
const User = require("../src/user");

describe ("Reading users out of the db", () => {
	let joe;


	beforeEach((done) => {
		joe = new User({name:"Joe"});
		joe.save ()
			.then(() => done());
	});

	it("model Instance remove", (done) => {
		joe.remove()
			.then(() => User.findOne({name:"Joe"}))
			.then((user) =>{
				assert (user === null);
				done();
			});	
	});	

	it("class Method Remove", (done) => {
	//remove a bunch of records with some criteria
		User.remove({name:"Joe"})
			.then(() => User.findOne({name:"Joe"}))
			.then((user) => {
				assert (user === null);
				done();
			});	
	});	
// findOneAndRemove good one for specific,unique record such as an email
  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

	  it('class method findByIdAndRemove', (done) => {
	    User.findByIdAndRemove(joe._id)
	      .then(() => User.findOne({ name: 'Joe' }))
	      .then((user) => {
	        assert(user === null);
	        done();
	      });	
	});
});
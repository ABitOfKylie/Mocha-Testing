const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assert = require ('assert');
const User = require('../src/user');
const BlogPost = require ('../src/blogPost');


describe ('Middleware', () => {
	let joe, blogPost;
	beforeEach ((done) => {
		joe = new User({ name: "Joe"});
		blogPost = new BlogPost({ title: "JS Is Great", content: "Yep, it sure is!" });

		//User has many blog posts
		joe.blogPosts.push(blogPost); //joe has a collection of blogPosts, I want him to have a new assoc so push the entire blogPost model from above variable blogPost, but Mongoose knows better and will just get the SchemaObjectId  not whole model

		//native function --binds all into single promise
		Promise.all([joe.save(), blogPost.save()])
			.then(() => done());
	}); 

	it("users clean up dangling blog posts on remove", (done) => {
		joe.remove()    //BlogPost is the model
			.then(() => BlogPost.count ())
			.then((count) => {
				assert(count === 0);
				done();
			});
	});
});
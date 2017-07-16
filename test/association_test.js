const mongoose = require("mongoose");
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Associations', () => {
	let joe, blogPost, comment; // lowercase repr instance of vs up top Uppercase ref models

	beforeEach ((done) => {
		joe = new User({ name: "Joe"});
		blogPost = new BlogPost({ title: "JS Is Great", content: "Yep, it sure is!" });
		comment = new Comment({content: "I certainly think it's challenging"});

		//User has many blog posts
		joe.blogPosts.push(blogPost); //joe has a collection of blogPosts, I want him to have a new assoc so push the entire blogPost model from above variable blogPost, but Mongoose knows better and will just get the SchemaObjectId  not whole model
		blogPost.comments.push(comment); //blogpost has many comments
		comment.user = joe; // comment has only one user, mongoose has a setter in the background, just want a reference

		//native function --binds all into single promise
		Promise.all([joe.save(), blogPost.save(), comment.save()])
			.then(() => done());
		}); 
	

  		it('it saves a relation btwn a user and a blogPost', (done) => {
		    User.findOne({ name: "Joe"})
		    	.populate('blogPosts')
		    	.then((user)=> {
		    		assert(user.blogPosts[0].title === "JS Is Great")
		    		console.log(user);
		    		done();
		    	});
		   	
	   	});
	   	it("it saves a full relation graph", (done) => {
		    User.findOne({ name: "Joe"})
		    	.populate({
		    		path:'blogPosts',
		    		populate: {
		    			path:'comments',
		    			model:'comment',
		    			populate: {
		    				path:'user',
		    				model:'user',
		    			}
		    		}
	    		})
		    	.then((user) => {
		    		// console.log(user.blogPosts[0].comments[0]);
		    		assert(user.name === 'Joe');
		    		assert(user.blogPosts[0].title === "JS Is Great");
		    		assert(user.blogPosts[0].comments[0].content === "I certainly think it's challenging");
		    		assert(user.blogPosts[0].comments[0].user.name === "Joe");

		    		done();
		    	});
	   	});
});
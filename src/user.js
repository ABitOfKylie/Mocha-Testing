const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require('./postSchema');


const UserSchema = new Schema({
	name: {
		type: String,
		// postCount: Number,
		validate: {
			validator: (name) => name.length > 2,
			message: "Name must be longer than 2 characters."
		},
		required: [true, "Name is required."]
	},
	// postCount: Number,
	posts: [PostSchema],//document embedding. see postSchema file
	// blogPost
	likes: Number,

	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPost'
	}]
});

UserSchema.virtual("postCount").get (function(){
	return this.posts.length;
});

UserSchema.pre('remove', function(next){ //note used keyword function --- so model instance is available as this
					// this === joe, this instance 
	const BlogPost = mongoose.model('blogPost');
	//when written like this, won't be called until it gets here instead of require blogPost above, avoid cyclical loading issue

	//remember blogPosts is an array of _ids
	//look into blogPosts if the id is in that array, then I want to remove it
	BlogPost.remove({_id: { $in: this.blogPosts } })
		.then(() => next());
});


const User = mongoose.model("user", UserSchema);

module.exports = User;
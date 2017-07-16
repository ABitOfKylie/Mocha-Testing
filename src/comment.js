const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
	content: String,
	// single user associated with a comment
	// only going to define a configuration obj NOT an array + config obj [{titles: }]
	user: {type: Schema.Types.ObjectId, ref: 'user'}
	// note ref: 'user' refers to the 'user' in mongoose.model("user", UserSchema);in user.js'
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;

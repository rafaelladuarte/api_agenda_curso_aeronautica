var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	username: String,
	password: String,
	OauthId: String,
	OauthToken: String,
	firstname:{
		type: String,
		default: ''
	},
	lastname :{
		type: String,
		default: ''
	},
	foto:{
		type: String
	},
	admin: {
		type: Boolean,
		default: false
	},
	email:{
		type: String
	},
	feitas: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
	}]
});

User.methods.getName = function(){
	return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
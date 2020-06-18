var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var shareSchema = new Schema({
	userDestino:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	userRemetente:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	nome: {
		type: String,
		required: true,		
	},
	description:{
		type: String,
		required: false
		
	},
	idAgenda:{
		type: String,
		required: true
	},
	visto:{
		type: Boolean,
		default: false
	},

},{
		timestamps: true
});

var Shares = mongoose.model('Share', shareSchema, 'shares');

module.exports = Shares;
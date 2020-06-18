var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var classSchema = new Schema({
	nome:{
		type: String,
		required: true
	},
	codigo:{
		type: String,
		required: true
	},
	curso:{
		type: String,
		required: true
	},
	periodo: {
		type: String,
		required: true
	},
	obrigatoria: {
		type: Boolean,
		required: true
	},
	horarios:[{
		type: Number
	}],
	cargaHorariaTeorica: {
		type: Number
	},
	cargaHorariaPratica: {
		type: Number
	},
	labs:[{
		nome:{
			type: String,
			required: true
		},
		horarios:[{
			type: Number
		}],
		selected:{
			type: Boolean,
			default: false
		}
	}],
	preRequisitos: [{
		type: String
	}],
	coRequisitos: [{
		type: String
	}],
	selected:{
		type: Boolean,
		default: false
	},
	color:{
		type: String,
		default: ""
	},
	imagem:{
		type: String,
		required: true
	}
});


var Classes = mongoose.model('Class', classSchema);

module.exports = Classes;
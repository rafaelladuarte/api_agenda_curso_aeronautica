var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var agendaSchema = new Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	aulas: [{
			 _id:{
			 	type: String
			 },
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
					type: Boolean
				}
			}],
			preRequisitos: [{
				type: String
			}],
			coRequisitor: [{
				type: String
			}],
			selected:{
				type: Boolean
			},
			color:{
				type: String
			},
			imagem:{
				type: String
			}

	}],
	nome: {
		type: String,
		required: true,		
	},
	description:{
		type: String,
		required: false
		
	}
},{
		timestamps: true
});

var Agendas = mongoose.model('Agenda', agendaSchema);

module.exports = Agendas;
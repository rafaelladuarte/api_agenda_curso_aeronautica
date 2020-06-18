var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var selecionadasSchema = new Schema({
    aulas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Selecionadas = mongoose.model('Selecionada', selecionadasSchema);

module.exports = Selecionadas;
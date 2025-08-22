const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true,
		lowercase: true
	},

	password:{
		type: String,
		required: true
	}
});

const Founder = mongoose.model('Founder', founderSchema);

module.exports = {
	Founder
}

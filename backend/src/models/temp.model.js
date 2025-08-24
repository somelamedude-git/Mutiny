const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
	email: {
		type: email,
		required: true,
		lowercase: true
	},

	mailToken: {
		type: String
	},

	mailTokenExp: {
		type: Date
	}
});




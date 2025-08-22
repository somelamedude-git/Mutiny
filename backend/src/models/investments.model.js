const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
	investor:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Investor',
		required: true
	}],

	founders:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Founder',
			required: true
		}],

});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = {
	Investment
}



const mongoose = require("mongoose");

const UserModel = mongoose.model(
	"User",
	new mongoose.Schema(
		{
			email: {
				type: String,
				unique: true,
				required: [true, "Please enter an email"],
			},
			password: {
				type: String,
				required: [true, "Please enter a password"],
				min: 8,
			},
			firstName: { type: String },
			surname: { type: String },
			dateOfBirth: { type: Date },
		},
		{
			timestamps: true,
		}
	)
);

module.exports = UserModel;

const mongoose = require("mongoose");

const AuthorModel = mongoose.model(
	"Author",
	new mongoose.Schema(
		{
			name: { type: String, required: true },
			nationality: { type: String, required: true },
			books: [{ type: String, required: true }],
		},
		{
			timestamps: true,
		}
	)
);

module.exports = AuthorModel;

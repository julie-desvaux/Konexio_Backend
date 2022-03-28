const mongoose = require("mongoose");

const HeroModel = mongoose.model(
	"Hero",
	new mongoose.Schema(
		{
			name: { type: String, required: true },
			power: [{ type: String, required: true }],
			color: { type: String, required: true },
			isAlive: { type: Boolean, required: true },
			age: { type: Number, required: true },
			image: { type: String },
		},
		{
			timestamps: true,
		}
	)
);

module.exports = HeroModel;

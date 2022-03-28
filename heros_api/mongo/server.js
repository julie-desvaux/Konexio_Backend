const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Hero = require("./model/HeroModel");
dotenv.config({
	path: "../.env",
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// DB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
	})
	.then(() => console.log("Connected to MongoDB"));

// MIDDLEWARES
function debug(_req, _res, next) {
	console.log("Request received");
	next();
}

// function transformName(req, _res, next) {
// 	console.log(req.body);
// 	if (req.body.name) {
// 		req.body.name = req.body.name.toLowerCase().replace(" ", "-");
// 	}
// 	next();
// }

function findHero(req, _res, next) {
	req.params.name = req.params.name.toLowerCase().replace(" ", "-");
	next();
}

app.use(express.json());
app.use(debug);

// ROUTES
app.get("/heroes", async (_req, res) => {
	try {
		const heros = await Hero.find();
		res.json({
			success: true,
			data: heros,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error,
		});
	}
});

app.get("/heroes/:name", findHero, async (req, res) => {
	try {
		const hero = await Hero.findOne({ name: req.params.name });
		res.json({
			success: true,
			data: hero,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error,
		});
	}
});

app.get("/heroes/:name/powers", findHero, async (req, res) => {
	try {
		const hero = await Hero.findOne({ name: req.params.name }).select("power");
		res.json({
			success: true,
			data: hero,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error,
		});
	}
});

app.post("/heroes", async (req, res) => {
	try {
		const hero = await Hero.create(req.body);
		res.json({
			success: true,
			data: hero,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error,
		});
	}
});

app.patch("/heroes/:name/powers", findHero, async (req, res) => {
	try {
		await Hero.updateOne({ name: req.params.name }, { $push: { power: req.body.power } });

		res.json({
			success: true,
			message: "Power added",
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error,
		});
	}
});

// HANDLE ERRORS
app.get("*", (_req, res) => {
	res.status(404).send("Page not found");
});

// START SERVER
app.listen(PORT, () => console.log(`Listening on port : ${PORT}`));

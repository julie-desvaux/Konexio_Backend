const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
	path: "../.env",
});
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 8000;

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// MIDDLEWARES
function debug(_req, _res, next) {
	console.log("Request received");
	next();
}

function transformName(req, _res, next) {
	if (req.body.name) {
		req.body.name = req.body.name.toLowerCase();
	}
	next();
}

function findHero(req, _res, next) {
	req.params.name = req.params.name.toLowerCase().replace(" ", "-");
	next();
}

app.use(express.json());
app.use(debug);

// ROUTES
app.get("/heroes", async (_req, res) => {
	try {
		const heros = await Postgres.query("SELECT * FROM heros ");
		res.json({
			success: true,
			data: heros.rows,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: "id not correct",
		});
	}
});

app.get("/heroes/:name", findHero, async (req, res) => {
	try {
		const hero = await Postgres.query("SELECT * FROM heros WHERE name=$1", [req.params.name]);
		res.json({
			success: true,
			data: hero.rows,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: "id not correct",
		});
	}
});

app.get("/heroes/:name/powers", findHero, async (req, res) => {
	try {
		const hero = await Postgres.query("SELECT power FROM heros WHERE name=$1", [req.params.name]);
		res.json({
			success: true,
			data: hero.rows,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: "id not correct",
		});
	}
});

app.post("/heroes", transformName, async (req, res) => {
	try {
		const hero = await Postgres.query(
			"INSERT INTO heros(name, power, color, isalive, age, image ) VALUES($1, $2, $3, $4, $5, $6)",
			[req.body.name, req.body.power, req.body.color, req.body.isalive, req.body.age, req.body.image]
		);
		console.log({ hero });
		res.status(200).json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: "id not correct",
		});
	}
});

app.patch("/heroes/:name/powers", async (req, res) => {
	try {
		await Postgres.query("UPDATE heroes SET power = array_append( power, $1) WHERE heroes.name = $2;", [
			req.body.power,
			req.params.name,
		]);
		res.json({
			message: "power added",
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: "id not correct",
		});
	}
});

// START SERVER
app.listen(PORT, () => console.log(`Listening on port : ${PORT}`));

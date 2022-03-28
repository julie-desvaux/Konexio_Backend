const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
	path: "../.env",
});
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// ROUTES
app.get("/", (_req, res) => {
	res.send("Authors API");
});

app.get("/authors/:id", async (req, res) => {
	try {
		const author = await Postgres.query("SELECT * FROM authors WHERE id=$1", [req.params.id]);
		console.log(author.rows);
		res.send(`${author.rows[0].name}, ${author.rows[0].nationality}`);
	} catch (error) {
		console.log(error);
		return res.send(error);
	}
});

app.get("/authors/:id/books", async (req, res) => {
	try {
		const books = await Postgres.query("SELECT books FROM authors WHERE id=$1", [req.params.id]);
		res.send(books.rows[0].books.join(", "));
	} catch (error) {
		console.log(error);
		return res.send(error);
	}
});

app.get("/json/authors/:id", async (req, res) => {
	try {
		const author = await Postgres.query("SELECT * FROM authors WHERE id=$1", [req.params.id]);
		res.status(200).json({
			success: true,
			data: author.rows,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: "id not correct",
		});
	}
});

app.get("/json/authors/:id/books", async (req, res) => {
	try {
		const books = await Postgres.query("SELECT books FROM authors WHERE id=$1", [req.params.id]);
		res.json({
			success: true,
			data: books.rows[0].books,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: "id not correct",
		});
	}
});

// HANDLE ERRORS
app.get("*", (_req, res) => {
	res.status(404).send("Page not found");
});

// START THE SERVER
app.listen(PORT, () => {
	console.log(`Listening on port : ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Author = require("./model/AuthorModel");
dotenv.config({
	path: "../.env",
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
	})
	.then(() => console.log("Connected to MongoDB"));

// ROUTES
app.get("/", (_req, res) => {
	res.send("Authors API");
});

app.get("/authors/:id", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);
		res.send(`${author.name}, ${author.nationality}`);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

app.get("/authors/:id/books", async (req, res) => {
	try {
		const books = await Author.findById(req.params.id).select("books");
		console.log(books);
		res.send(books.books.join(", "));
	} catch (error) {
		console.log("error :", error);
		res.status(400).send(error);
	}
});

app.get("/json/authors", async (_req, res) => {
	try {
		const authors = await Author.find();
		res.json({
			success: true,
			data: authors,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error,
		});
	}
});

app.get("/json/authors/:id", async (req, res) => {
	console.log(req.params.id);
	try {
		const author = await Author.findById(req.params.id);
		console.log(author);
		res.json({
			success: true,
			data: author,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error,
		});
	}
});

app.get("/json/authors/:id/books", async (req, res) => {
	try {
		const books = await Author.findById(req.params.id).select("books");
		res.status(200).json({
			success: true,
			data: books,
		});
	} catch (error) {
		console.log("error :", error);
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

// START THE SERVER
app.listen(PORT, () => {
	console.log(`Listening on port : ${PORT}`);
});

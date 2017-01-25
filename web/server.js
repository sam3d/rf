const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");

/*
 * All of the different lights that can be controlled using this particular
 * application instance should be stored in the lights object below.
 */
let lights = [
	{
		name: "Left Desk Lamp",
		signal: { on: "0101000101010101001100110", off: "0101000101010101001111000" }
	},
	{
		name: "Right Desk Lamp",
		signal: { on: "0101000101010101110000110", off: "0101000101010101110011000" }
	},
	{
		name: "Left Floor Lamp",
		signal: { on: "0101000101010111000000110", off: "0101000101010111000011000" }
	},
	{
		name: "Right Floor Lamp",
		signal: { on: "0101000101011101000000110", off: "0101000101011101000011000" }
	},
	{
		name: "Bedroom Floor Lamp",
		signal: { on: "0101000101110101000000110", off: "0101000101110101000011000" }
	}
];

// Redirect any http requests to https
http.createServer(express().get("*", (req, res) => {
	res.redirect("https://samholmes.xyz" + req.url);
})).listen(80);

// Basic express app
let app = express();

app.get("*", (req, res) => {
	res.send("Hello, world!");
});

// Host the https server
https.createServer({
	key: fs.readFileSync("/etc/letsencrypt/live/samholmes.xyz/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/samholmes.xyz/cert.pem")
}, app).listen(443, err => {
	if (err) throw err;
	console.log(`Listening on port 443`);
});

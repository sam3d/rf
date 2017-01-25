const express = require("express");

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

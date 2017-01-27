const Wemo = require("fauxmojs");
const execFile = require("child_process").execFile;

let s = c => {
	console.log("Recieved a signal request for " + c.join(", "));
	execFile("/opt/rf/signal", c);
}

let d = {
	desk: {
		left: {
			on: "0101000101010101001100110",
			off: "0101000101010101001111000"
		},
		right: {
			on: "0101000101010101110000110",
			off: "0101000101010101110011000"
		}
	},
	floor: {
		left: {
			on: "0101000101010111000000110",
			off: "0101000101010111000011000"
		},
		right: {
			on: "0101000101011101000000110",
			off: "0101000101011101000011000"
		},
		bedroom: {
			on: "0101000101110101000000110",
			off: "0101000101110101000011000"
		}
	}
};

let lights = {
	on: [
		"0101000101010101001100110",
		"0101000101010101110000110",
		"0101000101010111000000110",
		"0101000101011101000000110",
		"0101000101110101000000110"
	],
	off: [
		"0101000101010101001111000",
		"0101000101010101110011000",
		"0101000101010111000011000",
		"0101000101011101000011000",
		"0101000101110101000011000"
	]
}

let wemo = new Wemo({
	ipAddress: "192.168.1.68",
	devices: [
		{
			name: "desk",
			port: 11000,
			handler: c => { c === "on" ? s([d.desk.left.on, d.desk.right.on]) : s([d.desk.left.off, d.desk.right.off]) }
		},
		{
			name: "bedroom",
			port: 11001,
			handler: c => { c === "on" ? s([d.floor.bedroom.on]) : s([d.floor.bedroom.off]) }
		},
		{
			name: "lights",
			port: 11002,
			handler: c => { c === "on" ? s(lights.on) : s(lights.off) }
		}
	]
});

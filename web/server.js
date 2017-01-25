const Wemo = require("fauxmojs");
const execFile = require("child_process").execFile;

let s = c => {
	execFile("/root/rf/controllers/switch", [c]);
}

let wemo = new Wemo({
	ipAddress: "192.168.1.68",
	devices: [
		{
			name: "left desk lamp",
			port: 11000,
			handler: c => { c === "on" ? s("0101000101010101001100110") : s("0101000101010101001111000") }
		},
		{
			name: "right desk lamp",
			port: 11001,
			handler: c => { c === "on" ? s("0101000101010101110000110") : s("0101000101010101110011000") }
		},
		{
			name: "left floor lamp",
			port: 11002,
			handler: c => { c === "on" ? s("0101000101010111000000110") : s("0101000101010111000011000") }
		},
		{
			name: "right floor lamp",
			port: 11003,
			handler: c => { c === "on" ? s("0101000101011101000000110") : s("0101000101011101000011000") }
		},
		{
			name: "bedroom floor lamp",
			port: 11004,
			handler: c => { c === "on" ? s("0101000101110101000000110") : s("0101000101110101000011000") }
		}
	]
});

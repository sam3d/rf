const execFile = require("child_process").execFile;
const path = require("path");
const express = require("express");
const fs = require("fs-extra");
const ip = require("ip");
const chalk = require("chalk");
const Wemo = require("fauxmojs");

/* If the IP address is 127.0.0.1, the network hasn't been configured properly.
 * Restart the program and keep attempting until the network has resolved to
 * a valid IP address
 */
if (ip.address() === "127.0.0.1") process.exit(1);

// Import configuration
let { sockets, groups, sockPath, port } = require("../config");

/*
 * This is a total output signal of a socket. A sample signal looks like this:
 * 0101 0001 0101 0101 0011 1100 0. The first byte appears to be a header as
 * over all of my available sockets, it doesn't change (0101 0001). The next
 * three nibbles appear to be the socket identifier (0101 0101 0011, 0x553).
 * Finally there's the 'on' (0011) and 'off' (1100) signal followed by a simple
 * check bit (0). This constructs the header + identifier + status + check.
 */
class Signal {
	constructor(identifier, status) {
		this.header = 0b01010001;
		this.identifier = identifier;
		this.status = status ? 0b0011 : 0b1100;
		this.check = 0b0;
	};

	toString() {
		let str = "";
		let b = (int, bits) => (int >>> 0).toString(2).padStart(bits, "0").substring(0, bits);

		str += b(this.header, 8);
		str += b(this.identifier, 12);
		str += b(this.status, 4);
		str += b(this.check, 1);

		return str;
	};
};

// Return the current timestamp
let timestamp = () => {
	return chalk.grey("[" + new Date().toLocaleString() + "] ");
};

// Trigger and log the signal request
let trigger = (group, status) => {
	console.log(timestamp() + "Set " + chalk.blue(group.name) + " group to " + (status ? chalk.green("ON") : chalk.red("OFF")) + chalk.grey(" (" + group.sockets.join(", ") + ")"));

	let signals = [];

	for (let j = 0; j < group.sockets.length; j++) {
		let socket = group.sockets[j];
		signals.push(new Signal(sockets[socket], status).toString());
	}

	signal(signals);
};

// Pass the signal request to script
let signal = signals => {
	console.log(timestamp() + chalk.grey("433.72 MHz Broadcast: " + signals.join(", ")));
	execFile(path.resolve(__dirname, "signal"), signals);
};

// Construct the Wemo options object
let opts = {
	ipAddress: ip.address(),
	devices: []
};

// Place devices into options object
for (let i = 0; i < groups.length; i++) {
	let group = groups[i];

	opts.devices.push({
		name: group.name,
		port: (port + i),
		handler: action => trigger(group, (action === "on"))
	});
}

// Start WEMO server
new Wemo(opts);

// Create and start simple socket server
let app = express();

app.get("/:group/:status", (req, res) => {
	let params = req.params;
	let group = groups.find(group => group.name === params.group);

	if (!group) res.send(`Could not find group "${group}"`);
	else {
		trigger(group, (params.status === "on"));
		res.send(`Turned ${group.name} ${params.status}`);
	}
});

fs.removeSync(sockPath);
app.listen(sockPath);

console.log(chalk.grey("Socket server started at ") + chalk.green(sockPath));
console.log(chalk.grey("Wemo server started at ") + chalk.green(ip.address()));
console.log(chalk.blue(groups.length) + chalk.grey(" groups registered:"));

for (let i = 0; i < opts.devices.length; i++) {
	let device = opts.devices[i];
	console.log("  \"" + device.name + "\": " + opts.ipAddress + ":" + chalk.blue(device.port));
}

console.log(chalk.grey("\nLog output will be printed below:"));

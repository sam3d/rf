module.exports = {
	sockPath: "/var/run/rf.sock",
	port: 11000,

	sockets: {
		"0304-1": 0x553,
		"0304-2": 0x55C,
		"0304-3": 0x570,
		"0304-4": 0x5D0,
		"0304-5": 0x750
	},

	groups: [
		{
			name: "everything",
			sockets: ["0304-1", "0304-2", "0304-3", "0304-4", "0304-5"]
		},
		{
			name: "lights",
			sockets: ["0304-1", "0304-2", "0304-3", "0304-5"]
		},
		{
			name: "lamps",
			sockets: ["0304-1", "0304-2", "0304-5"]
		},
		{
			name: "desk lamps",
			sockets: ["0304-1", "0304-2"]
		},
		{
			name: "soft lights",
			sockets: ["0304-1", "0304-2", "0304-3"]
		},
		{
			name: "bedside lamp",
			sockets: ["0304-5"]
		},
		{
			name: "heater",
			sockets: ["0304-4"]
		},
		{
			name: "tree",
			sockets: ["0304-3"]
		}
	]
};

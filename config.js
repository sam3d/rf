let sockets = {
	"0304-1": 0x553,
	"0304-2": 0x55C,
	"0304-3": 0x570,
	"0304-4": 0x5D0,
	"0304-5": 0x750
};

let groups = [
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
		name: "heater",
		sockets: ["0304-4"]
	},
	{
		name: "tree",
		sockets: ["0304-3"]
	}
];

module.exports = { sockets, groups };

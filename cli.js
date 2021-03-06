#!/usr/bin/env node
const request = require("request");

// Import configuration
let { sockets, groups } = require("./config");

const sockPath = "/var/run/rf.sock";

parseArgs();

function sendCommand(group, status) {
    let url = `http://unix:${sockPath}:/${group}/${status}`;
    request.get(url, (err, res, body) => console.log(body));
}

function parseArgs() {
    let args = process.argv;

    let group = args[2];
    let status = args[3];

    if (!group && !status) printHelp("You need to provide both a group and status!");
    else if (!group) printHelp("You didn't provide a group!");
    else if (!status) printHelp("You didn't provide a status!");

    sendCommand(group, status);
}

function printHelp(err) {
    if (err) console.log(`Error: ${err}\n`);

    console.log(`Usage: rf [group] [status]

Where [group] is one of the groups listed below, and [status]
is either "on" or "off"

Groups:`);

    groups.forEach(group => {
        console.log("  - " + group.name);
    });

    console.log();
    process.exit(err ? 1 : 0);
}

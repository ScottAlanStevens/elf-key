#!/usr/bin/node
var { Device } = require("./types");

async function main() {
  const devices = await Device.getDevices();
  let device = new Device(devices[0].path);

  device.readKeys();
  device.close();
}

main();

var { readKeyCmd, setKeyValueCmd, readModelCmd } = require("./constants");
var HID = require("node-hid");
var { bytesToString, buildBytes, sleep } = require("./helpers");

class Device {
  #hid = null;
  name = null;
  version = null;

  constructor(path) {
    this.hid = new HID.HID(path);
    this.readModel();
  }

  static async getDevices() {
    var devices = await HID.devicesAsync();
    var items = devices.filter(
      (d) =>
        d.manufacturer === "PCsensor" &&
        d.usagePage == 1 &&
        d.usage === void 0 &&
        !d.path.includes("Col02")
    );
    console.log(`device count = ${items.length}`);
    return items;
  }

  readModel() {
    this.#writeCmd(readModelCmd);

    const results = this.#readFixedBytes(2);

    const s = Buffer.from(results.filter((b) => b !== 0)).toString();
    this.name = s.slice(0, -5);
    this.version = s.slice(-3);

    console.log(`Name: ${this.name}\nVersion: ${this.version}`);
  }

  readKeys() {
    const keys = new Array(3);

    for (let k = 1; k < 4; k++) {
      readKeyCmd[3] = k;

      this.#writeCmd(readKeyCmd);
      const results = this.#readBytes();

      const s = bytesToString(results.slice(2).filter((b) => b !== 0));

      keys[k - 1] = s;
    }

    console.log(`results: ${keys}`);
  }

  writeKeys(keyNumber, data) {
    setKeyValueCmd[3] = keyNumber;

    const dataList = buildBytes(data);

    setKeyValueCmd[2] = dataList[0][0];
    this.#writeCmd(setKeyValueCmd);
    for (const data of dataList) {
      this.#writeCmd(data);
    }
  }

  #writeCmd(data) {
    const reportId = 1;
    const dataBytes = new Array(9);
    dataBytes[0] = reportId;
    // not data.length? :/
    for (let i = 1; i < dataBytes.length; i++) {
      dataBytes[i] = data[i - 1];
    }

    try {
      sleep(20);
      return this.hid.write(dataBytes);
    } catch (err) {
      console.log(err);
      return void 0;
    }
  }

  #readFixedBytes(length) {
    const data = this.hid.readTimeout(1e3);
    let results = [];
    if (data && data.length) {
      for (let i = 0; i <= Math.floor((length * 8 - 1) / 8); i++) {
        if (i === 0) {
          results = results.concat(data.slice(1, 9)); // ignore first byte
        } else {
          // get next bytes
          const readData = this.hid.readTimeout(1e3);
          if (readData && readData.length > 0) {
            results = results.concat(readData.slice(1, 9)); // ignore first byte
          }
        }
      }
    }
    return results;
  }

  #readBytes() {
    const data = this.hid.readTimeout(1e3);
    let results = [];
    if (data && data.length) {
      const length = data[1];
      for (let i = 0; i <= Math.floor((length - 1) / 8); i++) {
        if (i === 0) {
          results = results.concat(data.slice(1, 9)); // ignore first byte
        } else {
          // get next bytes
          const readData = this.hid.readTimeout(1e3);
          if (readData && readData.length > 0) {
            results = results.concat(readData.slice(1, 9)); // ignore first byte
          }
        }
      }
    }
    return results;
  }

  close() {
    this.hid.close();
    this.hid = null;
  }
}

module.exports = {
  Device,
};

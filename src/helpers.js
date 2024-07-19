module.exports = {
  bytesToString,
  stringToBytes,
  charToByte,
  byteToChar,
  buildBytes,
  sleep,
};

function sleep(delay) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
}

function buildBytes(data) {
  const bytes = stringToBytes(data);

  const result = [[bytes.length + 2, 4, 0, 0, 0, 0, 0, 0]];

  for (let i = 0; i < bytes.length; i++) {
    const idx = Math.floor((i - 6) / 8) + 1;

    if ((i + 2) % 8 === 0) {
      // 6, 14, 22, 30...
      result.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }

    if (i < 6) {
      result[idx][i + 2] = bytes[i];
    } else {
      result[idx][(i - 6) % 8] = bytes[i];
    }
  }

  return result;
}

function bytesToString(bytes) {
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
    result += byteToChar(bytes[i]);
  }
  return result;
}

function stringToBytes(text) {
  let result = [];
  for (let i = 0; i < text.length; i++) {
    result.push(charToByte(text[i]));
  }
  return result;
}

function byteToChar(value) {
  let result = "";
  if (value >= 4 && value <= 29) {
    result = String.fromCharCode(value + 93);
  } else if (value >= 132 && value <= 157) {
    result = String.fromCharCode(value - 67);
  } else if (value >= 30 && value <= 38) {
    result = (value - 29).toString();
  } else if (value === 158) {
    result = "!";
  } else if (value === 159) {
    result = "@";
  } else if (value === 160) {
    result = "#";
  } else if (value === 161) {
    result = "$";
  } else if (value === 162) {
    result = "%";
  } else if (value === 163) {
    result = "^";
  } else if (value === 164) {
    result = "&";
  } else if (value === 165) {
    result = "*";
  } else if (value === 166) {
    result = "(";
  } else if (value === 39) {
    result = "0";
  } else if (value === 167) {
    result = ")";
  } else if (value === 40) {
    result = "\n";
  } else if (value === 44) {
    result = " ";
  } else if (value === 45) {
    result = "-";
  } else if (value === 173) {
    result = "_";
  } else if (value === 46) {
    result = "=";
  } else if (value === 174) {
    result = "+";
  } else if (value === 47) {
    result = "[";
  } else if (value === 175) {
    result = "{";
  } else if (value === 48) {
    result = "]";
  } else if (value === 176) {
    result = "}";
  } else if (value === 49) {
    result = "\\";
  } else if (value === 177) {
    result = "|";
  } else if (value === 51) {
    result = ";";
  } else if (value === 179) {
    result = ":";
  } else if (value === 52) {
    result = "'";
  } else if (value === 180) {
    result = '"';
  } else if (value === 53) {
    result = "`";
  } else if (value === 181) {
    result = "~";
  } else if (value === 54) {
    result = ",";
  } else if (value === 182) {
    result = "<";
  } else if (value === 55) {
    result = ".";
  } else if (value === 183) {
    result = ">";
  } else if (value === 56) {
    result = "/";
  } else if (value === 184) {
    result = "?";
  } else if (value === 43) {
    result = "	";
  }
  return result;
}

function charToByte(ch) {
  let result = 0;
  if (ch >= "a" && ch <= "z") {
    result = ch.charCodeAt(0) - 93;
  } else if (ch >= "A" && ch <= "Z") {
    result = ch.charCodeAt(0) + 67;
  } else if (ch >= "1" && ch <= "9") {
    result = ch.charCodeAt(0) - 19;
  } else if (ch === "!") {
    result = 158;
  } else if (ch === "@") {
    result = 159;
  } else if (ch === "#") {
    result = 160;
  } else if (ch === "$") {
    result = 161;
  } else if (ch === "%") {
    result = 162;
  } else if (ch === "^") {
    result = 163;
  } else if (ch === "&") {
    result = 164;
  } else if (ch === "*") {
    result = 165;
  } else if (ch === "(") {
    result = 166;
  } else if (ch === "0") {
    result = 39;
  } else if (ch === ")") {
    result = 167;
  } else if (ch === "\n") {
    result = 40;
  } else if (ch === " ") {
    result = 44;
  } else if (ch === "-") {
    result = 45;
  } else if (ch === "_") {
    result = 173;
  } else if (ch === "=") {
    result = 46;
  } else if (ch === "+") {
    result = 174;
  } else if (ch === "[") {
    result = 47;
  } else if (ch === "{") {
    result = 175;
  } else if (ch === "]") {
    result = 48;
  } else if (ch === "}") {
    result = 176;
  } else if (ch === "\\") {
    result = 49;
  } else if (ch === "|") {
    result = 177;
  } else if (ch === ";") {
    result = 51;
  } else if (ch === ":") {
    result = 179;
  } else if (ch === "'") {
    result = 52;
  } else if (ch === '"') {
    result = 180;
  } else if (ch === "`") {
    result = 53;
  } else if (ch === "~") {
    result = 181;
  } else if (ch === ",") {
    result = 54;
  } else if (ch === "<") {
    result = 182;
  } else if (ch === ".") {
    result = 55;
  } else if (ch === ">") {
    result = 183;
  } else if (ch === "/") {
    result = 56;
  } else if (ch === "?") {
    result = 184;
  } else if (ch === "	") {
    result = 43;
  }
  return result;
}

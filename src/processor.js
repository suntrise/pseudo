import { loadCharLib } from "./state.js";

export async function processText(text, options = {}) {
  const charLib = await loadCharLib();

  if (!text) return "";

  let origin = text;
  let result = "";
  const oriLength = origin.length;

  if (options.upper) origin = origin.toUpperCase();
  if (options.lower) origin = origin.toLowerCase();

  if (options.mode === "XA") {
    for (let i = 0; i < origin.length; i++) {
      // Preserve escape characters
      if (origin[i] === "\\" && options.preserveEsc) {
        const next = origin[i + 1];
        if (next === "x") {
          result += origin.slice(i, i + 4);
          i += 3;
          continue;
        } else if (next === "u") {
          result += origin.slice(i, i + 6);
          i += 5;
          continue;
        } else if (next === "n" || next === "t" || next === "r" || next === "\\" || next === "'" || next === '"') {
          result += origin[i] + next;
          i += 1;
          continue;
        }
      }

      if (/[A-Za-z]/.test(origin[i])) {
        const arr = charLib[origin[i]];
        if (!arr) {
          result += origin[i];
          continue;
        }

        const random = Math.floor(Math.random() * arr.length);
        const char = arr[random];

        if ("aeiouAEIOU".includes(origin[i]) && options.dbvowel) {
          const count = options.dbvowelCount || 1;
          for (let j = 0; j <= count; j++) {
            result += char;
          }
        } else {
          result += char;
        }
      } else {
        result += origin[i];
      }
    }
  }

  if (options.mode === "XB") {
    result = origin.split("").reverse().join("");
  }

  if (options.numcir) {
    result = result
      .replace(/1/g, "①")
      .replace(/2/g, "②")
      .replace(/3/g, "③")
      .replace(/4/g, "④")
      .replace(/5/g, "⑤")
      .replace(/6/g, "⑥")
      .replace(/7/g, "⑦")
      .replace(/8/g, "⑧")
      .replace(/9/g, "⑨");
  }

  // Add suffix
  const suffixMode = options.suffix || "0";
  result = addSuffix(result, oriLength, suffixMode, options, charLib);

  // Add hash ID
  if (options.addHash) {
    const hashLength = options.hashLength || 6;
    result = addHashID(result, hashLength, charLib);
  }

  return result;
}

function addSuffix(result, oriLength, mode, options, charLib) {
  switch (mode) {
    case "0": // None
      return result;
    case "1": // Microsoft style
      return suffixMS(result, oriLength);
    case "2": // Android style
      return suffixAndroid(result, oriLength, charLib);
    case "3": // Numeric
      return suffixNum(result, oriLength);
    case "4": // Custom
      return suffixCustom(result, oriLength, options);
    default:
      return result;
  }
}

function suffixMS(result, oriLength) {
  let suf = "";
  const n = Math.floor(oriLength / 7);

  for (let i = 0; i < n; i++) {
    suf += "!";
    if ((i + 1) % 3 === 0 && i !== n - 1) suf += " ";
  }

  return `[${result} ${suf}]`;
}

function suffixAndroid(result, oriLength, charLib) {
  let suf = "";
  const n = Math.floor(oriLength / 7);
  const numbers = charLib.enNumber || ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];

  for (let i = 0; i < n; i++) {
    suf += `${numbers[i % numbers.length]} `;
  }

  return `[${result} ${suf}]`;
}

function suffixNum(result, oriLength) {
  let suf = "";
  const n = Math.floor(oriLength / 7);

  for (let i = 1; i <= n; i++) {
    suf += i;
  }

  return `[${result} ${suf}]`;
}

function suffixCustom(result, oriLength, options) {
  const prefix = options.customPrefix || "";
  const suffix = options.customSuffix || "";
  const repeat = options.customRepeat || "";
  const repeatCount = options.customRepeatCount || 7;

  if (!repeat) {
    return prefix + result + suffix;
  }

  let suf = "";
  const n = Math.floor(oriLength / repeatCount);

  for (let i = 0; i <= n; i++) {
    suf += `${repeat} `;
  }

  return `${prefix + result} ${suf}${suffix}`;
}

function addHashID(result, length = 6, charLib) {
  let hash = "";
  const alphabet = charLib.alphabet || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < length; i++) {
    hash += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `[${hash}]${result}`;
}

/**
 * Base58 ---------------------------
 */
const encoder = new TextEncoder();

function getTypeName(value: any): string {
  const type = typeof value;

  if (type !== "object") {
    return type;
  } else if (value === null) {
    return "null";
  } else {
    if (value?.constructor?.name) {
      return value?.constructor?.name;
    }

    return "object";
  }
}

export function validateBinaryLike(source: unknown): Uint8Array {
  if (typeof source === "string") {
    return encoder.encode(source);
  } else if (source instanceof Uint8Array) {
    return source;
  } else if (source instanceof ArrayBuffer) {
    return new Uint8Array(source);
  }
  throw new TypeError(
    `The input must be a Uint8Array, a string, or an ArrayBuffer. Received a value of the type ${getTypeName(
      source,
    )}.`,
  );
}

// deno-fmt-ignore
const mapBase58: Record<string, number> = {
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  A: 9,
  B: 10,
  C: 11,
  D: 12,
  E: 13,
  F: 14,
  G: 15,
  H: 16,
  J: 17,
  K: 18,
  L: 19,
  M: 20,
  N: 21,
  P: 22,
  Q: 23,
  R: 24,
  S: 25,
  T: 26,
  U: 27,
  V: 28,
  W: 29,
  X: 30,
  Y: 31,
  Z: 32,
  a: 33,
  b: 34,
  c: 35,
  d: 36,
  e: 37,
  f: 38,
  g: 39,
  h: 40,
  i: 41,
  j: 42,
  k: 43,
  m: 44,
  n: 45,
  o: 46,
  p: 47,
  q: 48,
  r: 49,
  s: 50,
  t: 51,
  u: 52,
  v: 53,
  w: 54,
  x: 55,
  y: 56,
  z: 57,
};

const base58alphabet =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz".split("");

/**
 * Converts data into a base58-encoded string.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/draft-msporny-base58-03#section-3}
 *
 * @param data The data to encode.
 * @returns The base58-encoded string.
 *
 * @example
 * ```ts
 * import { encodeBase58 } from "https://deno.land/std@$STD_VERSION/encoding/base58.ts";
 *
 * encodeBase58("Hello World!"); // "2NEpo7TZRRrLZSi2U"
 * ```
 */
export function encodeBase58(data: ArrayBuffer | Uint8Array | string): string {
  const uint8tData = validateBinaryLike(data);

  let length = 0;
  let zeroes = 0;

  // Counting leading zeroes
  let index = 0;

  while (uint8tData[index] === 0) {
    zeroes++;
    index++;
  }

  const notZeroUint8Data = uint8tData.slice(index);

  const size = Math.round((uint8tData.length * 138) / 100 + 1);
  const b58Encoding: number[] = [];

  notZeroUint8Data.forEach((byte) => {
    let i = 0;
    let carry = byte;

    for (
      let reverseIterator = size - 1;
      (carry > 0 || i < length) && reverseIterator !== -1;
      reverseIterator--, i++
    ) {
      carry += (b58Encoding[reverseIterator] || 0) * 256;
      b58Encoding[reverseIterator] = Math.round(carry % 58);
      carry = Math.floor(carry / 58);
    }

    length = i;
  });

  const strResult: string[] = Array.from({
    length: b58Encoding.length + zeroes,
  });

  if (zeroes > 0) {
    strResult.fill("1", 0, zeroes);
  }

  b58Encoding.forEach((byteValue) =>
    strResult.push(base58alphabet[byteValue]!),
  );

  return strResult.join("");
}

/**
 * Decodes a base58-encoded string.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/draft-msporny-base58-03#section-4}
 *
 * @param b58 The base58-encoded string to decode.
 * @returns The decoded data.
 *
 * @example
 * ```ts
 * import { decodeBase58 } from "https://deno.land/std@$STD_VERSION/encoding/base58.ts";
 *
 * decodeBase58("2NEpo7TZRRrLZSi2U");
 * // Uint8Array(12) [ 72, 101, 108, 108, 111, 32,  87, 111, 114, 108, 100, 33 ]
 * ```
 */
export function decodeBase58(b58: string): Uint8Array {
  const splitInput = b58.trim().split("");

  let length = 0;
  let ones = 0;

  // Counting leading ones
  let index = 0;

  while (splitInput[index] === "1") {
    ones++;
    index++;
  }

  const notZeroData = splitInput.slice(index);

  const size = Math.round((b58.length * 733) / 1000 + 1);
  const output: number[] = [];

  notZeroData.forEach((char, idx) => {
    let carry = mapBase58[char];
    let i = 0;

    if (carry === undefined) {
      throw new Error(`Invalid base58 char at index ${idx} with value ${char}`);
    }

    for (
      let reverseIterator = size - 1;
      (carry > 0 || i < length) && reverseIterator !== -1;
      reverseIterator--, i++
    ) {
      carry += 58 * (output[reverseIterator] || 0);
      output[reverseIterator] = Math.round(carry % 256);
      carry = Math.floor(carry / 256);
    }

    length = i;
  });

  const validOutput = output.filter((item) => item !== undefined);

  if (ones > 0) {
    const onesResult = Array.from({ length: ones }).fill(0, 0, ones);

    return new Uint8Array([...onesResult, ...validOutput] as number[]);
  }

  return new Uint8Array(validOutput);
}

//-----------------------------------

/**
 * Main action class
 */

class Tonspack {
  private uuid: any;
  private config: any;
  private baseurl: any;
  private actionUrl: any;
  private loopInterval: any;
  private loopTimeout: any;

  constructor(uuid?: any, config?: any) {
    if (uuid) {
      this.uuid = uuid;
    } else {
      this.uuid = crypto.randomUUID();
    }

    if (config?.baseurl) {
      this.baseurl = config.baseurl;
    } else {
      this.baseurl = "https://pack.tons.ink/api";
    }

    if (config?.actionUrl) {
      this.actionUrl = config.actionUrl;
    } else {
      this.actionUrl = "https://t.me/tonspack_bot/connect?startapp=";
    }

    if (config?.loopInterval) {
      this.loopInterval = config.loopInterval;
    } else {
      this.loopInterval = 500; //0.5
    }

    if (config?.loopTimeout) {
      this.loopTimeout = config.loopTimeout;
    } else {
      this.loopTimeout = 120; //1min
    }
  }

  async loopCheck(pin: Window | null) {
    let flag = navigator.userAgent.match(
      /(iPhone|WebOS|Symbian|Windows Phone|Safari)/i,
    );

    for (var i = 0; i < this.loopTimeout; i++) {
      if (pin == null && !flag) {
        //Disable type check during using iPhone and Symbian ( bad browser core support )
        return false;
      }
      const ret = await this.check_request_action();

      if (ret.data) {
        return ret.data;
      }
      await this.sleep(this.loopInterval);
    }

    return false;
  }

  async sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  async check_request_action() {
    try {
      return (
        await fetch(this.baseurl + "/result/" + this.uuid, {
          method: "GET",
          headers: {},
          redirect: "follow",
        })
      ).json();
    } catch (e) {
      console.error(e);

      return false;
    }
  }

  async connect(chian: any, redirect: string) {
    const site = window.location.origin;

    const d = {
      t: 0,
      i: this.uuid,
      d: site,
      c: chian,
      r: redirect || null,
    };

    const pin = window.open(
      this.actionUrl + encodeBase58(Buffer.from(JSON.stringify(d))),
      "newwindow",
      "height=800, width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no",
    );

    return await this.loopCheck(pin);
  }

  async sign(chian: any, sign: any, redirect: string, preconnect: any) {
    let d;

    d = {
      t: 1,
      i: this.uuid,
      d: sign,
      c: chian,
      r: redirect || null,
    };
    if (preconnect) {
      var hd = new Headers();

      hd.append("Content-Type", "application/json");
      var op = {
        method: "POST",
        headers: hd,
        body: JSON.stringify({
          data: encodeBase58(Buffer.from(JSON.stringify(d))),
        }),
        redirect: "follow" as RequestRedirect,
      };

      d = {
        i: await fetch(`${this.baseurl}/preconnect/${d.i}`, op),
        p: 1,
      };
    }
    const pin = window.open(
      this.actionUrl + encodeBase58(Buffer.from(JSON.stringify(d))),
      "newwindow",
      "height=800, width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no",
    );

    return await this.loopCheck(pin);
  }

  async send(chian: any, txs: any, redirect: string, preconnect: any) {
    let d;

    d = {
      t: 2,
      i: this.uuid,
      d: txs,
      c: chian,
      r: redirect || null,
    };

    if (preconnect) {
      var hd = new Headers();

      hd.append("Content-Type", "application/json");
      var op = {
        method: "POST",
        headers: hd,
        body: JSON.stringify({
          data: encodeBase58(Buffer.from(JSON.stringify(d))),
        }),
        redirect: "follow" as RequestRedirect,
      };
      let i = await fetch(`${this.baseurl}/preconnect/${d.i}`, op);

      console.log("## Preupdate test :: ", i),
        (d = {
          i: this.uuid,
          p: 1,
        });
    }
    const pin = window.open(
      this.actionUrl + encodeBase58(Buffer.from(JSON.stringify(d))),
      "newwindow",
      "height=800, width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no",
    );

    return await this.loopCheck(pin);
  }
}

//----------------------------------

export { Tonspack };

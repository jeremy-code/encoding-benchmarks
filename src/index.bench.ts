// oxlint-disable import/namespace -- There is too many encodings
import * as iconvLite from "iconv-lite";
import * as iconvNano from "iconv-nano";
import { describe, expect, it } from "vitest";

import { getFixture, type Fixture } from "./__utils__/getFixture.js";

const iconvLiteBeta =
  import.meta.runtime === "node"
    ? await import("iconv-lite-beta")
    : await import("iconv-lite-beta/web");

const encodings = {
  ASCII: {
    encoding: "windows_1252",
    ...(await getFixture("windows-1252")),
  },
  Big5: {
    encoding: "big5",
    ...(await getFixture("big5")),
  },
  GBK: {
    encoding: "gbk",
    ...(await getFixture("gbk")),
  },
  "Shift JIS": {
    encoding: "shift_jis",
    ...(await getFixture("shift_jis")),
  },
  "EUC-KR": {
    encoding: "euc_kr",
    ...(await getFixture("euc-kr")),
  },
  "UTF-8": {
    encoding: "utf8",
    ...(await getFixture("utf-8")),
  },
  "UTF-16": {
    encoding: "utf_16le",
    ...(await getFixture("utf-16le")),
  },
  "UTF-32": {
    encoding: "utf_32be",
    ...(await getFixture("utf-32be")),
  },
} as const satisfies Record<
  string,
  { encoding: iconvNano.Encoding & iconvLite.Encoding } & Fixture
>;

describe.for(Object.entries(encodings))(
  "%s",
  async ([, { encoding, encodedText, text }]) => {
    it("encode", async ({ bench }) => {
      await bench.compare(
        bench("iconv-lite", () => {
          return iconvLite.encode(text, encoding);
        }),
        bench("iconv-lite (beta)", () => {
          return iconvLiteBeta.encode(text, encoding);
        }),
        bench("iconv-nano", () => {
          return iconvNano[encoding].encode(text);
        }),
      );
    });

    it("decode", async ({ bench }) => {
      await bench.compare(
        bench("iconv-lite", () => {
          return iconvLite.decode(encodedText, encoding);
        }),
        bench("iconv-lite (beta)", () => {
          return iconvLiteBeta.decode(encodedText, encoding);
        }),
        bench("iconv-nano", () => {
          return iconvNano[encoding].decode(encodedText);
        }),
      );
    });

    it("iconv-lite encodes text correctly", () => {
      // Buffer doesn't .toEqual Uint8Array
      expect(new Uint8Array(iconvLite.encode(text, encoding))).toEqual(
        encodedText,
      );
    });
    it("iconv-lite (beta) encodes text correctly", () => {
      // Buffer doesn't .toEqual Uint8Array
      expect(new Uint8Array(iconvLiteBeta.encode(text, encoding))).toEqual(
        encodedText,
      );
    });
    it("iconv-nano encodes text correctly", () => {
      expect(iconvNano[encoding].encode(text)).toEqual(encodedText);
    });
    it("iconv-lite decodes text correctly", () => {
      expect(iconvLite.decode(encodedText, encoding)).toEqual(text);
    });
    it("iconv-lite (beta) decodes text correctly", () => {
      expect(iconvLiteBeta.decode(encodedText, encoding)).toEqual(text);
    });
    it("iconv-nano decodes text correctly", () => {
      expect(iconvNano[encoding].decode(encodedText)).toEqual(text);
    });
  },
);

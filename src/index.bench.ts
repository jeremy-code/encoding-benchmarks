// oxlint-disable import/namespace -- There is too many encodings
import * as iconvLite from "iconv-lite";
import * as iconvNano from "iconv-nano";
import { describe, expect, it } from "vitest";

const encodings = {
  ASCII: {
    encoding: "windows_1252",
    // https://en.wikipedia.org/wiki/ASCII
    text: "ASCII, an acronym for American Standard Code for Information Interchange, is a character encoding standard for representing a particular set of 95 (English-language–focused) printable and 33 control characters – a total of 128 code points.",
    // python3 -c 'print("ASCII, an acronym for American Standard Code for Information Interchange, is a character encoding standard for representing a particular set of 95 (English-language–focused) printable and 33 control characters – a total of 128 code points.".encode("windows-1252").hex())'
    encodedText: Uint8Array.fromHex(
      "41534349492c20616e206163726f6e796d20666f7220416d65726963616e205374616e6461726420436f646520666f7220496e666f726d6174696f6e20496e7465726368616e67652c20697320612063686172616374657220656e636f64696e67207374616e6461726420666f7220726570726573656e74696e67206120706172746963756c617220736574206f662039352028456e676c6973682d6c616e677561676596666f637573656429207072696e7461626c6520616e6420333320636f6e74726f6c20636861726163746572732096206120746f74616c206f662031323820636f646520706f696e74732e",
    ),
  },
  Big5: {
    encoding: "big5",
    // https://zh.wikipedia.org/wiki/%E5%A4%A7%E4%BA%94%E7%A2%BC
    text: "大五碼（英語：Big5，又稱五大專案碼、五大碼）是繁体中文社群最常用的電腦漢字字符集標準，共收錄13060個漢字。",
    // python3 -c 'print("大五碼（英語：Big5，又稱五大專案碼、五大碼）是繁体中文社群最常用的電腦漢字字符集標準，共收錄13060個漢字。".encode("big5", errors="replace").hex())'
    encodedText: Uint8Array.fromHex(
      "a46aa4adbd58a15dad5ebb79a14742696735a141a453bad9a4ada46ab14daed7bd58a142a4ada46abd58a15eac4fc163ca5ea4a4a4e5aac0b873b3ccb160a5ceaabab971b8a3ba7ea672a672b2c5b6b0bcd0b7c7a141a640a6acbffd3133303630add3ba7ea672a143",
    ),
  },
  GBK: {
    encoding: "gbk",
    // https://zh.wikipedia.org/wiki/%E6%B1%89%E5%AD%97%E5%86%85%E7%A0%81%E6%89%A9%E5%B1%95%E8%A7%84%E8%8C%83
    text: "汉字内码扩展规范，简称GBK，全名为《汉字内码扩展规范(GBK)》1.0版，由中华人民共和国全国信息技术标准化技术委员会1995年12月1日制订，国家技术监督局标准化司和电子工业部科技与质量监督司1995年12月15日联合以《技术标函[1995]229号》文件的形式公布。 GBK共收录21886个汉字和图形符号，其中汉字（包括部首和构件）21003个，图形符号883个。",
    // python3 -c 'print("汉字内码扩展规范，简称GBK，全名为《汉字内码扩展规范(GBK)》1.0版，由中华人民共和国全国信息技术标准化技术委员会1995年12月1日制订，国家技术监督局标准化司和电子工业部科技与质量监督司1995年12月15日联合以《技术标函[1995]229号》文件的形式公布。 GBK共收录21886个汉字和图形符号，其中汉字（包括部首和构件）21003个，图形符号883个。".encode("gbk").hex())'
    encodedText: Uint8Array.fromHex(
      "babad7d6c4dac2ebc0a9d5b9b9e6b7b6a3acbcf2b3c647424ba3acc8abc3fbceaaa1b6babad7d6c4dac2ebc0a9d5b9b9e6b7b62847424b29a1b7312e30b0e6a3acd3c9d6d0bbaac8cbc3f1b9b2bacdb9fac8abb9fad0c5cfa2bcbccaf5b1ead7bcbbafbcbccaf5ceafd4b1bbe131393935c4ea3132d4c231c8d5d6c6b6a9a3acb9fabcd2bcbccaf5bce0b6bdbed6b1ead7bcbbafcbbebacdb5e7d7d3b9a4d2b5b2bfbfc6bcbcd3ebd6cac1bfbce0b6bdcbbe31393935c4ea3132d4c23135c8d5c1aabacfd2d4a1b6bcbccaf5b1eabaaf5b313939355d323239bac5a1b7cec4bcfeb5c4d0cecabdb9abb2bca1a32047424bb9b2cad5c2bc3231383836b8f6babad7d6bacdcdbcd0ceb7fbbac5a3acc6e4d6d0babad7d6a3a8b0fcc0a8b2bfcad7bacdb9b9bcfea3a93231303033b8f6a3accdbcd0ceb7fbbac5383833b8f6a1a3",
    ),
  },
  "Shift JIS": {
    encoding: "shift_jis",
    // https://ja.wikipedia.org/wiki/Shift_JIS
    text: "Shift_JIS（シフトジス）は、コンピュータ上で日本語を含む文字列を表現するために用いられる文字コードの一つ。シフトJIS（シフトジス）と表記されることもある[1]。略称としてSJISが使われる事がある。",
    // python3 -c 'print("Shift_JIS（シフトジス）は、コンピュータ上で日本語を含む文字列を表現するために用いられる文字コードの一つ。シフトJIS（シフトジス）と表記されることもある[1]。略称としてSJISが使われる事がある。".encode("shift_jis").hex())'
    encodedText: Uint8Array.fromHex(
      "53686966745f4a4953816983568374836783578358816a82cd81418352839383738385815b835e8fe382c593fa967b8cea82f08adc82de95b68e9a97f182f0955c8cbb82b782e982bd82df82c9977082a282e782ea82e995b68e9a8352815b836882cc88ea82c281428356837483674a4953816983568374836783578358816a82c6955c8b4c82b382ea82e982b182c682e082a082e95b315d814297aa8fcc82c682b582c4534a495382aa8e6782ed82ea82e98e9682aa82a082e98142",
    ),
  },
  "EUC-KR": {
    encoding: "euc_kr",
    // https://ko.wikipedia.org/wiki/EUC-KR
    text: "EUC-KR은 KS X 1001와 KS X 1003을 사용하는 8비트 문자 인코딩, EUC의 일종이며 대표적인 한글 완성형 인코딩이기 때문에 보통 완성형이라고 불린다.",
    // python3 -c 'print("EUC-KR은 KS X 1001와 KS X 1003을 사용하는 8비트 문자 인코딩, EUC의 일종이며 대표적인 한글 완성형 인코딩이기 때문에 보통 완성형이라고 불린다.".encode("euc-kr").hex())'
    encodedText: Uint8Array.fromHex(
      "4555432d4b52c0ba204b5320582031303031bfcd204b5320582031303033c0bb20bbe7bfebc7cfb4c22038baf1c6ae20b9aec0da20c0cec4dab5f92c20455543c0c720c0cfc1bec0ccb8e720b4ebc7a5c0fbc0ce20c7d1b1db20bfcfbcbac7fc20c0cec4dab5f9c0ccb1e220b6a7b9aebfa120bab8c5eb20bfcfbcbac7fcc0ccb6f3b0ed20bad2b8b0b4d92e",
    ),
  },
  "UTF-8": {
    encoding: "utf8",
    // https://ar.wikipedia.org/wiki/%D8%B5%D9%8A%D8%BA%D8%A9_%D8%A7%D9%84%D8%AA%D8%AD%D9%88%D9%8A%D9%84_%D8%A7%D9%84%D9%85%D9%88%D8%AD%D8%AF-8
    text: "صيغة التحويل الموحد-8 (الإنجليزية: UTF-8) هي اختصار للمصطلح (8-bit Unicode Transformation Format) الذي يترجم إلى صيغة تحويل نظام الحروف الدولي الموحد بقوة 8 بت. هذا الترميز وضع من قبل كل من روب بايك وكين تومسن لتمثيل معيار نظام الحروف الدولي الموحد للحروف الأبجدية لأغلب لغات العالم، ويتم تشفير الرموز فيه في حجم يتراوح بين بايت واحد وأربعة بايت للرمز الواحد.",
    // python3 -c 'print("صيغة التحويل الموحد-8 (الإنجليزية: UTF-8) هي اختصار للمصطلح (8-bit Unicode Transformation Format) الذي يترجم إلى صيغة تحويل نظام الحروف الدولي الموحد بقوة 8 بت. هذا الترميز وضع من قبل كل من روب بايك وكين تومسن لتمثيل معيار نظام الحروف الدولي الموحد للحروف الأبجدية لأغلب لغات العالم، ويتم تشفير الرموز فيه في حجم يتراوح بين بايت واحد وأربعة بايت للرمز الواحد.".encode("utf-8").hex())'
    encodedText: Uint8Array.fromHex(
      "d8b5d98ad8bad8a920d8a7d984d8aad8add988d98ad98420d8a7d984d985d988d8add8af2d382028d8a7d984d8a5d986d8acd984d98ad8b2d98ad8a93a205554462d382920d987d98a20d8a7d8aed8aad8b5d8a7d8b120d984d984d985d8b5d8b7d984d8ad2028382d62697420556e69636f6465205472616e73666f726d6174696f6e20466f726d61742920d8a7d984d8b0d98a20d98ad8aad8b1d8acd98520d8a5d984d98920d8b5d98ad8bad8a920d8aad8add988d98ad98420d986d8b8d8a7d98520d8a7d984d8add8b1d988d98120d8a7d984d8afd988d984d98a20d8a7d984d985d988d8add8af20d8a8d982d988d8a9203820d8a8d8aa2e20d987d8b0d8a720d8a7d984d8aad8b1d985d98ad8b220d988d8b6d8b920d985d98620d982d8a8d98420d983d98420d985d98620d8b1d988d8a820d8a8d8a7d98ad98320d988d983d98ad98620d8aad988d985d8b3d98620d984d8aad985d8abd98ad98420d985d8b9d98ad8a7d8b120d986d8b8d8a7d98520d8a7d984d8add8b1d988d98120d8a7d984d8afd988d984d98a20d8a7d984d985d988d8add8af20d984d984d8add8b1d988d98120d8a7d984d8a3d8a8d8acd8afd98ad8a920d984d8a3d8bad984d8a820d984d8bad8a7d8aa20d8a7d984d8b9d8a7d984d985d88c20d988d98ad8aad98520d8aad8b4d981d98ad8b120d8a7d984d8b1d985d988d8b220d981d98ad98720d981d98a20d8add8acd98520d98ad8aad8b1d8a7d988d8ad20d8a8d98ad98620d8a8d8a7d98ad8aa20d988d8a7d8add8af20d988d8a3d8b1d8a8d8b9d8a920d8a8d8a7d98ad8aa20d984d984d8b1d985d8b220d8a7d984d988d8a7d8add8af2e",
    ),
  },
  "UTF-16": {
    encoding: "utf_16le",
    // https://ru.wikipedia.org/wiki/UTF-16
    text: "UTF-16 (англ. Unicode Transformation Format, 16-bit) в информатике — метод сериализации юникодного текста (то есть последовательности кодовых позиций Юникода) в последовательность 16-битных слов.",
    // python3 -c 'print("UTF-16 (англ. Unicode Transformation Format, 16-bit) в информатике — метод сериализации юникодного текста (то есть последовательности кодовых позиций Юникода) в последовательность 16-битных слов.".encode("utf-16le").hex())'
    encodedText: Uint8Array.fromHex(
      "5500540046002d00310036002000280030043d0433043b042e00200055006e00690063006f006400650020005400720061006e00730066006f0072006d006100740069006f006e00200046006f0072006d00610074002c002000310036002d00620069007400290020003204200038043d0444043e0440043c043004420438043a0435042000142020003c04350442043e0434042000410435044004380430043b0438043704300446043804380420004e043d0438043a043e0434043d043e0433043e042000420435043a044104420430042000280042043e0420003504410442044c0420003f043e0441043b04350434043e0432043004420435043b044c043d043e0441044204380420003a043e0434043e0432044b04450420003f043e043704380446043804390420002e043d0438043a043e043404300429002000320420003f043e0441043b04350434043e0432043004420435043b044c043d043e04410442044c042000310036002d003104380442043d044b044504200041043b043e0432042e00",
    ),
  },
} as const satisfies Record<
  string,
  {
    encoding: keyof typeof import("iconv-nano") & iconvLite.Encoding;
    text: string;
    encodedText: Uint8Array<ArrayBuffer>;
  }
>;

describe.concurrent("encodings", () => {
  describe.for(Object.entries(encodings))(
    "%s",
    async ([, { encoding, encodedText, text }]) => {
      // oxlint-disable-next-line vitest/expect-expect
      it("encoding performance", async ({ bench }) => {
        await bench.compare(
          bench("iconv-lite", () => {
            return iconvLite.encode(text, encoding);
          }),
          bench("iconv-nano", () => {
            return iconvNano[encoding].encode(text);
          }),
        );
      });

      // oxlint-disable-next-line vitest/expect-expect
      it("decoding performance", async ({ bench }) => {
        await bench.compare(
          bench("iconv-lite", () => {
            return iconvLite.decode(encodedText, encoding);
          }),
          bench("iconv-nano", () => {
            return iconvNano[encoding].decode(encodedText);
          }),
        );
      });

      it("iconv-lite encodes text correctly", async () => {
        // Buffer doesn't .toEqual Uint8Array
        expect(new Uint8Array(iconvLite.encode(text, encoding))).toEqual(
          encodedText,
        );
      });
      it("iconv-nano encodes text correctly", async () => {
        expect(iconvNano[encoding].encode(text)).toEqual(encodedText);
      });
      it("iconv-lite decodes text correctly", async () => {
        // Buffer doesn't .toEqual Uint8Array
        expect(iconvLite.decode(encodedText, encoding)).toEqual(text);
      });
      it("iconv-nano decodes text correctly", async () => {
        expect(iconvNano[encoding].decode(encodedText)).toEqual(text);
      });
    },
  );
});

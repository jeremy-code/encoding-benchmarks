type Fixture = { text: string; encodedText: Uint8Array<ArrayBuffer> };

const getFixture = async (fixture: string): Promise<Fixture> => {
  const [text, encodedTextBase64]: [string, string] = await Promise.all([
    import(`../../fixtures/${fixture}/input.txt?raw`).then((m) => m.default),
    import(`../../fixtures/${fixture}/output.bin?url&inline`).then(
      (m) => m.default,
    ),
  ]);
  const index = encodedTextBase64.indexOf(";base64,");

  if (new URL(encodedTextBase64).protocol !== "data:" || index === -1) {
    throw new Error("Not a Base64 data: URL");
  }

  return {
    text,
    encodedText: Uint8Array.fromBase64(
      encodedTextBase64.slice(index + ";base64,".length),
    ),
  };
};

export { getFixture, type Fixture };

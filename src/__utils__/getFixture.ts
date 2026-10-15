type Fixture = { text: string; encodedText: Uint8Array<ArrayBuffer> };

const getFixture = async (fixture: string): Promise<Fixture> => {
  const [text, encodedText] = await Promise.all([
    import(`../../fixtures/${fixture}/input.txt?raw`).then((m) => m.default),
    import(`../../fixtures/${fixture}/output.bin.txt?raw`).then(
      (m) => m.default,
    ),
  ]);

  return {
    text,
    encodedText: Uint8Array.fromBase64(encodedText),
  };
};

export { getFixture, type Fixture };

const chunk = <T>(arr: T[], size: number): T[][] =>
  size <= 0
    ? []
    : Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size),
      );

export { chunk };

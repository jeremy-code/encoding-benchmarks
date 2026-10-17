const getPackageVersion = (packageName: string) => {
  return import(`${packageName}/package.json`, {
    with: { type: "json" },
  }).then((m) => m.default.version);
};

export { getPackageVersion };

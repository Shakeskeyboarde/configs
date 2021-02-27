/** @type {import('@babel/core').ConfigFunction} */
module.exports = (api) => {
  api.assertVersion(7);

  let coreJsVersion = (() => {
    try {
      return require('core-js/package.json').version;
    } catch {
      return null;
    }
  })();

  api.cache(() => JSON.stringify({ coreJsVersion }));

  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        coreJsVersion
          ? {
              useBuiltIns: 'usage',
              corejs: {
                version: coreJsVersion,
                proposals: true,
              },
            }
          : {},
      ],
    ],
    plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread', 'babel-plugin-const-enum'],
  };
};

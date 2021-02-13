const process = require('process');

/** @type {import('@babel/core').ConfigFunction} */
module.exports = (api) => {
  api.assertVersion(7);

  // Source package.json quick config values.
  const coreJsVersion = process.env['npm_package_config_babel_corejs'];

  api.cache(() =>
    JSON.stringify({
      coreJsVersion,
    }),
  );

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
    plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
  };
};

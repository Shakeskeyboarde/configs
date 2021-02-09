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
          ? // Enable core-js usage injections to support legacy browsers.
            {
              useBuiltIns: 'usage',
              corejs: {
                version: coreJsVersion,
                proposals: true,
              },
            }
          : // Just support Node.js v12 or higher.
            { targets: { node: 12 } },
      ],
    ],
    plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
  };
};

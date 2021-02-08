const process = require('process');

/** @type {import('@babel/core').ConfigFunction} */
module.exports = (api) => {
  api.assertVersion(7);

  // If the caller is babel-loader (Webpack) or rollup (Rollup or Microbundle),
  // then the project is being built for client (browser) use.
  const isWebBundle = api.caller((caller) => caller.name === 'babel-loader' || caller.name === '@rollup/plugin-babel');

  // Source package.json quick config values.
  const coreJsVersion = process.env['npm_package_config_babel_corejs'] || 3;

  api.cache(() =>
    JSON.stringify({
      isWebBundle,
      coreJsVersion,
    }),
  );

  return {
    presets: [
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        isWebBundle
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

#!/usr/bin/env node
import 'source-map-support/register';
import path from 'path';
import fs from 'fs-extra';
import execa from 'execa';
import open from 'open';
import { readProjectType } from './readProjectType';
import { readRepoName } from './readRepoName';
import { readPackageName } from './readPackageName';
import { readPackageVersion } from './readPackageVersion';
import { readPackageLicense } from './readPackageLicense';
import { readPackageAuthor } from './readPackageAuthor';
import { readNodeVersion } from './readNodeVersion';
import { readUseCoreJs } from './readUseCoreJs';
import { readWebpackConfig } from './readWebpackConfig';
import { IPackage } from './IPackage';

async function main(): Promise<void> {
  const projectType = await readProjectType();
  const repoName = await readRepoName();
  const packageName = await readPackageName();
  const version = await readPackageVersion();
  const license = await readPackageLicense();
  const author = await readPackageAuthor();
  const nodeVersion = await readNodeVersion();
  const useCoreJs = await readUseCoreJs(['lib-web', 'spa'].includes(projectType));
  const webpack = projectType === 'spa' ? await readWebpackConfig(packageName) : null;

  const deps: string[] = [
    ...(useCoreJs
      ? [
          // Polyfills
          'core-js',
          'regenerator-runtime',
        ]
      : []),
    ...(projectType === 'spa'
      ? [
          // React
          'react',
          'react-dom',
        ]
      : []),
  ];
  const devDeps: string[] = [
    // Scripting
    'cross-env',
    'del-cli',
    // Prettier
    '@types/prettier',
    'prettier',
    // ESLint
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'eslint-plugin-react',
    // Babel
    '@babel/cli',
    '@babel/core',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    // Typescript
    `@types/node@^${nodeVersion}`,
    'typescript',
    // Jest
    '@types/jest',
    'babel-jest',
    'jest',
    ...(projectType === 'lib-web'
      ? [
          // React
          '@types/react',
          // Microbundle
          'microbundle',
        ]
      : projectType === 'spa'
      ? [
          // React
          '@types/react',
          '@types/react-dom',
          // Webpack
          'babel-loader',
          'compression-webpack-plugin',
          'copy-webpack-plugin',
          'css-loader',
          'file-loader',
          'html-webpack-plugin',
          'style-loader',
          'url-loader',
          'webpack',
          'webpack-bundle-analyzer',
          'webpack-cli',
          'webpack-dev-server',
        ]
      : []),
  ];
  const peerDeps: string[] = [
    ...(projectType === 'lib-web'
      ? [
          // React
          'react',
        ]
      : []),
  ];

  let repoUrl: string | undefined;

  if (repoName) {
    console.log('1. Create the new repo');
    await execa('git', ['init', '-b', 'main'], { all: true });
    repoUrl = await execa('gh', ['repo', 'create', repoName, '--public', '-y'])
      .then((result) => result.stdout.trim())
      .catch(() => undefined);
  } else {
    console.log('1. Create the new repo (skipped)');
  }

  console.log('2. Create the "package.json" file');
  const packageJson: IPackage = {
    name: packageName,
    version,
    license,
    author,
    ...(repoUrl ? { repository: { type: 'git', url: `${repoUrl}.git` } } : {}),
    ...(projectType === 'cli'
      ? {
          bin: './lib/index.js',
        }
      : projectType === 'lib-node'
      ? {
          types: './lib/index.d.ts',
          main: './lib/index.js',
        }
      : projectType === 'lib-web'
      ? {
          types: './lib/index.d.ts',
          main: './lib/index.js',
          module: './lib/index.module.js',
          exports: './lib/index.modern.js',
          source: './src/index.tsx',
        }
      : {}),
    scripts: {
      clean: 'del-cli lib dist coverage',
      test: 'del-cli coverage && tsc && eslint src && jest --passWithNoTests',
      ...(projectType === 'cli'
        ? {
            build: 'del-cli lib && babel src --out-dir lib --extensions .ts,.tsx --source-maps',
            prestart: 'npm run build',
            start: 'node lib/index.js',
            prepack: 'npm test && npm run build',
          }
        : projectType === 'lib-node'
        ? {
            build:
              'del-cli lib && tsc --noEmit false --emitDeclarationOnly && babel src --out-dir lib --extensions .ts,.tsx',
            prepack: 'npm test && npm run build',
          }
        : projectType === 'lib-web'
        ? {
            build:
              'del-cli lib && microbundle -f modern,es,cjs --external "^[@a-zA-Z0-9-].*$" --jsx React.createElement --jsxFragment React.Fragment',
            prepack: 'npm test && npm run build',
          }
        : projectType === 'spa'
        ? {
            build: 'del-cli dist && webpack --mode=production',
            start: 'webpack serve',
          }
        : {}),
    },
    config: {
      ...(webpack ? { webpack } : {}),
    },
    browserslist: projectType === 'cli' || projectType === 'lib-node' ? [`node >= ${nodeVersion}`] : ['defaults'],
    prettier: {
      printWidth: 120,
      singleQuote: true,
      trailingComma: 'all',
    },
  };
  await fs.writeFile('package.json', JSON.stringify(packageJson, null, '  '));

  console.log('3. Add dependencies');
  if (deps.length) {
    await execa('npm', ['add', ...deps], { all: true });
  }
  if (devDeps.length) {
    await execa('npm', ['add', '-D', ...devDeps], { all: true });
  }
  if (peerDeps.length) {
    await execa('npm', ['add', '--save-peer', ...peerDeps], { all: true });
  }
  await Promise.all(
    [
      '__mocks__',
      '.vscode',
      '.eslintrc.js',
      '.gitignore',
      '.npmignore',
      'babel.config.js',
      'jest.config.js',
      'jest.setup.js',
      'tsconfig.json',
      ...(projectType === 'spa' ? ['public', 'webpack.config.js'] : []),
    ].map((file) =>
      fs.copy(path.resolve(__dirname, `../${file}`), file, {
        overwrite: true,
      }),
    ),
  );

  console.log('4. Create the "LICENSE" file');
  await fs.writeFile(
    'LICENSE',
    (await fs.readFile(path.resolve(__dirname, `../licenses/${license}.txt`), 'utf8'))
      .replaceAll('[year]', `${new Date().getFullYear()}`)
      .replaceAll('[fullname]', author),
  );

  console.log('5. Create the "src" directory');
  const indexExt = projectType === 'lib-web' || projectType === 'spa' ? 'tsx' : 'ts';
  await fs.copy(path.resolve(__dirname, `../templates/index-${projectType}.${indexExt}`), `src/index.${indexExt}`);

  console.log('6. Create the "README.md" file');
  await fs.writeFile('README.md', `# ${packageName}\n\nTODO: Add documentation.\n`);

  if (repoName) {
    console.log('7. Create the "Initial commit"');
    await execa('git', ['add', '.'], { all: true });
    await execa('git', ['commit', '-am', 'Initial commit'], { all: true });
    await execa('git', ['push', '-u', 'origin', 'main'], { all: true });
  } else {
    console.log('7. Create the "Initial commit" (skipped)');
  }

  if (repoUrl) {
    console.log(`Git Repo: ${repoUrl}`);
    open(repoUrl);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.log(process.env.DEBUG ? err : `${err}`);
    process.exitCode = 1;
  });
}

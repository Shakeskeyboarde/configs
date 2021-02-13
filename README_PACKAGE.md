# Package

Project configuration in your `package.json` file.

## Entry Points

Source and output paths.

### For a CLI or service

```json
{
  "bin": "./lib/index.js"
}
```

### For any library

```json
{
  "types": "./lib/index.d.ts",
  "main": "./lib/index.js"
}
```

### For a browser library (Microbundle)

```json
{
  "module": "./lib/index.module.js",
  "exports": "./lib/index.modern.js",
  "unpkg": "./lib/index.umd.js",
  "source": "./src/index.ts",
}
```

## Scripts

Test, build, and run commands.

### For any project

```json
{
  "scripts": {
    "clean": "del-cli lib dist coverage",
    "test": "del-cli coverage && tsc && eslint src && jest --passWithNoTests"
  }
}
```

### For a CLI or service (Babel)

```json
{
  "scripts": {
    "build": "del-cli lib && tsc && babel src --out-dir lib --extensions .ts,.tsx --source-maps",
    "prestart": "npm run build",
    "start": "node lib/index.js",
    "prepack": "npm test && npm run build"
  }
}
```

### For a Node.js library (Babel)

```json
{
  "scripts": {
    "build": "del-cli lib && tsc --noEmit false --emitDeclarationOnly && babel src --out-dir lib --extensions .ts,.tsx",
    "prepack": "npm test && npm run build"
  }
}
```

### For a browser library (Microbundle)

```json
{
  "scripts": {
    "build": "del-cli lib && microbundle --external \"^[@a-zA-Z0-9-].*$\" --jsx React.createElement --jsxFragment React.Fragment",
    "prepack": "npm test && npm run build"
  }
}
```

### For an SPA (Webpack)

```json
{
  "scripts": {
    "build": "del-cli dist && webpack --mode=production",
    "start": "webpack serve"
  }
}
```

## Config

Simplified options which are used by the full configuration files included in this repo.

### Babel

```json
{
  "config": {
    "babel": {
      "corejs": "3.8"
    }
  }
}
```

The `corejs` option must be included for the `babel.config.js` file included in this repo to add `core-js` polyfills to the compiled output.

### Webpack

```json
  {
    "config": {
      "webpack": {
        "title": "My App",
        "description": "Built with Webpack",
        "color": "#ffffff",
        "publicPath": "/",
        "devServerPort": 3000
      }
    }
  }
  ```

## Browserslist

The target environment for your project.

### For a Node.js library or CLI

```json
{
  "browserslist": ["node >= 12"]
}
```

### For a Node.js library or CLI

```json
{
  "browserslist": ["defaults"]
}
```
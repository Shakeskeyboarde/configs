# Package

Project configuration in your `package.json` file.

## Entry Points

Source and output paths.

### For a CLI

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

### For a CLI (Babel)

```json
{
  "scripts": {
    "build": "del-cli lib && babel src --out-dir lib --extensions .ts,.tsx --source-maps",
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
    "build": "del-cli lib && microbundle -f modern,es,cjs --external \"^[@a-zA-Z0-9-].*$\" --jsx React.createElement --jsxFragment React.Fragment",
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

### Webpack

```json
  {
    "config": {
      "webpack": {
        "title": "My App",
        "publicPath": "/",
        "devServerPort": 3000
      }
    }
  }
  ```

## Browserslist

The target environment for your project. This configuration is understood and honored by many tools (eg. Babel, Webpack, etc.).

### For a Node.js library or CLI

```json
{
  "browserslist": ["node >= 12"]
}
```

### For a Web library or SPA

```json
{
  "browserslist": ["defaults"]
}
```

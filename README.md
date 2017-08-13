# .mov to .mp4 Converter

This is a simple Electron app that converts .mov files to .mp4 using ffmpeg.

<img width="600" src="https://user-images.githubusercontent.com/4718399/29245538-260cc8d2-7fab-11e7-8c9e-1a26676d1931.png">

## Install

Check the [releases page](https://github.com/mblink/mov-to-mp4-converter/releases) for the latest downloads.

## Development

To get started and launch the app, run:

```bash
$ npm install
$ npm start
```

[`electron-debug`](https://github.com/sindresorhus/electron-debug) is installed, so you can hit F12 to open the
developer tools. When you change files, you can reload the app with `cmd-R`.

## Deployment

[`electron-builder`](https://github.com/electron-userland/electron-builder) is configured and installed, so the app
can be easily built for MacOS by running:

```bash
$ npm run dist
```

You'll find compiled `.app`, `.zip`, and `.dmg` files in the `dist` directory.

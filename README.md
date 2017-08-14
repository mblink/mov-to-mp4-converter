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

To publish the app to GitHub as a new release, first set the `GH_TOKEN` environment variable to a GitHub access token
that has the `repo` scope. If you need to generate a new access token, you can do so
[here](https://github.com/settings/tokens/new). You can put this in a file called `.env`, like so:

```
GH_TOKEN=XXXXX
```

or export it on the command line:

```bash
$ export GH_TOKEN=XXXXX
```

Then to publish the app, run:

```bash
$ npm run publish
```

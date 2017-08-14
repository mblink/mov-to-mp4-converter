# .mov to .mp4 Converter

This is a simple Electron app that converts .mov files to .mp4 using ffmpeg.

<img width="600" src="https://user-images.githubusercontent.com/4718399/29245538-260cc8d2-7fab-11e7-8c9e-1a26676d1931.png">

## Install

Check [the installation docs](https://github.com/mblink/mov-to-mp4-converter/blob/master/doc/installation.md) for installation
instructions.

## Development

To get started and launch the app, run:

```bash
$ npm install
$ npm start
```

[`electron-debug`](https://github.com/sindresorhus/electron-debug) is installed, so you can hit F12 to open the
developer tools. When you change files, you can reload the app with `cmd-R`.

## Deployment

To publish the app to GitHub as a new release, you need to do a few things:

1. Create a 'Mac Developer' code signing identity by following the 'Creating Signing Identities' instructions here: https://goo.gl/9huSjR
2. Set the `GH_TOKEN` environment variable to a GitHub access token that has the `repo` scope. If you need to generate a new access token, you can do so
[here](https://github.com/settings/tokens/new).
    1. You can put this in a file called `.env` like so:
    ```
    GH_TOKEN=XXXXX
    ```

    2. Or you can export it on the command line:
    ```bash
    $ export GH_TOKEN=XXXXX
    ```
3. Run:
```bash
$ npm run publish
```
4. Go to [the releases page](https://github.com/mblink/mov-to-mp4-converter/releases) and publish the drafted
release

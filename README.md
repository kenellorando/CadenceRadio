
# CadenceRadio
![GitHub release (latest by date)](https://img.shields.io/github/v/release/kenellorando/cadence?style=flat-square)

**Cadence** is a fully-featured HTTP API web radio software suite.

It ships everything you need to start a web radio station, including an API server (with search, request, now playing, and art functions), an interactive browser UI, an autopopulating music-metadata database, with custom built-in _Icecast_ and _Liquidsoap_ integration.

To configure Cadence, set a music directory (with some music files inside it), set a few service passwords and hostnames, and you're good to go! Cadence has container releases for amd64 and armv7. A Compose file sets the entire radio stack up in minutes. See a demo on [https://cadenceradio.com/](https://cadenceradio.com/)!

## Get Started

> **Warning**: The way this repo currently handles configuration involves adding passwords to files which you may accidentally commit, so be careful.

1. Edit the `cadence/config/cadence.env` file:
   1. Set the `CSERVER_MUSIC_DIR` value to an absolute path of a directory on your local system which you want to play music. The target is not recursively searched. The default location is `/music/`.
   2. Set the `CSERVER_REQRATELIMIT` to the number of seconds you wish to timeout users after they make song requests. Setting this value to `0` will disable rate limiting.
2. Configure the `cadence_icecast2/config/cadence.xml` file.
   1. Change all instances of `hackme` to a new password.
   2. Set the `<hostname>` value to the endpoint you expect your audience to connect to. Cadence uses this value to set the stream source in the UI. This can be a DNS name, an IP address, or default `localhost` (for running locally).
3. Configure the `cadence_liquidsoap/config/cadence.liq` file.
   1. Change all instances of `hackme` to a new password.
4. `docker compose up`

Running `docker compose up` will start all Cadence services. The UI is accessible by default at `localhost:8080`.

## Building for Development

If you are developing and need to rebuild exactly what you have locally:

1. `docker compose up --build`

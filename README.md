# Pomodoro Timer

## Getting Started

This project requires Node.js version 20 or later.

To use this source, either clone this git repository or, if using GitHub,
download the zip archive containing the files. In the terminal, navigate to the
source directory.

Next, install the node dependencies. This project uses npm, the CLI that ships
with Node, so you can run the following:

```bash
npm install
```

After dependencies are installed, you can use any of the defined scripts to make
use of the project.

## Building

This project uses Vite to transpile the source files into the build output
folder (`./dist`). The output produced is composed of typical static assets—e.g.
HTML, CSS, JavaScript. Vite handles converting any non-web imports and
references between files into web-standard `<link>` and `<script>` elements,
along with other transformations.

Files located in `./public` will be directly copied to the build output,
regardless of if they are utilized or not.

To build the project, run the following command in the terminal:

```bash
npm run build
```

Assuming no errors have been raised at this step, the build will have written
its output to the local `./dist` path. Any files remaining from a previous build
will be overwritten, or removed if they are no longer produced by the build.

A simple static server is available to preview the build output. To use it, run:

```bash
npm run preview
```

The terminal will print the address of the server now running (usually
`http://localhost:4173/`). Navigate to that location using your browser to see
the built project.

## Development

While working on this project, a development server is available to continually
rebuild the project when changes to the source are detected. All changes are
automatically reloaded in the browser as they are made.

To run the development server, use:

```bash
npm run dev
```

The terminal will print the address of the server now running (usually
`http://localhost:5173/`). Navigate to that location using your browser to see
the live project.

Try making a change to the source while observing the browser to see the changes
reflected automatically.

## Deployment

This project does not include a production server. When deciding to deploy this
project, be sure that the following steps are taken as a part of the process,
whether automated or performed manually:

1. install dependencies (`npm install`)
2. build the project (`npm run build`)

The build output (`./dist`) will be ready to be served statically.

## Notes

This project is intended to be a simple single-page web application. Any
significant expansion to the behavior will likely necessitate either the use of
more sophisticated client-side libraries and/or the use of a traditional web
server.

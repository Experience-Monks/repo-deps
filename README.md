# repo-deps

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

A high-level CLI tool to grab many dependencies from a set of GitHub repos.

For a lower level API, see [gh-repo-dependencies](https://www.npmjs.com/package/gh-repo-dependencies).

## Examples

The first time you run the tool, it will prompt for your GitHub username and password. You can disable this with `--no-auth` flag.

Examples:

```sh
repo-deps mattdesl/marvel-comics-api --pretty --filter=dependencies
```

Or, saving common JSON to a file:

```sh
repo-deps mattdesl/marvel-comics-api Jam3/gh-api-stream > data.json
```

You can use the `--raw` data if you want raw reigstry data (all versions).

## Usage

[![NPM](https://nodei.co/npm/repo-deps.png)](https://www.npmjs.com/package/repo-deps)

```sh
Usage:
  repo-deps repositories [opt]

Options:
  --raw       raw registry JSON
  --pretty    pretty print the results
  --filter    filter to "dependencies" or "devDependencies"
  --no-auth   do not try to authorize GitHub API
```

Repo names are simple URLs like `"user/repo"` or a fully qualified `"git://"` URL. See [here](https://www.npmjs.com/package/github-url-to-object) for supported formats.

You can append a `ref` (commit SHA or branch name) to the name like so:

```sh
repo-deps mattdesl/budo#next
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/repo-deps/blob/master/LICENSE.md) for details.

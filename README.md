# cgp-build

[![Build Status][actions-img]][actions-url]
[![Coverage Status][codecov-img]][codecov-url]
[![License][license-img]][license-url]
[![NPM Downloads][downloads-img]][downloads-url]
[![NPM Version][version-img]][version-url]
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> a gulp auto build tools

## Installation

```shell
$ npm install cgp-build

# or yarn
$ yarn add cgp-build
```

## Usage

<!-- TODO: Introduction of Usage -->

```javascript
const cgpBuild = require('cgp-build')
const result = webBuild('w')
// result => 'w@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### cgpBuild(input, options?)

#### input

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Related

- [zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools.

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [chenguopeng](https://github.com/ying95478)



[actions-img]: https://img.shields.io/github/workflow/status/ying95478/cgp-build/CI
[actions-url]: https://github.com/ying95478/cgp-build/actions
[codecov-img]: https://img.shields.io/codecov/c/github/ying95478/cgp-build
[codecov-url]: https://codecov.io/gh/ying95478/cgp-build
[license-img]: https://img.shields.io/github/license/ying95478/cgp-build
[license-url]: https://github.com/ying95478/cgp-build/blob/master/LICENSE
[downloads-img]: https://img.shields.io/npm/dm/cgp-build
[downloads-url]: https://npm.im/cgp-build
[version-img]: https://img.shields.io/npm/v/cgp-build
[version-url]: https://npm.im/cgp-build
[dependency-img]: https://img.shields.io/david/ying95478/cgp-build
[dependency-url]: https://david-dm.org/ying95478/cgp-build
[devdependency-img]: https://img.shields.io/david/dev/ying95478/cgp-build
[devdependency-url]: https://david-dm.org/ying95478/cgp-build?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com

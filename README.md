# chrome-path

> Getting chrome/chromium paths


## Install

```
$ npm install @gen6033/chrome-path
```


## Usage

```js
const chromePath = require('@gen6033/chrome-path');

chromePath()
/* =>
{ 'google-chrome': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'google-chrome-canary': '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  chromium: '/Applications/Chromium.app/Contents/MacOS/Chromium' }
*/
```

## License

MIT

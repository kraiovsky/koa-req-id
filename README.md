# koa-req-id
Set request ID header for Koa2 app.

## Install
```
npm i koa-req-id
yarn add koa-req-id
```

## Use
```
const Koa = require('koa')
const requestId = require('koa-req-id')

const app = new Koa()
app.use(requestId('my-custom-header-id-name'))
```
If custom name of the header is not passed, it will default to `x-request-id`.

Will reuse received request ID under the same header name, or will create a new one with `UUIDv4`.

## Maintainer
Roman Krayovskyy (rkrayovskyy@gmail.com)

## License
MIT

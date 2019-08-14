const { createMockContext } = require('@shopify/jest-koa-mocks')
const reqId = require('./index')

let ctx
const next = jest.fn()
beforeEach(() => {
  ctx = createMockContext()
  ctx.set = jest.fn((header, value) => (ctx.headers[header] = value))
  ctx.get = jest.fn(header => ctx.headers[header])
})

describe('Set Request ID header for a response', () => {
  test(`should generate new UUID and set it as a response header with default header name`, () => {
    reqId()(ctx, next)
    expect(ctx.header).toMatchObject({ 'x-request-id': expect.any(String) })
    expect(next).toHaveBeenCalled()
  })
  test(`should generate new UUID and set it as a response header with custon header name`, () => {
    const headerName = 'my-custom-header'
    reqId(headerName)(ctx, next)
    expect(ctx.header).toMatchObject({ [headerName]: expect.any(String) })
    expect(next).toHaveBeenCalled()
  })
  test(`should get request id from request header and set it as a response header with default header name`, () => {
    const headerName = 'x-request-id'
    ctx.request.header[headerName] = 'id-123-abc'
    reqId()(ctx, next)
    expect(ctx.header).toMatchObject({ [headerName]: 'id-123-abc' })
    expect(next).toHaveBeenCalled()
  })
})

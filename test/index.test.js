var formatter = require('..')
  , assert = require('assert')
  , config = require('../config.json')

describe('cf-formatter', function () {

  it('should return a function', function () {
    assert.equal(typeof formatter({}), 'function')
  })

  it('should initialize without a config', function () {
    assert.equal(typeof formatter(), 'function')
  })

  it('should format from locale', function () {
    assert.equal(formatter(config)('2001-01-01', 'LL'), '1 January 2001')
  })

  it('should format using calendar format', function () {
    assert.equal(formatter(config)('2001-01-01', 'calendar'), 'Monday 1 January 2001 00:00')
    assert(/^Today/.test(formatter(config)(new Date(), 'calendar')))
  })

  it('should format using custom formats', function () {
     assert.equal(formatter(config)('2001-01-01', 'iso'), '2001-01-01T00:00:00.000Z')
     assert.equal(formatter(config)('2001-01-01', 'isoFileSystem'), '20010101T120000Z')
  })

  it('should format using ‘from’ style', function () {
    var output
    assert.equal(formatter(config)(new Date(), 'from'), 'a few seconds ago')
    assert(/years ago/.test(output = formatter(config)('2001-01-01', 'from')), output)
  })

})

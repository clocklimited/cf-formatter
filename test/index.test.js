var formatter = require('..')
  , assert = require('assert')
  , config = require('../config.json')
  , extend = require('lodash.assign')

describe('cf-formatter', function () {

  it('should return a function', function () {
    assert.equal(typeof formatter({}), 'function')
  })

  it('should initialize without a config', function () {
    assert.equal(typeof formatter(), 'function')
  })

  it('should format from locale', function () {
    assert.equal(formatter(config)('2001-01-01T00:00:00Z', 'LL'), '1 January 2001')
  })

  it('should format from default local for timezone', function () {
    var defaultLocalConfig = extend({}, config)
    ; delete defaultLocalConfig.locale
    assert.equal(formatter(config)('2001-01-01T00:00:00Z', 'LLLL'), 'Monday 1 January 2001 00:00')
  })

  it('should format using calendar format', function () {
    assert.equal(formatter(config)('2001-01-01T00:00:00Z', 'calendar'), 'Monday 1 January 2001 00:00')
    assert(/^Today/.test(formatter(config)(new Date(), 'calendar')))
  })

  it('should format using custom formats', function () {
     assert.equal(formatter(config)('2001-01-01T00:00:00Z', 'iso'), '2001-01-01T00:00:00.000Z')
     assert.equal(formatter(config)('2001-01-01T00:00:00Z', 'isoFileSystem'), '20010101T120000Z')
  })

  it('should format using ‘from’ style', function () {
    var output
    assert.equal(formatter(config)(new Date(), 'from'), 'a few seconds ago')
    assert(/years ago/.test(output = formatter(config)('2001-01-01T00:00:00Z', 'from')), output)
  })

})

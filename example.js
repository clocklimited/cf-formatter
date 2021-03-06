var formatter = require('./')
  , config = require('./config.json')
  , format = formatter(config)
  , log = console.log

// Using locale formats from the clock locale. Defined in config.locale
log(format(new Date(), 'L'))
log(format(new Date(), 'LTS'))
log(format(new Date(), 'LLL'))

// Using special formats
log(format(new Date(), 'calendar'))
log(format(new Date(), 'from'))

// Using custom formats from config.formats
log(format(new Date(), 'iso'))
log(format(new Date(), 'isoFileSystem'))

// Override timezone at format level
log(format(new Date(), 'timezone', 'America/New_York'))

// Output
// 4 Apr 2015
// 15:42:48
// 4 April 2015 15:42
// Today at 15:42
// a few seconds ago
// 2015-04-04T15:42:48.4848Z
// 20150404T034248Z
// Saturday 4 April 2015 10:42 EDT

// This expects a cf style config object. It should have locale, timezone, and formats
module.exports = formatter

var moment = require('moment-timezone')

function formatter(customConfig, customLocale) {
  var config = customConfig || {}

  if (customLocale) {
    moment.locale(customLocale)
  } else if (config.locale) {
    moment.locale('clock', config.locale)
  }

  function format(date, dateFormat, timezone) {
    var actualTimezone = timezone || config.timezone || 'Europe/London'
    if (dateFormat === 'from') return moment(date).tz(actualTimezone).fromNow()
    if (dateFormat === 'calendar') return moment(date).tz(actualTimezone).calendar()
    var momentFormat = (config.formats && config.formats[dateFormat]) || dateFormat
    return moment(date).tz(actualTimezone).format(momentFormat)
  }

  return format
}

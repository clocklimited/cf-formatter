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
    if (dateFormat === 'from') return moment(date).tz(timezone || config.timezone).fromNow()
    if (dateFormat === 'calendar') return moment(date).tz(timezone || config.timezone).calendar()
    var momentFormat = (config.formats && config.formats[dateFormat]) || dateFormat
    return moment(date).tz(timezone || config.timezone || 'Europe/London').format(momentFormat)
  }

  return format
}
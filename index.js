// This expects a cf style config object. It should have locale, timezone, and formats
module.exports = formatter

var moment = require('moment-timezone')

function formatter(customConfig, customLocale) {
  var config = customConfig || {}
  , locale = customLocale || 'clock'

  if (config.locale) {
    moment.locale('clock', config.locale)
  }

  function format(date, dateFormat, timezone) {

    var localeDate = moment(date)
    localeDate.locale(locale)

    var actualTimezone = timezone || config.timezone || 'Europe/London'
      , momementObject = localeDate.tz(actualTimezone)

    if (dateFormat === 'from') return momementObject.fromNow()
    if (dateFormat === 'calendar') return momementObject.calendar()
    var momentFormat = (config.formats && config.formats[dateFormat]) || dateFormat
    return momementObject.format(momentFormat)
  }

  return format
}

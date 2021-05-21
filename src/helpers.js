/* eslint-disable import/prefer-default-export */

/**
 * Convert an ISO-8601 UTC timestamp into a timesting in 'H:mm aa' format in the
 * device's local timezone.
 *
 * For example, '2020-10-10T16:00:00.000Z' ==> '09:00 AM' in PDT
 */
export function formatTimeString(utcTimestamp) {
  const timestamp = new Date(utcTimestamp)
  const twentyFourHours = timestamp.getHours()
  const hours = twentyFourHours <= 12 ? twentyFourHours : twentyFourHours - 12
  const ampm = twentyFourHours < 12 ? 'AM' : 'PM'
  return `${hours}:${timestamp.getMinutes().toString().padStart(2, '0')} ${ampm}`
}

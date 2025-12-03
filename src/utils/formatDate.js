export function formatDate(dateString) {
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR', options)
}

export function formatTime(timeString) {
  return timeString.replace(':', 'h')
}

export function isToday(dateString) {
  const today = new Date()
  const date = new Date(dateString + 'T00:00:00')
  return date.toDateString() === today.toDateString()
}

export function isPastDate(dateString) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dateString + 'T00:00:00') < today
}

export function getMinDate() {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

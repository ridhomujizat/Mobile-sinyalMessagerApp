const month = ['January', 'Febuary', 'March', 'April', 'May', 'Juny', 'July', 'August', 'August', 'September', 'October', 'November', 'December']

const MonthUpComing = (mountMonth) => {
  const current = new Date()
  const resultMonth = []
  for (let i = 0; i < mountMonth; i++) {
    current.setMonth(current.getMonth() + 1)
    const nextMonth = current.getMonth().toLocaleString()
    resultMonth.push(month[nextMonth])
  }
  return resultMonth
}

const parsingDMY = (value = new Date()) => {
  const date = new Date(value)
  const monthIndex = date.getMonth().toLocaleString()
  const day = String(date).slice(8, 10)
  const year = date.getFullYear()
  const dateResult = `${month[monthIndex]} ${day}, ${year}`
  return dateResult
}

const parsingDM = (value = new Date()) => {
  const date = new Date(value)
  const monthIndex = date.getMonth().toLocaleString()
  const day = String(date).slice(8, 10)
  const dateResult = `${day} ${month[monthIndex].slice(0, 3)}`
  return dateResult
}

const parsingTime = (value = new Date()) => {
  const date = new Date(value)
  const hour = Number(date.getHours())
  const hours = hour < 10 ? `0${hour}` : hour
  const minute = date.getMinutes()
  const dateResult = `${hours}:${minute}`
  return dateResult
}
export { MonthUpComing, parsingDMY, parsingDM, parsingTime }

export type DayObject = {
  dayNumber: number
  dayName: string
  shortDayName: string
}

export type MonthObject = {
  monthName: string
  days: DayObject[]
}

export const getMonthsIn2024 = (): MonthObject[] => {
  const months: MonthObject[] = []

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(2024, month, 0).getDate()
    const monthName = new Date(2024, month - 1, 1).toLocaleString("default", {
      month: "long",
    })

    const monthObject: MonthObject = {
      monthName,
      days: [],
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(2024, month - 1, day)
      const dayObject: DayObject = {
        dayNumber: day,
        dayName: date.toLocaleString("default", { weekday: "long" }),
        shortDayName: date.toLocaleString("default", { weekday: "short" }),
      }
      monthObject.days.push(dayObject)
    }

    months.push(monthObject)
  }

  return months
}

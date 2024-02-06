export type DayObject = {
    num: number;
    dayName: string;
    shortDayName: string;
    weekNumber: number;
};

export type MonthObject = {
    num: number;
    monthName: string;
    shortMonthName: string;
    days: DayObject[];
};

export const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export function getWeek(date: Date): number {
    // Copying date so the original date won't be modified
    const tempDate = new Date(date.valueOf());

    // ISO week date weeks start on Monday, so correct the day number
    const dayNum = (date.getDay() + 6) % 7;

    // Set the target to the nearest Thursday (current date + 4 - current day number)
    tempDate.setDate(tempDate.getDate() - dayNum + 3);

    // ISO 8601 week number of the year for this date
    const firstThursday = tempDate.valueOf();

    // Set the target to the first day of the year
    // First set the target to January 1st
    tempDate.setMonth(0, 1);

    // If this is not a Thursday, set the target to the next Thursday
    if (tempDate.getDay() !== 4) {
        tempDate.setMonth(0, 1 + ((4 - tempDate.getDay() + 7) % 7));
    }

    // The weeknumber is the number of weeks between the first Thursday of the year
    // and the Thursday in the target week
    return 1 + Math.ceil((firstThursday - tempDate.valueOf()) / 604800000); // 604800000 = number of milliseconds in a week
}

export const getMonths = (year: number): MonthObject[] => {
    const months: MonthObject[] = [];

    for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate();
        const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });
        const shortMonthName = new Date(year, month - 1, 1).toLocaleString('default', {
            month: 'short',
        });

        const monthObject: MonthObject = {
            num: month,
            monthName,
            shortMonthName,
            days: [],
        };

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day);
            const dayObject: DayObject = {
                num: day,
                dayName: date.toLocaleString('default', { weekday: 'long' }),
                shortDayName: date.toLocaleString('default', { weekday: 'short' }),
                weekNumber: getWeek(date),
            };
            monthObject.days.push(dayObject);
        }

        months.push(monthObject);
    }

    return months;
};

export const THISYEAR = getMonths(new Date().getFullYear());

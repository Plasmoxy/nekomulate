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

const getWeek = (date: Date): number => {
    const year = date.getFullYear();
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const daysToFirstThursday = dayOfWeek <= 4 ? 4 - dayOfWeek : 11 - dayOfWeek;
    const firstThursday = new Date(
        firstDayOfYear.setDate(firstDayOfYear.getDate() + daysToFirstThursday),
    );

    // Adjust for leap years
    if (year !== date.getFullYear() || date < firstThursday) {
        firstThursday.setFullYear(year + 1);
        firstThursday.setDate(
            4 - (firstThursday.getDay() <= 4 ? firstThursday.getDay() : firstThursday.getDay() - 7),
        );
    }

    return Math.ceil((date.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
};

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

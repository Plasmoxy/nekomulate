export type DayObject = {
    dayName: string;
    shortDayName: string;
};

export type MonthObject = {
    monthName: string;
    shortMonthName: string;
    days: DayObject[];
};

export const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
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
            monthName,
            shortMonthName,
            days: [],
        };

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day);
            const dayObject: DayObject = {
                dayName: date.toLocaleString('default', { weekday: 'long' }),
                shortDayName: date.toLocaleString('default', { weekday: 'short' }),
            };
            monthObject.days.push(dayObject);
        }

        months.push(monthObject);
    }

    return months;
};

export const THISYEAR = getMonths(new Date().getFullYear());

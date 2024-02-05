'use client';
import { getMonths } from '@/calendar';
import { useCallback, useMemo, useState } from 'react';
import DayCell from './DayCell';

export default function Calendar() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthIdx, setMonthIdx] = useState(new Date().getMonth());

    const months = useMemo(() => getMonths(year), [year]);
    const month = months[monthIdx];

    const isToday = useCallback(
        (day: number) => {
            const today = new Date();
            return (
                today.getFullYear() === year &&
                today.getMonth() === monthIdx &&
                today.getDate() === day
            );
        },
        [year, monthIdx],
    );

    return (
        <div>
            <div className="flex justify-center items-center mb-5">
                <div className="flex justify-start text-xl">
                    <div className="px-1 cursor-pointer select-none">{'<'}</div>
                    <div className="px-1 text-teal-200">{year}</div>
                    <div className="px-1 cursor-pointer select-none">{'>'}</div>

                    <div className="px-1 cursor-pointer select-none">{'<'}</div>
                    <div className="px-1 text-teal-200">{month.shortMonthName}</div>
                    <div className="px-1 cursor-pointer select-none">{'>'}</div>
                </div>

                <div className="flex justify-center flex-1">Nekomulate</div>

                <div className="flex justify-end text-xl w-[175px]"></div>
            </div>

            <div className="grid grid-cols-5 gap-x-3 gap-y-3 text-sm">
                {month.days.map((day, i) => (
                    <DayCell key={`${year}-${monthIdx}-${i}`} day={day} isToday={isToday(i + 1)} />
                ))}
            </div>
        </div>
    );
}

'use client';
import { getMonths } from '@/calendar'
import { useMemo, useState } from 'react'
import DayCell from './DayCell'

export default function Calendar() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [monthIdx, setMonthIdx] = useState(new Date().getMonth());

    const months = useMemo(() => getMonths(year), [year]);
    const month = months[monthIdx];

    return (
        <div>
            <div className="flex justify-start text-xl mb-5">
                <div className="px-1 cursor-pointer select-none">{'<'}</div>
                <div className="px-1 text-teal-200">{year}</div>
                <div className="px-1 cursor-pointer select-none">{'>'}</div>

                <div className="px-1 cursor-pointer select-none">{'<'}</div>
                <div className="px-1 text-teal-200">{month.shortMonthName}</div>
                <div className="px-1 cursor-pointer select-none">{'>'}</div>
            </div>
            <div className="grid grid-cols-5 gap-x-3 gap-y-3 text-sm">
                {month.days.map((day, i) => (
                    <DayCell key={`${year}-${monthIdx}-${i}`} day={day} />
                ))}
            </div>
        </div>
    );
}

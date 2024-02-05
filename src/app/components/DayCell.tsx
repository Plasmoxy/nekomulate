'use client';

import { DayObject } from '@/calendar';
import ActivityCell from './ActivityCell';
import DotMatrix from './DotMatrix';

type Props = {
    day: DayObject;
    isToday: boolean;
    onClick: (day: DayObject) => void;
};

export default function DayCell({ day, isToday, onClick }: Props) {
    const isWeekend = day.dayName === 'Saturday' || day.dayName === 'Sunday';

    return (
        <div
            className={`flex p-2 rounded-md hover:border hover:border-black min-h-[13vh] cursor-pointer select-none transform transition-transform ease-in-out duration-100 hover:scale-125 z-0 hover:z-10 ${
                day.weekNumber % 2 === 0 ? 'bg-zinc-900' : 'bg-[#222226]'
            }`}
            onClick={() => onClick(day)}
        >
            <div className={`flex flex-col text-sm rounded-md`}>
                <div
                    className={`flex flex-col rounded-md p-0.5 ${
                        isToday ? 'border border-rose-200' : ''
                    }`}
                >
                    <span className={`text-sm ${isWeekend ? 'text-blue-400' : ''}`}>{day.num}</span>
                    <span className={isWeekend ? 'text-blue-400' : ''}>{day.shortDayName}</span>
                </div>
                <DotMatrix total={6} active={3} />
            </div>

            <div className="flex-1 ml-1 grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-2 text-sm">
                {Array.from({ length: Math.floor(Math.random() * 5 + 3) }, (_, i) => (
                    <ActivityCell key={i} day={day} />
                ))}
            </div>
        </div>
    );
}

'use client';

import { DayObject } from '@/calendar';
import DotMatrix from './DotMatrix';

type Props = {
    day: DayObject;
    isToday: boolean;
};

export default function DayCell({ day, isToday }: Props) {
    const isWeekend = day.dayName === 'Saturday' || day.dayName === 'Sunday';

    return (
        <div
            className={`flex p-2 rounded-md hover:border hover:border-black bg-zinc-900 min-h-[13vh] cursor-pointer transform transition-transform ease-in-out duration-100 hover:scale-125 z-0 hover:z-10`}
        >
            <div className={`flex flex-col text-sm rounded-md`}>
                <div
                    className={`flex flex-col rounded-md p-0.5 ${
                        isToday ? 'border border-rose-200' : ''
                    }`}
                >
                    <span className={`text-sm ${isWeekend ? 'text-teal-400' : ''}`}>{day.num}</span>
                    <span className={isWeekend ? 'text-teal-400' : ''}>{day.shortDayName}</span>
                </div>
                <DotMatrix total={4} active={3} />
            </div>
            <div className="flex-1 ml-1 pl-2">xdd</div>
        </div>
    );
}

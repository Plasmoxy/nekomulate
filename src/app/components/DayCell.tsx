'use client';

import { Activity } from '@/activities';
import { DayObject } from '@/calendar';
import ActivityCell from './ActivityCell';
import DotMatrix from './DotMatrix';

type Props = {
    day: DayObject;
    isToday: boolean;
    activities: Record<string, Activity>;
    onActivityClicked: (activity: Activity | null) => void;
};

export default function DayCell({ day, isToday, activities, onActivityClicked }: Props) {
    const isWeekend = day.dayName === 'Saturday' || day.dayName === 'Sunday';

    return (
        <div
            className={`flex p-2 rounded-md min-h-[13vh] select-none transform transition-transform ease-in-out duration-100 hover:scale-125 z-0 hover:z-10 ${
                day.weekNumber % 2 === 0 ? 'bg-zinc-900' : 'bg-[#222226]'
            } ${
                isToday
                    ? 'border border-teal-200 hover:border-teal-200'
                    : 'hover:border hover:border-black'
            }`}
        >
            <div className={`flex flex-col text-sm rounded-md`}>
                <div className={`flex flex-col rounded-md p-0.5 `}>
                    <span className={`text-sm ${isWeekend ? 'text-blue-400' : ''}`}>{day.num}</span>
                    <span className={isWeekend ? 'text-blue-400' : ''}>{day.shortDayName}</span>
                </div>
                <DotMatrix total={6} active={3} />
            </div>

            <div className="group flex-1 ml-1 grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-2 text-sm">
                {Object.entries(activities).map(([id, activity]) => (
                    <ActivityCell
                        key={activity.id}
                        activity={activity}
                        onClick={onActivityClicked}
                    />
                ))}
                <div>
                    <button
                        onClick={() => onActivityClicked(null)}
                        className="hidden group-hover:flex items-center justify-center w-full h-full rounded-md bg-zinc-800 text-gray-400 transform transition-transform ease-in-out duration-100 hover:scale-125 z-0 hover:z-10"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

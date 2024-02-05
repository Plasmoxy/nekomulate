'use client';

import { DayObject } from '@/calendar';

type Props = {
    day: DayObject;
};

export default function DayCell({ day }: Props) {
    return (
        <div className="p-3 rounded-md hover:border hover:border-black bg-zinc-900 min-h-[13vh] cursor-pointer transform transition-transform ease-in-out duration-100 hover:scale-125 z-0 hover:z-10"></div>
    );
}

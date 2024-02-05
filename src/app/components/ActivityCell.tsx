'use client';

import { DayObject } from '@/calendar';
import { KOLORES } from '@/kolores';

type Props = {
    day: DayObject;
};

export default function ActivityCell({ day }: Props) {
    const i = Math.floor(Math.random() * KOLORES.length);
    return (
        <div
            className={`flex break-words text-wrap rounded-md bg-${KOLORES[i]} px-1 font-semibold text-black text-[10px]`}
        ></div>
    );
}

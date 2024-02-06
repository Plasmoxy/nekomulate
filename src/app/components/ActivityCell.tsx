'use client';

import { Activity } from '@/activities';

type Props = {
    activity: Activity;
    onClick: (activity: Activity) => void;
};

export default function ActivityCell({ onClick, activity }: Props) {
    return (
        <div
            className={`flex break-words text-wrap rounded-md bg-${activity.color} px-1 font-semibold text-black text-[10px] cursor-pointer select-none transform transition-transform ease-in-out duration-100 hover:scale-125 z-0 hover:z-10`}
            onClick={() => onClick(activity)}
        >
            {activity.title}
        </div>
    );
}

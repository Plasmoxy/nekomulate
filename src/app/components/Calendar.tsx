'use client';
import { Activity } from '@/activities';
import { getMonths } from '@/calendar';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import ActivityEditModal from './ActivityEditModal';
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

    const yearPlus = useCallback(() => setYear(year + 1), [year]);
    const yearMinus = useCallback(() => setYear(year - 1), [year]);
    const monthPlus = useCallback(() => setMonthIdx(monthIdx + 1), [monthIdx]);
    const monthMinus = useCallback(() => setMonthIdx(monthIdx - 1), [monthIdx]);

    const [activities, setActivities] = useState<Record<string, Activity>>({});
    const getActivitiesForDay = useCallback(
        (day: number) =>
            Object.values(activities)
                .filter(
                    (activity) =>
                        new Date(activity.date).getFullYear() === year &&
                        new Date(activity.date).getMonth() === monthIdx &&
                        new Date(activity.date).getDate() === day,
                )
                .reduce<Record<string, Activity>>(
                    (acc, activity) => ({ ...acc, [activity.id]: activity }),
                    {} as Record<string, Activity>,
                ),
        [activities, year, monthIdx],
    );

    const onEditActivityModalClose = useCallback(
        (editedActivity: Activity) => {
            setActivities((prev) => ({
                ...prev,
                [editedActivity.id]: editedActivity,
            }));
            setSelectedActivity(null);
            setModalOpen(false);
        },
        [setActivities],
    );

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Partial<Activity> | null>(null);

    return (
        <div>
            <ActivityEditModal
                open={modalOpen}
                onClose={onEditActivityModalClose}
                activity={selectedActivity}
            />

            <div className="flex justify-center items-center mb-5">
                <div className="flex justify-start text-xl">
                    <div className="px-1 cursor-pointer select-none" onClick={yearMinus}>
                        {'<'}
                    </div>
                    <div className="px-1 text-teal-200">{year}</div>
                    <div className="px-1 cursor-pointer select-none" onClick={yearPlus}>
                        {'>'}
                    </div>

                    <div className="px-1 cursor-pointer select-none" onClick={monthMinus}>
                        {'<'}
                    </div>
                    <div className="px-1 text-teal-200">{month.shortMonthName}</div>
                    <div className="px-1 cursor-pointer select-none" onClick={monthPlus}>
                        {'>'}
                    </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                    <Image src="/catlogo.png" alt="Nekomulate" width={40} height={40} />
                    <span>・Nekomulate・</span>
                </div>

                <div className="flex justify-end text-xl w-[175px]"></div>
            </div>

            <div className="grid grid-cols-5 gap-x-3 gap-y-3 text-sm">
                {month.days.map((day, i) => (
                    <DayCell
                        key={`${year}-${monthIdx}-${i}`}
                        day={day}
                        isToday={isToday(i + 1)}
                        onActivityClicked={(targetActivity) => {
                            setSelectedActivity(
                                targetActivity
                                    ? targetActivity
                                    : // construct date for new activity in advance yyyy-mm-dd format, adding 0 to month and day if less than 10
                                      {
                                          date: `${year}-${(monthIdx + 1)
                                              .toString()
                                              .padStart(2, '0')}-${(i + 1)
                                              .toString()
                                              .padStart(2, '0')}`,
                                      },
                            );
                            setModalOpen(true);
                        }}
                        activities={getActivitiesForDay(i + 1)}
                    />
                ))}
            </div>
        </div>
    );
}

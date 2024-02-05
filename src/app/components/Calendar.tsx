'use client';
import { DayObject, getMonths } from '@/calendar';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import DayCell from './DayCell';
import PerhapsModal from './PerhapsModal';

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

    const [modalOpen, setModalOpen] = useState(false);
    const [modalDay, setModalDay] = useState<DayObject>(month.days[0]);

    return (
        <div>
            <PerhapsModal open={modalOpen} onClose={() => setModalOpen(false)} day={modalDay} />

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
                        onClick={() => {
                            setModalDay(day);
                            setModalOpen(true);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

'use-client';
import { Activity } from '@/activities';
import React, { useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';

type Props = {
    open: boolean;
    onClose: (editedActivity: Activity) => void;
    activity: Partial<Activity> | null;
};

const ActivityEditModal = ({ open, onClose, activity }: Props) => {
    console.log('Incoming activity:', activity);

    const [title, setTitle] = useState(activity?.title ?? '');
    const [color, setColor] = useState(activity?.color ?? 'teal-200');
    const [date, setDate] = useState(activity?.date ?? new Date().toISOString().split('T')[0]);
    const [imageBase64, setImageBase64] = useState(activity?.imageBase64 ?? '');

    const id = activity?.id ?? v4(); // keep regenerating ID if activity null
    const activityState = useMemo(
        () => ({
            id,
            title,
            color,
            date,
            imageBase64,
        }),
        [title, color, date, imageBase64, id],
    );

    // Close the modal on Escape key press
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose(activityState);
            }
        };

        if (open) {
            document.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [open, onClose, activityState]);

    // Close the modal when clicking outside of it
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose(activityState);
        }
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
                    <div
                        className="fixed inset-0 bg-black opacity-90"
                        onClick={handleOverlayClick}
                    ></div>
                    <div className="relative z-50 bg-zinc-900 rounded-lg p-5 max-w-screen-md w-full overflow-y-auto">
                        <button
                            onClick={() => onClose(activityState)}
                            className="absolute top-2 right-5 text-2xl text-rose-200 hover:text-rose-100 focus:outline-none"
                        >
                            ×
                        </button>
                        <h4 className={`text-${activity?.color ?? 'green-400'}`}>
                            {activity ? `Edit ${activity.title}` : 'Create new activity'}
                        </h4>

                        <div className="mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActivityEditModal;

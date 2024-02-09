'use-client';
import { Activity, ActivityInput } from '@/activities';
import React, { useEffect, useMemo, useState } from 'react';
import ColorSelector from './ColorSelector';
import DrawingCanvas from './DrawingCanvas';

type Props = {
    open: boolean;
    onClose: (editedActivity: Activity) => void;
    activity: ActivityInput;
};

const ActivityEditModal = ({ open, onClose, activity }: Props) => {
    const [title, setTitle] = useState(activity.title ?? '');
    const [color, setColor] = useState(activity.color ?? 'teal-200');
    const [date, setDate] = useState(activity.date ?? new Date().toISOString().split('T')[0]);
    const [imageBase64, setImageBase64] = useState(activity.imageBase64 ?? '');

    const id = activity.id;
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
                            {activity.title ? `Edit ${activity.title}` : 'Create new activity'}
                        </h4>

                        <div className="flex flex-row space-y-3 mt-5">
                            <div className="mr-5">
                                <label className="ml-2">Icon (draw)</label>
                                <DrawingCanvas image={imageBase64} setImage={setImageBase64} />
                            </div>

                            <div className="flex-1 flex flex-col !mt-0">
                                <label htmlFor="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="rounded-md bg-zinc-800 !outline-none py-1 px-2 mt-1"
                                />

                                <label htmlFor="color" className="pt-5">
                                    Color
                                </label>
                                <div id="color" className="mt-1">
                                    {/* color options shown as radio buttons but as colored circles with white border on the one that is selected */}
                                    <ColorSelector
                                        selectedColor={color}
                                        setSelectedColor={setColor}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActivityEditModal;

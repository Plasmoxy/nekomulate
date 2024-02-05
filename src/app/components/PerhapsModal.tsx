'use-client';
import { DayObject } from '@/calendar';
import React, { useEffect } from 'react';

type Props = {
    open: boolean;
    onClose: () => void;
    day: DayObject;
};

const PerhapsModal = ({ open, onClose, day }: Props) => {
    // Close the modal on Escape key press
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [open, onClose]);

    // Close the modal when clicking outside of it
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={handleOverlayClick}
                    ></div>
                    <div className="relative z-50 bg-zinc-900 rounded-lg p-5 max-w-screen-md w-full overflow-y-auto">
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-5 text-2xl text-rose-200 hover:text-rose-100 focus:outline-none"
                        >
                            ×
                        </button>
                        <h4 className="text-rose-200">
                            {day.num} ・ {day.dayName}
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

export default PerhapsModal;

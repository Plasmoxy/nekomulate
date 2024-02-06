import { Color } from './kolores';

export type Activity = {
    id: string; // uuid
    color: Color;
    imageBase64: string; // base64
    title: string;
    date: string; // yyyy-mm-dd
};

export const MOCKACTIVITIES: Record<string, Activity> = {
    A: {
        id: 'A',
        color: 'teal-200',
        imageBase64: '',
        title: 'A',
        date: '2024-02-06',
    },
    B: {
        id: 'B',
        color: 'amber-300',
        imageBase64: '',
        title: 'B',
        date: '2024-02-07',
    },
};

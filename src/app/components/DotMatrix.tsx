'use client';

type Props = {
    total: number;
    active: number;
};

export default function DotMatrix({ total, active }: Props) {
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-1 my-2 pr-3">
            {Array.from({ length: total }, (_, i) => (
                <div
                    key={i}
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                        i < active ? 'bg-zinc-600' : 'bg-rose-200'
                    }`}
                ></div>
            ))}
        </div>
    );
}

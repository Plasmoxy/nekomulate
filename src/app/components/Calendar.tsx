import DayCell from './DayCell';

export default function Calendar() {
    return (
        <div className="grid grid-cols-5 gap-x-4 gap-y-3 m-3 p-4 text-sm">
            {[...Array(28)].map((_, i) => (
                <DayCell key={i} />
            ))}
        </div>
    );
}

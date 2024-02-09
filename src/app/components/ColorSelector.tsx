import { Color, KOLORES } from '@/kolores';

type Props = {
    selectedColor: Color;
    setSelectedColor: (color: Color) => void;
};

export function ColorSelector({ selectedColor, setSelectedColor }: Props) {
    return (
        <div className="flex">
            {KOLORES.map((color, index) => (
                <label key={index} className="inline-block mr-4">
                    <input
                        type="radio"
                        value={color}
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(color)}
                        className="hidden"
                    />
                    <span className={`inline-block w-5 h-5 rounded-full bg-${color} relative`}>
                        {selectedColor === color && (
                            <span className="absolute top-[-4px] left-[-4px] inline-block w-7 h-7 rounded-full border-2 border-white" />
                        )}
                    </span>
                </label>
            ))}
        </div>
    );
}

export default ColorSelector;

export default function Slider({ value, setValue, id }: { value: number, setValue: (value: number) => void, id: string }) {
    return (
        <div className="px-20">
            <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
                id={id}
                className="w-full h-10 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            />
        </div>
    );
}

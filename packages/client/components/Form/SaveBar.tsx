interface SaveBarProps {
    onReset: () => void;
    onSave: () => void;
}

export default function SaveBar({ onReset, onSave }: SaveBarProps) {
    return (
        <div className="p-4 bg-gray-700 rounded-lg h-16 fixed bottom-10">
            <span className="mr-6">You have unsaved changes!</span>
            <button className="mr-2" onClick={onReset}>
                Reset
            </button>
            <button className="px-2 py-1 bg-green-500 rounded" onClick={onSave}>
                Save
            </button>
        </div>
    );
}

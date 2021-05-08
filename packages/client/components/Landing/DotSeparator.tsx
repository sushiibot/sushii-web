interface Props {
    count: number;
}

export default function DotSeparator({ count }: Props) {
    return (
        <div className="my-4">
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="inline-block mr-5 w-1 h-1 rounded-full bg-gray-100"
                />
            ))}
        </div>
    );
}

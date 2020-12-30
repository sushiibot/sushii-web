interface BarProps {
    animationDuration: number;
    progress: number;
}

export default function Bar({ animationDuration, progress }: BarProps) {
    return (
        <div
            className="bg-blue-400"
            style={{
                height: 1,
                left: 0,
                marginLeft: `${(-1 + progress) * 100}%`,
                position: "fixed",
                top: 0,
                transition: `margin-left ${animationDuration}ms linear`,
                width: "100%",
                zIndex: 1031,
            }}
        >
            <div
                className="block h-full opacity-100 absolute right-0 
                    bg-gradient-to-r from-purple-400 via-blue-500 to-teal-500"
                style={{
                    transform: "rotate(3deg) translate(0px, -4px)",
                    width: 100,
                }}
            />
        </div>
    );
}

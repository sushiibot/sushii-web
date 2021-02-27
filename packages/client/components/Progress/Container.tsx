interface ContainerProps {
    animationDuration: number;
    isFinished: boolean;
    children: JSX.Element | JSX.Element[];
}

export default function Container({
    animationDuration,
    children,
    isFinished,
}: ContainerProps) {
    return (
        <div
            style={{
                opacity: isFinished ? 0 : 1,
                pointerEvents: "none",
                transition: `opacity ${animationDuration}ms linear`,
            }}
        >
            {children}
        </div>
    );
}

import Container from "./Container";
import Bar from "./Bar";
import { useNProgress } from "@tanem/react-nprogress";

interface ProgressProps {
    isAnimating: boolean;
}

export default function Progress({ isAnimating }: ProgressProps) {
    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating,
    });

    return (
        <Container
            animationDuration={animationDuration}
            isFinished={isFinished}
        >
            <Bar animationDuration={animationDuration} progress={progress} />
        </Container>
    );
}

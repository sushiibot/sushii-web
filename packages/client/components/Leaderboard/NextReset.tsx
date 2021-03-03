import { LevelTimeframe } from "@sushii-web/graphql";
import { useState, useEffect } from "react";

interface NextResetProps {
    timeframe: LevelTimeframe;
}

function pad(num: number): string {
    if (num <= 99) {
        return ("00" + num).slice(-2);
    }

    return num.toString();
}

export default function NextReset({ timeframe }: NextResetProps) {
    if (timeframe == LevelTimeframe.AllTime) {
        return null;
    }

    const calculateTimeLeft = () => {
        const now = new Date();
        const lastReset = new Date();
        let nextReset;

        switch (timeframe) {
            case LevelTimeframe.Month:
                lastReset.setUTCMonth(0);
                if (now.getUTCMonth() == 11) {
                    nextReset = new Date(now.getUTCFullYear() + 1, 0, 1);
                } else {
                    nextReset = new Date(
                        Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
                    );
                }
                break;
            case LevelTimeframe.Week:
                nextReset = new Date(
                    Date.UTC(
                        now.getUTCFullYear(),
                        now.getUTCMonth(),
                        now.getUTCDate() - now.getUTCDay() + 7
                    )
                );
                break;
            case LevelTimeframe.Day:
                lastReset.setUTCHours(0);
                // Add a day
                nextReset = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                // Reset time
                nextReset.setUTCHours(0, 0, 0, 0);
                break;
        }

        const diff = nextReset.getTime() - now.getTime();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (diff > 0) {
            timeLeft = {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    const s = `${pad(timeLeft.days)}d \
        ${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(
        timeLeft.seconds
    )}`;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clear after unmount
        return () => clearInterval(timer);
    });

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());
    }, [timeframe]);

    return <p className="text-gray-600 text-center">Next reset in {s}</p>;
}

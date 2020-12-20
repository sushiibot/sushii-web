interface Props {
    icon: IconType;
    title: string;
    children: string;
}

interface IconProps {
    type: IconType;
    className: string;
}

export enum IconType {
    Chat,
    Rank,
    Roles,
}

function Icon(props: IconProps) {
    const { type, className } = props;

    switch (type) {
        case IconType.Chat:
            return (
                <svg
                    className={className + " text-blue-300"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                </svg>
            );
        case IconType.Rank:
            return (
                <svg
                    className={className + " text-teal-400"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 11l7-7 7 7M5 19l7-7 7 7"
                    />
                </svg>
            );
        case IconType.Roles:
            return (
                <svg
                    className={className + " text-orange-300"}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            );
    }
}

export default function FeatureBlock(props: Props) {
    const { icon, title, children } = props;

    return (
        <div className="sm:max-w-1/2 mb-4 px-4">
            <Icon type={icon} className="w-10 mb-2 stroke-2 stroke-current" />
            <h2 className="text-2xl">{title}</h2>
            <p>{children}</p>
        </div>
    );
}

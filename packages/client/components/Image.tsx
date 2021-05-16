import { motion, Variants } from "framer-motion";
import { useState } from "react";

const imgVariants: Variants = {
    loading: {
        opacity: 0,
        y: 6,
    },
    loaded: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

interface ImageProps {
    wrapperClassName?: string;
    src: string;
    alt?: string;
    className?: string;
}

export default function Image({
    wrapperClassName,
    src,
    alt,
    className,
}: ImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div {...wrapperClassName}>
            <motion.img
                src={src}
                variants={imgVariants}
                initial="loading"
                animate={isLoaded ? "loaded" : "loading"}
                className={className}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
            />
            <div
                className="absolute top-0 left-0 -z-10 w-full h-full object-cover bg-gray-800
                                            rounded flex items-center 
                                            justify-center text-gray-600"
            >
                meow
            </div>
        </div>
    );
}

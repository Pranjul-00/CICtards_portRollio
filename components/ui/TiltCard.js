"use client";
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

export const TiltCard = ({ children, className = "", options = {} }) => {
    const tiltRef = useRef(null);

    useEffect(() => {
        if (tiltRef.current) {
            VanillaTilt.init(tiltRef.current, {
                max: 8, // max tilt rotation (degrees)
                speed: 400, // Speed of the enter/exit transition
                glare: true, // if it should have a "glare" effect
                "max-glare": 0.3, // the maximum "glare" opacity
                scale: 1.02, // 2% zoom on hover
                gyroscope: true, // allow device orientation control
                ...options,
            });
        }

        return () => {
            if (tiltRef.current?.vanillaTilt) {
                tiltRef.current.vanillaTilt.destroy();
            }
        };
    }, [options]);

    return (
        <div ref={tiltRef} className={`transform-gpu ${className}`}>
            {children}
        </div>
    );
};

"use client";
import { useEffect, useRef, useState } from "react";

export default function ScratchRevealImage({
    src,
    alt,
    width,
    height,
    className,
    style,
    onScratch
}) {
    const canvasRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef(null);

    // Initial draw
    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "Anonymous"; // Crucial for canvas operations
        imageRef.current = img;

        img.onload = () => {
            setIsLoaded(true);
            drawCanvas();
        };
    }, [src, width, height]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas || !imageRef.current) return;

        const ctx = canvas.getContext("2d");

        // Match canvas size to display size for crisp rendering
        // but respect the aspect ratio of the image or container
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Draw image initially
        // We use 'source-over' to draw the image normally
        ctx.globalCompositeOperation = "source-over";

        // Draw image to cover or contain based on props? 
        // For this specific use case (helmet), we want it to behave like object-contain
        // We'll calculate the aspect ratio fit manually

        const img = imageRef.current;
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            // Re-drawing on resize resets the scratch progress, which is usually acceptable 
            // or we'd need a more complex offscreen canvas state.
            // For now, simple redraw is safer.
            drawCanvas();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded]);

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // "Erase" mode
        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2); // 40px radius brush
        ctx.fill();

        if (onScratch) onScratch();
    };

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ ...style, touchAction: "none" }}
            width={width} // Intrinsic width if needed
            height={height} // Intrinsic height if needed
            onMouseMove={handleMouseMove}
            onTouchMove={(e) => {
                // Handle touch as well
                const touch = e.touches[0];
                handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
            }}
        />
    );
}

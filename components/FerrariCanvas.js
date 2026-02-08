"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES = 240;

export default function FerrariCanvas() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll progress for Section 1 only
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Smooth spring animation for frame transitions
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map scroll progress to frame index
    const frameIndex = useTransform(
        smoothProgress,
        [0, 1],
        [0, TOTAL_FRAMES - 1]
    );

    // Preload all frames
    useEffect(() => {
        const loadImages = async () => {
            const imageArray = [];
            let loaded = 0;

            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                const frameNumber = String(i).padStart(3, '0');
                img.src = `/ferrari/ezgif-frame-${frameNumber}.jpg`;

                img.onload = () => {
                    loaded++;
                    setLoadingProgress(Math.round((loaded / TOTAL_FRAMES) * 100));

                    if (loaded === TOTAL_FRAMES) {
                        setIsLoaded(true);
                    }
                };

                imageArray.push(img);
            }

            setImages(imageArray);
        };

        loadImages();
    }, []);

    // Render current frame to canvas
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const container = containerRef.current;

        const render = () => {
            const index = Math.min(
                Math.floor(frameIndex.get()),
                images.length - 1
            );
            const img = images[index];

            if (!img || !img.complete) return;

            // Set canvas size to match container
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            // Clear canvas
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Calculate scaling to contain image
            const imgAspect = img.width / img.height;
            const canvasAspect = canvas.width / canvas.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgAspect > canvasAspect) {
                // Image is wider
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgAspect;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                // Image is taller
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgAspect;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            // Draw image centered and scaled
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Subscribe to frame changes
        const unsubscribe = frameIndex.on("change", render);

        // Initial render
        render();

        // Handle window resize
        const handleResize = () => render();
        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [isLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="relative w-full h-screen">
            {/* Loading Screen */}
            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
                    <div className="text-6xl font-black text-white mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {loadingProgress}%
                    </div>
                    <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-red-600 to-red-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${loadingProgress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                    <div className="text-sm text-white/60 mt-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        LOADING FERRARI SF-26 TELEMETRY
                    </div>
                </div>
            )}

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: '#000000' }}
            />

            {/* Content Overlay */}
            {isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-7xl font-black mb-4"
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                color: '#CC0000',
                                textShadow: '0 0 20px rgba(204, 0, 0, 0.5)'
                            }}>
                            PRANJUL GUPTA
                        </h1>
                        <p className="text-2xl text-white font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            Teammate & Lead Architect
                        </p>
                        <div className="mt-8 text-white/60 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            SCROLL TO DISASSEMBLE ↓
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

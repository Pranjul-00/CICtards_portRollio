"use client";
import { useEffect, useRef, useState } from "react";

export default function RacingGame() {
    const canvasRef = useRef(null);
    const [stats, setStats] = useState({ speed: 0, lap: 1, position: "01/05" });
    const [activeKeys, setActiveKeys] = useState([]); // Debug: show active keys

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const CANVAS_WIDTH = canvas.width;
        const CANVAS_HEIGHT = canvas.height;

        // Game State
        const car = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2 + 180, // Adjusted to be clearly on track
            angle: -Math.PI / 2,
            speed: 0,
            accel: 1.0,
            friction: 0.88,
            turnSpeed: 0.05,
            maxSpeed: 20,
            width: 44,
            height: 88,
            image: null
        };

        // Input handling
        let keys = {}; // Use local var for performance in loop

        const updateActiveKeys = () => {
            const active = Object.keys(keys).filter(k => keys[k]);
            setActiveKeys(active);
        };

        const handleKeyDown = (e) => {
            // Prevent default scrolling for arrows and space
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
                e.preventDefault();
            }
            keys[e.key] = true;
            updateActiveKeys();
        };

        const handleKeyUp = (e) => {
            e.preventDefault();
            keys[e.key] = false;
            updateActiveKeys();
        };

        // Attach listeners to window
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Make canvas focusable and auto-focus
        // The tabindex is already set in JSX, and outline-none in className
        setTimeout(() => canvas.focus(), 100); // Auto-focus after mount

        // Load Assets
        const rawCarImage = new Image();
        rawCarImage.src = "/assets/games/pranjul/Ferrari/Ferrari.png";

        const trackImage = new Image();
        trackImage.src = "/assets/games/pranjul/RacingTilemap.png";

        let assetsLoaded = 0;
        const totalAssets = 2;
        const checkLoaded = () => {
            assetsLoaded++;
            console.log(`Loaded ${assetsLoaded}/${totalAssets} assets`);
        };

        // Process car image (remove white background)
        rawCarImage.onload = () => {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = rawCarImage.width;
            tempCanvas.height = rawCarImage.height;

            // Draw original image
            tempCtx.drawImage(rawCarImage, 0, 0);

            // Get image data
            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // If pixel is white or near-white, make it transparent
                // Improved threshold: > 200 to catch compressed white artifacts
                if (r > 200 && g > 200 && b > 200) {
                    data[i + 3] = 0; // Set alpha to 0
                }
            }

            // Put modified data back
            tempCtx.putImageData(imageData, 0, 0);

            // Create final image object
            const processedImage = new Image();
            processedImage.onload = () => {
                car.image = processedImage;
                checkLoaded();
            };
            processedImage.src = tempCanvas.toDataURL();
        };

        trackImage.onload = checkLoaded;

        // Track Geometries
        const trackCenterX = CANVAS_WIDTH / 2;
        const trackCenterY = CANVAS_HEIGHT / 2;
        const trackWidth = 500;
        const trackHeight = 400;
        const trackThickness = 80;

        const isOnTrack = (x, y) => {
            // Simplified: allow movement anywhere on the visible track
            // The visual track boundaries are enough constraint
            // TODO: Implement pixel-perfect collision detection if needed
            return true;
        };

        const update = () => {
            if (assetsLoaded < totalAssets || !car.image) return;

            // Acceleration - apply directly to car.speed first
            if (keys["ArrowUp"] || keys["w"] || keys["W"]) {
                car.speed += car.accel;
            }
            // Brake/Reverse
            if (keys["ArrowDown"] || keys["s"] || keys["S"]) {
                car.speed -= car.accel * 0.7;
            }

            // Steering - allow at ANY speed for free control
            if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
                car.angle -= car.turnSpeed;
            }
            if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
                car.angle += car.turnSpeed;
            }

            // Apply friction AFTER acceleration
            car.speed *= car.friction;

            // Clamp speed
            if (Math.abs(car.speed) < 0.1) car.speed = 0;
            if (car.speed > car.maxSpeed) car.speed = car.maxSpeed;
            if (car.speed < -car.maxSpeed / 2) car.speed = -car.maxSpeed / 2;

            // Calculate next position
            const nextX = car.x + Math.cos(car.angle) * car.speed;
            const nextY = car.y + Math.sin(car.angle) * car.speed;

            // Collision detection with 5-point check
            const checkPoints = [
                [nextX - 20, nextY - 20],
                [nextX + 20, nextY - 20],
                [nextX - 20, nextY + 20],
                [nextX + 20, nextY + 20],
                [nextX, nextY]
            ];

            const allPointsOnTrack = checkPoints.every(([px, py]) => isOnTrack(px, py));

            if (allPointsOnTrack) {
                // On track - normal movement
                car.x = nextX;
                car.y = nextY;
            } else {
                // Off track (Grass) - Slow down significantly but allow movement
                car.x = nextX;
                car.y = nextY;
                car.speed *= 0.3; // Heavy grass friction
            }
        };

        const draw = () => {
            // Background
            if (assetsLoaded < totalAssets || !car.image) {
                ctx.fillStyle = "#0a0a0a";
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.fillStyle = "#ff0000";
                ctx.textAlign = "center";
                ctx.font = "20px monospace";
                ctx.fillText("LOADING ASSETS...", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
                return;
            }

            ctx.fillStyle = "#1a5e1f";
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            // Track
            const tileSize = 128;
            const scale = 4.5;
            const scaledSize = tileSize * scale;

            ctx.save();
            ctx.imageSmoothingEnabled = false;
            // Draw Tile [4,5] from map (Pre-made circuit)
            ctx.drawImage(
                trackImage,
                4 * 128, 5 * 128, 128, 128,
                trackCenterX - scaledSize / 2,
                trackCenterY - scaledSize / 2,
                scaledSize,
                scaledSize
            );
            ctx.restore();

            // Car
            ctx.save();
            ctx.translate(car.x, car.y);
            ctx.rotate(car.angle + Math.PI / 2);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(car.image, -car.width / 2, -car.height / 2, car.width, car.height);
            ctx.restore();

            // Stats Update
            setStats(prev => ({
                ...prev,
                speed: Math.round(Math.abs(car.speed) * 18),
            }));
        };

        const loop = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center border-4 border-red-600 overflow-hidden shadow-2xl">
            {/* HUD */}
            <div className="absolute top-4 left-4 bg-black/95 p-4 border-2 border-red-500 font-mono text-sm z-[100] shadow-2xl">
                <div className="text-red-500 font-bold tracking-wider text-lg">
                    {stats.speed.toString().padStart(3, '0')} KPH
                </div>
                <div className="text-yellow-400 font-bold tracking-wider mt-2">P{stats.position}</div>
                <div className="text-green-400 font-bold tracking-wider mt-1">LAP {stats.lap}/3</div>
                <div className="text-white/40 text-[9px] mt-3 uppercase tracking-wide">
                    KEYS: {activeKeys.join(" ")}
                </div>
            </div>

            <canvas
                ref={canvasRef}
                width={900}
                height={700}
                tabIndex="0"
                className="max-w-full h-auto cursor-crosshair border-2 border-white/20 shadow-2xl outline-none"
            />

            <div className="absolute bottom-4 left-4 bg-black/90 p-3 border border-yellow-500/60 font-mono text-[11px] text-yellow-300 shadow-xl">
                <div className="font-bold text-yellow-400 mb-2">CONTROLS</div>
                <div className="flex items-center gap-2"><span>↑/W</span><span>Accelerate</span></div>
                <div className="flex items-center gap-2"><span>↓/S</span><span>Brake</span></div>
                <div className="flex items-center gap-2"><span>←→/AD</span><span>Steer</span></div>
            </div>
        </div>
    );
}

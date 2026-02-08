"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useSpring, useTransform, motion, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import CursorTrail from "./ui/CursorTrail";
import ScratchRevealImage from "./ui/ScratchRevealImage";

const VIDEO_DURATION = 36.93; // Duration of hamilton.mp4 in seconds
const HERO_HEIGHT = 1000; // Hero section height
const SCROLL_HEIGHT = 6000; // Total scrollable height

// Section 1: Only ENGINE (strengths) and COCKPIT (skills)
const annotations = [
    {
        scrollStart: 0.4854,
        scrollEnd: 0.5469,
        title: "ENGINE: CORE STRENGTHS",
        description: "Full-stack development • System architecture • Backend mastery • Problem solving",
        position: { x: "15%", y: "60%" },
        color: "#CC0000"
    },
    {
        scrollStart: 0.5874,
        scrollEnd: 0.6602,
        title: "COCKPIT: TECHNICAL SKILLS", // Updated for Pranjul
        description: "Robotics • AI/ML • Python • System Design", // Mapped from members.js
        position: { x: "70%", y: "30%" }, // Top right
        color: "#00FF41"
    },
    {
        scrollStart: 0.70,
        scrollEnd: 0.80,
        title: "AERO: VISIONARY LEADERSHIP", // Updated for Pranjul's Bio
        description: "Autonomous Systems • Strategic Planning • First Impressions • EQ",
        position: { x: "10%", y: "40%" },
        color: "#FFFF00"
    },
    {
        scrollStart: 0.80,
        scrollEnd: 0.90,
        title: "EXHAUST: WORK-LIFE BALANCE",
        description: "Stress Management • Burnout Prevention • Sustainability • Mental Health",
        position: { x: "85%", y: "70%" },
        color: "#FFA500"
    },
    {
        scrollStart: 0.90,
        scrollEnd: 0.98, // Shortened slightly to transition to Track
        title: "PIT CREW: CIC COMMUNITY", // Specific context
        description: "Mentorship • Peer Learning • 20+ Crew Members • Resilience",
        position: { x: "20%", y: "20%" },
        color: "#00FFFF"
    },
    {
        scrollStart: 0.98,
        scrollEnd: 2.0, // EXTENDED SIGNIFICANTLY to stay visible at end
        title: "TRACK: EXECUTION & RELIABILITY",
        description: "Consistency • High Performance • Market Value • Delivery",
        position: { x: "50%", y: "85%" }, // Center bottom
        color: "#FF00FF"
    }
];

// Generate random stars
const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 1
    }));
};

// Venom Symbiotic Transition Component
function VenomTransition({ progress }) {
    const stars = useMemo(() => generateStars(50), []);

    // Transition happens between 0.1 and 0.25 scroll progress
    const transitionProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.15));

    // Fade out quickly after transition (0.25 to 0.30) - before blackout starts at 0.35
    const fadeOutProgress = progress > 0.25 ? Math.min(1, (progress - 0.25) / 0.05) : 0;
    const venomOpacity = 1 - fadeOutProgress;

    if (transitionProgress <= 0 || venomOpacity <= 0) return null;

    return (
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 35, opacity: venomOpacity }}
        >
            {/* SVG Symbiotic Tendrils */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    {/* Gradient for organic feel */}
                    <radialGradient id="venomGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgb(20, 20, 20)" />
                        <stop offset="100%" stopColor="rgb(5, 5, 5)" />
                    </radialGradient>

                    {/* Filter for organic edges */}
                    <filter id="venomFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>

                {/* Main symbiotic mass coming from bottom */}
                <ellipse
                    cx="50"
                    cy={100 - transitionProgress * 60}
                    rx={30 + transitionProgress * 40}
                    ry={20 + transitionProgress * 50}
                    fill="url(#venomGradient)"
                    filter="url(#venomFilter)"
                    style={{ transition: 'all 0.1s ease-out' }}
                />

                {/* Left tendril */}
                <ellipse
                    cx={20 - transitionProgress * 10}
                    cy={100 - transitionProgress * 70}
                    rx={15 + transitionProgress * 20}
                    ry={10 + transitionProgress * 40}
                    fill="rgb(15, 15, 15)"
                    filter="url(#venomFilter)"
                    style={{ transition: 'all 0.1s ease-out' }}
                />

                {/* Right tendril */}
                <ellipse
                    cx={80 + transitionProgress * 10}
                    cy={100 - transitionProgress * 75}
                    rx={15 + transitionProgress * 25}
                    ry={10 + transitionProgress * 45}
                    fill="rgb(15, 15, 15)"
                    filter="url(#venomFilter)"
                    style={{ transition: 'all 0.1s ease-out' }}
                />

                {/* Top reaching tendril */}
                <ellipse
                    cx="50"
                    cy={100 - transitionProgress * 100}
                    rx={10 + transitionProgress * 30}
                    ry={5 + transitionProgress * 35}
                    fill="rgb(10, 10, 10)"
                    filter="url(#venomFilter)"
                    style={{ transition: 'all 0.1s ease-out' }}
                />

                {/* Corner blobs */}
                <circle
                    cx="0"
                    cy="100"
                    r={transitionProgress * 50}
                    fill="rgb(20, 20, 20)"
                    filter="url(#venomFilter)"
                />
                <circle
                    cx="100"
                    cy="100"
                    r={transitionProgress * 55}
                    fill="rgb(20, 20, 20)"
                    filter="url(#venomFilter)"
                />
                <circle
                    cx="0"
                    cy="0"
                    r={transitionProgress * 40}
                    fill="rgb(15, 15, 15)"
                    filter="url(#venomFilter)"
                />
                <circle
                    cx="100"
                    cy="0"
                    r={transitionProgress * 45}
                    fill="rgb(15, 15, 15)"
                    filter="url(#venomFilter)"
                />
            </svg>

            {/* Glowing Stars */}
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        backgroundColor: 'white',
                        boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(255, 255, 255, 0.8), 0 0 ${star.size * 6}px ${star.size * 2}px rgba(255, 255, 255, 0.4)`,
                        opacity: transitionProgress > 0.3 ? Math.min(1, (transitionProgress - 0.3) / 0.3) : 0,
                        animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            ))}

            {/* CSS Animation for twinkling */}
            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                }
            `}</style>
        </div>
    );
}

export default function FerrariSpotlightVideo({ member }) {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [isHoveringInteractable, setIsHoveringInteractable] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Hero exit animations - stays visible until Venom fully covers at 0.25
    const heroScale = useTransform(smoothProgress, [0.1, 0.25], [1, 1.3]);
    const heroBlur = useTransform(smoothProgress, [0.1, 0.25], ["blur(0px)", "blur(8px)"]);
    const heroOpacity = useTransform(smoothProgress, [0.23, 0.26], [1, 0]); // Quick fade AFTER Venom covers

    // Venom / Hero Transition logic (0.0 -> 0.4)
    // 0.25: Venom starts covering screen
    // 0.40: Screen is fully black (Venom + Blackout layer)

    // Ferrari entrance animations - Fade in EARLY (0.40) but PAUSE playback
    // This eliminates the "Big Black Portion" by showing the car immediately
    const ferrariProgress = useTransform(smoothProgress, [0.50, 1], [0, 1]); // Progress starts at 0.50 (Hold until then)
    const ferrariOpacity = useTransform(smoothProgress, [0.40, 0.42], [0, 1]); // Fast fade in RIGHT AFTER transition
    const ferrariScale = useTransform(smoothProgress, [0.40, 0.42], [0.95, 1.0]);

    // Track progress changes
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        setCurrentProgress(latest);
        // Debug: Log scroll progress for user calibration
        console.log("SCROLL:", latest.toFixed(4));
    });

    // Control video playback based on scroll
    // DECOUPLED & PAUSED: Only runs after 0.50 (video is visible from 0.40)
    useEffect(() => {
        if (videoRef.current) {
            // Map scroll progress (0.50-1.0) to video duration (0-100%)
            // We ensure this only calculates when we are past the hold
            if (currentProgress < 0.50) {
                // FORCE PAUSE AT START (0.0) during the hold period (0.40-0.50)
                if (videoRef.current.currentTime !== 0) {
                    videoRef.current.currentTime = 0;
                }
                return;
            }

            const relativeProgress = Math.max(0, (currentProgress - 0.50) / 0.50);
            const targetTime = relativeProgress * VIDEO_DURATION;

            // Only update if difference is significant to avoid jitter
            if (Math.abs(videoRef.current.currentTime - targetTime) > 0.05) {
                videoRef.current.currentTime = targetTime;
            }
        }
    }, [currentProgress, isLoaded]);

    // Handle video load with multiple event listeners and fallback
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => {
            setIsLoaded(true);
        };

        // Try multiple events
        video.addEventListener('canplaythrough', handleLoaded);
        video.addEventListener('loadeddata', handleLoaded);
        video.addEventListener('canplay', handleLoaded);

        // Fallback timeout - if video takes too long, just show it anyway
        const timeout = setTimeout(() => {
            setIsLoaded(true);
        }, 3000);

        // Check if already loaded
        if (video.readyState >= 3) {
            setIsLoaded(true);
        }

        return () => {
            video.removeEventListener('canplaythrough', handleLoaded);
            video.removeEventListener('loadeddata', handleLoaded);
            video.removeEventListener('canplay', handleLoaded);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative" style={{ height: `${SCROLL_HEIGHT}px`, backgroundColor: 'rgb(37, 36, 35)' }}>
            {/* Hero Background Layer */}
            <div className="absolute top-0 left-0 w-full bg-[rgb(218,213,208)]" style={{ height: `${HERO_HEIGHT}px`, zIndex: 0 }} />

            <CursorTrail color="#FF2800" isActive={!isHoveringInteractable} />

            {/* Loading Screen */}
            {!isLoaded && (
                <div className="fixed inset-0 flex flex-col items-center justify-center z-50" style={{ backgroundColor: 'rgb(37, 36, 35)' }}>
                    <div className="text-6xl font-black text-[#CC0000] mb-4" style={{ fontFamily: 'var(--font-family-mono)', userSelect: 'none' }}>
                        SF-26
                    </div>
                    <div className="text-xl text-white/60 font-mono">Loading Video...</div>
                </div>
            )}

            {/* Main Content */}
            <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ zIndex: 1 }}>

                {/* FERRARI VIDEO SECTION - z-20 (underneath hero and venom) */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        zIndex: 20,
                        opacity: ferrariOpacity,
                        scale: ferrariScale
                    }}
                >
                    {/* Video element */}
                    <video
                        ref={videoRef}
                        src="/ferrari/hamilton.mp4"
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ backgroundColor: 'rgb(37, 36, 35)' }}
                    />

                    {/* Fog overlays to hide watermarks */}
                    <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[rgb(37,36,35)] via-[rgba(37,36,35,0.5)] to-transparent" />
                    <div className="absolute top-0 bottom-0 right-0 w-[250px] bg-gradient-to-l from-[rgba(37,36,35,0.9)] to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-[rgba(37,36,35,0.7)] to-transparent" />
                </motion.div>

                {/* BLACKOUT LAYER - covers transition gap (z-50 above everything) */}
                <div
                    className="absolute inset-0"
                    style={{
                        zIndex: 50,
                        backgroundColor: 'black',
                        // Opaque from 0.25 to 0.40. Video fades in at 0.40.
                        opacity: currentProgress >= 0.25 && currentProgress < 0.40 ? 1 : 0,
                        pointerEvents: 'none'
                    }}
                />

                {/* HERO SECTION - z-30 */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-screen flex items-center justify-center"
                    style={{
                        zIndex: 30,
                        scale: heroScale,
                        filter: heroBlur,
                        opacity: heroOpacity,
                        backgroundColor: 'rgb(218, 213, 208)'
                    }}
                >
                    {/* Hero Content */}
                    <div className="relative w-full h-full">
                        {/* Background "44" Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5 }}>
                            <h1 style={{
                                fontSize: 'min(90vw, 90vh)',
                                fontWeight: 900,
                                WebkitTextStroke: '3px rgba(204, 0, 0, 0.15)',
                                color: 'transparent',
                                fontFamily: 'var(--font-family-mono)',
                                lineHeight: 1
                            }}>
                                44
                            </h1>
                        </div>

                        {/* Hamilton & Helmet Layer */}
                        <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 40, pointerEvents: 'none' }}>
                            <div className="sticky top-0 left-0 w-full h-screen">
                                {/* Hamilton Face */}
                                <div
                                    className="absolute inset-0 flex items-end justify-center pointer-events-auto"
                                    style={{ zIndex: 40 }}
                                >
                                    <img
                                        src="/hamilton.png"
                                        alt="Lewis Hamilton"
                                        className="h-[90vh] object-contain pointer-events-auto"
                                        style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
                                        onMouseEnter={() => setIsHoveringInteractable(true)}
                                        onMouseLeave={() => setIsHoveringInteractable(false)}
                                    />
                                </div>

                                {/* Scratchable Helmet */}
                                <div
                                    className="absolute inset-0 flex items-start justify-center -mt-[10vh] pointer-events-auto"
                                    style={{ zIndex: 50 }}
                                >
                                    <ScratchRevealImage
                                        src="/LH_2025_helmet-1-removebg-preview.png"
                                        width={typeof window !== 'undefined' ? window.innerWidth : 1920}
                                        height={typeof window !== 'undefined' ? window.innerHeight : 1080}
                                        className="w-[105vh] h-[105vh] object-contain drop-shadow-2xl cursor-crosshair"
                                        onMouseEnter={() => setIsHoveringInteractable(true)}
                                        onMouseLeave={() => setIsHoveringInteractable(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* VENOM SYMBIOTIC TRANSITION - z-35 */}
                <VenomTransition progress={currentProgress} />

                {/* Annotation Cards */}
                {annotations.map((ann, i) => {
                    let opacity = 0;
                    if (currentProgress >= ann.scrollStart && currentProgress <= ann.scrollEnd) {
                        // Use a much shorter fade duration (0.01) so it reaches full opacity quickly
                        const fadeIn = (currentProgress - ann.scrollStart) / 0.01;
                        const fadeOut = (ann.scrollEnd - currentProgress) / 0.01;
                        opacity = Math.min(1, fadeIn, fadeOut);
                    }

                    return (
                        <motion.div
                            key={i}
                            className="fixed p-6 rounded-xl shadow-2xl max-w-sm backdrop-blur-xl border border-white/10"
                            style={{
                                left: ann.position.x,
                                top: ann.position.y,
                                opacity,
                                zIndex: 60, // Ensure it's above everything including blackout
                                backgroundColor: `rgba(0, 0, 0, 0.9)`, // Darker background for contrast
                                transform: 'translate(-50%, -50%)', // Center based on position
                                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px ${ann.color}40`, // Glassmorphism glow
                                borderLeft: `4px solid ${ann.color}` // Accent line
                            }}
                        >
                            <h3 style={{
                                fontFamily: 'var(--font-family-mono)',
                                fontSize: '13px',
                                color: ann.color,
                                letterSpacing: '0.5px',
                                textShadow: `0 0 10px ${ann.color}80`
                            }}>
                                {ann.title}
                            </h3>
                            <p style={{
                                fontFamily: 'var(--font-family-mono)',
                                fontSize: '12px',
                                color: '#ebebeb',
                                lineHeight: '1.4',
                                marginTop: '8px'
                            }}>
                                {ann.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation */}
            <Link
                href="/"
                className="fixed top-8 left-8 z-50 text-white/60 hover:text-white transition-colors font-mono text-sm"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
                ← Back to Team
            </Link>
        </div>
    );
}

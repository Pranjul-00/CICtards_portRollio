"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import GeometricAvatar from "./ui/GeometricAvatar";
import RacingGame from "./games/RacingGame";

const StatBar = ({ label, value, color }) => (
    <div className="mb-4">
        <div className="flex justify-between text-[10px] mb-1">
            <span className="text-gray-400">{label}</span>
            <span className="text-white">{value}/100</span>
        </div>
        <div className="h-2 bg-gray-800 border border-gray-700">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                className={`h-full ${color}`}
            />
        </div>
    </div>
);

export default function GameStage({ member }) {
    const [gameState, setGameState] = useState("INTRO"); // INTRO, PLAYING, END

    useEffect(() => {
        const timer = setTimeout(() => setGameState("PLAYING"), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!member) return null;

    return (
        <div className="min-h-screen bg-black/95 flex flex-col items-center justify-center p-6 overflow-hidden crt">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Back Button */}
            <Link
                href="/#team"
                className="absolute top-8 left-8 text-green-500 font-mono text-sm hover:text-white transition-colors flex items-center gap-2 z-50"
            >
                <span>[ESC]</span> BACK_TO_TEAM
            </Link>

            <AnimatePresence mode="wait">
                {gameState === "INTRO" && (
                    <motion.div
                        key="intro"
                        initial={{ scale: 2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="text-center"
                    >
                        <h2 className="text-6xl md:text-8xl font-black italic text-yellow-400 drop-shadow-[8px_8px_0_#ff00ff]">
                            STAGE: {member.name.split(' ')[0].toUpperCase()}
                        </h2>
                        <p className="text-green-400 font-mono text-xl mt-4 animate-pulse">
                            READY? GO!
                        </p>
                    </motion.div>
                )}

                {gameState === "PLAYING" && (
                    <motion.div
                        key="playing"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
                    >
                        {/* Left Column: Player Stats */}
                        <div className="lg:col-span-4 bg-gray-900 border-4 border-white p-6 shadow-[10px_10px_0_#ff00ff]">
                            <div className="w-full aspect-square border-4 border-green-500 mb-6 relative bg-black">
                                <GeometricAvatar name={member.name} className="w-full h-full" />
                            </div>
                            <h3 className="text-2xl font-bold text-yellow-400 mb-2">{member.name}</h3>
                            <p className="text-xs text-green-400 font-mono mb-6 italic">{member.role}</p>

                            <div className="space-y-2">
                                <StatBar label="HP" value={member.stats.HP} color="bg-red-500" />
                                <StatBar label="MP" value={member.stats.MP} color="bg-blue-500" />
                                <StatBar label="STR" value={member.stats.STR} color="bg-yellow-500" />
                                <StatBar label="INT" value={member.stats.INT} color="bg-purple-500" />
                                <StatBar label="DEX" value={member.stats.DEX} color="bg-green-500" />
                            </div>
                        </div>

                        {/* Right Column: Interaction / Projects */}
                        <div className="lg:col-span-8 space-y-8 h-full flex flex-col">
                            {/* Dynamic Game Area */}
                            <div className="flex-grow bg-black border-4 border-blue-500 p-8 relative overflow-hidden min-h-[400px]">
                                <div className="absolute top-2 right-2 text-[8px] text-blue-500 font-mono">MODE: {member.gameMode}</div>

                                {member.gameMode === "TERMINAL_HACK" && (
                                    <div className="font-mono text-green-500 text-sm">
                                        <p className="mb-4"># ACCESSING_PROJECT_DATABASE...</p>
                                        <div className="space-y-4">
                                            {member.projects.map(p => (
                                                <div key={p.name} className="border border-green-900 p-2 hover:bg-green-900/20 cursor-pointer">
                                                    <p>&gt; decrypt {p.name}.pkg</p>
                                                    <p className="text-gray-500 text-xs ml-4">// {p.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-8 animate-pulse">_</div>
                                    </div>
                                )}

                                {member.gameMode === "BOSS_RUSH" && (
                                    <div className="h-full flex flex-col">
                                        <Link
                                            href={`/team/${member.slug}/f1`}
                                            className="flex-grow relative group cursor-pointer"
                                        >
                                            <RacingGame />
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                <div className="text-yellow-400 font-bold text-2xl animate-pulse">
                                                    CLICK TO PLAY FULLSCREEN
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="flex gap-4 mt-4">
                                            {member.games && member.games.map(game => (
                                                <Link
                                                    key={game.slug}
                                                    href={`/team/${member.slug}/${game.slug}`}
                                                    className="flex-1 p-2 border-2 border-red-500 hover:bg-red-500 text-white font-bold text-[10px] transition-all text-center"
                                                >
                                                    PLAY_{game.name.toUpperCase()}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {member.gameMode === "3D_ORBIT" && (
                                    <div className="flex items-center justify-center h-full relative">
                                        <motion.div
                                            animate={{ rotateY: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="w-48 h-48 border-4 border-yellow-400 flex items-center justify-center relative"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center font-bold text-yellow-400">CORE</div>
                                            {member.projects.map((p, i) => (
                                                <div
                                                    key={p.name}
                                                    className="absolute w-20 h-20 bg-blue-900/50 border border-blue-400 flex items-center justify-center text-[8px] text-center p-1"
                                                    style={{
                                                        transform: `rotateY(${i * 180}deg) translateZ(120px)`
                                                    }}
                                                >
                                                    {p.name}
                                                </div>
                                            ))}
                                        </motion.div>
                                    </div>
                                )}

                                {(member.gameMode === "RHYTHM_STAGE" || member.gameMode === "LEVEL_SELECT") && (
                                    <div className="grid grid-cols-2 gap-4 h-full">
                                        {member.projects.map((p, i) => (
                                            <motion.div
                                                key={p.name}
                                                whileHover={{ y: -5 }}
                                                className="bg-gray-900 border-2 border-dashed border-gray-700 p-6 flex flex-col justify-between"
                                            >
                                                <div className="text-xs text-gray-500">STAGE_{i + 1}</div>
                                                <div className="text-lg font-bold text-white">{p.name}</div>
                                                <div className="text-[10px] text-green-400">{p.tech}</div>
                                                <button className="mt-4 py-2 bg-white text-black font-bold text-[10px] hover:bg-yellow-400 transition-colors">
                                                    ENTER_LEVEL
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-black border-2 border-dashed border-green-900 p-6">
                                <h4 className="text-green-500 font-mono text-sm mb-4">PLAYER_LOG:</h4>
                                <p className="text-gray-400 font-mono text-xs leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import GeometricAvatar from "./ui/GeometricAvatar";

export default function MemberCard({ member, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-full"
        >
            {/* Retro Arcade Card - Classic Gaming Aesthetic */}
            <div className="h-full bg-black border-4 border-yellow-400 shadow-[6px_6px_0_#ff0000] hover:shadow-[10px_10px_0_#00ff00] hover:-translate-y-1 hover:translate-x-1 transition-all duration-150 p-1 flex flex-col relative group">

                {/* Retro Grid Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#ffff00 1px, transparent 1px), linear-gradient(90deg, #ffff00 1px, transparent 1px)',
                        backgroundSize: '10px 10px'
                    }}
                />

                {/* Inner Container */}
                <div className="h-full bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-red-600 p-3 flex flex-col relative overflow-hidden">

                    {/* Authentic CRT Scanlines */}
                    <div className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,0,0.1) 2px, rgba(255,255,0,0.1) 4px)',
                        }}
                    />

                    {/* Classic Arcade Corner Brackets */}
                    <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-yellow-400" />
                    <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-yellow-400" />
                    <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-yellow-400" />
                    <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-yellow-400" />

                    {/* Retro Header */}
                    <div className="flex flex-col items-center text-center mb-4 border-b-2 border-yellow-400 pb-3 relative z-10">
                        {/* Pixelated Avatar with Retro Frame */}
                        <div className="w-24 h-24 mb-3 border-2 border-yellow-400 bg-black relative"
                            style={{
                                boxShadow: 'inset 0 0 0 2px #000, inset 0 0 0 4px #ff0000'
                            }}>
                            {member.image ? (
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            ) : (
                                <GeometricAvatar name={member.name} className="w-full h-full rounded-none" />
                            )}
                        </div>

                        {/* Retro Typography */}
                        <h3 className="text-sm md:text-base text-yellow-400 mb-1 font-bold tracking-widest uppercase"
                            style={{
                                textShadow: '2px 2px 0 #ff0000, -1px -1px 0 #000',
                                fontFamily: 'monospace',
                                letterSpacing: '0.2em'
                            }}>
                            {member.name}
                        </h3>
                        <div className="bg-red-600 border-2 border-yellow-400 px-3 py-1">
                            <p className="text-[9px] text-yellow-400 font-bold tracking-wider" style={{ fontFamily: 'monospace' }}>
                                ★ {member.role} ★
                            </p>
                        </div>
                    </div>

                    {/* Retro Terminal Bio */}
                    <div className="flex-grow mb-4 relative z-10">
                        <div className="bg-black border-2 border-green-500 p-2 font-mono text-[9px] leading-relaxed text-green-400"
                            style={{
                                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.8)',
                                fontFamily: 'monospace'
                            }}>
                            <div className="text-yellow-400 mb-1">{'>'} PLAYER_DATA:</div>
                            <div className="text-green-300">{member.bio}</div>
                        </div>
                    </div>

                    {/* Retro Skills Grid */}
                    <div className="mb-4 relative z-10">
                        <div className="flex items-center gap-2 mb-2 border-b border-yellow-600 pb-1">
                            <div className="w-2 h-2 bg-yellow-400 animate-pulse" />
                            <h4 className="text-[9px] text-yellow-400 font-bold tracking-widest" style={{ fontFamily: 'monospace' }}>
                                ABILITIES
                            </h4>
                            <div className="w-2 h-2 bg-yellow-400 animate-pulse" />
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {member.skills.slice(0, 6).map(skill => (
                                <span
                                    key={skill}
                                    className="text-[7px] bg-red-900 text-yellow-300 px-1.5 py-0.5 border border-yellow-600 hover:bg-yellow-400 hover:text-black transition-all font-bold"
                                    style={{
                                        fontFamily: 'monospace',
                                        boxShadow: '1px 1px 0 #000'
                                    }}
                                >
                                    {skill.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Classic Arcade Button */}
                    <div className="mt-auto relative z-10">
                        <div className="w-full py-2 bg-gradient-to-b from-yellow-400 to-yellow-600 text-black text-[10px] text-center border-2 border-yellow-300 group-hover:from-red-500 group-hover:to-red-700 group-hover:text-yellow-400 transition-all font-black tracking-widest relative"
                            style={{
                                fontFamily: 'monospace',
                                boxShadow: '0 4px 0 #000, inset 0 -2px 0 rgba(0,0,0,0.3)'
                            }}>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                            ▶ INSERT COIN ◀
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function MemberCard({ member, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <div className="h-full flex flex-col bg-black border-2 border-white hover:scale-105 hover:-translate-y-2 transition-all duration-200">

                {/* Centered Profile Picture */}
                <div className="flex justify-center pt-6 pb-4">
                    <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden bg-gray-800 flex items-center justify-center"
                        style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>
                        {member.image ? (
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-4xl text-yellow-400 font-black" style={{ fontFamily: '"Press Start 2P", sans-serif' }}>
                                {member.name.charAt(0)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Name & Role Box - Outlined Only */}
                <div className="px-4 pb-3">
                    <div className="border-4 border-yellow-400 p-3 text-center"
                        style={{
                            boxShadow: '4px 4px 0 #ff0000'
                        }}>
                        <h2 className="text-sm text-yellow-400 font-black tracking-wider uppercase"
                            style={{ fontFamily: '"Press Start 2P", sans-serif' }}>
                            {member.name}
                        </h2>
                        <p className="text-[10px] text-red-500 font-bold mt-1"
                            style={{ fontFamily: '"Press Start 2P", sans-serif' }}>
                            {member.role}
                        </p>
                    </div>
                </div>

                {/* Quote Section - No Label */}
                {member.quote && (
                    <div className="px-4 pb-3">
                        <div className="bg-gradient-to-r from-purple-900 to-pink-900 border-2 border-pink-500 p-3 text-center"
                            style={{
                                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.8)'
                            }}>
                            <div className="text-base text-white font-bold italic" style={{ fontFamily: '"Press Start 2P", sans-serif' }}>
                                "{member.quote}"
                            </div>
                        </div>
                    </div>
                )}

                {/* Bio Section */}
                <div className="px-4 pb-3">
                    <div className="bg-black border-2 border-green-500 p-2 text-[10px] leading-relaxed text-green-400"
                        style={{
                            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.8)',
                            fontFamily: '"Press Start 2P", sans-serif'
                        }}>
                        <div className="text-yellow-400 mb-1 text-[8px]">{'>'} BIO:</div>
                        <div className="text-green-300">{member.bio}</div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="px-4 pb-4">
                    <div className="flex items-center gap-2 mb-2 border-b border-yellow-600 pb-1">
                        <div className="w-2 h-2 bg-yellow-400 animate-pulse" />
                        <h4 className="text-xs text-yellow-400 font-bold tracking-widest" style={{ fontFamily: '"Press Start 2P", sans-serif' }}>
                            ABILITIES
                        </h4>
                        <div className="w-2 h-2 bg-yellow-400 animate-pulse" />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {member.skills.slice(0, 6).map(skill => (
                            <span
                                key={skill}
                                className="text-[8px] bg-red-900 text-yellow-300 px-1.5 py-0.5 border border-yellow-600 hover:bg-yellow-400 hover:text-black transition-all font-bold"
                                style={{
                                    fontFamily: '"Press Start 2P", sans-serif',
                                    boxShadow: '1px 1px 0 #000'
                                }}
                            >
                                {skill.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 8-bit Redirect Button */}
                <div className="px-4 pb-4 mt-auto">
                    <Link href={`/team/${member.slug}`}>
                        <div className="w-full py-2 bg-gradient-to-b from-yellow-400 to-yellow-600 text-black text-sm text-center border-2 border-yellow-300 hover:from-red-500 hover:to-red-700 hover:text-yellow-400 transition-all font-black tracking-widest relative cursor-pointer"
                            style={{
                                fontFamily: '"Press Start 2P", sans-serif',
                                boxShadow: '0 4px 0 #000, inset 0 -2px 0 rgba(0,0,0,0.3)'
                            }}>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                            ▶ VIEW PROFILE ◀
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

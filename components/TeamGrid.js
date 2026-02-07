"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MemberCard from "./MemberCard";
import { members } from "@/data/members";

export default function TeamGrid() {
    const [shuffledMembers, setShuffledMembers] = useState([]);

    useEffect(() => {
        // Fisher-Yates Shuffle
        const shuffled = [...members];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setShuffledMembers(shuffled);
    }, []);

    if (shuffledMembers.length === 0) return null; // Avoid hydration mismatch

    return (
        <section id="team" className="py-24 px-6 relative bg-gray-900 border-t-8 border-dashed border-gray-700 min-h-screen overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-widest drop-shadow-[4px_4px_0_rgba(255,0,255,1)]">
                        CHOOSE YOUR <span className="text-yellow-400">CHARACTER</span>
                    </h2>
                    <p className="text-green-400 font-mono text-xs md:text-sm animate-pulse">
                        &gt; RANDOMIZING PLAYERS...
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 perspective-1000">
                    {shuffledMembers.map((member, index) => {
                        return (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "100px" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    delay: index * 0.1
                                }}
                                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)]"
                            >
                                <Link href={`/team/${member.slug}`}>
                                    <MemberCard member={member} index={index} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

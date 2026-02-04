"use client";
import { motion } from "framer-motion";
import { TiltCard } from "./ui/TiltCard";
import GeometricAvatar from "./ui/GeometricAvatar";

export default function MemberCard({ member, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <TiltCard className="h-full rounded-3xl bg-slate-900 border border-slate-800 p-8 flex flex-col relative group overflow-hidden">
                {/* Abstract Background Gradient */}
                <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-purple-500/20 transition-colors duration-500" />

                {/* Header */}
                <div className="flex items-center gap-5 mb-6">
                    <GeometricAvatar name={member.name} className="w-16 h-16 shrink-0 shadow-lg shadow-purple-500/20 ring-2 ring-white/5" />
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{member.name}</h3>
                        <p className="text-sm font-medium text-purple-400/90 uppercase tracking-wide">{member.role}</p>
                    </div>
                </div>

                {/* Bio */}
                <div className="flex-grow">
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                        {member.bio}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {member.skills.map(skill => (
                            <span
                                key={skill}
                                className="text-[10px] uppercase font-bold px-2 py-1 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/50 group-hover:border-purple-500/30 group-hover:text-slate-300 transition-colors"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-slate-800/50">
                    <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full text-slate-400 hover:text-white transition-colors group/link"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest">Portfolio</span>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover/link:bg-purple-500 group-hover/link:text-white transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                    </a>
                </div>
            </TiltCard>
        </motion.div>
    );
}

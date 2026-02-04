"use client";
import MemberCard from "./MemberCard";
import { members } from "@/data/members";

export default function TeamGrid() {
    return (
        <section id="team" className="py-24 px-6 relative bg-slate-950">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">CICtards</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        The creative minds from Cluster Innovation Centre, building the future with technology.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {members.map((member, index) => (
                        <div key={member.name} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1.1rem)]">
                            <MemberCard member={member} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

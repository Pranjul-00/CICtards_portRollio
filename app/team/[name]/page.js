import { notFound } from "next/navigation";
import { getMemberBySlug, getAllMemberSlugs } from "@/data/members";
import GameStage from "@/components/GameStage";
import FerrariSpotlight from "@/components/FerrariSpotlight";

// Generate static params for all team members
export async function generateStaticParams() {
    const slugs = getAllMemberSlugs();
    return slugs.map((slug) => ({
        name: slug,
    }));
}

// Generate metadata for each team member page
export async function generateMetadata({ params }) {
    const { name } = await params;
    const member = getMemberBySlug(name);

    if (!member) {
        return {
            title: "Member Not Found",
        };
    }

    return {
        title: `${member.name} - ${member.role} | CICtards Portfolio`,
        description: member.bio,
    };
}

export default async function TeamMemberPage({ params }) {
    const { name } = await params;
    const member = getMemberBySlug(name);

    // If member not found, show 404
    if (!member) {
        notFound();
    }

    // Special Ferrari spotlight page for Pranjul
    if (member.slug === 'pranjul-gupta') {
        return <FerrariSpotlight member={member} />;
    }

    // Default game stage for other members
    return <GameStage member={member} />;
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { getMemberBySlug, getGameBySlug, getAllGameRoutes } from "@/data/members";
import RacingGame from "@/components/games/RacingGame";

// Map of game components
const GAME_COMPONENTS = {
    RacingGame: RacingGame,
};

// Generate static params for all games
export async function generateStaticParams() {
    const routes = getAllGameRoutes();
    return routes.map((route) => ({
        name: route.memberSlug,
        game: route.gameSlug,
    }));
}

// Generate metadata for each game page
export async function generateMetadata({ params }) {
    const { name, game } = await params;
    const member = getMemberBySlug(name);
    const gameData = getGameBySlug(name, game);

    if (!member || !gameData) {
        return {
            title: "Game Not Found",
        };
    }

    return {
        title: `${gameData.name} - ${member.name} | CICtards`,
        description: `Play ${gameData.name} by ${member.name}`,
    };
}

export default async function GamePage({ params }) {
    const { name, game } = await params;
    const member = getMemberBySlug(name);
    const gameData = getGameBySlug(name, game);

    // If member or game not found, show 404
    if (!member || !gameData) {
        notFound();
    }

    // Get the game component
    const GameComponent = GAME_COMPONENTS[gameData.component];

    if (!GameComponent) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black flex flex-col overflow-hidden">
            {/* Back Button */}
            <Link
                href={`/team/${member.slug}`}
                className="absolute top-8 left-8 text-green-500 font-mono text-sm hover:text-white transition-colors flex items-center gap-2 z-50"
            >
                <span>[ESC]</span> BACK_TO_{member.name.split(' ')[0].toUpperCase()}
            </Link>

            {/* Fullscreen Game */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full h-full max-w-7xl">
                    <GameComponent />
                </div>
            </div>

            {/* Game Info Footer */}
            <div className="bg-gray-900 border-t-4 border-green-500 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-yellow-400 font-bold text-xl">{gameData.name}</h1>
                        <p className="text-gray-400 text-sm font-mono">BY: {member.name}</p>
                    </div>
                    <div className="text-green-400 font-mono text-xs">
                        MODE: FULLSCREEN
                    </div>
                </div>
            </div>
        </div>
    );
}

const sharedBio = "Pursuing B.Tech (IT & MI) at Cluster Innovation Centre, University of Delhi.";

export const members = [
    {
        id: 1,
        name: "Pranjul Gupta",
        slug: "pranjul-gupta",
        role: "GOAT",
        bio: `Visionary leader passionate about autonomous systems. ${sharedBio}`,
        skills: [
            "Team Leadership",
            "Robotics & Automation",
            "Full-Stack Web Dev",
            "Strategic Problem Solver",
            "System Architecture",
            "AI/ML Implementation",
            "Crisis Management",
            "Visionary Execution",
            "Efficiency Optimizer"
        ],
        stats: { HP: 100, MP: 85, STR: 70, INT: 95, DEX: 65 },
        gameMode: "BOSS_RUSH",
        games: [
            { name: "F1 Racing", slug: "f1", component: "RacingGame" }
        ],
        projects: [
            { name: "AutoBot", desc: "Autonomous delivery drone system.", tech: "Python/ROS" },
            { name: "MindMap", desc: "AI-driven neural network visualizer.", tech: "PyTorch" }
        ],
        portfolio: "#",
        image: null
    },
    {
        id: 2,
        name: "Himanshu Yadav",
        slug: "himanshu-yadav",
        role: "Knows Ball",
        bio: `A versatile polymath with a thirst for diverse knowledge and a natural flair for communication. Thrives on exploring new horizons and bridging complex ideas across disciplines. ${sharedBio}`,
        skills: [
            "UI/UX Master",
            "Full-Stack Dev",
            "Visual Design",
            "Video Editing",
            "Photography",
            "Legacy Code Whispering",
            "Clutch Decision Making",
            "Emergency Hotfixing",
            "Coffee-to-Code Conversion",
            "Pixel-Perfect OCD",
            "Unorthodox Problem Solving"
        ],
        stats: { HP: 90, MP: 100, STR: 50, INT: 90, DEX: 85 },
        gameMode: "LEVEL_SELECT",
        projects: [
            { name: "CloudGate", desc: "Serverless authentication gateway.", tech: "AWS/Lambda" },
            { name: "StreamFlow", desc: "Real-time data streaming platform.", tech: "Redis/Node.js" }
        ],
        portfolio: "#",
        image: null
    },
    {
        id: 3,
        name: "Chandragupt Sharma",
        slug: "chandragupt-sharma",
        role: "Clutch God",
        bio: `Crafting intuitive digital experiences. ${sharedBio}`,
        skills: [
            "Machine Learning",
            "Deep Learning",
            "EDA",
            "Mathematical Modeling",
            "LaTeX",
            "Robotics",
            "Computer Vision",
            "Reinforcement Learning"
        ],
        stats: { HP: 80, MP: 95, STR: 40, INT: 85, DEX: 100 },
        gameMode: "RHYTHM_STAGE",
        projects: [
            { name: "Lumina UI", desc: "Interactive component library.", tech: "React/Tailwind" },
            { name: "MotionGraph", desc: "SVG animation engine.", tech: "GSAP" }
        ],
        portfolio: "#",
        image: null
    },
    {
        id: 4,
        name: "Aditya Bhagora",
        slug: "aditya-bhagora",
        role: "Degen Cornball",
        bio: `Bridging code and creativity. ${sharedBio}`,
        skills: ["Creative Coding", "WebGL", "Interactive Design", "Blender"],
        stats: { HP: 85, MP: 90, STR: 60, INT: 80, DEX: 95 },
        gameMode: "3D_ORBIT",
        projects: [
            { name: "VoxelWorld", desc: "Browser-based 3D world builder.", tech: "Three.js" },
            { name: "ShaderLab", desc: "Collection of GLSL shaders.", tech: "WebGL" }
        ],
        portfolio: "#",
        image: null
    },
    {
        id: 5,
        name: "Mohd. Ovesh",
        slug: "mohd-ovesh",
        role: "Exists",
        bio: `Optimizing performance and security. ${sharedBio}`,
        skills: [
            "Blender 3D Modelling",
            "Video Editing",
            "Python App Dev",
            "Web Dev",
            "Electronics & Robotics",
            "Problem Solving",
            "English",
            "Quantum Debugging",
            "Retro-Refactoring",
            "Hardware Hacking"
        ],
        stats: { HP: 95, MP: 80, STR: 75, INT: 90, DEX: 70 },
        gameMode: "TERMINAL_HACK",
        projects: [
            { name: "SecureVault", desc: "End-to-end encrypted storage.", tech: "Rust/Wasm" },
            { name: "NetGuard", desc: "Intrusion detection system.", tech: "Go" }
        ],
        portfolio: "#",
        image: null
    }
];

// Helper function to get member by slug
export function getMemberBySlug(slug) {
    return members.find(member => member.slug === slug);
}

// Helper function to get all member slugs for static generation
export function getAllMemberSlugs() {
    return members.map(member => member.slug);
}

// Helper function to get a specific game for a member
export function getGameBySlug(memberSlug, gameSlug) {
    const member = getMemberBySlug(memberSlug);
    if (!member || !member.games) return null;
    return member.games.find(game => game.slug === gameSlug);
}

// Helper function to get all game routes for static generation
export function getAllGameRoutes() {
    const routes = [];
    members.forEach(member => {
        if (member.games) {
            member.games.forEach(game => {
                routes.push({
                    memberSlug: member.slug,
                    gameSlug: game.slug,
                    memberName: member.name,
                    gameName: game.name,
                    component: game.component
                });
            });
        }
    });
    return routes;
}

const sharedBio = "Pursuing B.Tech (IT & MI) at Cluster Innovation Centre, University of Delhi.";

export const members = [
    {
        id: 1,
        name: "Pranjul Gupta",
        role: "",
        bio: `Visionary leader passionate about autonomous systems. ${sharedBio}`,
        title: "GOAT",
        quote: "Give up",
        skills: ["Robotics", "AI/ML", "Python", "System Design"],
        stats: { HP: 100, MP: 100, STR: 95, INT: 100 },
        portfolio: "#",
        image: null,
        games: [
            {
                slug: "f1",
                name: "F1 Racing",
                component: "RacingGame",
                description: "High-speed F1 racing simulation"
            }
        ]
    },
    {
        id: 2,
        name: "Himanshu Yadav",
        role: "",
        bio: `Building scalable web architectures. ${sharedBio}`,
        title: "Knows Ball",
        quote: "F*ck around and Find out",
        skills: ["Next.js", "Node.js", "Cloud Architecture", "React"],
        stats: { HP: 85, MP: 80, STR: 90, INT: 95 },
        portfolio: "#",
        image: null,
        games: [
            {
                slug: "racing",
                name: "Retro Racing",
                component: "RacingGame",
                description: "Classic arcade racing game"
            }
        ]
    },
    {
        id: 3,
        name: "Chandragupt Sharma",
        role: "",
        bio: `Crafting intuitive digital experiences. ${sharedBio}`,
        title: "Clutch God",
        quote: "Sleep? What's that?",
        skills: ["Design Systems", "Framer Motion", "Frontend", "Prototyping"],
        stats: { HP: 90, MP: 100, STR: 85, INT: 88 },
        portfolio: "#",
        image: null,
        games: []
    },
    {
        id: 4,
        name: "Aditya Bhagora",
        role: "",
        bio: `Bridging code and creativity. ${sharedBio}`,
        title: "Degen Cornball",
        quote: "F*ck it, we ball",
        skills: ["Creative Coding", "WebGL", "Interactive Design", "Blender"],
        stats: { HP: 80, MP: 95, STR: 70, INT: 98 },
        portfolio: "#",
        image: null,
        games: []
    },
    {
        id: 5,
        name: "Ovesh",
        role: "",
        bio: `Optimizing performance and security. ${sharedBio}`,
        title: "Exists",
        quote: "Bbg",
        skills: ["Backend Development", "Database Design", "API Security", "DevOps"],
        stats: { HP: 100, MP: 85, STR: 80, INT: 92 },
        portfolio: "#",
        image: null,
        games: []
    }
];

// Helper function to create URL-friendly slug from name
const createSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

// Get all member slugs for static generation
export const getAllMemberSlugs = () => {
    return members.map(member => createSlug(member.name));
};

// Get a member by their slug
export const getMemberBySlug = (slug) => {
    return members.find(member => createSlug(member.name) === slug);
};

// Get a game by member slug and game slug
export const getGameBySlug = (memberSlug, gameSlug) => {
    const member = getMemberBySlug(memberSlug);
    if (!member || !member.games) return null;
    return member.games.find(game => game.slug === gameSlug);
};

// Get all game routes for static generation
export const getAllGameRoutes = () => {
    const routes = [];
    members.forEach(member => {
        if (member.games && member.games.length > 0) {
            member.games.forEach(game => {
                routes.push({
                    memberSlug: createSlug(member.name),
                    gameSlug: game.slug
                });
            });
        }
    });
    return routes;
};

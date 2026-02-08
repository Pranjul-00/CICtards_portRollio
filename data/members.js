const sharedBio = "Pursuing B.Tech (IT & MI) at Cluster Innovation Centre, University of Delhi.";

export const members = [
    {
        id: 1,
        name: "Pranjul Gupta",
        role: "",
        bio: `Visionary leader passionate about autonomous systems. ${sharedBio}`,
        skills: ["Robotics", "AI/ML", "Python", "System Design"],
        portfolio: "#",
        image: null,
        games: []
    },
    {
        id: 2,
        name: "Himanshu Yadav",
        role: "",
        bio: `Building scalable web architectures. ${sharedBio}`,
        skills: ["Next.js", "Node.js", "Cloud Architecture", "React"],
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
        skills: ["Design Systems", "Framer Motion", "Frontend", "Prototyping"],
        portfolio: "#",
        image: null,
        games: []
    },
    {
        id: 4,
        name: "Aditya Bhagora",
        role: "",
        bio: `Bridging code and creativity. ${sharedBio}`,
        skills: ["Creative Coding", "WebGL", "Interactive Design", "Blender"],
        portfolio: "#",
        image: null,
        games: []
    },
    {
        id: 5,
        name: "Ovesh",
        role: "",
        bio: `Optimizing performance and security. ${sharedBio}`,
        skills: ["Backend Development", "Database Design", "API Security", "DevOps"],
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

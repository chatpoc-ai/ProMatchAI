
import { SportType, PlayerProfile, TrainingDrill, MatchStats } from './types';

export const MOCK_PLAYER: PlayerProfile = {
    name: "Alex Chen",
    sport: SportType.TENNIS,
    skillLevel: "Semi-Pro",
    style: "Aggressive Baser",
    stats: {
        winRate: 68,
        avgScore: 85,
        technicalRating: 78,
        tacticalRating: 72,
        physicalRating: 88
    }
};

export const RECENT_MATCHES: MatchStats[] = [
    { id: 'm1', date: '2023-10-25', opponent: 'J. Doe', result: 'Win', score: '6-4, 6-3', performanceScore: 88 },
    { id: 'm2', date: '2023-10-22', opponent: 'M. Smith', result: 'Loss', score: '5-7, 4-6', performanceScore: 65 },
    { id: 'm3', date: '2023-10-18', opponent: 'K. Johnson', result: 'Win', score: '7-6, 6-2', performanceScore: 92 },
];

export const TRAINING_DRILLS: TrainingDrill[] = [
    { 
        id: 't1', 
        name: 'Serve Precision (T-Line)', 
        category: 'Technical', 
        difficulty: 'Hard', 
        completed: false, 
        benchmarkPro: '70%', 
        userBest: '55%',
        description: "Improve your serving accuracy down the T to jam opponents.",
        instructions: [
            "Place a target cone on the T-line intersection.",
            "Hit 20 first serves aiming for the cone.",
            "A serve counts as 'In' if it lands within 1 foot of the T.",
            "Record your percentage of successful hits."
        ]
    },
    { 
        id: 't2', 
        name: 'Lateral Footwork Sprints', 
        category: 'Physical', 
        difficulty: 'Medium', 
        completed: true, 
        benchmarkPro: '12.5s', 
        userBest: '13.2s',
        description: "High-intensity interval training for baseline coverage.",
        instructions: [
            "Start at the center hash mark.",
            "Sprint to touch the singles sideline.",
            "Recover to center, then sprint to the opposite sideline.",
            "Complete 10 touches (5 per side) as fast as possible."
        ]
    },
    { 
        id: 't3', 
        name: 'Pressure Point Simulation', 
        category: 'Mental', 
        difficulty: 'Hard', 
        completed: false, 
        benchmarkPro: 'N/A', 
        userBest: 'N/A',
        description: "Simulate high-stakes mental pressure to improve clutch performance.",
        instructions: [
            "Visualize a score of 4-5, 30-40 (Break Point down).",
            "Execute a second serve + one offensive shot pattern.",
            "If you miss, do 5 burpees to simulate physical stress.",
            "Repeat 5 times successfully."
        ]
    },
    { 
        id: 't4', 
        name: 'Backhand Cross-Court Depth', 
        category: 'Technical', 
        difficulty: 'Medium', 
        completed: true, 
        benchmarkPro: '85%', 
        userBest: '78%',
        description: "Establish dominance in baseline rallies with deep cross-court shots.",
        instructions: [
            "Have a partner/machine feed balls to your backhand.",
            "Hit 30 balls cross-court targeting past the service line.",
            "Aim for height over the net (2-3 feet clearance).",
            "Calculate percentage of deep shots."
        ]
    },
];

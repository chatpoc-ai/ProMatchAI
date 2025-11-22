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
    { id: 't1', name: 'Serve Precision (T-Line)', category: 'Technical', difficulty: 'Hard', completed: false, benchmarkPro: '70%', userBest: '55%' },
    { id: 't2', name: 'Lateral Footwork Sprints', category: 'Physical', difficulty: 'Medium', completed: true, benchmarkPro: '12.5s', userBest: '13.2s' },
    { id: 't3', name: 'Pressure Point Simulation', category: 'Mental', difficulty: 'Hard', completed: false, benchmarkPro: 'N/A', userBest: 'N/A' },
    { id: 't4', name: 'Backhand Cross-Court Depth', category: 'Technical', difficulty: 'Medium', completed: true, benchmarkPro: '85%', userBest: '78%' },
];

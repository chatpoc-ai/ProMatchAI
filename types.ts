
export enum SportType {
    BASKETBALL = 'Basketball',
    TENNIS = 'Tennis',
    ICE_HOCKEY = 'Ice Hockey'
}

export interface MatchStats {
    id: string;
    date: string;
    opponent: string;
    result: 'Win' | 'Loss';
    score: string;
    performanceScore: number; // 0-100
}

export interface PlayerProfile {
    name: string;
    sport: SportType;
    skillLevel: 'Amateur' | 'Semi-Pro' | 'Pro';
    style: string; // e.g., "Aggressive Baseline", "Playmaker"
    stats: {
        winRate: number;
        avgScore: number;
        technicalRating: number;
        tacticalRating: number;
        physicalRating: number;
    };
}

export interface TrainingDrill {
    id: string;
    name: string;
    category: 'Technical' | 'Physical' | 'Mental';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    completed: boolean;
    benchmarkPro: string;
    userBest: string;
    description?: string;
    instructions?: string[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export interface AnalysisReport {
    summary: string;
    technicalAnalysis: string[];
    tacticalAnalysis: string[];
    keyMoments: { time: string; description: string; sentiment: 'positive' | 'negative' }[];
}

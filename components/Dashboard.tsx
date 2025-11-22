import React from 'react';
import { PlayerProfile, MatchStats } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Trophy, Zap, Target, TrendingUp } from 'lucide-react';

interface DashboardProps {
    profile: PlayerProfile;
    recentMatches: MatchStats[];
}

const Dashboard: React.FC<DashboardProps> = ({ profile, recentMatches }) => {
    const data = recentMatches.map(m => ({
        name: m.date.substring(5), // simple date format
        score: m.performanceScore,
        win: m.result === 'Win' ? 100 : 0
    })).reverse();

    const StatCard = ({ title, value, icon: Icon, trend }: any) => (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Icon className="text-indigo-400" size={20} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
    );

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white">Welcome back, {profile.name}</h2>
                <p className="text-slate-400">Your performance metrics have improved by 12% this week.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Win Rate" value={`${profile.stats.winRate}%`} icon={Trophy} trend={2.4} />
                <StatCard title="Avg Performance" value={profile.stats.avgScore} icon={Zap} trend={1.8} />
                <StatCard title="Tech. Rating" value={profile.stats.technicalRating} icon={Target} trend={-0.5} />
                <StatCard title="Physical Cond." value={profile.stats.physicalRating} icon={TrendingUp} trend={4.2} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Performance Trend (Last 50 Matches)</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Style Analysis</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Aggression</span>
                                <span className="text-white">85%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 w-[85%] rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Defense</span>
                                <span className="text-white">62%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[62%] rounded-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Consistency</span>
                                <span className="text-white">74%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[74%] rounded-full"></div>
                            </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">AI Insight</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Your aggression is peaking, but unforced errors have increased by 5% in the second set. Recommendation: Reduce power by 10% on cross-court shots.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
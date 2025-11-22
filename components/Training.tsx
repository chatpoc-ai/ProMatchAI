import React from 'react';
import { TRAINING_DRILLS } from '../constants';
import { CheckCircle, Lock, Play, TrendingUp } from 'lucide-react';

const Training: React.FC = () => {
    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'Easy': return 'text-emerald-400 bg-emerald-400/10';
            case 'Medium': return 'text-amber-400 bg-amber-400/10';
            case 'Hard': return 'text-rose-400 bg-rose-400/10';
            default: return 'text-slate-400 bg-slate-400/10';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white">System Training</h2>
                    <p className="text-slate-400">Curated drills based on your latest analysis.</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <span className="text-xs text-slate-500 block">Weekly Completion</span>
                        <span className="text-xl font-bold text-emerald-400">75%</span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-slate-500 block">Pro Benchmark Gap</span>
                        <span className="text-xl font-bold text-indigo-400">-12%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TRAINING_DRILLS.map((drill) => (
                    <div key={drill.id} className={`bg-slate-900 border rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-indigo-500/5 group ${drill.completed ? 'border-emerald-900/50 opacity-75' : 'border-slate-800 hover:border-indigo-500/50'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(drill.difficulty)}`}>
                                {drill.difficulty}
                            </span>
                            {drill.completed ? (
                                <CheckCircle className="text-emerald-500" size={20} />
                            ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-700 group-hover:border-indigo-500 transition-colors"></div>
                            )}
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-2">{drill.name}</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-6">{drill.category}</p>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Pro Benchmark</span>
                                <span className="text-slate-200 font-mono">{drill.benchmarkPro}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Your Best</span>
                                <span className={`${drill.completed ? 'text-emerald-400' : 'text-indigo-400'} font-mono`}>{drill.userBest}</span>
                            </div>
                        </div>

                        <button 
                            disabled={drill.completed}
                            className={`w-full py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                                drill.completed 
                                ? 'bg-slate-800 text-slate-500 cursor-default' 
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                        >
                            {drill.completed ? 'Completed' : <><Play size={14} /> Start Drill</>}
                        </button>
                    </div>
                ))}

                {/* Locked Advanced Module */}
                <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 pointer-events-none"></div>
                    <div className="p-4 bg-slate-800 rounded-full mb-4 z-10">
                        <Lock className="text-slate-500" size={24} />
                    </div>
                    <h3 className="text-slate-300 font-semibold z-10">Mastery Tier</h3>
                    <p className="text-slate-500 text-sm mt-2 mb-4 z-10">Complete all Hard drills to unlock elite training.</p>
                </div>
            </div>

            {/* Progress Dashboard */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-indigo-400" size={24} />
                    <h3 className="text-lg font-bold text-white">Monthly Progress vs. System Goal</h3>
                </div>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                Technical
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-indigo-400">
                                80%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-800">
                        <div style={{ width: "80%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                    </div>
                    
                    <div className="flex mb-2 items-center justify-between mt-4">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                                Physical
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-emerald-400">
                                92%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-800">
                        <div style={{ width: "92%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Training;

import React, { useState, useEffect, useRef } from 'react';
import { TRAINING_DRILLS } from '../constants';
import { CheckCircle, Lock, Play, TrendingUp, Timer, X, Save, RotateCcw, Trophy } from 'lucide-react';
import { TrainingDrill } from '../types';

const Training: React.FC = () => {
    const [drills, setDrills] = useState<TrainingDrill[]>(TRAINING_DRILLS);
    
    // Active Session State
    const [activeDrill, setActiveDrill] = useState<TrainingDrill | null>(null);
    const [sessionState, setSessionState] = useState<'prep' | 'active' | 'summary'>('prep');
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [resultInput, setResultInput] = useState('');
    
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (sessionState === 'active') {
            timerRef.current = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [sessionState]);

    const handleStartClick = (drill: TrainingDrill) => {
        setActiveDrill(drill);
        setSessionState('prep');
        setTimeElapsed(0);
        setResultInput('');
    };

    const startSession = () => {
        setSessionState('active');
    };

    const finishSession = () => {
        setSessionState('summary');
    };

    const closeSession = () => {
        setActiveDrill(null);
        setSessionState('prep');
    };

    const saveResult = () => {
        if (!activeDrill || !resultInput) return;
        
        const updatedDrills = drills.map(d => {
            if (d.id === activeDrill.id) {
                return { ...d, completed: true, userBest: resultInput };
            }
            return d;
        });
        
        setDrills(updatedDrills);
        closeSession();
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'Easy': return 'text-emerald-400 bg-emerald-400/10';
            case 'Medium': return 'text-amber-400 bg-amber-400/10';
            case 'Hard': return 'text-rose-400 bg-rose-400/10';
            default: return 'text-slate-400 bg-slate-400/10';
        }
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white">System Training</h2>
                    <p className="text-slate-400">Curated drills based on your latest analysis.</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <span className="text-xs text-slate-500 block">Weekly Completion</span>
                        <span className="text-xl font-bold text-emerald-400">
                            {Math.round((drills.filter(d => d.completed).length / drills.length) * 100)}%
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-slate-500 block">Pro Benchmark Gap</span>
                        <span className="text-xl font-bold text-indigo-400">-12%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drills.map((drill) => (
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
                            onClick={() => handleStartClick(drill)}
                            className={`w-full py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                                drill.completed 
                                ? 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300' 
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                        >
                            {drill.completed ? 'Redo Drill' : <><Play size={14} /> Start Drill</>}
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

            {/* Drill Session Overlay */}
            {activeDrill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        {/* Overlay Header */}
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <div>
                                <span className={`text-xs font-bold px-2 py-1 rounded bg-indigo-500/10 text-indigo-400`}>
                                    {sessionState === 'prep' ? 'PREPARATION' : sessionState === 'active' ? 'IN PROGRESS' : 'SUMMARY'}
                                </span>
                                <h3 className="text-xl font-bold text-white mt-2">{activeDrill.name}</h3>
                            </div>
                            <button onClick={closeSession} className="text-slate-500 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Overlay Content */}
                        <div className="p-8 overflow-y-auto flex-1">
                            {sessionState === 'prep' && (
                                <div className="space-y-6">
                                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Description</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">{activeDrill.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-sm font-semibold text-white mb-3">Instructions</h4>
                                        <ul className="space-y-3">
                                            {activeDrill.instructions?.map((inst, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-indigo-400 font-mono">
                                                        {idx + 1}
                                                    </span>
                                                    {inst}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <div className="flex-1 bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                                            <span className="block text-xs text-slate-500 uppercase">Benchmark</span>
                                            <span className="block text-lg font-bold text-indigo-400">{activeDrill.benchmarkPro}</span>
                                        </div>
                                        <div className="flex-1 bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                                            <span className="block text-xs text-slate-500 uppercase">Your Best</span>
                                            <span className="block text-lg font-bold text-emerald-400">{activeDrill.userBest}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {sessionState === 'active' && (
                                <div className="flex flex-col items-center justify-center h-full py-8">
                                    <div className="w-48 h-48 rounded-full border-4 border-indigo-500/20 flex items-center justify-center relative mb-8">
                                        <div className="absolute inset-0 rounded-full border-t-4 border-indigo-500 animate-spin" style={{ animationDuration: '3s' }}></div>
                                        <div className="text-center">
                                            <Timer size={32} className="text-indigo-400 mx-auto mb-2 opacity-80" />
                                            <span className="text-5xl font-mono font-bold text-white tracking-widest">
                                                {formatTime(timeElapsed)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-center max-w-xs animate-pulse">
                                        Focus on your technique. Quality over quantity.
                                    </p>
                                </div>
                            )}

                            {sessionState === 'summary' && (
                                <div className="space-y-8 text-center py-4">
                                    <div className="flex justify-center">
                                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                                            <Trophy size={32} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-white">Drill Complete!</h4>
                                        <p className="text-slate-400 mt-2">You trained for <span className="text-white font-mono">{formatTime(timeElapsed)}</span></p>
                                    </div>

                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-left">
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Log Your Result
                                        </label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text" 
                                                value={resultInput}
                                                onChange={(e) => setResultInput(e.target.value)}
                                                placeholder="e.g., 14/20 or 12.1s"
                                                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-all"
                                                autoFocus
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">
                                            Target Benchmark: {activeDrill.benchmarkPro}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Overlay Footer */}
                        <div className="p-6 border-t border-slate-800 bg-slate-900">
                            {sessionState === 'prep' && (
                                <button 
                                    onClick={startSession}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
                                >
                                    <Play size={20} className="fill-white" />
                                    Start Session
                                </button>
                            )}
                            
                            {sessionState === 'active' && (
                                <button 
                                    onClick={finishSession}
                                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20"
                                >
                                    <CheckCircle size={20} />
                                    Finish Drill
                                </button>
                            )}

                            {sessionState === 'summary' && (
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => { setSessionState('prep'); setTimeElapsed(0); }}
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                                    >
                                        <RotateCcw size={18} />
                                        Retry
                                    </button>
                                    <button 
                                        onClick={saveResult}
                                        disabled={!resultInput}
                                        className="flex-[2] bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} />
                                        Save Progress
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Training;

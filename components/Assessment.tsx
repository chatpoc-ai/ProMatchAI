import React, { useState } from 'react';
import { PlayCircle, CheckCircle2, FileBarChart, Loader2 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const Assessment: React.FC = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isComplete, setIsComplete] = useState(true); // Default true for demo purposes

    const radarData = [
        { subject: 'Speed', A: 120, fullMark: 150 },
        { subject: 'Power', A: 98, fullMark: 150 },
        { subject: 'Stamina', A: 86, fullMark: 150 },
        { subject: 'Strategy', A: 99, fullMark: 150 },
        { subject: 'Mental', A: 85, fullMark: 150 },
        { subject: 'Technique', A: 110, fullMark: 150 },
    ];

    const handleStartAssessment = () => {
        setIsAnalyzing(true);
        setIsComplete(false);
        setTimeout(() => {
            setIsAnalyzing(false);
            setIsComplete(true);
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white">Baseline Assessment</h2>
                    <p className="text-slate-400 mt-1">Authority analysis based on your last 50 matches.</p>
                </div>
                <button 
                    onClick={handleStartAssessment}
                    disabled={isAnalyzing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <PlayCircle size={18} />}
                    {isAnalyzing ? 'Processing Data...' : 'Re-Evaluate'}
                </button>
            </div>

            {isComplete ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-center relative min-h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar name="Player" dataKey="A" stroke="#6366f1" strokeWidth={2} fill="#6366f1" fillOpacity={0.4} />
                            </RadarChart>
                        </ResponsiveContainer>
                        <div className="absolute bottom-4 right-4 bg-slate-800 px-3 py-1 rounded text-xs text-indigo-400 border border-indigo-500/20">
                            OVR: 88
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                Core Strengths
                            </h3>
                            <ul className="space-y-3">
                                <li className="text-slate-300 text-sm flex gap-3">
                                    <span className="text-emerald-500 font-bold">•</span>
                                    <span>Exceptional court coverage speed (Top 5% of tier)</span>
                                </li>
                                <li className="text-slate-300 text-sm flex gap-3">
                                    <span className="text-emerald-500 font-bold">•</span>
                                    <span>First serve win percentage consistently > 75%</span>
                                </li>
                                <li className="text-slate-300 text-sm flex gap-3">
                                    <span className="text-emerald-500 font-bold">•</span>
                                    <span>High adaptability to defensive opponents</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <FileBarChart className="text-amber-500" size={20} />
                                Areas for Improvement
                            </h3>
                            <ul className="space-y-3">
                                <li className="text-slate-300 text-sm flex gap-3">
                                    <span className="text-amber-500 font-bold">•</span>
                                    <span>Unforced error rate on backhand slice (Avg 4.2 per set)</span>
                                </li>
                                <li className="text-slate-300 text-sm flex gap-3">
                                    <span className="text-amber-500 font-bold">•</span>
                                    <span>Energy drop-off detected after 60 minutes of play</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-96 flex flex-col items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <h3 className="text-white font-semibold text-lg">Analyzing 50-Match History</h3>
                    <p className="text-slate-500 mt-2">Extracting biometrics and tactical patterns...</p>
                </div>
            )}
        </div>
    );
};

export default Assessment;
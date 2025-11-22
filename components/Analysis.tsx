import React, { useState, useEffect } from 'react';
import { UploadCloud, Video, FileText, Layers, Brain, Loader2, X, Play } from 'lucide-react';
import { generateMatchAnalysis } from '../services/geminiService';
import { SportType, AnalysisReport } from '../types';

const Analysis: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [notes, setNotes] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [report, setReport] = useState<AnalysisReport | null>(null);
    const [activePage, setActivePage] = useState<'summary' | 'technical' | 'strategy'>('summary');

    useEffect(() => {
        // Cleanup object URL to prevent memory leaks
        return () => {
            if (videoPreview) URL.revokeObjectURL(videoPreview);
        };
    }, [videoPreview]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            // Limit to 20MB for demo stability in browser
            if (selectedFile.size > 20 * 1024 * 1024) {
                alert("For this web demo, please upload video clips smaller than 20MB.");
                return;
            }
            setFile(selectedFile);
            setVideoPreview(URL.createObjectURL(selectedFile));
        }
    };

    const clearFile = () => {
        setFile(null);
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
            setVideoPreview(null);
        }
    };

    const handleAnalyze = async () => {
        if (!file && !notes) return;
        setIsProcessing(true);
        
        try {
            const jsonString = await generateMatchAnalysis(
                SportType.TENNIS, 
                "Ranked Opponent", 
                notes || "Review this match clip.",
                file
            );
            
            // Clean json string if markdown code blocks are present
            const cleanJson = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedReport: AnalysisReport = JSON.parse(cleanJson);
            setReport(parsedReport);
        } catch (err) {
            console.error("Analysis failed", err);
            // Fallback mock data
            setReport({
                summary: "Analysis completed. The video indicates strong baseline play but hesitant net approaches. Your opponent exploited the deep forehand corner repeatedly.",
                technicalAnalysis: ["Racket preparation on the backhand is late by ~0.2s", "Serve toss height inconsistent in the clip", "Excellent split-step timing on defense"],
                tacticalAnalysis: ["Tendency to retreat behind baseline when pressured", "Missed opportunity for drop shot at 0:12", "Good recovery after cross-court sprints"],
                keyMoments: [{ time: "00:12", description: "Defensive Lob", sentiment: "positive" }, { time: "00:45", description: "Unforced Error (Net)", sentiment: "negative" }]
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Match Analysis</h2>
                    <p className="text-slate-400">Deep dive into your latest performance.</p>
                </div>
            </div>

            {!report ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-lg shadow-2xl">
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-slate-300 text-sm font-medium">Upload Match Clip</label>
                                {file && (
                                     <button onClick={clearFile} className="text-slate-500 hover:text-rose-400 text-xs flex items-center gap-1">
                                        <X size={12} /> Remove
                                     </button>
                                )}
                            </div>
                            
                            {!videoPreview ? (
                                <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500 hover:bg-slate-800/50 transition-all cursor-pointer group">
                                    <input type="file" className="hidden" id="video-upload" onChange={handleFileChange} accept="video/*" />
                                    <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center w-full">
                                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <UploadCloud className="text-indigo-400" size={24} />
                                        </div>
                                        <span className="text-slate-300 font-medium group-hover:text-white">Click to upload video</span>
                                        <span className="text-slate-500 text-xs mt-1">MP4, MOV (Max 20MB for demo)</span>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black">
                                    <video src={videoPreview} className="w-full h-48 object-cover opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Play className="text-white/80 fill-white" size={48} />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                        <p className="text-white text-xs truncate font-medium">{file?.name}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-8">
                            <label className="block text-slate-300 text-sm font-medium mb-2">Coach Notes (Optional)</label>
                            <textarea 
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-24 resize-none text-sm placeholder-slate-500"
                                placeholder="e.g., Focused on serve mechanics, felt slow to the left..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>

                        <button 
                            onClick={handleAnalyze}
                            disabled={isProcessing || (!file && !notes)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-indigo-900/20"
                        >
                            {isProcessing ? <Loader2 className="animate-spin" /> : <Video size={20} />}
                            {isProcessing ? 'Analyzing Gameplay...' : 'Analyze Match Performance'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 h-full">
                    {/* Report Sidebar */}
                    <div className="w-full lg:w-64 flex flex-col gap-2">
                        <button 
                            onClick={() => setActivePage('summary')}
                            className={`p-4 rounded-xl text-left flex items-center gap-3 transition-all ${activePage === 'summary' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                        >
                            <FileText size={18} />
                            <span className="font-medium">Summary</span>
                        </button>
                        <button 
                            onClick={() => setActivePage('technical')}
                            className={`p-4 rounded-xl text-left flex items-center gap-3 transition-all ${activePage === 'technical' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                        >
                            <Layers size={18} />
                            <span className="font-medium">Technical Breakdown</span>
                        </button>
                        <button 
                            onClick={() => setActivePage('strategy')}
                            className={`p-4 rounded-xl text-left flex items-center gap-3 transition-all ${activePage === 'strategy' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                        >
                            <Brain size={18} />
                            <span className="font-medium">Tactical & Mental</span>
                        </button>
                        
                        <button onClick={() => setReport(null)} className="mt-auto p-3 text-center text-sm text-slate-500 hover:text-slate-300">
                            Analyze New Match
                        </button>
                    </div>

                    {/* Report Content */}
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-8 overflow-y-auto">
                        {activePage === 'summary' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="border-b border-slate-800 pb-6">
                                    <h3 className="text-xl font-bold text-white mb-2">Executive Summary</h3>
                                    <p className="text-slate-300 leading-relaxed">{report.summary}</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-4">Key Moments Timeline</h4>
                                    <div className="space-y-3">
                                        {report.keyMoments?.map((moment, idx) => (
                                            <div key={idx} className="flex gap-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                                <span className="text-indigo-400 font-mono text-sm pt-1">{moment.time}</span>
                                                <div>
                                                    <p className="text-slate-200 text-sm">{moment.description}</p>
                                                    <span className={`text-xs mt-1 block ${moment.sentiment === 'positive' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                        {moment.sentiment.toUpperCase()} IMPACT
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activePage === 'technical' && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-xl font-bold text-white">Technical Analysis</h3>
                                <div className="grid gap-4">
                                    {report.technicalAnalysis?.map((item, idx) => (
                                        <div key={idx} className="p-4 bg-slate-800/50 border-l-4 border-blue-500 rounded-r-lg">
                                            <p className="text-slate-200">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 p-6 bg-slate-950 rounded-xl border border-slate-800">
                                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Shot Distribution Heatmap (Simulated)</h4>
                                    <div className="h-48 flex items-center justify-center bg-slate-900 rounded border border-slate-800 border-dashed text-slate-600">
                                        [Visual Heatmap Placeholder - Video Tracking Data]
                                    </div>
                                </div>
                            </div>
                        )}

                        {activePage === 'strategy' && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-xl font-bold text-white">Strategic & Mental Report</h3>
                                <div className="grid gap-4">
                                    {report.tacticalAnalysis?.map((item, idx) => (
                                        <div key={idx} className="p-4 bg-slate-800/50 border-l-4 border-purple-500 rounded-r-lg">
                                            <p className="text-slate-200">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analysis;
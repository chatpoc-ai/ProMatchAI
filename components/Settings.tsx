
import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Save, Check, Activity } from 'lucide-react';
import { MOCK_PLAYER } from '../constants';

const Settings: React.FC = () => {
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        name: MOCK_PLAYER.name,
        email: 'alex.chen@example.com',
        sport: MOCK_PLAYER.sport,
        skillLevel: MOCK_PLAYER.skillLevel,
        notifications: {
            analysis: true,
            training: true,
            marketing: false
        }
    });

    const handleSave = () => {
        // In a real app, this would save to backend
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Settings</h2>
                    <p className="text-slate-400">Manage your account preferences and global configurations.</p>
                </div>
            </div>

            {/* Profile Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="border-b border-slate-800 p-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <User className="text-indigo-500" size={20} />
                        Profile Information
                    </h3>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white border-4 border-slate-800">
                            {formData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <button className="text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 transition-colors">
                                Change Avatar
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Sport Specialization</label>
                            <select 
                                value={formData.sport}
                                onChange={(e) => setFormData({...formData, sport: e.target.value as any})}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            >
                                <option value="Tennis">Tennis</option>
                                <option value="Basketball">Basketball</option>
                                <option value="Ice Hockey">Ice Hockey</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Skill Level</label>
                            <select 
                                value={formData.skillLevel}
                                onChange={(e) => setFormData({...formData, skillLevel: e.target.value as any})}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            >
                                <option value="Amateur">Amateur</option>
                                <option value="Semi-Pro">Semi-Pro</option>
                                <option value="Pro">Professional</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="border-b border-slate-800 p-6">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Bell className="text-amber-500" size={20} />
                        Notifications
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                        <div>
                            <h4 className="text-sm font-medium text-white">Match Analysis Ready</h4>
                            <p className="text-xs text-slate-500">Get notified via email when AI finishes processing your video upload.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={formData.notifications.analysis}
                                onChange={(e) => setFormData({...formData, notifications: {...formData.notifications, analysis: e.target.checked}})}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                        <div>
                            <h4 className="text-sm font-medium text-white">Weekly Coach Summary</h4>
                            <p className="text-xs text-slate-500">Receive a weekly digest of your training progress and drills.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={formData.notifications.training}
                                onChange={(e) => setFormData({...formData, notifications: {...formData.notifications, training: e.target.checked}})}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Subscription & Privacy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                     <div className="border-b border-slate-800 p-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <CreditCard className="text-emerald-500" size={20} />
                            Subscription
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-slate-400">Current Plan</span>
                            <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded text-xs font-bold uppercase">Pro Athlete</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm text-slate-400">Billing Cycle</span>
                            <span className="text-white text-sm">Monthly ($29.00)</span>
                        </div>
                        <button className="w-full text-sm bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 transition-colors">
                            Manage Billing
                        </button>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                     <div className="border-b border-slate-800 p-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Shield className="text-rose-500" size={20} />
                            Data & Privacy
                        </h3>
                    </div>
                    <div className="p-6">
                        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                            We use Gemini 2.5 Flash to analyze your data. Video clips are processed in memory and not permanently stored for model training without explicit consent.
                        </p>
                         <div className="flex items-center gap-3">
                            <button className="flex-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg border border-slate-700 transition-colors">
                                Export Data
                            </button>
                            <button className="flex-1 text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-4 py-2 rounded-lg border border-rose-500/20 transition-colors">
                                Delete Account
                            </button>
                         </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 pb-8">
                <button 
                    onClick={handleSave}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/20"
                >
                    {saved ? <Check size={20} /> : <Save size={20} />}
                    {saved ? 'Preferences Saved' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default Settings;

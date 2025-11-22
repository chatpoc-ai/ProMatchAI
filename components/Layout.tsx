
import React from 'react';
import { LayoutDashboard, TrendingUp, Activity, MessageSquare, Settings, FileVideo, LogOut } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    activeTab: string;
    onTabChange: (tab: string) => void;
    onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onLogout }) => {
    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'assessment', label: 'Baseline Assessment', icon: Activity },
        { id: 'analysis', label: 'Match Analysis', icon: FileVideo },
        { id: 'training', label: 'System Training', icon: TrendingUp },
        { id: 'coach', label: 'AI Coach', icon: MessageSquare },
    ];

    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Activity className="text-white w-5 h-5" />
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">ProMatch<span className="text-indigo-500">AI</span></h1>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Elite Sports Analytics</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    activeTab === item.id
                                        ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 space-y-2">
                    <button 
                        onClick={() => onTabChange('settings')}
                        className={`flex items-center gap-3 px-4 py-3 w-full text-sm font-medium rounded-xl transition-all duration-200 ${
                            activeTab === 'settings'
                                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20'
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                        }`}
                    >
                        <Settings size={18} />
                        Settings
                    </button>
                    {onLogout && (
                        <button 
                            onClick={onLogout}
                            className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium rounded-xl text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200"
                        >
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative">
                <div className="max-w-7xl mx-auto p-8 pb-24">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;


import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Check, Loader2, Activity } from 'lucide-react';

interface AuthProps {
    onLogin: () => void;
}

const SocialIcon: React.FC<{ provider: string }> = ({ provider }) => {
    // SVG paths for brand icons
    const icons: any = {
        google: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
        ),
        apple: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.548 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.325-4.403-2.363-2-.078-3.675 1.04-4.61 1.04zm-2.61-4.857c.896-.984 1.39-2.017 1.39-2.039 0 0-1.234 1.143-2.234 2.039-.91.858-1.442 1.962-1.442 2.039 0 0 1.325 1.143 2.286 2.039z" />
            </svg>
        ),
        facebook: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600 fill-current" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
        microsoft: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path fill="#F35325" d="M1 1h10v10H1z" />
                <path fill="#81BC06" d="M13 1h10v10H13z" />
                <path fill="#05A6F0" d="M1 13h10v10H1z" />
                <path fill="#FFBA08" d="M13 13h10v10H13z" />
            </svg>
        )
    };
    return icons[provider] || null;
};

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
        }, 1500);
    };

    const handleSocialLogin = (provider: string) => {
        setIsLoading(true);
        // Simulate provider redirect and return
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">
            {/* Left Side - Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600/20 z-0"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 p-12 max-w-xl">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/30">
                        <Activity className="text-white w-10 h-10" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                        Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Elite Potential</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed mb-8">
                        Join thousands of professional athletes using ProMatch AI to analyze gameplay, optimize training, and dominate the competition.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <Activity size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Video Analysis</h3>
                                <p className="text-slate-400 text-sm">Upload footage for instant tactical breakdown.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <Check size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Personalized Drills</h3>
                                <p className="text-slate-400 text-sm">AI-curated training plans based on your stats.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="mt-2 text-slate-400">
                            {isLogin 
                                ? 'Enter your credentials to access your dashboard.' 
                                : 'Get started with your 14-day free Pro trial.'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={() => handleSocialLogin('google')}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-200 transition-all font-medium"
                        >
                            <SocialIcon provider="google" />
                            Continue with Google
                        </button>
                        
                        <div className="grid grid-cols-3 gap-4">
                            <button 
                                onClick={() => handleSocialLogin('apple')}
                                className="flex items-center justify-center p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
                                title="Sign in with Apple"
                            >
                                <SocialIcon provider="apple" />
                            </button>
                            <button 
                                onClick={() => handleSocialLogin('microsoft')}
                                className="flex items-center justify-center p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
                                title="Sign in with Microsoft"
                            >
                                <SocialIcon provider="microsoft" />
                            </button>
                            <button 
                                onClick={() => handleSocialLogin('facebook')}
                                className="flex items-center justify-center p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
                                title="Sign in with Facebook"
                            >
                                <SocialIcon provider="facebook" />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-950 text-slate-500">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="space-y-4">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                        placeholder="Alex Chen"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                        placeholder="alex@example.com"
                                    />
                                    <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                                        placeholder="••••••••"
                                    />
                                    <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-slate-400 text-sm">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

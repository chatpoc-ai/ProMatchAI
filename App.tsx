
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Assessment from './components/Assessment';
import Analysis from './components/Analysis';
import Training from './components/Training';
import Coach from './components/Coach';
import Settings from './components/Settings';
import Auth from './components/Auth';
import { MOCK_PLAYER, RECENT_MATCHES } from './constants';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        // Check for existing session
        const session = localStorage.getItem('promatch_session');
        if (session) {
            setIsAuthenticated(true);
        }
        setIsInitializing(false);
    }, []);

    const handleLogin = () => {
        localStorage.setItem('promatch_session', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('promatch_session');
        setIsAuthenticated(false);
        setActiveTab('dashboard');
    };

    if (isInitializing) {
        return <div className="h-screen w-screen bg-slate-950 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!isAuthenticated) {
        return <Auth onLogin={handleLogin} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard profile={MOCK_PLAYER} recentMatches={RECENT_MATCHES} />;
            case 'assessment':
                return <Assessment />;
            case 'analysis':
                return <Analysis />;
            case 'training':
                return <Training />;
            case 'coach':
                return <Coach />;
            case 'settings':
                return <Settings />;
            default:
                return <Dashboard profile={MOCK_PLAYER} recentMatches={RECENT_MATCHES} />;
        }
    };

    return (
        <Layout activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout}>
            {renderContent()}
        </Layout>
    );
};

export default App;

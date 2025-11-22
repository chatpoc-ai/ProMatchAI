
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Assessment from './components/Assessment';
import Analysis from './components/Analysis';
import Training from './components/Training';
import Coach from './components/Coach';
import Settings from './components/Settings';
import { MOCK_PLAYER, RECENT_MATCHES } from './constants';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

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
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
            {renderContent()}
        </Layout>
    );
};

export default App;

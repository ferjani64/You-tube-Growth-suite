
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SmartAnalysis } from './components/SmartAnalysis';
import { ThumbnailLab } from './components/ThumbnailLab';
import { AdvancedSeo } from './components/AdvancedSeo';
import { EngagementManager } from './components/EngagementManager';
import { ContentPlanner } from './components/ContentPlanner';
import type { View } from './types';
import { MenuIcon } from './components/icons/MenuIcon';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'analysis':
        return <SmartAnalysis />;
      case 'thumbnails':
        return <ThumbnailLab />;
      case 'seo':
        return <AdvancedSeo />;
      case 'engagement':
        return <EngagementManager />;
      case 'planning':
        return <ContentPlanner />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-brand-bg">
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-brand-surface transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
          <Sidebar activeView={activeView} setActiveView={setActiveView} closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-brand-surface md:hidden">
          <h1 className="text-xl font-bold text-white">YT Growth Suite</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-300 hover:text-white">
            <MenuIcon className="h-6 w-6" />
          </button>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;

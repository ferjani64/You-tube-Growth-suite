
import React from 'react';
import type { View } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { ImageIcon } from './icons/ImageIcon';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
// FIX: Import Card and CardContent components from ui/Card
import { Card, CardContent } from './ui/Card';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  closeSidebar: () => void;
}

const NavItem: React.FC<{
  view: View;
  label: string;
  icon: React.ReactNode;
  activeView: View;
  onClick: (view: View) => void;
}> = ({ view, label, icon, activeView, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(view);
      }}
      className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
        activeView === view
          ? 'bg-brand-primary text-white font-semibold'
          : 'text-brand-muted hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, closeSidebar }) => {
  const handleNavClick = (view: View) => {
    setActiveView(view);
    closeSidebar();
  };

  // FIX: Explicitly type navItems to ensure type safety for the 'view' property.
  const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <HomeIcon className="w-6 h-6" /> },
    { view: 'analysis', label: 'Smart Analysis', icon: <ChartBarIcon className="w-6 h-6" /> },
    { view: 'thumbnails', label: 'Thumbnail Lab', icon: <ImageIcon className="w-6 h-6" /> },
    { view: 'seo', label: 'Advanced SEO', icon: <MagnifyingGlassIcon className="w-6 h-6" /> },
    { view: 'engagement', label: 'Engagement', icon: <SparklesIcon className="w-6 h-6" /> },
    { view: 'planning', label: 'Content Planner', icon: <ClipboardIcon className="w-6 h-6" /> },
  ];

  return (
    <aside className="h-full flex flex-col p-4 bg-brand-surface text-gray-200">
      <div className="flex items-center mb-8">
        <svg
          className="w-10 h-10 text-brand-primary"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.582,6.186l-3.13-1.79c-0.344-0.197-0.77-0.197-1.114,0l-3.13,1.79c-0.344,0.197-0.557,0.562-0.557,0.958v3.579c0,0.396,0.213,0.762,0.557,0.958l3.13,1.79c0.172,0.098,0.362,0.147,0.557,0.147s0.385-0.049,0.557-0.147l3.13-1.79c0.344-0.197,0.557-0.562,0.557-0.958V7.144C22.139,6.748,21.926,6.383,21.582,6.186z M18.452,10.339l-2.443,1.398v-2.796l2.443,1.398z M19.139,7.661l-2.443-1.398l2.443-1.398l2.443,1.398L19.139,7.661z" />
          <path d="M12.582,10.186l-3.13-1.79c-0.344-0.197-0.77-0.197-1.114,0l-3.13,1.79C4.861,10.383,4.648,10.748,4.648,11.144v3.579c0,0.396,0.213,0.762,0.557,0.958l3.13,1.79c0.172,0.098,0.362,0.147,0.557,0.147s0.385-0.049,0.557-0.147l3.13-1.79c0.344-0.197,0.557-0.562,0.557-0.958v-3.579C13.139,10.748,12.926,10.383,12.582,10.186z M9.452,14.339l-2.443,1.398v-2.796l2.443,1.398z" />
        </svg>
        <h1 className="text-2xl font-bold ml-2">Growth Suite</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.view} {...item} activeView={activeView} onClick={handleNavClick} />
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <Card className="text-center">
            <CardContent>
                <h4 className="font-semibold text-white">Upgrade to Pro</h4>
                <p className="text-sm text-brand-muted mt-1 mb-3">Unlock all features and grow your channel faster.</p>
                <button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    Upgrade Now
                </button>
            </CardContent>
        </Card>
      </div>
    </aside>
  );
};

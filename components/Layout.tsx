
import React from 'react';
import { Page } from '../types';
import { UserPlus, ClipboardList, Users } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
        isActive ? 'text-primary' : 'text-textSecondary hover:text-primary'
        }`}
    >
        {icon}
        <span className="text-xs font-medium">{label}</span>
    </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <main className="pb-20">
        <div className="max-w-3xl mx-auto p-4">{children}</div>
      </main>
      
      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto flex justify-around">
          <NavItem 
            icon={<UserPlus size={24} />} 
            label="Inscrição" 
            isActive={currentPage === 'registration'}
            onClick={() => setCurrentPage('registration')}
          />
          <NavItem 
            icon={<ClipboardList size={24} />} 
            label="Chamada" 
            isActive={currentPage === 'attendance'}
            onClick={() => setCurrentPage('attendance')}
          />
          <NavItem 
            icon={<Users size={24} />} 
            label="Atletas" 
            isActive={currentPage === 'roster'}
            onClick={() => setCurrentPage('roster')}
          />
        </div>
      </footer>
    </div>
  );
};
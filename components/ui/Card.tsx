
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-brand-surface border border-gray-700/50 rounded-lg shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
      <div className={`mb-4 pb-4 border-b border-gray-700/50 ${className}`}>
        {children}
      </div>
    );
};

export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
      <h3 className={`text-xl font-bold text-white ${className}`}>
        {children}
      </h3>
    );
};

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
      <div className={`${className}`}>
        {children}
      </div>
    );
};

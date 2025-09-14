import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

type KPICardProps = {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  loading?: boolean;
  error?: string | null;
};

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change = 0,
  icon,
  loading = false,
  error = null,
}) => {
  const isPositive = change >= 0;
  
  if (error) {
    return (
      <div className="glass-card p-4">
        <div className="text-red-500 text-sm">Error loading data</div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          {loading ? (
            <div className="space-y-2">
              <div className="h-8 w-24 bg-muted/50 rounded-lg animate-pulse"></div>
              <div className="h-4 w-16 bg-muted/30 rounded animate-pulse"></div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-3xl font-bold text-foreground tracking-tight">
                {value}
              </p>
              {change !== 0 && (
                <div className={`flex items-center text-sm font-medium ${
                  isPositive 
                    ? 'text-emerald-500' 
                    : 'text-red-500'
                }`}>
                  {isPositive ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(change)}%</span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
            {icon}
          </div>
        )}
      </div>
      
      {/* Progress indicator */}
      <div className="w-full bg-muted/30 rounded-full h-1 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            isPositive ? 'bg-emerald-500' : 'bg-red-500'
          }`}
          style={{ width: `${Math.min(Math.abs(change) * 5, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default KPICard;

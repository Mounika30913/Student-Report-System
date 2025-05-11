
import React from 'react';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("rounded-lg border bg-white p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
          
          {trend && (
            <p className={cn(
              "mt-2 flex items-center text-xs font-medium",
              trend.isPositive ? "text-edu-success" : "text-edu-danger"
            )}>
              <span>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="ml-1 text-gray-500">
                from last period
              </span>
            </p>
          )}
        </div>
        
        <div className="rounded-full bg-blue-50 p-3 text-edu-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

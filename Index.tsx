
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import RecentActivities from '@/components/dashboard/RecentActivities';
import { User, CalendarDays, FileBarChart, Book } from 'lucide-react';

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = [
    { 
      title: "Total Students", 
      value: 456, 
      icon: <User size={24} />,
      trend: { value: 5.2, isPositive: true }
    },
    { 
      title: "Attendance Rate", 
      value: "92%", 
      icon: <CalendarDays size={24} />,
      trend: { value: 1.1, isPositive: true }
    },
    { 
      title: "Average Grade", 
      value: "B+", 
      icon: <Book size={24} />,
      trend: { value: 3.2, isPositive: false }
    },
    { 
      title: "Reports Generated", 
      value: 38, 
      icon: <FileBarChart size={24} />,
      trend: { value: 12, isPositive: true }
    }
  ];

  const performanceData = [
    { subject: "Math", average: 82, highest: 98, lowest: 65 },
    { subject: "Science", average: 78, highest: 95, lowest: 60 },
    { subject: "English", average: 85, highest: 96, lowest: 72 },
    { subject: "History", average: 76, highest: 90, lowest: 58 },
    { subject: "Art", average: 88, highest: 99, lowest: 75 }
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Final Grades Posted",
      description: "Term 2 final grades have been posted for Grade 10.",
      date: "Today at 10:30 AM",
      type: "grade" as const,
    },
    {
      id: 2,
      title: "Attendance Update",
      description: "15 students marked absent in Grade 9-B.",
      date: "Yesterday at 4:15 PM",
      type: "attendance" as const,
    },
    {
      id: 3,
      title: "Report Cards Generated",
      description: "Mid-term report cards created for Grade 11.",
      date: "May 9, 2025",
      type: "report" as const,
    },
    {
      id: 4,
      title: "New Student Added",
      description: "Alex Johnson added to Grade 8-A.",
      date: "May 8, 2025",
      type: "report" as const,
    },
  ];

  return (
    <Layout title="Dashboard">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PerformanceChart data={performanceData} />
          </div>
          <div>
            <RecentActivities activities={recentActivities} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

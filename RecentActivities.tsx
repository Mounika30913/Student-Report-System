
import React from 'react';
import { Calendar, User, FileText } from 'lucide-react';

type Activity = {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'attendance' | 'grade' | 'report';
};

type RecentActivitiesProps = {
  activities: Activity[];
};

const ActivityIcon = ({ type }: { type: Activity['type'] }) => {
  switch (type) {
    case 'attendance':
      return <Calendar className="h-4 w-4 text-blue-500" />;
    case 'grade':
      return <FileText className="h-4 w-4 text-green-500" />;
    case 'report':
      return <User className="h-4 w-4 text-purple-500" />;
    default:
      return null;
  }
};

const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Recent Activities</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 rounded-md border p-3 transition-all hover:bg-gray-50">
            <div className="mt-0.5 rounded-full border border-gray-200 p-2">
              <ActivityIcon type={activity.type} />
            </div>
            <div>
              <h4 className="text-sm font-medium">{activity.title}</h4>
              <p className="text-xs text-gray-600">{activity.description}</p>
              <p className="mt-1 text-xs text-gray-400">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-gray-500">No recent activities</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivities;

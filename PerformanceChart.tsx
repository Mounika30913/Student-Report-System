
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

type SubjectPerformance = {
  subject: string;
  average: number;
  highest: number;
  lowest: number;
};

type PerformanceChartProps = {
  data: SubjectPerformance[];
};

const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Subject Performance</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="average" fill="#2563eb" name="Average Score" />
            <Bar dataKey="highest" fill="#22c55e" name="Highest Score" />
            <Bar dataKey="lowest" fill="#ef4444" name="Lowest Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;

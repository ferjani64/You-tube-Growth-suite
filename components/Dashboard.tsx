
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

const subscriberData = [
  { name: 'Jan', subscribers: 4000 },
  { name: 'Feb', subscribers: 3000 },
  { name: 'Mar', subscribers: 2000 },
  { name: 'Apr', subscribers: 2780 },
  { name: 'May', subscribers: 1890 },
  { name: 'Jun', subscribers: 2390 },
  { name: 'Jul', subscribers: 3490 },
];

const viewsData = [
  { name: 'Video 1', views: 4030 },
  { name: 'Video 2', views: 2400 },
  { name: 'Video 3', views: 1908 },
  { name: 'Video 4', views: 3800 },
  { name: 'Video 5', views: 4800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 border border-gray-600 rounded-md shadow-lg">
        <p className="label text-white">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">125,6k</p>
            <p className="text-sm text-green-400">+12% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">2.1M</p>
            <p className="text-sm text-green-400">+8.5% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">4.7%</p>
            <p className="text-sm text-red-400">-0.2% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estimated Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">$1,450</p>
            <p className="text-sm text-green-400">+$210 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscriber Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={subscriberData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a4a58" />
                  <XAxis dataKey="name" stroke="#a0a0b0" />
                  <YAxis stroke="#a0a0b0" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="subscribers" stroke="#8a5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Video Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a4a58" />
                  <XAxis dataKey="name" stroke="#a0a0b0" tick={{fontSize: 12}} />
                  <YAxis stroke="#a0a0b0" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="views" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentTasksList from '@/components/dashboard/RecentTasksList';
import AnnouncementList from '@/components/dashboard/AnnouncementList';
import AttendanceStatus from '@/components/dashboard/AttendanceStatus';
import { Building, CalendarCheck, FileText, Users } from 'lucide-react';
import { format } from 'date-fns';

const Index = () => {
  const { user } = useAuth();
  const { tasks, attendances, employees, schools, announcements, requests, salaries } = useData();

  // Stats calculations
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const todayAttendances = attendances.filter(
    a => a.date === format(new Date(), 'yyyy-MM-dd') && a.status === 'present'
  ).length;
  const pendingRequests = requests.filter(req => req.status === 'pending').length;

  // Employee-specific tasks
  const userTasks = user?.role === 'employee' 
    ? tasks.filter(task => task.employeeId === user.id)
    : [];
  const userPendingTasks = userTasks.filter(task => task.status === 'pending').length;

  // Calculate total salary for admin
  const totalSalaryBudget = salaries.reduce((total, salary) => total + salary.netSalary, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {user?.role === 'admin' ? (
          <>
            <StatsCard
              title="Active Employees"
              value={employees.filter(e => e.role === 'employee').length}
              icon={<Users size={16} />}
            />
            <StatsCard
              title="Total Schools"
              value={schools.length}
              icon={<Building size={16} />}
            />
            <StatsCard
              title="Pending Tasks"
              value={pendingTasks}
              icon={<FileText size={16} />}
            />
            <StatsCard
              title="Present Today"
              value={todayAttendances}
              icon={<CalendarCheck size={16} />}
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Pending Tasks"
              value={userPendingTasks}
              icon={<FileText size={16} />}
            />
            <StatsCard
              title="Completed Tasks"
              value={userTasks.filter(task => task.status === 'completed').length}
              icon={<CalendarCheck size={16} />}
            />
            <StatsCard
              title="Attendance Rate"
              value={`${userTasks.length > 0 ? Math.round((userTasks.filter(t => t.status === 'completed').length / userTasks.length) * 100) : 0}%`}
              icon={<Users size={16} />}
            />
            <StatsCard
              title="Pending Requests"
              value={requests.filter(req => req.employeeId === user?.id && req.status === 'pending').length}
              icon={<FileText size={16} />}
            />
          </>
        )}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTasksList tasks={user?.role === 'employee' ? userTasks : tasks} />
        <AnnouncementList announcements={announcements} />
      </div>
      
      {/* Employee Attendance & Requests Section */}
      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceStatus attendances={attendances} employees={employees} />
          
          <div className="space-y-6">
            <StatsCard
              title="Pending Requests"
              value={pendingRequests}
              description="Requests requiring your attention"
            />
            <StatsCard
              title="Total Salary Budget"
              value={`₹${totalSalaryBudget.toLocaleString()}`}
              description="Current monthly salary commitment"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;

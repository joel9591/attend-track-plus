
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, Attendance, Allowance, Salary, Announcement, Request, School, User } from '../types';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface DataContextType {
  tasks: Task[];
  attendances: Attendance[];
  allowances: Allowance[];
  salaries: Salary[];
  announcements: Announcement[];
  requests: Request[];
  schools: School[];
  employees: User[];
  // Task actions
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  deleteTask: (taskId: string) => void;
  // Attendance actions
  markAttendance: (attendance: Omit<Attendance, 'id'>) => void;
  // Allowance actions
  addAllowance: (allowance: Omit<Allowance, 'id'>) => void;
  // Request actions
  addRequest: (request: Omit<Request, 'id' | 'status' | 'date'>) => void;
  updateRequestStatus: (requestId: string, status: Request['status'], response?: string) => void;
  // Announcement actions
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data for development
const mockEmployees: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    phone: '+91 9876543210',
  },
  {
    id: '2',
    name: 'John Employee',
    email: 'employee@example.com',
    role: 'employee',
    phone: '+91 9876543211',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'employee',
    phone: '+91 9876543212',
  },
];

const mockSchools: School[] = [
  {
    id: '1',
    name: 'Delhi Public School',
    address: '123 Education Way',
    city: 'Delhi',
    state: 'Delhi',
    zipCode: '110001',
    contactPerson: 'Principal Sharma',
    contactPhone: '+91 9876543200',
  },
  {
    id: '2',
    name: 'Mumbai International School',
    address: '456 Learning Avenue',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400001',
    contactPerson: 'Director Patel',
    contactPhone: '+91 9876543201',
  },
  {
    id: '3',
    name: 'Bangalore Academy',
    address: '789 Knowledge Street',
    city: 'Bangalore',
    state: 'Karnataka',
    zipCode: '560001',
    contactPerson: 'Head Kumar',
    contactPhone: '+91 9876543202',
  }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [allowances, setAllowances] = useState<Allowance[]>([]);
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [schools] = useState<School[]>(mockSchools);
  const [employees] = useState<User[]>(mockEmployees);

  useEffect(() => {
    // Initialize with some mock data
    setTasks([
      {
        id: '1',
        employeeId: '2',
        employeeName: 'John Employee',
        schoolName: 'Delhi Public School',
        date: '2025-04-15',
        startTime: '09:00',
        endTime: '14:00',
        duration: 5,
        status: 'pending'
      },
      {
        id: '2',
        employeeId: '3',
        employeeName: 'Jane Smith',
        schoolName: 'Mumbai International School',
        date: '2025-04-16',
        startTime: '10:00',
        endTime: '15:00',
        duration: 5,
        status: 'pending'
      }
    ]);

    setAttendances([
      {
        id: '1',
        employeeId: '2',
        date: '2025-04-08',
        status: 'present',
        timeIn: '09:00',
        timeOut: '17:00'
      },
      {
        id: '2',
        employeeId: '3',
        date: '2025-04-08',
        status: 'present',
        timeIn: '09:15',
        timeOut: '17:30'
      }
    ]);

    setAnnouncements([
      {
        id: '1',
        title: 'Staff Meeting',
        content: 'All staff members are required to attend the monthly meeting on April 15th at 3 PM.',
        date: '2025-04-10',
        priority: 'high'
      },
      {
        id: '2',
        title: 'New School Visit Protocol',
        content: 'Please review the updated school visit protocol before your next assignment.',
        date: '2025-04-05',
        priority: 'medium'
      }
    ]);

    setSalaries([
      {
        id: '1',
        employeeId: '2',
        month: 'March',
        year: 2025,
        baseSalary: 30000,
        allowances: 2000,
        deductions: 500,
        bonus: 1000,
        netSalary: 32500
      },
      {
        id: '2',
        employeeId: '3',
        month: 'March',
        year: 2025,
        baseSalary: 28000,
        allowances: 1800,
        deductions: 400,
        bonus: 800,
        netSalary: 30200
      }
    ]);
  }, []);

  const addTask = (task: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: `task_${Date.now()}`,
      status: 'pending'
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast.success('Task assigned successfully');
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    );
    toast.success(`Task marked as ${status}`);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    toast.success('Task deleted successfully');
  };

  const markAttendance = (attendance: Omit<Attendance, 'id'>) => {
    // Check if attendance already exists for this employee and date
    const existingIndex = attendances.findIndex(a => 
      a.employeeId === attendance.employeeId && a.date === attendance.date
    );
    
    if (existingIndex >= 0) {
      // Update existing attendance
      setAttendances(prev => prev.map((a, idx) => 
        idx === existingIndex ? { ...a, ...attendance, id: a.id } : a
      ));
      toast.success('Attendance updated');
    } else {
      // Add new attendance
      const newAttendance: Attendance = {
        ...attendance,
        id: `attendance_${Date.now()}`
      };
      setAttendances(prev => [...prev, newAttendance]);
      toast.success('Attendance recorded');
    }
  };

  const addAllowance = (allowance: Omit<Allowance, 'id'>) => {
    const newAllowance: Allowance = {
      ...allowance,
      id: `allowance_${Date.now()}`
    };
    
    setAllowances(prev => [...prev, newAllowance]);
    toast.success(`${allowance.type.charAt(0).toUpperCase() + allowance.type.slice(1)} allowance submitted`);
  };

  const addRequest = (request: Omit<Request, 'id' | 'status' | 'date'>) => {
    const newRequest: Request = {
      ...request,
      id: `request_${Date.now()}`,
      status: 'pending',
      date: format(new Date(), 'yyyy-MM-dd')
    };
    
    setRequests(prev => [...prev, newRequest]);
    toast.success('Request submitted successfully');
  };

  const updateRequestStatus = (requestId: string, status: Request['status'], response?: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status, response: response || req.response } : req
      )
    );
    toast.success(`Request ${status}`);
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'date'>) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: `announcement_${Date.now()}`,
      date: format(new Date(), 'yyyy-MM-dd')
    };
    
    setAnnouncements(prev => [...prev, newAnnouncement]);
    toast.success('Announcement posted successfully');
  };

  return (
    <DataContext.Provider value={{
      tasks,
      attendances,
      allowances,
      salaries,
      announcements,
      requests,
      schools,
      employees,
      addTask,
      updateTaskStatus,
      deleteTask,
      markAttendance,
      addAllowance,
      addRequest,
      updateRequestStatus,
      addAnnouncement,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

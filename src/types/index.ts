
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  photoUrl?: string;
  phone?: string;
}

export interface Task {
  id: string;
  employeeId: string;
  employeeName: string;
  schoolName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'pending' | 'completed' | 'canceled';
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  status: 'present' | 'absent' | 'leave';
  timeIn?: string;
  timeOut?: string;
}

export interface Allowance {
  id: string;
  employeeId: string;
  date: string;
  type: 'breakfast' | 'tea' | 'lunch' | 'event';
  amount: number;
}

export interface Salary {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  baseSalary: number;
  allowances: number;
  deductions: number;
  bonus: number;
  netSalary: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Request {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'leave' | 'material' | 'query';
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  response?: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  contactPhone: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

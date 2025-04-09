
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Attendance, User } from '@/types';

interface AttendanceStatusProps {
  attendances: Attendance[];
  employees: User[];
  date?: string; // ISO string format (YYYY-MM-DD)
}

const AttendanceStatus = ({ 
  attendances, 
  employees, 
  date = format(new Date(), 'yyyy-MM-dd') 
}: AttendanceStatusProps) => {
  // Filter attendances for the specified date
  const todayAttendances = attendances.filter(a => a.date === date);
  
  // Map of employee IDs to their attendance status
  const attendanceMap = new Map(
    todayAttendances.map(a => [a.employeeId, a])
  );

  // Get only employee users
  const employeeUsers = employees.filter(u => u.role === 'employee');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Today's Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        {employeeUsers.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No employees to display
          </div>
        ) : (
          <div className="space-y-4">
            {employeeUsers.map((employee) => {
              const attendance = attendanceMap.get(employee.id);
              
              return (
                <div 
                  key={employee.id} 
                  className="flex items-center justify-between p-3 border rounded-md bg-card"
                >
                  <div className="flex items-center">
                    <div className="ml-3">
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {employee.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {attendance ? (
                      attendance.status === 'present' ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle2 className="w-5 h-5 mr-1" />
                          <span>Present</span>
                        </div>
                      ) : attendance.status === 'absent' ? (
                        <div className="flex items-center text-red-600">
                          <XCircle className="w-5 h-5 mr-1" />
                          <span>Absent</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600">
                          <Clock className="w-5 h-5 mr-1" />
                          <span>Leave</span>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-5 h-5 mr-1" />
                        <span>Not marked</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceStatus;


import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { CheckCircle, XCircle } from 'lucide-react';

const AttendanceForm = () => {
  const { user } = useAuth();
  const { markAttendance, attendances } = useData();
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Check if attendance is already marked for today
  const todayAttendance = user?.id 
    ? attendances.find(a => a.employeeId === user.id && a.date === today) 
    : null;
  
  const [status, setStatus] = useState<'present' | 'absent' | undefined>(
    todayAttendance?.status === 'present' || todayAttendance?.status === 'absent' 
      ? todayAttendance.status 
      : undefined
  );

  const handleMarkAttendance = (newStatus: 'present' | 'absent') => {
    if (!user?.id) return;
    
    setStatus(newStatus);
    
    const currentTime = format(new Date(), 'HH:mm');
    
    markAttendance({
      employeeId: user.id,
      date: today,
      status: newStatus,
      timeIn: newStatus === 'present' ? currentTime : undefined,
      timeOut: undefined
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mark Today's Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Today: {format(new Date(), 'PPP')}
          </p>
          {status && (
            <p className={`mt-2 font-medium ${status === 'present' ? 'text-green-600' : 'text-red-600'}`}>
              You are marked as {status} for today
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => handleMarkAttendance('present')} 
            variant={status === 'present' ? 'default' : 'outline'}
            className={status === 'present' ? 'bg-green-600' : ''}
            disabled={!!status}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Present
          </Button>
          
          <Button 
            onClick={() => handleMarkAttendance('absent')} 
            variant={status === 'absent' ? 'default' : 'outline'}
            className={status === 'absent' ? 'bg-red-600' : ''}
            disabled={!!status}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Absent
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Note: Attendance can only be marked once per day.
          If you need to change your attendance status, please contact the administrator.
        </p>
      </CardContent>
    </Card>
  );
};

export default AttendanceForm;


import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import AttendanceForm from '@/components/attendance/AttendanceForm';
import AttendanceStatus from '@/components/dashboard/AttendanceStatus';
import AllowanceForm from '@/components/attendance/AllowanceForm';
import { format } from 'date-fns';

const AttendancePage = () => {
  const { user } = useAuth();
  const { attendances, employees } = useData();
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
      
      {user?.role === 'employee' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttendanceForm />
          <AllowanceForm />
        </div>
      ) : (
        <>
          {/* Admin View */}
          <AttendanceStatus
            attendances={attendances}
            employees={employees}
            date={format(new Date(), 'yyyy-MM-dd')}
          />
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Attendance History</h3>
            
            {/* Simple table for attendance history */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Date</th>
                    <th className="py-2 px-4 border-b text-left">Employee</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                    <th className="py-2 px-4 border-b text-left">Time In</th>
                    <th className="py-2 px-4 border-b text-left">Time Out</th>
                  </tr>
                </thead>
                <tbody>
                  {attendances.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 border-b text-center">
                        No attendance records found
                      </td>
                    </tr>
                  ) : (
                    attendances
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((attendance) => {
                        const employee = employees.find(e => e.id === attendance.employeeId);
                        
                        return (
                          <tr key={attendance.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">
                              {format(new Date(attendance.date), 'yyyy-MM-dd')}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {employee?.name || 'Unknown Employee'}
                            </td>
                            <td className="py-2 px-4 border-b">
                              <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                  attendance.status === 'present'
                                    ? 'bg-green-100 text-green-800'
                                    : attendance.status === 'absent'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {attendance.status}
                              </span>
                            </td>
                            <td className="py-2 px-4 border-b">
                              {attendance.timeIn || '-'}
                            </td>
                            <td className="py-2 px-4 border-b">
                              {attendance.timeOut || '-'}
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendancePage;

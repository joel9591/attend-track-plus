
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import RequestForm from '@/components/requests/RequestForm';
import RequestList from '@/components/requests/RequestList';

const RequestsPage = () => {
  const { user } = useAuth();
  const { requests } = useData();

  // Filter requests based on role and status
  const pendingRequests = requests.filter(req => req.status === 'pending');
  const approvedRequests = requests.filter(req => req.status === 'approved');
  const rejectedRequests = requests.filter(req => req.status === 'rejected');
  
  // For employees, filter to show only their requests
  const userPendingRequests = user?.role === 'employee'
    ? pendingRequests.filter(req => req.employeeId === user.id)
    : pendingRequests;
    
  const userApprovedRequests = user?.role === 'employee'
    ? approvedRequests.filter(req => req.employeeId === user.id)
    : approvedRequests;
    
  const userRejectedRequests = user?.role === 'employee'
    ? rejectedRequests.filter(req => req.employeeId === user.id)
    : rejectedRequests;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">
        {user?.role === 'admin' ? 'Manage Requests' : 'My Requests'}
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {user?.role === 'employee' && (
          <div className="lg:col-span-1">
            <RequestForm />
          </div>
        )}
        
        <div className={`space-y-6 ${user?.role === 'employee' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <RequestList 
            requests={userPendingRequests} 
            title="Pending Requests" 
          />
          
          {userApprovedRequests.length > 0 && (
            <RequestList 
              requests={userApprovedRequests} 
              title="Approved Requests" 
            />
          )}
          
          {userRejectedRequests.length > 0 && (
            <RequestList 
              requests={userRejectedRequests} 
              title="Rejected Requests" 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;

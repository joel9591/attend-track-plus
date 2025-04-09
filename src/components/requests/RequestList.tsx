
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Request } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface RequestListProps {
  requests: Request[];
  title?: string;
}

const RequestList = ({ requests, title = 'Requests' }: RequestListProps) => {
  const { user } = useAuth();
  const { updateRequestStatus } = useData();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [response, setResponse] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // For employees, filter to show only their requests
  const displayRequests = user?.role === 'employee'
    ? requests.filter(req => req.employeeId === user.id)
    : requests;

  const handleOpenDialog = (request: Request) => {
    setSelectedRequest(request);
    setResponse(request.response || '');
    setDialogOpen(true);
  };

  const handleSubmitResponse = () => {
    if (!selectedRequest) return;
    
    updateRequestStatus(selectedRequest.id, 'approved', response);
    setDialogOpen(false);
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    
    updateRequestStatus(selectedRequest.id, 'rejected', response);
    setDialogOpen(false);
  };

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: Request['type']) => {
    switch (type) {
      case 'leave':
        return 'Leave Request';
      case 'material':
        return 'Material Request';
      case 'query':
        return 'General Query';
      default:
        return 'Request';
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {displayRequests.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No requests available
            </div>
          ) : (
            <div className="space-y-4">
              {displayRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="p-4 border rounded-md bg-card"
                >
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{request.title}</h3>
                        <Badge variant="outline">
                          {getTypeLabel(request.type)}
                        </Badge>
                      </div>
                      
                      <p className="text-sm">{request.description}</p>
                      
                      {user?.role === 'admin' && (
                        <div className="text-sm text-muted-foreground">
                          From: {request.employeeName}
                        </div>
                      )}
                      
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(request.date), 'PPP')}
                      </div>
                      
                      {request.response && (
                        <div className="text-sm mt-2 p-2 bg-gray-50 rounded">
                          <p className="font-medium">Response:</p>
                          <p>{request.response}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 md:mt-0 flex flex-col items-start md:items-end gap-2">
                      <Badge className={getStatusColor(request.status)} variant="outline">
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                      
                      {user?.role === 'admin' && request.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenDialog(request)}
                        >
                          Respond
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Response Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedRequest && (
              <>
                <div className="space-y-1">
                  <h4 className="font-medium">{selectedRequest.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
                </div>
                
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Enter your response"
                  rows={4}
                />
              </>
            )}
          </div>
          <DialogFooter className="flex items-center space-x-2">
            <Button variant="destructive" onClick={handleReject}>
              Reject
            </Button>
            <Button onClick={handleSubmitResponse}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestList;

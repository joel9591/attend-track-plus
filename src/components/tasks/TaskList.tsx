
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Task } from '@/types';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  title?: string;
}

const TaskList = ({ tasks, title = 'Tasks' }: TaskListProps) => {
  const { user } = useAuth();
  const { updateTaskStatus, deleteTask } = useData();

  // For employees, filter to show only their tasks
  const displayTasks = user?.role === 'employee'
    ? tasks.filter(task => task.employeeId === user.id)
    : tasks;

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    updateTaskStatus(taskId, status);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  // Get status color for the badge
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {displayTasks.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No tasks available
          </div>
        ) : (
          <div className="space-y-4">
            {displayTasks.map((task) => (
              <div 
                key={task.id} 
                className="p-4 border rounded-md bg-card"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="space-y-2">
                    <h3 className="font-medium">{task.schoolName}</h3>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(task.date), 'PPP')} | {task.startTime} - {task.endTime} ({task.duration} hours)
                    </div>
                    {user?.role === 'admin' && (
                      <div className="text-sm text-muted-foreground">
                        Assigned to: {task.employeeName}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 md:mt-0 flex flex-col items-start md:items-end gap-2">
                    <Badge className={getStatusColor(task.status)} variant="outline">
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Badge>
                    
                    <div className="flex gap-2 mt-1">
                      {task.status === 'pending' && user?.role === 'employee' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusChange(task.id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                      )}
                      
                      {user?.role === 'admin' && (
                        <>
                          {task.status === 'pending' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleStatusChange(task.id, 'canceled')}
                            >
                              Cancel
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;

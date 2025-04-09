
import { useNavigate } from 'react-router-dom';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface RecentTasksListProps {
  tasks: Task[];
  limit?: number;
}

const RecentTasksList = ({ tasks, limit = 5 }: RecentTasksListProps) => {
  const navigate = useNavigate();
  
  // Sort tasks by date (newest first) and limit
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Tasks</CardTitle>
        <Button variant="link" size="sm" onClick={() => navigate('/tasks')}>
          View all
        </Button>
      </CardHeader>
      <CardContent>
        {recentTasks.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No tasks assigned yet
          </div>
        ) : (
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div 
                key={task.id} 
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 border rounded-md bg-card"
              >
                <div className="space-y-1">
                  <div className="font-medium">{task.schoolName}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(task.date), 'PP')} | {task.startTime} - {task.endTime}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Assigned to: {task.employeeName}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-2 md:mt-0 md:items-end">
                  <Badge className={getStatusColor(task.status)} variant="outline">
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTasksList;

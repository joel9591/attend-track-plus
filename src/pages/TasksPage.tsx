
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import TaskForm from '@/components/tasks/TaskForm';
import TaskList from '@/components/tasks/TaskList';

const TasksPage = () => {
  const { user } = useAuth();
  const { tasks } = useData();
  
  // For employees, filter to show only their tasks
  const userTasks = user?.role === 'employee' 
    ? tasks.filter(task => task.employeeId === user.id)
    : tasks;
  
  // Split tasks by status for admin
  const pendingTasks = userTasks.filter(task => task.status === 'pending');
  const completedTasks = userTasks.filter(task => task.status === 'completed');
  const canceledTasks = userTasks.filter(task => task.status === 'canceled');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Task Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {user?.role === 'admin' && (
          <div className="lg:col-span-1">
            <TaskForm />
          </div>
        )}
        
        <div className={`space-y-6 ${user?.role === 'admin' ? 'lg:col-span-2' : ''}`}>
          <TaskList 
            tasks={pendingTasks} 
            title="Pending Tasks" 
          />
          
          {completedTasks.length > 0 && (
            <TaskList 
              tasks={completedTasks} 
              title="Completed Tasks" 
            />
          )}
          
          {user?.role === 'admin' && canceledTasks.length > 0 && (
            <TaskList 
              tasks={canceledTasks} 
              title="Canceled Tasks" 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

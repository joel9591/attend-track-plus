
import { Announcement } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface AnnouncementListProps {
  announcements: Announcement[];
  limit?: number;
}

const AnnouncementList = ({ announcements, limit = 3 }: AnnouncementListProps) => {
  const navigate = useNavigate();
  
  // Sort announcements by date (newest first) and limit
  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  const getPriorityColor = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Announcements</CardTitle>
        <Button variant="link" size="sm" onClick={() => navigate('/announcements')}>
          View all
        </Button>
      </CardHeader>
      <CardContent>
        {recentAnnouncements.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No announcements available
          </div>
        ) : (
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div 
                key={announcement.id} 
                className="p-4 border rounded-md bg-card"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{announcement.title}</h3>
                  <Badge className={getPriorityColor(announcement.priority)} variant="outline">
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(announcement.date), 'PPP')}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnnouncementList;

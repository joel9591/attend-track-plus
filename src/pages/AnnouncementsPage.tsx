
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import AnnouncementForm from '@/components/announcements/AnnouncementForm';
import AnnouncementList from '@/components/dashboard/AnnouncementList';

const AnnouncementsPage = () => {
  const { user } = useAuth();
  const { announcements } = useData();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {user?.role === 'admin' && (
          <div className="lg:col-span-1">
            <AnnouncementForm />
          </div>
        )}
        
        <div className={`${user?.role === 'admin' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <AnnouncementList 
            announcements={announcements}
            limit={100} // Show all announcements
          />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;

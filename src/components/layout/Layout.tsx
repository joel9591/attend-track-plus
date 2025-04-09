
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Bell, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  roles: ('admin' | 'employee')[];
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = [
    { 
      title: 'Dashboard', 
      href: '/', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>, 
      roles: ['admin', 'employee'] 
    },
    { 
      title: 'Task Management', 
      href: '/tasks', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>, 
      roles: ['admin', 'employee'] 
    },
    { 
      title: 'Attendance', 
      href: '/attendance', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-check"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>, 
      roles: ['admin', 'employee'] 
    },
    { 
      title: 'Schools', 
      href: '/schools', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>, 
      roles: ['admin'] 
    },
    { 
      title: 'Employees', 
      href: '/employees', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, 
      roles: ['admin'] 
    },
    { 
      title: 'Salary', 
      href: '/salary', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 7v12a2 2 0 0 0 2 2h16v-5"/><path d="M16 12h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v-6z"/></svg>, 
      roles: ['admin', 'employee'] 
    },
    { 
      title: 'Announcements', 
      href: '/announcements', 
      icon: <Bell size={20} />, 
      roles: ['admin', 'employee'] 
    },
    { 
      title: 'Requests', 
      href: '/requests', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-question"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"/><path d="M12 17h.01"/></svg>, 
      roles: ['admin', 'employee'] 
    },
    { 
      title: 'Profile', 
      href: '/profile', 
      icon: <User size={20} />, 
      roles: ['admin', 'employee'] 
    },
    { 
      title: 'Settings', 
      href: '/settings', 
      icon: <Settings size={20} />, 
      roles: ['admin'] 
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user.role as 'admin' | 'employee')
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-brand-blue">SchoolTrack</h2>
        </div>
        <Separator />
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => (
              <li key={item.href}>
                <Button
                  variant={location.pathname === item.href ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    location.pathname === item.href ? 
                      "bg-primary text-primary-foreground" : 
                      "hover:bg-muted"
                  )}
                  onClick={() => navigate(item.href)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <Button variant="ghost" className="w-full gap-2" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Log out</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden absolute left-4 top-4 z-50">
          <Button variant="outline" size="icon">
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-sidebar p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-brand-blue">SchoolTrack</h2>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0" 
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Separator />
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {filteredNavItems.map((item) => (
                  <li key={item.href}>
                    <Button
                      variant={location.pathname === item.href ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-2",
                        location.pathname === item.href ? 
                          "bg-primary text-primary-foreground" : 
                          "hover:bg-muted"
                      )}
                      onClick={() => {
                        navigate(item.href);
                        setOpen(false);
                      }}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4">
              <Button variant="ghost" className="w-full gap-2" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b h-16">
          <div className="flex items-center justify-between h-full px-4 md:px-6">
            <div className="md:hidden w-8"></div>
            
            <h1 className="text-xl font-semibold md:ml-0">
              {filteredNavItems.find(item => item.href === location.pathname)?.title || 'Dashboard'}
            </h1>
            
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

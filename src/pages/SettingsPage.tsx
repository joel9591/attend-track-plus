
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    taskAssignments: true,
    announcementAlerts: true,
    requestUpdates: true,
  });

  const [displaySettings, setDisplaySettings] = useState({
    darkMode: false,
    compactView: false,
  });

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleDisplayChange = (setting: keyof typeof displaySettings) => {
    setDisplaySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {isAdmin && <TabsTrigger value="system">System</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize how the application looks and behaves.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme for the application
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={displaySettings.darkMode}
                  onCheckedChange={() => handleDisplayChange('darkMode')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compactView">Compact View</Label>
                  <p className="text-sm text-muted-foreground">
                    Display more content with less spacing
                  </p>
                </div>
                <Switch
                  id="compactView"
                  checked={displaySettings.compactView}
                  onCheckedChange={() => handleDisplayChange('compactView')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleNotificationChange('emailNotifications')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="taskAssignments">Task Assignments</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new tasks are assigned
                  </p>
                </div>
                <Switch
                  id="taskAssignments"
                  checked={notificationSettings.taskAssignments}
                  onCheckedChange={() => handleNotificationChange('taskAssignments')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="announcementAlerts">Announcement Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified for new announcements
                  </p>
                </div>
                <Switch
                  id="announcementAlerts"
                  checked={notificationSettings.announcementAlerts}
                  onCheckedChange={() => handleNotificationChange('announcementAlerts')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requestUpdates">Request Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your requests are updated
                  </p>
                </div>
                <Switch
                  id="requestUpdates"
                  checked={notificationSettings.requestUpdates}
                  onCheckedChange={() => handleNotificationChange('requestUpdates')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="system" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings (Admin only).</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Maintenance</Label>
                    <p className="text-sm text-muted-foreground">
                      Put the system in maintenance mode
                    </p>
                  </div>
                  <Button variant="outline">Schedule Maintenance</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Create a backup of all system data
                    </p>
                  </div>
                  <Button variant="outline">Backup Now</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default SettingsPage;

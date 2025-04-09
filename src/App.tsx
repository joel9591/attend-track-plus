
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import TasksPage from "./pages/TasksPage";
import AttendancePage from "./pages/AttendancePage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import RequestsPage from "./pages/RequestsPage";
import SchoolsPage from "./pages/SchoolsPage";
import EmployeesPage from "./pages/EmployeesPage";
import SalaryPage from "./pages/SalaryPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

// Define the App component properly as a function component
const App = () => {
  // Create the query client inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                
                {/* Protected Routes - Both Roles */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/attendance" element={<AttendancePage />} />
                  <Route path="/announcements" element={<AnnouncementsPage />} />
                  <Route path="/requests" element={<RequestsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/salary" element={<SalaryPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
                
                {/* Admin-Only Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/schools" element={<SchoolsPage />} />
                  <Route path="/employees" element={<EmployeesPage />} />
                </Route>
                
                {/* Catch All */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

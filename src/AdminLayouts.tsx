import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Admin/Sidebar';
import Navbar from './components/Admin/Navbar';
import Dashboard from './components/Admin/Dashboard';
import EditReview from './components/Admin/SidebarContents/EditReview';
import TeamMember from './components/Admin/SidebarContents/TeamMember';
import Pricing from './components/Admin/SidebarContents/Pricing';
import Project from './components/Admin/SidebarContents/Project';
import Certificate from './components/Admin/SidebarContents/Certificate';
import RecentActivity from './components/Admin/SidebarContents/RecentActivity';

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Layout({ darkMode, setDarkMode }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPath={location.pathname}
      />

      <div className="transition-all duration-300 lg:ml-[280px]">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="p-4 lg:p-6">
            <Routes>
              {/* Default Route for Admin */}
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

              {/* Admin Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit-reviews" element={<EditReview />} />
              <Route path="/add-team" element={<TeamMember />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/new-project" element={<Project />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/recent-activity" element={<RecentActivity />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
}

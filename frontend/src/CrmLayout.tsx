import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import CrmLogin from './components/Crm/Login';
import Navbar from './components/Crm/Navbar';
import Sidebar from "./components/Crm/Sidebar";
import Settings from './components/Crm/CrmSidebar/Settings'

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("crmAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/crm/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Placeholder component - replace with your actual dashboard
const CrmDashboard = () => <div>CRM Dashboard</div>;

const CrmRoutes = ({ darkMode, setDarkMode }: LayoutProps) => {
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

      {/* Sidebar Component */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPath={location.pathname}
        />

      <div className="transition-all duration-300 lg:ml-[280px]">
        {/* Navbar Component */}
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className={`pt-16 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="p-4 lg:p-6">
            <Routes>
              <Route path="/dashboard" element={<CrmDashboard />} />
              {/* Add your CRM routes here similar to Admin routes */}
              <Route path="/contacts" element={<div>Contacts</div>} />
              <Route path="/settings" element={<Settings/>} />
              
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default function CrmLayout({ darkMode, setDarkMode }: LayoutProps) {
  return (
    <Routes>
      {/* Root CRM route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/crm/dashboard" replace />
          </ProtectedRoute>
        }
      />

      {/* Login route */}
      <Route
        path="/login"
        element={
          localStorage.getItem("crmAuthenticated") === "true" ? (
            <Navigate to="/crm/dashboard" replace />
          ) : (
            <CrmLogin />
          )
        }
      />

      {/* Protected CRM routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <CrmRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
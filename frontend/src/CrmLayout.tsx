import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import CrmLogin from './components/Crm/Login';
import Navbar from './components/Crm/Navbar';
import Sidebar from "./components/Crm/Sidebar";
import Settings from './components/Crm/CrmSidebar/Settings';
import Dashboard from "./components/Crm/CrmSidebar/Dashboard";

// Define interface for props
interface LayoutProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check for both token and authentication status
  const isAuthenticated = localStorage.getItem("crmAuthenticated") === "true" && localStorage.getItem("token");
  const location = useLocation();

  if (!isAuthenticated) {
    // Clear any stale authentication data
    localStorage.removeItem("crmAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    return <Navigate to="/crm/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Placeholder component - replace with your actual dashboard
// const CrmDashboard = () => <div>CRM Dashboard</div>;

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

        <main className={`pt-16 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="p-4 lg:p-6">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contacts" element={<div>Contacts</div>} />
              <Route path="/clients" element={<div>Clients</div>} />
              <Route path="/projects" element={<div>Projects</div>} />
              <Route path="/tasks" element={<div>Tasks</div>} />
              <Route path="/settings" element={<Settings />} />
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
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/crm/dashboard" replace />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          (localStorage.getItem("crmAuthenticated") === "true" && localStorage.getItem("token")) ? (
            <Navigate to="/crm/dashboard" replace />
          ) : (
            <CrmLogin />
          )
        }
      />

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
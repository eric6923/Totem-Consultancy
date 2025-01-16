import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import CrmLogin from './components/Crm/Login';
import Navbar from './components/Crm/Navbar';
import Sidebar from "./components/Crm/Sidebar";
import Settings from './components/Crm/CrmSidebar/Settings';
import Dashboard from "./components/Crm/CrmSidebar/Dashboard";

// Define interfaces for props and components
interface LayoutProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  userRole: string | null;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPath: string;
  userRole: string | null;
}

type UserRole = "admin" | "manager" | "team" | null;

// Define dashboard paths
const ROLE_DASHBOARD_PATHS: Record<NonNullable<UserRole>, string> = {
  admin: "/crm/dashboard",
  manager: "/crm/manager/dashboard",
  team: "/crm/team/dashboard"
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("crmAuthenticated") === "true" && localStorage.getItem("token");
  const location = useLocation();
  const userRole = localStorage.getItem("userRole") as UserRole;

  if (!isAuthenticated) {
    localStorage.removeItem("crmAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    return <Navigate to="/crm/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const CrmRoutes = ({ darkMode, setDarkMode }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const userRole = localStorage.getItem("userRole") as UserRole;

  // Role-specific dashboard component
  const RoleSpecificDashboard = () => {
    switch (userRole) {
      case "manager":
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manager Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Manager-specific dashboard content */}
            </div>
          </div>
        );
      case "team":
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Member Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Team member-specific dashboard content */}
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  // Other components remain the same...

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
        userRole={userRole}
      />

      <div className="transition-all duration-300 lg:ml-[280px]">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          userRole={userRole}
        />

        <main className={`pt-16 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="p-4 lg:p-6">
            <Routes>
              {/* Role-specific dashboard routes */}
              <Route
                path="/dashboard"
                element={userRole === "admin" ? <RoleSpecificDashboard /> : <Navigate to={ROLE_DASHBOARD_PATHS[userRole || "admin"]} replace />}
              />
              <Route
                path="/manager/dashboard"
                element={userRole === "manager" ? <RoleSpecificDashboard /> : <Navigate to={ROLE_DASHBOARD_PATHS[userRole || "admin"]} replace />}
              />
              <Route
                path="/team/dashboard"
                element={userRole === "team" ? <RoleSpecificDashboard /> : <Navigate to={ROLE_DASHBOARD_PATHS[userRole || "admin"]} replace />}
                />

              {/* Admin-only routes */}
              {userRole === "admin" && (
                <>
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/projects" element={<Projects />} />
                </>
              )}

              {/* Manager-specific routes */}
              {userRole === "manager" && (
                <Route path="/team" element={<TeamManagement />} />
              )}

              {/* Shared routes */}
              <Route path="/tasks" element={<RoleSpecificTasks />} />
              <Route path="/settings" element={<Settings />} />

              {/* Redirect to role-specific dashboard if path is not found */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={ROLE_DASHBOARD_PATHS[userRole || "admin"]}
                    replace
                  />
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default function CrmLayout({ darkMode, setDarkMode }: LayoutProps) {
  const userRole = localStorage.getItem("userRole") as UserRole;

  return (
    <Routes>
      {/* Default redirect to role-specific dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to={ROLE_DASHBOARD_PATHS[userRole || "admin"]} replace />
          </ProtectedRoute>
        }
      />

      {/* Login route with authentication check */}
      <Route
        path="/login"
        element={
          localStorage.getItem("crmAuthenticated") === "true" && 
          localStorage.getItem("token") ? (
            <Navigate to={ROLE_DASHBOARD_PATHS[userRole || "admin"]} replace />
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

      {/* Catch-all redirect to role-specific dashboard */}
      <Route
        path="*"
        element={
          <Navigate to={ROLE_DASHBOARD_PATHS[userRole || "admin"]} replace />
        }
      />
    </Routes>
  );
}

// Role-specific task component
const RoleSpecificTasks = () => {
  const userRole = localStorage.getItem("userRole") as UserRole;

  switch (userRole) {
    case "manager":
      return (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manager Tasks
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            {/* Add manager-specific task content */}
          </div>
        </div>
      );
    case "team":
      return (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Team Tasks
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            {/* Add team member-specific task content */}
          </div>
        </div>
      );
    default:
      return (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Tasks
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            {/* Add admin-specific task content */}
          </div>
        </div>
      );
  }
};

// Placeholder components for various sections
const TeamManagement = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      Team Management
    </h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      {/* Add team management content */}
    </div>
  </div>
);

const Contacts = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      Contacts
    </h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      {/* Add contacts content */}
    </div>
  </div>
);

const Clients = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      Clients
    </h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      {/* Add clients content */}
    </div>
  </div>
);

const Projects = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
      Projects
    </h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      {/* Add projects content */}
    </div>
  </div>
);
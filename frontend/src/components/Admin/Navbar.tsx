import { useState, useRef, useEffect } from "react";
import { Menu, Bell, Sun, Moon, Settings, LogOut } from "lucide-react";
import profile from "./assets/assets/profile.png";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

interface RecentActivity {
  id: number;
  action: string;
  changesBy: string;
  createdAt: string;
  updatedAt: string;
}

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  setDarkMode,
}: NavbarProps) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(
    []
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const fetchRecentActivities = async () => {
    try {
      console.log("Fetching recent activities...");
      const response = await fetch(
        "https://totem-consultancy-alpha.vercel.app/api/recent"
      );
      const data = await response.json();
      console.log("Received data:", data);
      setRecentActivities(data);
    } catch (error) {
      console.error("Error fetching recent activities:", error);
    }
  };

  useEffect(() => {
    fetchRecentActivities();
    // Poll more frequently - every 5 seconds instead of every minute
    const interval = setInterval(fetchRecentActivities, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    fetchRecentActivities();
    // Fetch activities every minute
    const interval = setInterval(fetchRecentActivities, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Welcome Chief");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSettings = () => {
    navigate("/admin/settings");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/admin/login");
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 h-16 fixed top-0 right-0 left-0 z-40 px-4 lg:px-6">
      <div className="h-full max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Left side - Menu button and Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 dark:text-gray-300 lg:hidden"
          >
            <Menu size={24} />
          </button>

          {/* Brand/Logo - Visible in desktop */}
          <div className="hidden lg:block text-xl font-semibold text-gray-800 dark:text-white">
            Your Brand
          </div>
        </div>

        {/* Right side - Icons and Profile */}
        <div className="flex items-center gap-2 lg:gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="h-6 w-6 text-gray-800 dark:text-gray-200" />
            ) : (
              <Moon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
            )}
          </button>

          {/* Notification Bell with Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative"
            >
              <Bell size={20} />
              {recentActivities.length > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {Math.min(recentActivities.length, 1)}{" "}
                  {/* Ensure it shows "1" */}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {activity.action}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          By: {activity.changesBy}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(activity.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    No recent activities
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <img
                src={profile}
                alt="Profile"
                className="h-7 w-7 rounded-full cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all object-cover"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSettings}
                  className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

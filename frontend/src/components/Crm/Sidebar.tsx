import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import profile from "../Admin/assets/assets/profile.png";

import {
  LayoutDashboard,
  Users,
  Contact,
  FolderKanban,
  CheckSquare,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPath: string;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  currentPath,
}: SidebarProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  const crmSections = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/crm/dashboard"
    },
    {
      title: "Client Management",
      icon: <Users size={20} />,
      path: "/crm/clients"
    },
    {
      title: "Contact Management",
      icon: <Contact size={20} />,
      path: "/crm/contacts"
    },
    {
      title: "Project Management",
      icon: <FolderKanban size={20} />,
      path: "/crm/projects"
    },
    {
      title: "Task Management",
      icon: <CheckSquare size={20} />,
      path: "/crm/tasks"
    }
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 transition-all duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
        w-[280px] shadow-lg z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 h-16 mt-6">
        <Link to="/crm/dashboard" className="flex items-center">
          <img className="h-7 w-6" src={profile} alt="" />
          <span className="ml-3 text-xl font-bold text-blue-600">
            Totem CRM
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-3 px-4 pb-28 overflow-y-auto">
        {/* Main Navigation Items */}
        {crmSections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className={`flex items-center w-full p-3 rounded-lg transition-colors mb-2 ${
              currentPath === section.path
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            {section.icon}
            <span className="ml-3 font-medium">{section.title}</span>
          </Link>
        ))}

        {/* Bottom Actions */}
        <div className="fixed bottom-0 left-0 w-[280px] p-4 border-t border-gray-200 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSidebarOpen(false);
              navigate("/crm/settings");
            }}
            className="flex items-center w-full p-3 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
          >
            <Settings size={20} />
            <span className="ml-3">Settings</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              localStorage.removeItem("token");
              navigate("/crm/login");
              setSidebarOpen(false);
            }}
            className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
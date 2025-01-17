import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import profile from './Admin/profile.jpg';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  X, 
  Users, 
  FolderKanban, 
  CheckSquare,
  HandHelping,
  ShieldCheck,
  ReceiptText
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPath: string;
  userRole: string | null;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  currentPath,
  userRole = "team",
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

  const roleBasePath = `/crm/${userRole}`;

  // Management links that are only shown to admin and manager
  const managementLinks = (userRole === 'admin' || userRole === 'manager') && [
    {
      title: "Client Management",
      icon: <Users size={20} />,
      path: `${roleBasePath}/clients`
    },
    {
      title: "Contact Management",
      icon: <Users size={20} />,
      path: `${roleBasePath}/contacts`
    },
    {
      title: "Project Management",
      icon: <FolderKanban size={20} />,
      path: `${roleBasePath}/projects`
    },
    {
      title: "Task Management",
      icon: <CheckSquare size={20} />,
      path: `${roleBasePath}/tasks`
    },
    {
      title: "Proposal Generation",
      icon: <HandHelping size={20} />,
      path: `${roleBasePath}/tasks`
    },
    {
      title: "Invoice Generation",
      icon: <ShieldCheck size={20} />,
      path: `${roleBasePath}/tasks`
    },
    {
      title: "Contract",
      icon: <ReceiptText size={20} />,
      path: `${roleBasePath}/tasks`
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
        <Link to={roleBasePath} className="flex items-center">
          <img className="h-7 w-6" src={profile} alt="" />
          <span className="ml-3 text-xl font-bold text-blue-600">
            Bihar Innovation
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
        <Link
          to={roleBasePath}
          className={`flex items-center w-full p-3 rounded-lg transition-colors mb-2 ${
            currentPath === roleBasePath
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
          }`}
          onClick={() => setSidebarOpen(false)}
        >
          <LayoutDashboard size={20} />
          <span className="ml-3 font-medium">Dashboard</span>
        </Link>

        {/* Management Links */}
        {managementLinks && managementLinks.map((link) => (
          <Link
            key={link.title}
            to={link.path}
            className={`flex items-center w-full p-3 rounded-lg transition-colors mb-2 ${
              currentPath === link.path
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            {link.icon}
            <span className="ml-3 font-medium">{link.title}</span>
          </Link>
        ))}

        {/* Bottom Actions */}
        <div className="fixed bottom-0 left-0 w-[280px] p-4 border-t border-gray-200 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSidebarOpen(false);
              navigate(`/crm/${userRole}/settings`);
            }}
            className="flex items-center w-full p-3 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
          >
            <Settings size={20} />
            <span className="ml-3">Settings</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("crmAuthenticated");
              localStorage.removeItem("token");
              localStorage.removeItem("userRole");
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
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import profile from '../Admin/assets/assets/profile.png'
interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }: NavbarProps) {
  return (
    <header className="bg-white dark:bg-gray-800 h-16 fixed top-0 right-0 left-0 z-40 flex items-center shadow-sm px-4 lg:px-6">
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)} 
        className="text-gray-600 dark:text-gray-300 lg:hidden"
      >
        <Menu size={24} />
      </button>

      <div className="flex-1 flex items-center justify-between ml-4 lg:ml-6">
  <div className="relative w-full max-w-md">
  </div>

  <div className="flex items-center space-x-2 lg:space-x-4 mr-3 sm:mr-0">
  <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          ) : (
            <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
          )}
        </button>
    <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative">
      <Bell size={20} />
      <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">1</span>
    </button>
    <img
      src={profile}
      className="h-7 w-6 rounded-full"
    />
  </div>
</div>
    </header>
  );
}
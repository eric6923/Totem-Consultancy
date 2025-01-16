import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";

type UserRole = "admin" | "manager" | "team";

interface Credentials {
  email: string;
  password: string;
}

// Mapping of roles to their dashboard paths
const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  admin: "/crm/dashboard",
  manager: "/crm/manager/dashboard",
  team: "/crm/team/dashboard"
};

export default function CrmLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("admin");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const apiUrl = role === "admin"
      ? "https://totem-consultancy-beta.vercel.app/api/auth/adminlogin"
      : "https://totem-consultancy-beta.vercel.app/api/auth/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("crmAuthenticated", "true");
        localStorage.setItem("userRole", role);

        // Navigate to role-specific dashboard
        navigate(ROLE_DASHBOARD_PATHS[role]);
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCredentialsForRole = (): Credentials | null => {
    const credentials: Record<UserRole, Credentials> = {
      admin: {
        email: "totemmanagement@gmail.com",
        password: "Totem@123"
      },
      manager: {
        email: "ericsa2023@gmail.com",
        password: "password"
      },
      team: {
        email: "eric.2002@srit.org",
        password: "password"
      }
    };

    return credentials[role] || null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            CRM Login
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access your CRM dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(["admin", "manager", "team"] as UserRole[]).map((roleOption) => (
                <label
                  key={roleOption}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    role === roleOption
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={roleOption}
                    checked={role === roleOption}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="sr-only"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {roleOption} {roleOption === "team" ? "Member" : ""}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white 
            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 
            disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center">
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </div>
            )}
          </button>
        </form>

        {getCredentialsForRole() && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
              Sample Credentials for {role.charAt(0).toUpperCase() + role.slice(1)}:
            </p>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>Email: {getCredentialsForRole()?.email}</p>
              <p>Password: {getCredentialsForRole()?.password}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
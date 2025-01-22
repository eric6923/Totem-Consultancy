import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";

type UserRole = "admin" | "manager" | "team";

interface Credentials {
  email: string;
  password: string;
}

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
      ? "https://bihar-innovation-omega.vercel.app/api/auth/adminlogin"
      : "https://bihar-innovation-omega.vercel.app/api/auth/login";

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("crmAuthenticated", "true");
        localStorage.setItem("userRole", role);
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
        email: "admin@gmail.com",
        password: "admin@123"
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Made more compact on mobile */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4 md:p-12 lg:p-16 flex flex-col justify-center">
        {/* Logo - Smaller on mobile */}
        <div className="mb-4 md:mb-12">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-tr-xl" />
            </div>
            <span className="text-xl md:text-3xl font-bold text-white">CRM System</span>
          </div>
        </div>

        {/* Content - More compact on mobile */}
        <div className="space-y-3 md:space-y-6 text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-8">
            Streamline Your Business Operations
          </h2>
          <div className="space-y-2 md:space-y-6">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg md:text-xl mb-0.5 md:mb-1">Comprehensive Management</h3>
                <p className="text-sm md:text-base text-blue-100/80">Unified platform for all your business operations</p>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg md:text-xl mb-0.5 md:mb-1">Real-time Analytics</h3>
                <p className="text-sm md:text-base text-blue-100/80">Make data-driven decisions with insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-4 md:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-4 md:space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-600">
              Please sign in to your account
            </p>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-4">
                  Select Role
                </label>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {(["admin", "manager", "team"] as UserRole[]).map((roleOption) => (
                    <label
                      key={roleOption}
                      className={`flex items-center justify-center p-2 md:p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        role === roleOption
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
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
                      <span className="text-xs md:text-sm font-medium capitalize">
                        {roleOption} {roleOption === "team" ? "Member" : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-2 md:py-3 border border-transparent text-sm font-medium rounded-xl
              text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white"
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
                  <span className="text-sm">Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <LogIn className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Sign In
                </div>
              )}
            </button>

            {getCredentialsForRole() && (
              <div className="mt-4 p-3 md:p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs md:text-sm font-medium text-gray-900 mb-2">
                  Sample Credentials for {role.charAt(0).toUpperCase() + role.slice(1)}:
                </p>
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Email:</span>
                    {getCredentialsForRole()?.email}
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Password:</span>
                    {getCredentialsForRole()?.password}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
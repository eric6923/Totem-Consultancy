import {
  Users,
  Contact,
  FolderKanban,
} from "lucide-react";
import { useEffect, useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ContactData {
  id: string;
  name: string;
  email: string;
  isClient: boolean;
}

interface ProjectData {
  id: string;
  name: string;
  status: string;
  contactId: string;
  contact: ContactData;
}

interface ApiResponse {
  message?: string;
  projectts?: ProjectData[];
}

interface DashboardStats {
  totalClients: number;
  totalContacts: number;
  totalProjects: number;
}

interface MonthlyStats {
  name: string;
  clients: number;
  contacts: number;
  projects: number;
  tasksCreated: number;
  tasksCompleted: number;
  tasksPending: number;
}

const TASK_COLORS = ['#6366F1', '#22C55E', '#EF4444'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs sm:text-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Dashboard(): JSX.Element {
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalContacts: 0,
    totalProjects: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const monthlyData: MonthlyStats[] = [
    { name: 'Jan', clients: 30, contacts: 45, projects: 12, tasksCreated: 65, tasksCompleted: 55, tasksPending: 10 },
    { name: 'Feb', clients: 35, contacts: 52, projects: 15, tasksCreated: 75, tasksCompleted: 60, tasksPending: 15 },
    { name: 'Mar', clients: 42, contacts: 61, projects: 18, tasksCreated: 85, tasksCompleted: 70, tasksPending: 15 },
    { name: 'Apr', clients: 48, contacts: 70, projects: 22, tasksCreated: 95, tasksCompleted: 80, tasksPending: 15 },
    { name: 'May', clients: 52, contacts: 78, projects: 25, tasksCreated: 105, tasksCompleted: 90, tasksPending: 15 },
    { name: 'Jun', clients: 58, contacts: 85, projects: 28, tasksCreated: 115, tasksCompleted: 95, tasksPending: 20 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // Fetch contacts
        const contactsResponse = await fetch('https://totem-consultancy-beta.vercel.app/api/crm/contacts');
        if (!contactsResponse.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const contactsData = await contactsResponse.json();
  
        // Fetch projects
        const projectsResponse = await fetch('https://totem-consultancy-beta.vercel.app/api/crm/projects');
        if (!projectsResponse.ok) {
          throw new Error('Failed to fetch projects');
        }
        const projectsData: ApiResponse = await projectsResponse.json();
  
        // Validate data before accessing
        if (!projectsData || !projectsData.projectts) {
          throw new Error('Invalid projects data structure');
        }
  
        // Calculate unique clients from contacts
        const uniqueClients = contactsData.contacts.filter((contact: ContactData) => contact.isClient).length;
  
        // Calculate total contacts
        const totalContacts = contactsData.contacts.length;
  
        // Calculate total projects
        const totalProjects = projectsData.projectts.length;
  
        setStats({
          totalClients: uniqueClients,
          totalContacts,
          totalProjects,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchStats();
  }, []);

  // Calculate latest task statistics for pie chart
  const latestMonth = monthlyData[monthlyData.length - 1];
  const taskPieData = [
    { name: 'Created', value: latestMonth.tasksCreated },
    { name: 'Completed', value: latestMonth.tasksCompleted },
    { name: 'Pending', value: latestMonth.tasksPending },
  ];

  const StatCard = ({ title, value, icon, bgColor }: { title: string; value: number; icon: JSX.Element; bgColor: string }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`p-6 ${bgColor} rounded-xl`}>
          {icon}
        </div>
        <div className="ml-6">
          <h3 className="text-3xl xl:text-4xl font-bold text-gray-800 dark:text-white">
            {isLoading ? (
              <span className="text-gray-400">Loading...</span>
            ) : error ? (
              <span className="text-red-500">Error</span>
            ) : (
              value
            )}
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
            {title}
          </p>
        </div>
      </div>
    </div>
  );

  // Rest of the component remains the same as in your original code
  // (CustomTooltip, PieChartTooltip, ChartContainer, and other helper components)

  return (
    <main className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
  
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
              CRM Dashboard
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-blue-600">Overview</span>
            </div>
          </div>
        </div>
  
        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 xl:gap-8 mb-6 sm:mb-8">
              <StatCard
                title="Total Clients"
                value={stats.totalClients}
                icon={<Users className="h-12 w-12 text-blue-600" />}
                bgColor="bg-blue-100 dark:bg-blue-900"
              />
              <StatCard
                title="Total Contacts"
                value={stats.totalContacts}
                icon={<Contact className="h-12 w-12 text-yellow-600" />}
                bgColor="bg-yellow-100 dark:bg-yellow-900"
              />
              <StatCard
                title="Total Projects"
                value={stats.totalProjects}
                icon={<FolderKanban className="h-12 w-12 text-green-600" />}
                bgColor="bg-green-100 dark:bg-green-900"
              />
            </div>
  
            {/* Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Growth Metrics */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Growth Metrics</h2>
                <div className="h-[300px] sm:h-[400px] lg:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        interval={"preserveStartEnd"}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                              <p className="text-gray-600 dark:text-gray-300">{label}</p>
                              {payload.map((pld: any, index: number) => (
                                <p key={index} style={{ color: pld.color }} className="text-sm">
                                  {`${pld.name}: ${pld.value}`}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Legend 
                        wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
                        iconSize={8}
                        iconType="circle"
                      />
                      <Line type="monotone" dataKey="clients" stroke="#3B82F6" strokeWidth={2} dot={{ r: 2 }} name="Clients" />
                      <Line type="monotone" dataKey="contacts" stroke="#EAB308" strokeWidth={2} dot={{ r: 2 }} name="Contacts" />
                      <Line type="monotone" dataKey="projects" stroke="#22C55E" strokeWidth={2} dot={{ r: 2 }} name="Projects" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
  
              {/* Task Status Pie Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Task Status</h2>
                <div className="h-[300px] sm:h-[400px] lg:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={95}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {taskPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TASK_COLORS[index % TASK_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={({ active, payload }: any) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                              <p className="text-sm font-medium" style={{ color: payload[0].payload.fill }}>
                                {`${payload[0].name}: ${payload[0].value}`}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Legend 
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
import {
    Download,
    Book,
    Users,
    Award,
    Search,
    Filter,
    MoreVertical,
  } from "lucide-react";
  
  export default function Dashboard() {
    const todos = [
      { text: "Review team performance", completed: true },
      { text: "Prepare monthly report", completed: true },
      { text: "Client meeting at 3 PM", completed: false },
      { text: "Update documentation", completed: true },
      { text: "Plan next sprint", completed: false },
    ];
  
    const recentOrders = [
      { user: "John Doe", date: "01-10-2021", status: "completed" },
      { user: "Jane Smith", date: "01-10-2021", status: "pending" },
      { user: "Mike Johnson", date: "01-10-2021", status: "process" },
      { user: "Sarah Williams", date: "01-10-2021", status: "pending" },
      { user: "Tom Brown", date: "01-10-2021", status: "completed" },
    ];
  
    return (
      <main className=" px-4 md:px-6 lg:px-8 xl:px-12 pb-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
                Dashboard
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-blue-600">Overview</span>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 max-w-[200px] w-full lg:w-auto transition-colors">
                <Download size={20} className="mr-2" />
                Download Report
              </button>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 mb-10">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-5 bg-blue-100 dark:bg-blue-900 rounded-xl">
                  <Book className="h-10 w-10 text-blue-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl xl:text-3xl font-bold text-gray-800 dark:text-white">
                    1,234
                  </h3>
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                    Total Courses
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-5 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                  <Users className="h-10 w-10 text-yellow-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl xl:text-3xl font-bold text-gray-800 dark:text-white">
                    2,834
                  </h3>
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                    Team Members
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-5 bg-green-100 dark:bg-green-900 rounded-xl">
                  <Award className="h-10 w-10 text-green-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl xl:text-3xl font-bold text-gray-800 dark:text-white">
                    987
                  </h3>
                  <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
                    Certificates Issued
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Recent Activity
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Search size={20} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Filter size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="block lg:overflow-x-auto lg:-mx-6">
                <div className="lg:inline-block lg:min-w-full lg:align-middle lg:px-6">
                  {/* Mobile View */}
                  <div className="block lg:hidden">
                    {recentOrders.map((order, index) => (
                      <div
                        key={index}
                        className="mb-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                      >
                        <div className="flex items-center mb-3">
                          <img
                            src={`https://i.pravatar.cc/150?img=${index + 1}`}
                            alt={order.user}
                            className="h-10 w-10 rounded-full mr-4"
                          />
                          <span className="text-base text-gray-800 dark:text-gray-200">
                            {order.user}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {order.date}
                          </span>
                          <span
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
  
                  {/* Desktop View */}
                  <table className="hidden lg:table min-w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                        <th className="pb-4">Team</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-700 last:border-0"
                        >
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                alt={order.user}
                                className="h-10 w-10 rounded-full mr-4"
                              />
                              <span className="text-base text-gray-800 dark:text-gray-200">
                                {order.user}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-base text-gray-500 dark:text-gray-400">
                            {order.date}
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
  
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  To Do List
                </h2>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Filter size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                {todos.map((todo, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      todo.completed
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "bg-gray-50 dark:bg-gray-700/50"
                    }`}
                  >
                    <span
                      className={`text-base ${
                        todo.completed
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
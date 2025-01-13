
import { 
  Clock,
  Star,
  Book,
  Award,
  UserPlus,
  DollarSign,
  MessageSquare
} from 'lucide-react';

interface Activity {
  id: number;
  type: 'review' | 'course' | 'certificate' | 'team' | 'pricing' | 'feedback';
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

const RecentActivity = () => {
  // Sample data - in real app, this would come from props or API
  const activities: Activity[] = [
    {
      id: 1,
      type: 'review',
      user: 'Alex Thompson',
      action: 'left a review',
      timestamp: '2 hours ago',
      details: 'Advanced React Course'
    },
    
    {
      id: 3,
      type: 'team',
      user: 'John Smith',
      action: 'joined team',
      timestamp: '5 hours ago',
      details: 'Frontend Developer'
    },
    {
      id: 4,
      type: 'pricing',
      user: 'Admin',
      action: 'updated pricing',
      timestamp: '1 day ago',
      details: 'Summer Special Offer'
    },
    {
      id: 5,
      type: 'feedback',
      user: 'Sarah Wilson',
      action: 'submitted feedback',
      timestamp: '1 day ago',
      details: 'UI/UX Course'
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    const iconProps = { className: 'h-5 w-5' };
    switch (type) {
      case 'review':
        return <Star {...iconProps} className="text-yellow-500" />;
      case 'certificate':
        return <Award {...iconProps} className="text-blue-500" />;
      case 'team':
        return <UserPlus {...iconProps} className="text-green-500" />;
      case 'pricing':
        return <DollarSign {...iconProps} className="text-purple-500" />;
      case 'feedback':
        return <MessageSquare {...iconProps} className="text-red-500" />;
      default:
        return <Clock {...iconProps} className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Activity</h2>
          <Clock className="h-6 w-6 text-gray-400" />
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.user}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.timestamp}
                  </span>
                </div>
                
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {activity.action} - <span className="font-medium">{activity.details}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
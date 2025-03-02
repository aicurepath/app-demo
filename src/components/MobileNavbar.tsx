import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ChatBubbleLeftIcon, ChartBarIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';

export default function MobileNavbar() {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  const isPractitioner = user?.role === 'practitioner';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-center">
      <nav className="max-w-lg w-full">
        <div className="flex justify-around items-center h-16">
          <Link 
            to="/" 
            className={`flex flex-col items-center ${
              isActive('/') ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <HomeIcon className="w-6 h-6" />
          </Link>
          
          {!isPractitioner && (
            <Link 
              to="/health-score" 
              className={`flex flex-col items-center ${
                isActive('/health-score') ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <ChartBarIcon className="w-6 h-6" />
            </Link>
          )}
          
          <Link 
            to="/chat" 
            className={`flex flex-col items-center ${
              isActive('/chat') ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <ChatBubbleLeftIcon className="w-6 h-6" />
          </Link>
          
          <Link 
            to="/consultation-history" 
            className={`flex flex-col items-center ${
              isActive('/consultation-history') ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <ClockIcon className="w-6 h-6" />
          </Link>

          <Link 
            to={user ? '/profile' : '/auth'} 
            className={`flex flex-col items-center ${
              (isActive('/profile') || isActive('/auth')) ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <UserCircleIcon className="w-6 h-6" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
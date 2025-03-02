import { Outlet } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';

export default function Layout() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </div>
      <MobileNavbar />
    </div>
  );
}
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cool-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-4 pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
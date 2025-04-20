// apps/admin/src/components/Layout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-cool-50">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-cool-50 p-4">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
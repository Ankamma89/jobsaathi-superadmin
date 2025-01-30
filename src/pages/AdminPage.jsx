import React from 'react';
import Sidebar from '../components/Sidebar';
import SuperAdminHome from './HomePage';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <SuperAdminHome />
      </div>
    </div>
  );
};

export default AdminDashboard;
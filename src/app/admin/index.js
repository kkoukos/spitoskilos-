"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import authService from '../../services/authService';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel.</p>
    </div>
  );
};

export default AdminDashboard;


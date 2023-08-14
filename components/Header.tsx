"use client"

import React from 'react';
import useAuthStore from '@/store/auth';
import { useStore } from '@/store/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { UserDropDown } from '@/components/UserDropDown';

const Header: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const user = useStore((state) => state.user);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/logout/');
      logout();
      localStorage.removeItem('user-storage');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-blue-500 py-4 min-w-full">
  <div className="container mx-auto px-6 flex justify-between items-center">
    <h1 className="text-white text-lg font-semibold">
      <Link href="/">Auth App</Link>
    </h1>
    <nav>
      <ul className="flex space-x-4">
        <li className="ml-auto">
          {isAuthenticated && user ? (
            <UserDropDown username={user.username} handleClick={handleLogout} />
          ) : (
            <Link href="/signin" className="text-white hover:text-gray-200 transition duration-300">
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  </div>
</header>
  );
};

export default Header;

"use client"

import React, { useState} from 'react';
import api from '@/lib/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/user';
import useAuthStore from '@/store/auth';
import Link from 'next/link';


const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const setUser = useStore((state) => state.setUser);
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: handle form submission
    try {
        const response = await api.post('/login/', { username, password });
        const loginData = await response.data;

        //Store access and refresh token in cookies
        Cookies.set('access_token', loginData.access, { httpOnly: true });
        Cookies.set('refresh_token', loginData.refresh, { httpOnly: true });

        //set auth headers for future request 
        api.defaults.headers['Authorization'] = `Bearer ${loginData.access}`;

        //set user in global context
        const profileResponse = await api.get('/user/profile/');
        const profileData = await profileResponse.data; 
        setUser(profileData);
        login();

      } catch (error) {
        // TODO: handle sign-in error
      }
    };
  

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-4">Sign In</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </div>
          <p className='text-sm mt-2'>Don't have an account? {' '}
            <Link href="/register" className=' text-blue-600 underline'>
              Sign Up
            </Link>
          </p>
      </form>
    </>
  );
};

export default SignIn;

"use client"
import React, {useState, useEffect} from 'react';
import { useStore } from '@/store/user';
import useAuthStore from '@/store/auth';

const Home: React.FC = () => {
  const user = useStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  // This useEffect will only run once, during the first render
  useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true);
  }, []);

  return <>{initialRenderComplete ? 
    (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-4">Welcome to our app!</h1>
          {isAuthenticated && user ? (
            <p>
              You are logged in as {user.username} ({user.email})
            </p>
          ) : (
            <p>You are not logged in.</p>
          )}
        </div>

        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Login</h2>
            <p>Login using your credentials to access the app features.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
              Login
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Signup</h2>
            <p>Create an account to start using the app and its features.</p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full">
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
    )
    : null}</>;
  
};

export default Home;

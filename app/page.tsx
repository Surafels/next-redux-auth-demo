'use client';

import { useState } from 'react';
import { setToken } from '@/redux/auth/auth.slice';
import useAuthSession from '@/hooks/useAuthSession';
import { useAppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAuthSession();

  const handleLogin = async () => {
   
    if (!username || !password) {
      toast.error('Username and password are required');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });


      if (response.ok) {
        const { token } = await response.json();
        dispatch(setToken(token));
        localStorage.setItem('authToken', token);
        toast.success('Login successful');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

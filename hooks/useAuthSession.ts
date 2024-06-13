import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setUser } from '../redux/auth/auth.slice';

type User = {
  id: string;
  username: string;
  email: string;
};

const useAuthSession = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if there's a valid token in localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
          // Make an API call to fetch the user data
          const response = await fetch('/api/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData: User = await response.json();
            // Update the user data in the Redux store
            dispatch(setUser(userData));
          } else {
            // Clear the token from localStorage if the request fails
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return { user, loading };
};

export default useAuthSession;

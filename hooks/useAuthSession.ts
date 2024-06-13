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

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ReactNode } from 'react';

// interface AuthState {
//   username: ReactNode;
//   user: any;
//   token: string | null;
// }

// const initialState: AuthState = {
//     user: null,
//     token: null,
//     username: undefined
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<any>) => {
//       state.user = action.payload;
//     },
//     setToken: (state, action: PayloadAction<string | null>) => {
//       state.token = action.payload;
//     },
//     clearAuth: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, setToken, clearAuth } = authSlice.actions;
// export default authSlice.reducer;
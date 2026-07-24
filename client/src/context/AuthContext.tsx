// import React, {
//   useEffect,
//   useState,
//   useContext,
//   createContext,
//   useLayoutEffect,
//   useRef,
// } from 'react';

import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';

import { jwtDecode } from 'jwt-decode';
// import UseRefreshToken from '../hooks/useRefreshToken';
// import { url } from '../configURL/configURL';

interface AuthContextType {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  currentUsername: string;
  setCurrentUsername: Dispatch<SetStateAction<string>>;
  currentUserID: string;
  setCurrentUserID: Dispatch<SetStateAction<string>>;
  isAuth: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function isTokenValid(token: string): boolean {
  if (!token) return false;
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    // exp is in seconds, Date.now() is in ms
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false; // malformed token
  }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState('');
  const [isLoading, setIsLoading] = useState(true); // true until we've tried refreshing once

  const [currentUsername, setCurrentUsername] = useState('');
  const [currentUserID, setCurrentUserID] = useState('');

  // Recompute whenever accessToken changes — no separate state to fall out of sync
  const isAuth = useMemo(() => isTokenValid(accessToken), [accessToken]);

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await fetch('/api/users/refresh', {
          method: 'POST',
          credentials: 'include', // sends the httpOnly refresh_token cookie
        });

        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.access_token);
        }
        // if it fails (no cookie, expired refresh token), just stay logged out
      } catch (error) {
        console.error('Silent refresh failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    tryRefresh();
  }, []); // run once on mount

  // const [isAuth, setIsAuth] = useState(false);

  // const [tokenExp, setTokenExp] = useState(null);

  // useEffect(() => {
  //   const setUser = async () => {
  //     const username = await fetch('http://127.0.0.1:5173/api/username', {
  //       headers: { authorization: accessToken },
  //       // headers: { Authorization: `Bearer ${accessToken}` },
  //       credentials: 'include',
  //     })
  //       .then((response) => response.json())
  //       .then((userName) => {
  //         return userName;
  //       });
  //     setCurrentUsername(username);
  //   };

  //   setUser();
  // }, []);

  // useEffect(() => {
  //   const refreshToken = async () => {
  //     try {
  //       console.log('refresh token test');
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   refreshToken();
  // }, [accessToken]);

  // console.log('current username: ', currentUsername);
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        currentUsername,
        setCurrentUsername,
        currentUserID,
        setCurrentUserID,
        isAuth,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

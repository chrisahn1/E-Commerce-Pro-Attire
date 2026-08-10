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
          setAccessToken(data.accessToken);
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

  useEffect(() => {
    if (!accessToken) return;

    let exp: number;
    try {
      ({ exp } = jwtDecode<{ exp: number }>(accessToken));
    } catch {
      return; // malformed token, nothing to schedule
    }

    const msUntilExpiry = exp * 1000 - Date.now();
    const buffer = Math.min(30000, msUntilExpiry * 0.2); // never eat the whole lifetime
    // const buffer = Math.min(20000, msUntilExpiry * 0.2); // For testing purposes
    const refreshIn = Math.max(msUntilExpiry - buffer, 0);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch('/api/users/refresh', {
          method: 'POST',
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setAccessToken(data.accessToken);
        } else {
          setAccessToken('');
        }
      } catch (error) {
        // console.error('Scheduled refresh failed:', error);
        setAccessToken('');
      }
    }, refreshIn);

    return () => clearTimeout(timer);
  }, [accessToken]);

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

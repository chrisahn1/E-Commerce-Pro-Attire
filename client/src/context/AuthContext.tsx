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
} from 'react';

// import { jwtDecode } from 'jwt-decode';
// import UseRefreshToken from '../hooks/useRefreshToken';
// import { url } from '../configURL/configURL';

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState({});

  const [currentUsername, setCurrentUsername] = useState('');
  const [currentUserID, setCurrentUserID] = useState('');

  const [isAuth, setIsAuth] = useState(false);

  // const [tokenExp, setTokenExp] = useState(null);

  useEffect(() => {}, []);
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
        setIsAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

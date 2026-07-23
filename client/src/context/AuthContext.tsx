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
} from 'react';

// import { jwtDecode } from 'jwt-decode';
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
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState('');

  const [currentUsername, setCurrentUsername] = useState('');
  const [currentUserID, setCurrentUserID] = useState('');

  const [isAuth, setIsAuth] = useState(false);

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

  useEffect(() => {
    const refreshToken = async () => {
      try {
        console.log('refresh token test');
      } catch (error) {
        console.error(error);
      }
    };

    refreshToken();
  }, [accessToken]);

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
        setIsAuth,
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

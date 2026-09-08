// import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TopWear from './pages/TopWear';
import Pants from './pages/Pants';
import Shoes from './pages/Shoes';
import PurchaseList from './pages/PurchaseList';
import Kart from './pages/Kart';
import Settings from './pages/Settings';

import ProtectRoute from './routes/ProtectedRoutes';
import GuestRoute from './routes/GuestRoutes';
import { useAuth } from './context/AuthContext';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="App">
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/topwear" element={<TopWear />} />
              <Route path="/pants" element={<Pants />} />
              <Route path="/shoes" element={<Shoes />} />
              <Route element={<ProtectRoute />}>
                <Route path="/purchaselist" element={<PurchaseList />} />
                <Route path="/kart" element={<Kart />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </>
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank" rel="noreferrer">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>{serverData}</h1>
    // </>
  );
}
